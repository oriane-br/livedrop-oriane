import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Dynamic import for CommonJS modules
let AssistantEngine;

async function initializeAssistant() {
  if (!AssistantEngine) {
    const module = await import(`file://${join(__dirname, '../assistant/engine.js')}`);
    AssistantEngine = module.default;
  }
}

// Initialize assistant engine (singleton)
let assistantInstance = null;

async function getAssistant() {
  if (!assistantInstance) {
    await initializeAssistant();
    
    assistantInstance = new AssistantEngine({
      llmEndpoint: process.env.LLM_API_URL || 'http://localhost:8000',
      dbConnection: mongoose.connection.db
    });
  }
  return assistantInstance;
}

// POST /api/assistant/query
router.post('/query', async (req, res, next) => {
  try {
    const { query, userId, sessionId } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query is required and must be a non-empty string',
        code: 'INVALID_QUERY'
      });
    }

    const assistant = await getAssistant();
    
    const result = await assistant.processQuery(query, {
      userId,
      sessionId,
      timestamp: new Date()
    });

    // Track query for dashboard
    const { trackAssistantQuery } = await import('../routes/dashboard.js');
    trackAssistantQuery(result.intent, result.functionsCalled);

    res.json({
      success: true,
      response: result.text,
      intent: result.intent,
      confidence: result.confidence,
      citations: result.citations,
      functionsCalled: result.functionsCalled,
      responseTime: result.responseTime
    });

  } catch (error) {
    console.error('Assistant query error:', error);
    next(error);
  }
});

// GET /api/assistant/stats
router.get('/stats', async (req, res, next) => {
  try {
    const assistant = await getAssistant();
    const stats = assistant.getStats();
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// GET /api/assistant/health
router.get('/health', async (req, res, next) => {
  try {
    const assistant = await getAssistant();
    const health = await assistant.getHealthStatus();
    
    res.json(health);
  } catch (error) {
    next(error);
  }
});

export default router;