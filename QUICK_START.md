# Quick Start Guide

## Setup (5 minutes)

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd resume-reviewer
```

### 2. Set Up Environment Variables (Optional)

For local development convenience:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
# OPENAI_API_KEY=sk-proj-your-key-here
```

**Important:** The `.env` file is for reference only. In Phase 1, you'll enter your API key directly in the UI.

See [ENV_SETUP_README.md](./ENV_SETUP_README.md) for detailed security information.

### 3. Start a Local Server

Since this is a static site with no build step, you just need a simple HTTP server:

**Option A: Python 3**
```bash
python -m http.server 8000
```

**Option B: Node.js (http-server)**
```bash
npx http-server -p 8000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 4. Open in Browser

Navigate to:
- **Home page:** http://localhost:8000
- **App page:** http://localhost:8000/app.html
- **Demo page:** http://localhost:8000/demo.html

## Usage

### Try the Demo First

1. Go to http://localhost:8000
2. Click "Try It Out" button
3. Click "MOCK DATA RUN" in the navbar
4. Explore the before/after resume comparison

### Use the Real App

1. Go to http://localhost:8000/app.html
2. Enter your OpenAI API key (get one at https://platform.openai.com/api-keys)
3. Fill in the form:
   - **Target Role:** Type any role (e.g., "Software Engineer")
   - **Target Company:** Type any company (e.g., "Apple")
   - **STEM Major:** Optional, select from dropdown
   - **Resume:** Upload PDF or paste text
   - **Job Description:** Paste a real JD or click "Use Generic Sample"
4. Click "ANALYZE RESUME FIT"
5. Review the results and suggestions

## Project Structure

```
/
├── index.html              # Marketing home page
├── app.html                # Main application
├── demo.html               # Mock data demo
├── .env                    # Your API keys (git-ignored)
├── .env.example            # Template for .env
├── scripts/
│   ├── app.js             # Main app logic
│   ├── demo-enhanced.js   # Demo page logic
│   ├── config.js          # Configuration module
│   ├── state.js           # State management
│   ├── ui.js              # UI rendering
│   ├── upload.js          # PDF handling
│   ├── analysis.js        # AI API calls
│   └── mockData.js        # Demo data
├── styles/
│   ├── base.css           # Base styles & variables
│   ├── layout.css         # Page layouts
│   ├── components.css     # UI components
│   ├── home.css           # Home page styles
│   └── demo-enhanced.css  # Demo page styles
└── types/
    ├── analysis.ts        # Type definitions
    └── session.ts         # Session types
```

## Features

### Home Page (index.html)
- Hero section with VT branding
- Three feature sections explaining the tool
- Call-to-action buttons
- Smooth scroll navigation

### App Page (app.html)
- PDF resume upload
- Free-text role and company input with suggestions
- Job description paste or generic sample
- AI-powered analysis with:
  - Overall fit score
  - Keyword coverage
  - Matching and missing skills
  - Bullet point rewrites
  - Section-specific feedback
  - Company-specific advice
  - Project suggestions
- Session-based history (up to 8 analyses)

### Demo Page (demo.html)
- Before/after resume comparison
- Hokie student sample resume
- Color-coded highlights:
  - 🔴 Red: Needs major improvement
  - 🟡 Yellow: Minor improvements
  - 🟢 Green: Strong content
  - 🔵 Blue: New additions
- Click-to-scroll from issues to resume lines
- Animated score visualization

## API Key Setup

### Get an OpenAI API Key

1. Go to https://platform.openai.com/signup
2. Create an account or sign in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-proj-` or `sk-`)
6. Add billing information (required for API access)

### Using Your Key

**Phase 1 (Current):**
- Enter key directly in the app UI
- Key is stored in memory only
- Not saved or persisted
- Safe for personal use

**Phase 2 (Future):**
- Backend service will handle API calls
- Keys stored securely on server
- Frontend never sees the key
- See [ENV_SETUP_README.md](./ENV_SETUP_README.md) for migration guide

## Development

### No Build Step Required

This project uses:
- Native ES6 modules
- No transpilation
- No bundler
- Direct browser execution

### Making Changes

1. Edit HTML, CSS, or JS files
2. Refresh browser to see changes
3. No compilation or build step needed

### Adding New Features

1. Create new module in `scripts/`
2. Import/export using ES6 syntax
3. Link in HTML with `<script type="module">`
4. Update types in `types/` for IDE support

## Troubleshooting

### "Module not found" errors
- Ensure all script tags have `type="module"`
- Check file paths are relative (e.g., `./scripts/app.js`)
- Verify you're using a local server (not `file://`)

### API key not working
- Verify key starts with `sk-`
- Check you have billing enabled on OpenAI account
- Ensure you have available credits
- Check browser console for error messages

### PDF upload not working
- Ensure PDF.js CDN is accessible
- Check file size (max 4MB recommended)
- Try pasting text instead as fallback

### Styles not loading
- Clear browser cache
- Check browser console for 404 errors
- Verify CSS file paths in HTML

## Next Steps

1. **Try the demo** to see what the tool can do
2. **Get an API key** from OpenAI
3. **Test with your own resume** in the app
4. **Review the analysis** and implement suggestions
5. **Iterate** - run multiple analyses as you improve

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [ES6 Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Project Documentation](./PROJECT_PLAN.md)
- [Environment Setup](./ENV_SETUP_README.md)

## Support

For issues or questions:
1. Check the documentation files in the project root
2. Review browser console for error messages
3. Verify API key and billing setup
4. Check that you're using a modern browser (Chrome, Firefox, Safari, Edge)

## License

[Add your license information here]
