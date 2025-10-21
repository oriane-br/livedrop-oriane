const fs = require('fs');
const path = require('path');


class KnowledgeBaseGrounding {
  constructor(groundTruthPath) {
    this.knowledgeBase = [];
    this.categoryKeywords = {
      seller_accounts: ['seller', 'account setup', 'verification', 'business', 'register seller'],
      returns: ['return', 'refund', 'exchange', 'money back', 'send back'],
      payment: ['payment', 'pay', 'credit card', 'paypal', 'wallet', 'billing'],
      shipping: ['ship', 'delivery', 'tracking', 'carrier', 'fedex', 'ups'],
      fees: ['commission', 'fee', 'cost', 'charge', 'rate', 'price', 'tier'],
      mobile: ['mobile', 'app', 'phone', 'ios', 'android'],
      loyalty: ['loyalty', 'rewards', 'points', 'tier', 'platinum', 'gold', 'silver'],
      promotions: ['promo', 'discount', 'coupon', 'code', 'sale'],
      support: ['support', 'help', 'contact', 'customer service'],
      reviews: ['review', 'rating', 'feedback', 'comment'],
      api: ['api', 'developer', 'integration', 'webhook'],
      security: ['security', 'privacy', 'data', 'protection', 'encrypt'],
      quality: ['quality', 'standard', 'requirement', 'performance'],
      inventory: ['inventory', 'stock', 'warehouse'],
      accounts: ['account', 'register', 'signup', 'login', 'profile']
    };

    this.loadKnowledgeBase(groundTruthPath);
  }

  /**
   * Load knowledge base from ground-truth.json
   */
  loadKnowledgeBase(filePath) {
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      this.knowledgeBase = JSON.parse(rawData);
      console.log(`✓ Loaded ${this.knowledgeBase.length} policies from knowledge base`);
    } catch (error) {
      console.error('Failed to load knowledge base:', error.message);
      this.knowledgeBase = [];
    }
  }

  /**
   * Find relevant policies using keyword matching
   * @param {string} userQuery - The user's question
   * @param {number} limit - Maximum policies to return
   * @returns {Array} - Relevant policies
   */
  findRelevantPolicies(userQuery, limit = 3) {
    if (!userQuery || this.knowledgeBase.length === 0) {
      return [];
    }

    const query = userQuery.toLowerCase();
    const scored = [];

    // Score each policy
    for (const policy of this.knowledgeBase) {
      let score = 0;

      // Direct question match (highest weight)
      if (policy.question.toLowerCase().includes(query) || 
          query.includes(policy.question.toLowerCase())) {
        score += 10;
      }

      // Answer content match
      const answerWords = policy.answer.toLowerCase().split(/\s+/);
      const queryWords = query.split(/\s+/);
      
      for (const qWord of queryWords) {
        if (qWord.length > 3) { // Skip short words
          for (const aWord of answerWords) {
            if (aWord.includes(qWord) || qWord.includes(aWord)) {
              score += 1;
            }
          }
        }
      }

      // Category keyword match
      const categoryKeywords = this.categoryKeywords[policy.category] || [];
      for (const keyword of categoryKeywords) {
        if (query.includes(keyword.toLowerCase())) {
          score += 3;
        }
      }

      // Exact category name match
      if (query.includes(policy.category)) {
        score += 5;
      }

      if (score > 0) {
        scored.push({ policy, score });
      }
    }

    // Sort by score and return top matches
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(item => item.policy);
  }

  /**
   * Find policy by exact PolicyID
   * @param {string} policyId - The PolicyID to find
   * @returns {Object|null} - The policy or null
   */
  findByPolicyId(policyId) {
    return this.knowledgeBase.find(p => p.id === policyId) || null;
  }

  /**
   * Find all policies in a category
   * @param {string} category - Category name
   * @returns {Array} - All policies in that category
   */
  findByCategory(category) {
    return this.knowledgeBase.filter(p => p.category === category);
  }

  /**
   * Get grounding context for LLM
   * Formats relevant policies for prompt injection
   * @param {string} userQuery - The user's question
   * @returns {string} - Formatted context
   */
  getGroundingContext(userQuery) {
    const relevantPolicies = this.findRelevantPolicies(userQuery, 3);
    
    if (relevantPolicies.length === 0) {
      return "No relevant policy information found.";
    }

    let context = "RELEVANT POLICY INFORMATION:\n\n";
    
    for (const policy of relevantPolicies) {
      context += `[${policy.id}] ${policy.question}\n`;
      context += `${policy.answer}\n`;
      context += `Category: ${policy.category}\n\n`;
    }

    return context;
  }

  /**
   * Get all available categories
   * @returns {Array} - Unique category names
   */
  getCategories() {
    return [...new Set(this.knowledgeBase.map(p => p.category))];
  }

  /**
   * Get knowledge base statistics
   * @returns {Object}
   */
  getStats() {
    const categoryCount = {};
    
    for (const policy of this.knowledgeBase) {
      categoryCount[policy.category] = (categoryCount[policy.category] || 0) + 1;
    }

    return {
      totalPolicies: this.knowledgeBase.length,
      categories: Object.keys(categoryCount).length,
      policiesByCategory: categoryCount
    };
  }
}

export default KnowledgeBaseGrounding; 