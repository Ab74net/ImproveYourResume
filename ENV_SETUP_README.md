# Environment Variables & API Key Setup

## ⚠️ Important Security Notice

This is a **frontend-only application** that runs directly in the browser without a build step. This means:

1. **API keys in .env files CANNOT be truly hidden from users**
2. Any key used in browser JavaScript can be extracted by viewing source or network requests
3. The `.env` file approach is for **development convenience only**, not security

## Current Setup (Phase 1 - Prototype)

### How It Works Now

The application asks users to manually enter their API key in the UI:
- Key is stored in memory only (not localStorage or cookies)
- Key is used directly from browser to call AI APIs
- Key is never saved or persisted
- This is acceptable for **prototyping and personal use only**

### Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your API key to `.env`:**
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

3. **The `.env` file is git-ignored** to prevent accidental commits

4. **For local testing only:**
   - You can temporarily hardcode a key in `scripts/config.js` for convenience
   - **NEVER commit this file with a real key**
   - **NEVER deploy with a hardcoded key**

## Recommended Production Setup (Phase 2)

For a production deployment, you MUST move API calls to a backend:

### Architecture

```
Browser (Frontend)
    ↓
Your Backend API (AWS Lambda, Node.js, etc.)
    ↓ (API key stored securely here)
OpenAI / AI Service
```

### Implementation Steps

1. **Create a backend service:**
   - AWS Lambda + API Gateway
   - Node.js/Express server
   - Python Flask/FastAPI
   - Any backend framework

2. **Store API keys on the backend:**
   - Use AWS Secrets Manager
   - Use environment variables on your server
   - Use AWS Systems Manager Parameter Store
   - Never expose keys to the frontend

3. **Update frontend to call your backend:**
   ```javascript
   // Instead of calling OpenAI directly:
   const response = await fetch('https://your-api.com/analyze', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${userAuthToken}` // User auth, not API key
     },
     body: JSON.stringify({ resumeText, jobDescription })
   });
   ```

4. **Implement security measures:**
   - User authentication (AWS Cognito, Auth0, etc.)
   - Rate limiting to prevent abuse
   - Request validation and sanitization
   - CORS configuration
   - API usage monitoring and alerts

### Example AWS Lambda Setup

```javascript
// lambda/analyzeResume.js
const { OpenAI } = require('openai');

exports.handler = async (event) => {
  // API key stored in Lambda environment variables
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { resumeText, jobDescription } = JSON.parse(event.body);

  // Validate user authentication
  // Implement rate limiting
  // Call OpenAI API
  // Return results

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
```

## File Structure

```
.env                    # Your actual API keys (git-ignored)
.env.example            # Template for .env file (committed to git)
.gitignore              # Ensures .env is never committed
scripts/config.js       # Configuration module with security warnings
ENV_SETUP_README.md     # This file
```

## Security Best Practices

### ✅ DO:
- Use backend services for API calls in production
- Store API keys in secure backend environment variables
- Implement user authentication and rate limiting
- Monitor API usage and set up billing alerts
- Use HTTPS for all API communications
- Rotate API keys regularly

### ❌ DON'T:
- Commit `.env` files to git
- Hardcode API keys in frontend JavaScript
- Deploy frontend apps with exposed API keys
- Share API keys in screenshots or documentation
- Use personal API keys for public applications
- Ignore API usage monitoring

## Development Workflow

### For Personal/Local Testing:
1. Get an API key from OpenAI (or your AI provider)
2. Add it to `.env` file
3. Enter it manually in the UI when testing
4. Key is used only in your browser session

### For Team Development:
1. Each developer gets their own API key
2. Each developer creates their own `.env` file (not shared)
3. Use low rate limits during development
4. Consider using a shared development backend

### For Production:
1. Set up backend infrastructure (Lambda, API Gateway, etc.)
2. Store API keys in AWS Secrets Manager or similar
3. Frontend calls your backend API only
4. Implement proper authentication and authorization
5. Monitor usage and costs

## Cost Management

When using API keys directly from the browser (Phase 1):
- Anyone with access to your app can use your API key
- No way to limit or track individual user usage
- Risk of unexpected costs if key is extracted
- Set up billing alerts in your AI provider dashboard

With a backend (Phase 2):
- You control all API calls
- Can implement per-user rate limits
- Can track usage by user
- Can implement caching to reduce costs
- Can add authentication to prevent abuse

## Migration Path

### Current State (Phase 1):
```javascript
// Frontend calls OpenAI directly
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${userProvidedKey}` }
});
```

### Future State (Phase 2):
```javascript
// Frontend calls your backend
const response = await fetch('https://your-api.com/analyze', {
  headers: { 'Authorization': `Bearer ${userAuthToken}` }
});
```

## Questions?

- **Q: Can I use .env files in the browser?**
  - A: Not natively. You'd need a build tool (webpack, vite) to inject them, but they'd still be visible in the bundled code.

- **Q: What about environment variables in hosting platforms?**
  - A: Those are for backend/build-time only. They don't hide keys from browser users.

- **Q: Is there any way to hide API keys in a frontend app?**
  - A: No. The only solution is to move API calls to a backend service.

- **Q: Can I use this setup for a public website?**
  - A: Only if you implement the Phase 2 backend architecture. Never expose API keys in frontend code.

## Additional Resources

- [OpenAI Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [AWS Lambda + API Gateway Tutorial](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
