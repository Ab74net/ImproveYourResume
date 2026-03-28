/**
 * API Key Storage
 * 
 * ⚠️ CRITICAL SECURITY WARNING ⚠️
 * 
 * This file stores your API key, but it does NOT hide it from users!
 * 
 * Why? Because this is a frontend JavaScript file that runs in the browser.
 * Anyone can:
 * 1. View the source code (Right-click → View Page Source)
 * 2. Open DevTools (F12) and see the Network tab
 * 3. Inspect the loaded JavaScript files
 * 4. Extract your API key
 * 
 * This separation provides:
 * ✅ Better git protection (this file is ignored)
 * ✅ Easier key rotation (only edit this file)
 * ✅ Cleaner code organization
 * ✅ Better for team development
 * 
 * But it does NOT provide:
 * ❌ Security from browser users
 * ❌ Protection from key extraction
 * ❌ Rate limiting or usage control
 * 
 * For production deployment, you MUST:
 * 1. Create a backend service (AWS Lambda, Node.js, etc.)
 * 2. Store the key on the server (AWS Secrets Manager, env vars)
 * 3. Have the frontend call YOUR backend API
 * 4. Your backend calls OpenAI with the key
 * 5. The key never reaches the browser
 * 
 * Current setup is acceptable ONLY for:
 * - Local development on your computer
 * - Private demos to trusted individuals
 * - Internal tools behind authentication
 * - Personal projects you don't share publicly
 */

// Replace 'YOUR_API_KEY_HERE' with your actual OpenAI API key
// Get your key from: https://platform.openai.com/api-keys
export const API_KEY = 'YOUR_API_KEY_HERE';

// Optional: Add multiple keys for different environments
export const API_KEYS = {
  development: 'YOUR_API_KEY_HERE',
  // production: 'USE_BACKEND_SERVICE_INSTEAD', // Never put production keys here!
};

// Helper to get the appropriate key based on environment
export function getEnvironmentKey() {
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return API_KEYS.development || API_KEY;
  }
  
  // Production should use backend service, not a hardcoded key
  console.error(
    '⚠️ SECURITY ERROR: Attempting to use hardcoded API key in production!\n' +
    'This is extremely unsafe. Please implement a backend service.\n' +
    'See ENV_SETUP_README.md for instructions.'
  );
  return null;
}
