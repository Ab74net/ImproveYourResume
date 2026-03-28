# Tech Stack

## Frontend Stack

- **HTML5** - Semantic markup with ARIA labels for accessibility
- **CSS3** - Custom properties (CSS variables), no frameworks
- **JavaScript (ES6+ modules)** - Native browser modules, no build step required
- **TypeScript** - Type definitions only (`.ts` files in `/types/`), not compiled

## Browser APIs Used

- `crypto.randomUUID()` for generating analysis IDs
- `FileReader` API for PDF upload handling
- Native ES modules (`import`/`export`)

## External Dependencies

- **PDF.js** (via CDN) - PDF text extraction in browser
- **OpenAI API** - AI analysis (called directly from browser in Phase 1)

## No Build System

This is a static site with no build process:
- No npm/yarn/package.json
- No bundler (webpack, vite, rollup)
- No transpilation step
- TypeScript files are for IDE type hints only, not compiled

## Development Workflow

Since there's no build step, development is straightforward:

1. **Local development**: Open `index.html` directly in browser or use a simple HTTP server
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if http-server is installed globally)
   npx http-server -p 8000
   ```

2. **Testing**: Open browser to `http://localhost:8000`

3. **Demo mode**: Navigate to `demo.html` for mock data testing

## File Serving

All files are served statically:
- HTML files at root
- `/scripts/*.js` - JavaScript modules
- `/styles/*.css` - Stylesheets
- `/types/*.ts` - TypeScript definitions (not served, IDE-only)

## Future Backend (Phase 2)

Planned AWS architecture:
- **S3** - Resume file uploads and static hosting
- **API Gateway** - REST endpoints
- **Lambda** - Analysis orchestration and prompt generation
- **Textract** - PDF text extraction (fallback)
- **DynamoDB** - Saved analyses and history
- **CloudFront** - CDN for static assets
- **Cognito** - User authentication (optional)
