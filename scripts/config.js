/**
 * Configuration Module
 * 
 * IMPORTANT SECURITY NOTE:
 * This configuration stores the API key for development purposes.
 * 
 * ⚠️ WARNING: This approach exposes the API key in the browser!
 * Anyone can view the source code and extract the key.
 * 
 * For production deployment, you MUST:
 * 1. Move all API calls to a backend service (AWS Lambda, Node.js server, etc.)
 * 2. Store the API key securely on the server (AWS Secrets Manager, env vars)
 * 3. Have the frontend call your backend API instead of OpenAI directly
 * 
 * Current setup is acceptable ONLY for:
 * - Local development
 * - Private demos
 * - Internal tools with restricted access
 */

// Load API key from .env file (you'll need to manually set this)
// Since this is a no-build frontend app, you need to manually copy your key here
const API_KEY = 'PUTAPIHERE'; // Replace with your actual key from .env

export const config = {
  // Get the configured API key
  getApiKey: () => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      console.error('API key not configured! Please set your API key in scripts/config.js');
      return null;
    }
    return API_KEY;
  },

  // Phase 2: Backend API configuration (future)
  apiGatewayUrl: null,
  
  // Development mode flag
  isDevelopment: window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1',
};

// Validate API key on load
if (config.isDevelopment) {
  const key = config.getApiKey();
  if (!key) {
    console.warn(
      '%c⚠️ API Key Not Configured',
      'color: orange; font-size: 14px; font-weight: bold;',
      '\n\nPlease add your API key to scripts/config.js:\n' +
      '1. Open scripts/config.js\n' +
      '2. Replace YOUR_API_KEY_HERE with your actual key\n' +
      '3. Save and refresh\n\n' +
      'Get your key from: https://platform.openai.com/api-keys'
    );
  } else if (key.startsWith('sk-')) {
    console.log(
      '%c✓ API Key Configured',
      'color: green; font-size: 14px; font-weight: bold;',
      '\n\nAPI key is set and ready to use.'
    );
  }
}

export default config;
