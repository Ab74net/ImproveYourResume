// server.js - Express server with OpenAI integration

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { OpenAI } = require('openai');
const { buildPrompt } = require('./prompts');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/scripts', express.static(path.join(__dirname, '../frontend/scripts')));
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Resume Reviewer API is running',
    timestamp: new Date().toISOString()
  });
});

// Main resume review endpoint
app.post('/api/resume-review', async (req, res) => {
  try {
    const { resumeText, targetCompany, targetRole, jobDescription } = req.body;

    // Validate required fields
    if (!resumeText || !targetCompany || !targetRole) {
      return res.status(400).json({ 
        error: 'Missing required fields: resumeText, targetCompany, and targetRole are required' 
      });
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not set in .env file');
      return res.status(500).json({ 
        error: 'Server configuration error: API key not set. Check backend/.env file.' 
      });
    }

    console.log(`📝 Analyzing resume for ${targetRole} at ${targetCompany}`);

    // Build prompt using template
    const messages = buildPrompt({
      resumeText,
      targetCompany,
      targetRole,
      jobDescription: jobDescription || 'generic'
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('OpenAI returned empty response');
    }

    // Parse and return JSON
    const analysis = JSON.parse(content);
    
    console.log(`✓ Analysis complete. Score: ${analysis.overallScore}/100`);
    
    res.json(analysis);

  } catch (error) {
    console.error('❌ Analysis error:', error.message);
    
    // Handle OpenAI API errors
    if (error.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid API key. Check your OPENAI_API_KEY in backend/.env' 
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again in a moment.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Analysis failed. Check your API key and try again.',
      details: error.message 
    });
  }
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  Resume Reviewer - Running');
  console.log('═══════════════════════════════════════════════════');
  console.log(`✓ Server: http://localhost:${PORT}`);
  console.log(`✓ API endpoint: POST /api/resume-review`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');
  
  // Verify API key
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY not set in .env file!');
    console.warn('   Create backend/.env and add your OpenAI API key');
    console.log('');
  } else {
    console.log('✓ OpenAI API key configured');
    console.log('');
  }
});
