/**
 * Environment Variable Loader (Development Only)
 * 
 * This file demonstrates how you WOULD load .env files if you had a build tool.
 * Since this is a no-build frontend app, this won't work in the browser.
 * 
 * This is here for documentation purposes and for when you migrate to Phase 2
 * with a proper backend or build system.
 */

/**
 * Example: If you were using Node.js backend or a build tool like Vite/Webpack
 */

// With Node.js backend:
// require('dotenv').config();
// const apiKey = process.env.OPENAI_API_KEY;

// With Vite:
// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// With Create React App:
// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// With Next.js:
// const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

/**
 * For this no-build frontend app, you have two options:
 * 
 * Option 1 (Current): User enters API key in UI
 * - Most secure for a frontend-only app
 * - No risk of committing keys
 * - User controls their own key
 * 
 * Option 2 (Local dev only): Hardcode temporarily in config.js
 * - Only for personal local testing
 * - Must be removed before committing
 * - Never deploy with hardcoded keys
 */

export const loadEnvForDevelopment = () => {
  if (typeof process !== 'undefined' && process.env) {
    // Running in Node.js environment (backend or build tool)
    return {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    };
  }

  // Running in browser - no access to .env files
  console.warn(
    'Environment variables cannot be loaded in the browser without a build tool. ' +
    'Please enter your API key in the UI or set up a backend service.'
  );
  
  return {
    OPENAI_API_KEY: null,
    API_GATEWAY_URL: null,
  };
};

/**
 * Validate environment configuration
 */
export const validateEnv = (env) => {
  const errors = [];

  if (!env.OPENAI_API_KEY) {
    errors.push('OPENAI_API_KEY is not set');
  }

  if (env.OPENAI_API_KEY && !env.OPENAI_API_KEY.startsWith('sk-')) {
    errors.push('OPENAI_API_KEY appears to be invalid (should start with "sk-")');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Safe getter for environment variables with fallback
 */
export const getEnvVar = (key, fallback = null) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

export default {
  loadEnvForDevelopment,
  validateEnv,
  getEnvVar,
};
