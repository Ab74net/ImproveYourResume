/**
 * Configuration Module
 * Backend API configuration
 */

export const config = {
  // Backend API URL
  apiUrl: 'http://localhost:3001/api/resume-review',
  
  // Health check endpoint
  healthUrl: 'http://localhost:3001/health',
  
  // Development mode flag
  isDevelopment: window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1',
  
  // Check if backend is running
  async checkBackend() {
    try {
      const response = await fetch(this.healthUrl);
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      return false;
    }
  }
};

// Check backend status on load
if (config.isDevelopment) {
  config.checkBackend().then(isRunning => {
    if (isRunning) {
      console.log(
        '%c✓ Backend Connected',
        'color: green; font-size: 14px; font-weight: bold;',
        '\n\nBackend API is running at http://localhost:3001'
      );
    } else {
      console.warn(
        '%c⚠️ Backend Not Running',
        'color: orange; font-size: 14px; font-weight: bold;',
        '\n\nPlease start the backend server:\n' +
        '1. cd backend\n' +
        '2. npm install\n' +
        '3. Copy .env.example to .env and add your API key\n' +
        '4. npm start'
      );
    }
  });
}

export default config;
