class IntentClassifier {
  constructor() {
    // Intent definitions with keywords and patterns
    this.intents = {
      policy_question: {
        keywords: [
          'policy', 'policies', 'return', 'refund', 'exchange', 'money back',
          'shipping', 'delivery', 'ship', 'warranty', 'guarantee',
          'how long', 'when will', 'what is your', 'do you offer',
          'commission', 'fee', 'cost', 'charge', 'rate',
          'accept', 'payment method', 'pay with', 'credit card'
        ],
        patterns: [
          /what (is|are) (your|the) (policy|policies)/i,
          /how (do|does) (return|refund|shipping|warranty)/i,
          /can i (return|refund|exchange)/i,
          /do you (ship|deliver|accept|offer)/i,
          /what.*commission/i,
          /how much.*fee/i
        ],
        priority: 2
      },

      order_status: {
        keywords: [
          'order', 'tracking', 'track', 'status', 'where is',
          'shipped', 'delivery', 'tracking number', 'package',
          'my order', 'order id', 'order number'
        ],
        patterns: [
          /where (is|are) my (order|package)/i,
          /track.*order/i,
          /order.*status/i,
          /order.*\d{6,}/i, // Order ID pattern
          /tracking.*number/i,
          /has.*shipped/i,
          /when.*arrive/i
        ],
        priority: 3
      },

      product_search: {
        keywords: [
          'search', 'find', 'looking for', 'show me', 'available',
          'in stock', 'price', 'buy', 'purchase', 'product',
          'item', 'sell', 'do you have', 'where can i find'
        ],
        patterns: [
          /looking for/i,
          /search.*for/i,
          /do you (have|sell)/i,
          /show me/i,
          /find.*product/i,
          /what.*available/i,
          /how much.*cost/i
        ],
        priority: 2
      },

      complaint: {
        keywords: [
          'problem', 'issue', 'not working', 'disappointed', 'angry',
          'frustrated', 'terrible', 'worst', 'horrible', 'awful',
          'never', 'broken', 'damaged', 'wrong', 'mistake',
          'unhappy', 'dissatisfied', 'complaint', 'unacceptable'
        ],
        patterns: [
          /this (is|was) (terrible|awful|horrible|unacceptable)/i,
          /(very|extremely|so) (disappointed|frustrated|angry|unhappy)/i,
          /never.*again/i,
          /worst.*experience/i,
          /(not|doesn't|does not) work/i,
          /received.*wrong/i
        ],
        priority: 4 // Highest priority
      },

      chitchat: {
        keywords: [
          'hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon',
          'good evening', 'how are you', "what's up", 'thanks', 'thank you',
          'bye', 'goodbye', 'see you', 'have a nice day'
        ],
        patterns: [
          /^(hi|hello|hey|greetings)[\s!.?]*$/i,
          /how are you/i,
          /what'?s up/i,
          /thank(s| you)/i,
          /^(bye|goodbye)[\s!.?]*$/i,
          /nice (day|talking|chatting)/i
        ],
        priority: 1
      },

      off_topic: {
        keywords: [
          'weather', 'recipe', 'cook', 'math', 'calculate', 'history',
          'movie', 'film', 'politics', 'election', 'sports', 'game',
          'music', 'song', 'joke', 'story', 'news'
        ],
        patterns: [
          /what.*weather/i,
          /how do i cook/i,
          /tell me (a joke|about)/i,
          /who won (the|a) (game|match|election)/i,
          /what.*movie/i,
          /calculate|solve.*math/i
        ],
        priority: 1
      },

      violation: {
        keywords: [
          // Profanity detection (sample - expand as needed)
          'spam', 'scam', 'idiot', 'stupid', 'dumb'
        ],
        patterns: [
          /\b(spam){3,}/i, // Repeated spam
          /[A-Z]{10,}/, // Excessive caps
          /(.)\1{5,}/, // Character repetition
          /(http|www\.)[^\s]+spam/i // Spam URLs
        ],
        priority: 5 // Critical
      }
    };
  }

  /**
   * Classify user input into intent
   * @param {string} userInput - The user's message
   * @returns {Object} - { intent: string, confidence: number, matches: Array }
   */
  classify(userInput) {
    if (!userInput || typeof userInput !== 'string') {
      return {
        intent: 'unknown',
        confidence: 0,
        matches: []
      };
    }

    const input = userInput.toLowerCase().trim();
    const scores = {};

    // Score each intent
    for (const [intentName, intentConfig] of Object.entries(this.intents)) {
      let score = 0;
      const matches = [];

      // Keyword matching
      for (const keyword of intentConfig.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
          matches.push({ type: 'keyword', value: keyword });
        }
      }

      // Pattern matching (higher weight)
      for (const pattern of intentConfig.patterns) {
        if (pattern.test(userInput)) {
          score += 2;
          matches.push({ type: 'pattern', value: pattern.toString() });
        }
      }

      // Apply priority multiplier
      score *= intentConfig.priority;

      scores[intentName] = {
        score,
        matches,
        priority: intentConfig.priority
      };
    }

    // Find highest scoring intent
    const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);
    const topIntent = sorted[0];

    // If no matches, return unknown
    if (topIntent[1].score === 0) {
      return {
        intent: 'unknown',
        confidence: 0,
        matches: []
      };
    }

    // Calculate confidence (0-1 scale)
    const maxPossibleScore = topIntent[1].priority * 10; // Rough estimate
    const confidence = Math.min(topIntent[1].score / maxPossibleScore, 1);

    return {
      intent: topIntent[0],
      confidence: parseFloat(confidence.toFixed(2)),
      matches: topIntent[1].matches,
      allScores: scores // For debugging
    };
  }

  /**
   * Get behavior guidance for an intent
   * @param {string} intent - The classified intent
   * @returns {Object} - Behavior configuration
   */
  getBehavior(intent) {
    const behaviors = {
      policy_question: {
        action: 'ground_on_knowledge_base',
        requiresCitation: true,
        maxResponseLength: 300,
        tone: 'professional',
        allowFunctionCalls: false
      },
      order_status: {
        action: 'call_function',
        function: 'getOrderStatus',
        requiresCitation: false,
        tone: 'reassuring',
        allowFunctionCalls: true
      },
      product_search: {
        action: 'call_function',
        function: 'searchProducts',
        requiresCitation: false,
        tone: 'enthusiastic',
        allowFunctionCalls: true
      },
      complaint: {
        action: 'empathetic_response',
        requiresCitation: false,
        tone: 'apologetic',
        escalate: true,
        allowFunctionCalls: false
      },
      chitchat: {
        action: 'brief_friendly_redirect',
        requiresCitation: false,
        maxResponseLength: 50,
        tone: 'warm',
        allowFunctionCalls: false
      },
      off_topic: {
        action: 'polite_decline',
        requiresCitation: false,
        tone: 'polite',
        allowFunctionCalls: false
      },
      violation: {
        action: 'set_boundaries',
        requiresCitation: false,
        tone: 'firm',
        allowFunctionCalls: false,
        terminate: true
      }
    };

    return behaviors[intent] || {
      action: 'general_response',
      requiresCitation: false,
      tone: 'neutral',
      allowFunctionCalls: false
    };
  }

  /**
   * Validate if function calling is appropriate for this intent
   * @param {string} intent - The classified intent
   * @returns {boolean}
   */
  shouldCallFunction(intent) {
    const behavior = this.getBehavior(intent);
    return behavior.allowFunctionCalls === true;
  }
}

export default IntentClassifier; 