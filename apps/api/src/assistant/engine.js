import axios from 'axios';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import IntentClassifier from './intent-classifier.js';
import FunctionRegistry from './function-registry.js';
import KnowledgeBaseGrounding from './knowledge-base-grounding.js';
import CitationValidator from './citation-validator.js';

class AssistantEngine {
  constructor(config) {
    this.config = config;
    this.llmEndpoint = config.llmEndpoint;
    this.dbConnection = config.dbConnection;
    
    this.intentClassifier = new IntentClassifier();
    this.functionRegistry = new FunctionRegistry(this.dbConnection);
    this.knowledgeBase = new KnowledgeBaseGrounding(
      path.join(__dirname, '../../../docs/ground-truth.json')
    );
    this.citationValidator = new CitationValidator(this.knowledgeBase);
    
    this.prompts = this.loadPrompts();
    
    // Stats tracking
    this.stats = {
      totalQueries: 0,
      intentDistribution: {},
      functionCalls: {},
      averageResponseTime: 0,
      responseTimes: []
    };
  }

  /**
   * Load YAML prompts configuration
   */
  loadPrompts() {
    try {
      const promptsPath = path.join(__dirname, '../../../docs/prompts.yaml');
      const fileContents = fs.readFileSync(promptsPath, 'utf8');
      return yaml.load(fileContents);
    } catch (error) {
      console.error('Failed to load prompts.yaml:', error.message);
      return this.getDefaultPrompts();
    }
  }

  /**
   * Get default prompts if YAML fails to load
   */
  getDefaultPrompts() {
    return {
      identity: {
        name: 'Alex',
        role: 'Shoplite Customer Support Specialist',
        company: 'Shoplite E-Commerce'
      },
      intents: {},
      response_guidelines: {}
    };
  }

  /**
   * Main query processing method
   * @param {string} userQuery - The user's question
   * @param {Object} context - Additional context (userId, sessionId, etc.)
   * @returns {Promise<Object>} - { text, intent, citations, functionsCalled, responseTime }
   */
  async processQuery(userQuery, context = {}) {
    const startTime = Date.now();
    
    try {
      // Step 1: Intent Classification
      const intentResult = this.intentClassifier.classify(userQuery);
      const intent = intentResult.intent;
      const behavior = this.intentClassifier.getBehavior(intent);

      console.log(`Intent detected: ${intent} (confidence: ${intentResult.confidence})`);

      // Update stats
      this.updateStats(intent);

      // Step 2: Route based on intent
      let response;
      let functionsCalled = [];

      switch (intent) {
        case 'policy_question':
          response = await this.handlePolicyQuestion(userQuery);
          break;

        case 'order_status':
          const orderResult = await this.handleOrderStatus(userQuery, context);
          response = orderResult.response;
          functionsCalled = orderResult.functionsCalled;
          break;

        case 'product_search':
          const productResult = await this.handleProductSearch(userQuery);
          response = productResult.response;
          functionsCalled = productResult.functionsCalled;
          break;

        case 'complaint':
          response = await this.handleComplaint(userQuery);
          break;

        case 'chitchat':
          response = this.handleChitchat(userQuery);
          break;

        case 'off_topic':
          response = this.handleOffTopic();
          break;

        case 'violation':
          response = this.handleViolation();
          break;

        default:
          response = await this.handleGeneral(userQuery);
      }

      // Step 3: Citation validation for policy responses
      let citations = null;
      if (intent === 'policy_question') {
        const validation = this.citationValidator.validateAll(response);
        citations = validation;
        
        if (!validation.allValid) {
          console.warn('Invalid citations detected:', validation.invalidCitations);
        }
      }

      const responseTime = Date.now() - startTime;
      this.stats.responseTimes.push(responseTime);

      return {
        text: response,
        intent: intent,
        confidence: intentResult.confidence,
        citations: citations,
        functionsCalled: functionsCalled,
        responseTime: responseTime
      };

    } catch (error) {
      console.error('Assistant error:', error);
      return {
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team directly.",
        intent: 'error',
        error: error.message,
        responseTime: Date.now() - startTime
      };
    }
  }

  /**
   * Handle policy questions with knowledge base grounding
   */
  async handlePolicyQuestion(userQuery) {
    // Get relevant policies from knowledge base
    const groundingContext = this.knowledgeBase.getGroundingContext(userQuery);
    
    if (groundingContext === "No relevant policy information found.") {
      return "I don't have specific policy information about that in our knowledge base. Let me connect you with a specialist who can provide accurate details. Is there anything else I can help you with?";
    }

    // Build prompt with grounding context
    const prompt = this.buildPolicyPrompt(userQuery, groundingContext);
    
    // Call LLM
    const llmResponse = await this.callLLM(prompt);
    
    return llmResponse;
  }

