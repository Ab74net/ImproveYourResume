# Project Structure

## Directory Layout

```
/
├── index.html              # Main application page
├── demo.html               # Demo mode with mock data
├── uploadyourresume.html   # Original prototype (legacy)
├── PROJECT_PLAN.md         # Product roadmap and architecture plan
├── DEMO_README.md          # Demo mode documentation
├── scripts/                # JavaScript modules
│   ├── app.js             # Main entry point, initialization
│   ├── ui.js              # DOM manipulation and rendering
│   ├── upload.js          # PDF upload handling
│   ├── analysis.js        # AI analysis API calls
│   ├── compare.js         # History comparison logic
│   ├── state.js           # Application state management
│   ├── demo.js            # Demo mode logic
│   └── mockData.js        # Mock resumes and responses
├── styles/                 # CSS stylesheets
│   ├── base.css           # CSS variables, resets, base styles
│   ├── layout.css         # Page layout and grid systems
│   └── components.css     # Component-specific styles
└── types/                  # TypeScript type definitions
    ├── analysis.ts        # Analysis request/response types
    └── session.ts         # Session and history types
```

## Module Organization

### Scripts Module Responsibilities

- **app.js** - Application bootstrap, event binding, form validation, orchestration
- **state.js** - In-memory state management, constants (roles, companies, majors, sample JDs)
- **ui.js** - DOM element references, rendering functions, HTML escaping
- **upload.js** - PDF file handling, text extraction via PDF.js
- **analysis.js** - AI API calls, prompt construction, response parsing
- **compare.js** - History list rendering, analysis comparison
- **demo.js** - Demo page initialization and mock analysis
- **mockData.js** - Mock resume data and analysis responses for demo mode

### CSS Architecture

- **base.css** - CSS custom properties (design tokens), global resets, typography, form elements
- **layout.css** - Page shell, grid systems, responsive breakpoints
- **components.css** - Component-specific styles (cards, buttons, tags, panels)

### Type Definitions

- **analysis.ts** - `AnalysisRequest`, `AnalysisResponse`, `WeakBullet`, `SectionFeedbackItem`
- **session.ts** - `AnalysisSessionRecord` for history tracking

## Naming Conventions

### Files
- Lowercase with hyphens for HTML: `index.html`, `demo.html`
- camelCase for JavaScript: `app.js`, `mockData.js`
- camelCase for TypeScript: `analysis.ts`, `session.ts`
- Lowercase for CSS: `base.css`, `components.css`
- UPPERCASE for documentation: `PROJECT_PLAN.md`, `DEMO_README.md`

### JavaScript
- camelCase for functions and variables: `analyzeResume`, `getFormRequest`
- PascalCase for type interfaces: `AnalysisRequest`, `WeakBullet`
- SCREAMING_SNAKE_CASE for constants: `ROLE_OPTIONS`, `COMPANY_OPTIONS`
- Prefix DOM element getters with `get`: `getDomElements()`
- Prefix render functions with `render`: `renderAnalysis()`, `renderTagList()`
- Prefix handlers with `handle`: `handlePdfUpload()`, `handleHistorySelection()`

### CSS
- BEM-style naming for components: `.panel__header`, `.summary-card--score`
- Kebab-case for custom properties: `--bg-top`, `--text-soft`, `--radius-lg`
- Utility classes with descriptive names: `.empty-state`, `.loader`, `.error-banner`

## State Management

Application state is managed in-memory via `state.js`:
- `appState.currentAnalysisId` - Currently displayed analysis
- `appState.analysisHistory` - Array of analysis records (max 8, session-only)
- No localStorage or persistence in Phase 1

## Data Flow

1. User fills form → `app.js` validates and collects data
2. `analysis.js` sends request to AI API
3. Response parsed and wrapped in `AnalysisSessionRecord`
4. Record added to `appState.analysisHistory`
5. `ui.js` renders results to DOM
6. User can select previous analyses from history

## HTML Structure Patterns

- Semantic HTML5 elements: `<main>`, `<section>`, `<article>`, `<header>`
- ARIA labels for accessibility: `aria-labelledby`, `aria-label`, `aria-hidden`
- BEM-style class naming: `.panel`, `.panel__header`, `.panel--results`
- Hidden state via `[hidden]` attribute, not CSS display
- Form elements with associated `<label>` elements

## CSS Patterns

- CSS custom properties for theming (defined in `:root`)
- Mobile-first responsive design
- Flexbox and Grid for layouts
- Transitions for interactive states
- Focus-visible for keyboard navigation
- No CSS frameworks or preprocessors
