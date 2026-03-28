/**
 * Simple Node.js/Express Backend Server
 * 
 * This server acts as a proxy between your frontend and OpenAI API.
 * The API key is stored on the server and never sent to the browser.
 * 
 * Setup:
 * 1. Install dependencies: npm install express cors dotenv openai
 * 2. Create .env file with: OPENAI_API_KEY=your_key_here
 * 3. Run: node backend/server.js
 * 4. Server runs on http://localhost:3000
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resume Reviewer API is running' });
});

// Resume analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    // Get API key from environment variable (never exposed to browser)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Server configuration error: API key not set' 
      });
    }

    // Get request data from frontend
    const { resumeText, jobDescription, targetRole, targetCompany, stemMajor } = req.body;

    // Validate input
    if (!resumeText || !jobDescription || !targetRole || !targetCompany) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Call OpenAI API (key is on server, not exposed to browser)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Key stays on server!
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a resume analysis expert...' // Your prompt here
          },
          {
            role: 'user',
            content: `Analyze this resume for a ${targetRole} position at ${targetCompany}...\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ 
        error: error.error?.message || 'OpenAI API error' 
      });
    }

    const data = await response.json();
    
    // Parse and return the analysis
    const analysis = JSON.parse(data.choices[0].message.content);
    res.json(analysis);

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error.message 
    });
  }
});

// Rate limiting endpoint (optional but recommended)
const rateLimit = new Map();
const RATE_LIMIT = 10; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

app.use('/api/*', (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }
  
  const userData = rateLimit.get(ip);
  
  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + RATE_WINDOW;
    return next();
  }
  
  if (userData.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Please try again later.' 
    });
  }
  
  userData.count++;
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Resume Reviewer API running on http://localhost:${PORT}`);
  console.log(`✓ API key is secure on the server`);
  console.log(`✓ Frontend should call: http://localhost:${PORT}/api/analyze`);
});