  /**
   * Handle order status queries with function calling
   */
  async handleOrderStatus(userQuery, context) {
    // Extract order ID from query or context
    const orderIdMatch = userQuery.match(/\b[A-Z0-9]{6,}\b/);
    
    if (!orderIdMatch && !context.orderId) {
      return {
        response: "I'd be happy to check your order status! Could you please provide your order ID? You can find it in your order confirmation email or on your account's order history page.",
        functionsCalled: []
      };
    }

    const orderId = orderIdMatch ? orderIdMatch[0] : context.orderId;

    // Call function
    const result = await this.functionRegistry.execute('getOrderStatus', { orderId });
    
    if (!result.success) {
      return {
        response: `I couldn't find an order with ID ${orderId}. Please double-check the order number. You can find it in your order confirmation email or account.`,
        functionsCalled: ['getOrderStatus']
      };
    }

    // Format response with LLM
    const prompt = this.buildOrderStatusPrompt(result.data);
    const llmResponse = await this.callLLM(prompt);

    return {
      response: llmResponse,
      functionsCalled: ['getOrderStatus']
    };
  }

  /**
   * Handle product search with function calling
   */
  async handleProductSearch(userQuery) {
    // Extract search query (remove common words)
    const searchQuery = userQuery
      .toLowerCase()
      .replace(/(search for|looking for|find|show me|do you have)/g, '')
      .trim();

    if (!searchQuery) {
      return {
        response: "What product are you looking for? I can help you search our catalog!",
        functionsCalled: []
      };
    }

    // Call function
    const result = await this.functionRegistry.execute('searchProducts', {
      query: searchQuery,
      limit: 5
    });

    if (!result.success || result.data.length === 0) {
      return {
        response: `I couldn't find any products matching "${searchQuery}". Try different keywords or browse our categories!`,
        functionsCalled: ['searchProducts']
      };
    }

    // Format results with LLM
    const prompt = this.buildProductSearchPrompt(searchQuery, result.data);
    const llmResponse = await this.callLLM(prompt);

    return {
      response: llmResponse,
      functionsCalled: ['searchProducts']
    };
  }

  /**
   * Handle complaints with empathy
   */
  async handleComplaint(userQuery) {
    const empathyPhrases = [
      "I'm truly sorry to hear about this issue",
      "I completely understand your frustration",
      "Your concern is absolutely valid",
      "I apologize for the inconvenience"
    ];

    const randomEmpathy = empathyPhrases[Math.floor(Math.random() * empathyPhrases.length)];

    const prompt = `${this.getIdentityContext()}

User expressed a complaint: "${userQuery}"

Respond with genuine empathy and offer concrete help. Start with: "${randomEmpathy}"
Then acknowledge their specific issue and offer next steps.
Keep it under 150 words.

Your Response:`;

    return await this.callLLM(prompt);
  }

  /**
   * Handle chitchat (brief, redirect to support)
   */
  handleChitchat(userQuery) {
    const lower = userQuery.toLowerCase();
    
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
      return "Hello! I'm Alex from Shoplite support. How can I assist you with your orders or account today?";
    }
    
    if (lower.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    }
    
    if (lower.includes('how are you')) {
      return "I'm here and ready to help! What can I assist you with today?";
    }
    
