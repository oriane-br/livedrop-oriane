class CitationValidator {
  constructor(knowledgeBase) {
    this.knowledgeBase = knowledgeBase;
  }

  /**
   * Extract PolicyID citations from text
   * Looks for patterns like [PolicyID], [Shipping4.1], etc.
   * @param {string} text - The text to extract citations from
   * @returns {Array} - Array of found citation strings
   */
  extractCitations(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Pattern: [Word/LetterNumber.Number] or [Word/LetterNumber]
    const pattern = /\[([A-Za-z]+\d+(?:\.\d+)?)\]/g;
    const matches = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
      matches.push(match[1]); // Get the PolicyID without brackets
    }

    return [...new Set(matches)]; // Remove duplicates
  }

  /**
   * Validate a single PolicyID citation
   * @param {string} policyId - The PolicyID to validate
   * @returns {Object} - { isValid: boolean, policy: Object|null }
   */
  validateCitation(policyId) {
    const policy = this.knowledgeBase.findByPolicyId(policyId);
    
    return {
      isValid: policy !== null,
      policy: policy,
      policyId: policyId
    };
  }

  /**
   * Validate all citations in a text
   * @param {string} text - The text containing citations
   * @returns {Object} - Validation report
   */
  validateAll(text) {
    const citations = this.extractCitations(text);
    
    if (citations.length === 0) {
      return {
        hasCitations: false,
        totalCitations: 0,
        validCitations: [],
        invalidCitations: [],
        allValid: true,
        report: 'No citations found in response'
      };
    }

    const validCitations = [];
    const invalidCitations = [];

    for (const citation of citations) {
      const validation = this.validateCitation(citation);
      
      if (validation.isValid) {
        validCitations.push({
          policyId: citation,
          policy: validation.policy
        });
      } else {
        invalidCitations.push(citation);
      }
    }

    const allValid = invalidCitations.length === 0;

    return {
      hasCitations: true,
      totalCitations: citations.length,
      validCitations: validCitations.map(v => v.policyId),
      invalidCitations,
      allValid,
      report: this.generateReport(validCitations, invalidCitations),
      details: validCitations
    };
  }

  /**
   * Generate human-readable validation report
   * @private
   */
  generateReport(validCitations, invalidCitations) {
    if (invalidCitations.length === 0) {
      return `✓ All ${validCitations.length} citation(s) are valid`;
    }

    const report = [];
    report.push(`⚠️ Found ${invalidCitations.length} invalid citation(s):`);
    
    for (const invalid of invalidCitations) {
      report.push(`  - [${invalid}] does not exist in knowledge base`);
    }

    if (validCitations.length > 0) {
      report.push(`✓ ${validCitations.length} valid citation(s)`);
    }

    return report.join('\n');
  }

  /**
   * Check if response requires citations (for policy questions)
   * @param {string} intent - The detected intent
   * @returns {boolean}
   */
  requiresCitations(intent) {
    return intent === 'policy_question';
  }

  /**
   * Validate citation format (PolicyID structure)
   * @param {string} citation - The citation string
   * @returns {Object} - { isValidFormat: boolean, reason: string }
   */
  validateFormat(citation) {
    // Expected format: Category#.# (e.g., Shipping4.1, Returns2.3)
    const formatPattern = /^[A-Za-z]+\d+(?:\.\d+)?$/;
    
    if (!formatPattern.test(citation)) {
      return {
        isValidFormat: false,
        reason: 'Citation must follow format: CategoryName#.# (e.g., Shipping4.1)'
      };
    }

    return {
      isValidFormat: true,
      reason: 'Valid format'
    };
  }

  /**
   * Generate citation suggestions for missing citations
   * Suggests relevant PolicyIDs based on response content
   * @param {string} responseText - The LLM response
   * @param {string} userQuery - The original user query
   * @returns {Array} - Suggested PolicyIDs
   */
  suggestCitations(responseText, userQuery) {
    const relevantPolicies = this.knowledgeBase.findRelevantPolicies(userQuery, 5);
    
    const suggestions = [];
    
    for (const policy of relevantPolicies) {
      // Check if response content relates to this policy
      const responseWords = responseText.toLowerCase().split(/\s+/);
      const answerWords = policy.answer.toLowerCase().split(/\s+/);
      
      let matchCount = 0;
      for (const rWord of responseWords) {
        if (rWord.length > 4 && answerWords.includes(rWord)) {
          matchCount++;
        }
      }

      if (matchCount > 2) {
        suggestions.push({
          policyId: policy.id,
          question: policy.question,
          relevanceScore: matchCount
        });
      }
    }

    return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
  }

  /**
   * Enforce citation requirement
   * Returns error if policy response lacks citations
   * @param {string} responseText - The LLM response
   * @param {string} intent - The detected intent
   * @returns {Object} - { passed: boolean, message: string }
   */
  enforceCitationRequirement(responseText, intent) {
    if (!this.requiresCitations(intent)) {
      return {
        passed: true,
        message: 'Citations not required for this intent'
      };
    }

    const citations = this.extractCitations(responseText);
    
    if (citations.length === 0) {
      return {
        passed: false,
        message: 'Policy responses must include [PolicyID] citations'
      };
    }

    const validation = this.validateAll(responseText);
    
    if (!validation.allValid) {
      return {
        passed: false,
        message: `Invalid citations detected: ${validation.invalidCitations.join(', ')}`
      };
    }

    return {
      passed: true,
      message: 'All citations are valid'
    };
  }
}

export default CitationValidator;