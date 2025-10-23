// apps/api/tests/intent-detection.test.js

const IntentClassifier = require('../src/assistant/intent-classifier');

describe('Intent Detection Tests', () => {
  let classifier;

  beforeEach(() => {
    classifier = new IntentClassifier();
  });

  describe('Policy Questions', () => {
    const policyQuestions = [
      'What is your return policy?',
      'How do refunds work?',
      'Do you offer free shipping?',
      'What payment methods do you accept?',
      'Tell me about your warranty'
    ];

    test.each(policyQuestions)('should detect policy_question for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('policy_question');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Order Status', () => {
    const orderQuestions = [
      'Where is my order?',
      'Track order ORD123456',
      'What is the status of my package?',
      'Has my order shipped?',
      'When will my order arrive?'
    ];

    test.each(orderQuestions)('should detect order_status for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('order_status');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Product Search', () => {
    const searchQuestions = [
      'Search for laptops',
      'Do you have wireless headphones?',
      'Show me keyboards',
      'Looking for phone cases',
      'Find gaming mouse'
    ];

    test.each(searchQuestions)('should detect product_search for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('product_search');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Complaints', () => {
    const complaints = [
      'This product is terrible',
      'Very disappointed with my order',
      'The item arrived broken',
      'Worst experience ever',
      'Not happy with the service'
    ];

    test.each(complaints)('should detect complaint for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('complaint');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Chitchat', () => {
    const chitchat = [
      'Hello',
      'Hi there',
      'How are you?',
      'Thank you',
      'Thanks for your help'
    ];

    test.each(chitchat)('should detect chitchat for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('chitchat');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Off Topic', () => {
    const offTopic = [
      'What is the weather today?',
      'Tell me a joke',
      'Who won the election?',
      'How do I cook pasta?',
      'What movie should I watch?'
    ];

    test.each(offTopic)('should detect off_topic for: "%s"', (query) => {
      const result = classifier.classify(query);
      expect(result.intent).toBe('off_topic');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Violations', () => {
    test('should detect violation for spam', () => {
      const result = classifier.classify('spam spam spam spam spam');
      expect(result.intent).toBe('violation');
    });

    test('should detect violation for excessive caps', () => {
      const result = classifier.classify('BUY NOW CLICK HERE!!!!!!');
      expect(result.intent).toBe('violation');
    });
  });

  describe('Behavior Configuration', () => {
    test('should provide correct behavior for policy_question', () => {
      const behavior = classifier.getBehavior('policy_question');
      expect(behavior.action).toBe('ground_on_knowledge_base');
      expect(behavior.requiresCitation).toBe(true);
      expect(behavior.allowFunctionCalls).toBe(false);
    });

    test('should provide correct behavior for order_status', () => {
      const behavior = classifier.getBehavior('order_status');
      expect(behavior.action).toBe('call_function');
      expect(behavior.function).toBe('getOrderStatus');
      expect(behavior.allowFunctionCalls).toBe(true);
    });

    test('should allow function calls for product_search', () => {
      const shouldCall = classifier.shouldCallFunction('product_search');
      expect(shouldCall).toBe(true);
    });

    test('should not allow function calls for policy_question', () => {
      const shouldCall = classifier.shouldCallFunction('policy_question');
      expect(shouldCall).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty string', () => {
      const result = classifier.classify('');
      expect(result.intent).toBe('unknown');
      expect(result.confidence).toBe(0);
    });

    test('should handle null input', () => {
      const result = classifier.classify(null);
      expect(result.intent).toBe('unknown');
      expect(result.confidence).toBe(0);
    });

    test('should handle very short input', () => {
      const result = classifier.classify('hi');
      expect(result.intent).toBe('chitchat');
    });
  });
});