    return "How can I help you with your Shoplite experience today?";
  }

  /**
   * Handle off-topic queries
   */
  handleOffTopic() {
    return "I appreciate the question, but I specialize in Shoplite customer support - orders, products, policies, and account assistance. Is there anything about your Shoplite experience I can help you with?";
  }

  /**
   * Handle violations
   */
  handleViolation() {
    return "I'm here to help with Shoplite-related questions in a professional manner. Let's keep our conversation respectful. How can I assist you with your shopping needs?";
  }

  /**
   * Handle general queries
   */
  async handleGeneral(userQuery) {
    const prompt = `${this.getIdentityContext()}

User question: "${userQuery}"

Provide a helpful response as a Shoplite support specialist.

Your Response:`;

    return await this.callLLM(prompt);
  }

  /**
   * Build prompt for policy questions
   */
  buildPolicyPrompt(userQuery, groundingContext) {
    const identity = this.prompts.identity;
    
    return `You are ${identity.name}, a ${identity.role} at ${identity.company}.

${groundingContext}

CRITICAL RULES:
- Answer ONLY using the policy information provided above
- ALWAYS include [PolicyID] citations in your response (e.g., [Returns2.1])
- Never invent or make up policy information
- If the policy information doesn't fully answer the question, acknowledge what you know and offer to connect them with a specialist
- Keep responses clear, professional, and under 200 words
- Do NOT mention that you're an AI, chatbot, or language model

User Question: "${userQuery}"

Your Response:`;
  }

  /**
   * Build prompt for order status responses
   */
  buildOrderStatusPrompt(orderData) {
    const identity = this.prompts.identity;
    
    return `You are ${identity.name}, a ${identity.role} at ${identity.company}.

Order Information Retrieved:
- Order ID: ${orderData.orderId}
- Status: ${orderData.status}
- Total: $${orderData.total}
- Items: ${orderData.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
- Carrier: ${orderData.carrier || 'Not yet assigned'}
- Tracking: ${orderData.trackingNumber || 'Available once shipped'}
- Estimated Delivery: ${orderData.estimatedDelivery || 'Processing'}

Provide a friendly, reassuring update about this order. Include:
1. Current status explanation
2. What happens next
3. When they can expect delivery (if available)

Keep it under 100 words and conversational.

Your Response:`;
  }

  /**
   * Build prompt for product search results
   */
  buildProductSearchPrompt(searchQuery, products) {
    const identity = this.prompts.identity;
    
    return `You are ${identity.name}, a ${identity.role} at ${identity.company}.

User searched for: "${searchQuery}"

Found Products:
${products.map(p => `- ${p.name} ($${p.price}) - ${p.inStock ? 'In Stock' : 'Out of Stock'}`).join('\n')}

Present these results enthusiastically and helpfully. Mention:
1. How many products found
2. Brief description of 2-3 top results
3. Invite them to ask for more details

Keep it under 120 words.

Your Response:`;
  }

  /**
   * Get identity context for prompts
   */
  getIdentityContext() {
    const identity = this.prompts.identity;
    return `You are ${identity.name}, a ${identity.role} at ${identity.company}.

NEVER say:
- "I'm an AI"
- "I'm ChatGPT" or "I'm Claude" or "I'm Llama"
- "As an artificial intelligence"
- "I'm a language model"

Respond naturally as a human support specialist would.`;
  }

  async callLLM(prompt, maxTokens = 500) {
    try {
      const response = await axios.post(
        `${this.llmEndpoint}/generate`,
        {
          prompt: prompt,
          max_tokens: maxTokens
        },
        {
          timeout: 5000 // 5 second timeout
        }
      );

      return response.data.text || response.data.response || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('LLM call failed:', error.message);
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('LLM response timeout');
      }
      
      throw new Error('Failed to contact LLM service');
    }
  }

  /**
   * Update statistics
   */
  updateStats(intent) {
    this.stats.totalQueries++;
    this.stats.intentDistribution[intent] = (this.stats.intentDistribution[intent] || 0) + 1;
  }

  /**
   * Get assistant statistics
   */
  getStats() {
    const avgResponseTime = this.stats.responseTimes.length > 0
      ? this.stats.responseTimes.reduce((a, b) => a + b, 0) / this.stats.responseTimes.length
      : 0;

    return {
      totalQueries: this.stats.totalQueries,
      intentDistribution: this.stats.intentDistribution,
      functionCalls: this.functionRegistry.getStats(),
      averageResponseTime: Math.round(avgResponseTime),
      knowledgeBase: this.knowledgeBase.getStats()
    };
  }

  /**
   * Get system health status
   */
  async getHealthStatus() {
    const health = {
      assistant: 'healthy',
      llm: 'unknown',
      database: 'unknown',
      knowledgeBase: 'unknown'
    };

    // Check LLM connectivity
    try {
      await axios.get(`${this.llmEndpoint}/health`, { timeout: 2000 });
      health.llm = 'healthy';
    } catch (error) {
      health.llm = 'unhealthy';
    }

    // Check database
    try {
      await this.dbConnection.admin().ping();
      health.database = 'healthy';
    } catch (error) {
      health.database = 'unhealthy';
    }

    // Check knowledge base
    const kbStats = this.knowledgeBase.getStats();
    health.knowledgeBase = kbStats.totalPolicies > 0 ? 'healthy' : 'unhealthy';

    return health;
  }
}

export default AssistantEngine;