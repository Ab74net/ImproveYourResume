# API Key Setup Guide

## Quick Setup (2 minutes)

### Step 1: Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-` or `sk-`)
5. Save it somewhere safe (you won't be able to see it again)

### Step 2: Add Key to Config File

1. Open `scripts/config.js` in your code editor
2. Find this line:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual key:
   ```javascript
   const API_KEY = 'sk-proj-abc123...'; // Your actual key
   ```
4. Save the file

### Step 3: Test It

1. Start your local server:
   ```bash
   python -m http.server 8000
   ```
2. Open http://localhost:8000/app.html
3. Check the browser console (F12)
   - ✅ You should see: "✓ API Key Configured"
   - ❌ If you see a warning, double-check your key

### Step 4: Use the App

1. Upload a resume or paste text
2. Enter target role and company
3. Paste or use a sample job description
4. Click "ANALYZE RESUME FIT"
5. Review the results!

## Important Security Notes

### ⚠️ This Setup is NOT Secure for Public Deployment

**Why?**
- The API key is visible in the browser source code
- Anyone can extract it and use your key
- You could rack up unexpected charges
- This is only safe for personal/local use

**Current Setup is OK for:**
- ✅ Local development on your computer
- ✅ Private demos to friends/colleagues
- ✅ Internal company tools (behind authentication)
- ✅ Personal projects you don't share publicly

**Current Setup is NOT OK for:**
- ❌ Public websites anyone can access
- ❌ Deployed apps on the internet
- ❌ Shared hosting environments
- ❌ Any production use case

### 🔒 For Production Deployment

You MUST implement a backend service:

```
User Browser → Your Backend API → OpenAI API
                    ↑
              (API key stored here securely)
```

See [ENV_SETUP_README.md](./ENV_SETUP_README.md) for detailed migration guide.

## Protecting Your Key

### DO:
- ✅ Keep `scripts/config.js` in `.gitignore` if you commit your key
- ✅ Set up billing alerts on OpenAI dashboard
- ✅ Use a separate key for development vs production
- ✅ Rotate keys regularly
- ✅ Monitor usage on OpenAI dashboard

### DON'T:
- ❌ Commit your key to GitHub/GitLab
- ❌ Share screenshots with your key visible
- ❌ Deploy this to a public website
- ❌ Share your key with others
- ❌ Use your production key for testing

## Git Protection

### Option 1: Don't Commit config.js (Recommended for Solo Dev)

Add to `.gitignore`:
```
scripts/config.js
```

Then create `scripts/config.example.js`:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
export const config = { /* ... */ };
```

### Option 2: Use a Separate Key File (Recommended for Teams)

1. Create `scripts/api-key.js` (git-ignored):
   ```javascript
   export const API_KEY = 'sk-proj-your-actual-key';
   ```

2. Update `scripts/config.js`:
   ```javascript
   import { API_KEY } from './api-key.js';
   export const config = {
     getApiKey: () => API_KEY,
     // ...
   };
   ```

3. Add to `.gitignore`:
   ```
   scripts/api-key.js
   ```

4. Create `scripts/api-key.example.js`:
   ```javascript
   export const API_KEY = 'YOUR_API_KEY_HERE';
   ```

## Troubleshooting

### "API key not configured" error

**Check:**
1. Did you replace `YOUR_API_KEY_HERE` with your actual key?
2. Did you save the file?
3. Did you refresh the browser?
4. Is your key in quotes? `'sk-proj-...'`

### "Invalid API key" error

**Check:**
1. Did you copy the entire key?
2. Does it start with `sk-proj-` or `sk-`?
3. Did you add billing info to your OpenAI account?
4. Is the key still active? (Check OpenAI dashboard)

### "Rate limit exceeded" error

**Solutions:**
1. Wait a few minutes and try again
2. Check your OpenAI usage limits
3. Upgrade your OpenAI plan if needed
4. Implement request throttling in your code

### Key is visible in browser

**This is expected!** Frontend apps cannot hide API keys. This is why you need a backend for production. See security notes above.

## Cost Management

### Set Up Billing Alerts

1. Go to [OpenAI Billing](https://platform.openai.com/account/billing/overview)
2. Set up usage alerts (e.g., $5, $10, $20)
3. Set a hard limit if available
4. Monitor usage regularly

### Estimate Costs

Typical resume analysis:
- Input: ~1,000 tokens (resume + job description)
- Output: ~500 tokens (analysis)
- Cost: ~$0.01-0.03 per analysis (GPT-4)
- Cost: ~$0.001-0.003 per analysis (GPT-3.5)

For 100 analyses:
- GPT-4: ~$1-3
- GPT-3.5: ~$0.10-0.30

### Reduce Costs

1. Use GPT-3.5 instead of GPT-4 for testing
2. Implement caching for repeated analyses
3. Limit the number of analyses per session
4. Use shorter prompts when possible

## Next Steps

1. ✅ Add your API key to `scripts/config.js`
2. ✅ Test the app locally
3. ✅ Set up billing alerts
4. ✅ Monitor your usage
5. 📚 Read [ENV_SETUP_README.md](./ENV_SETUP_README.md) for production deployment

## Questions?

**Q: Can I use a different AI provider?**
A: Yes! Update `scripts/analysis.js` to call a different API. The structure is the same.

**Q: How do I switch between multiple keys?**
A: Create multiple config files or use environment-based logic in `config.js`.

**Q: Can I share this app with my team?**
A: For local use, yes. For deployed use, implement a backend first.

**Q: What if I accidentally commit my key?**
A: 
1. Immediately revoke the key on OpenAI dashboard
2. Create a new key
3. Remove the key from git history
4. Update your `.gitignore`

## Resources

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [OpenAI Pricing](https://openai.com/pricing)
- [OpenAI Usage Dashboard](https://platform.openai.com/account/usage)
- [Git Secrets Tool](https://github.com/awslabs/git-secrets)
