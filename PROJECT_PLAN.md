# Resume Reviewer Project Plan

## 1. Product Goal

Build a web app that helps candidates improve their resumes for specific targets:

- Role-based targets: `SWE`, `QA`, `Data Analyst`, `Product Manager`, etc.
- Company-based targets: `Amazon`, `Google`, `Meta`, `Netflix`, `Apple`, and other FAANG-style companies
- Resume improvement goals: stronger bullets, better keyword alignment, clearer skill presentation, and practical next-step guidance

The experience should feel like:

1. Upload resume
2. Pick target role and company
3. Paste or import a job description
4. Get a structured review with match score, gaps, rewritten bullets, and action items
5. Iterate until the resume is stronger

## 2. Current Prototype Assessment

The current prototype in `uploadyourresume.html` already proves the core idea:

- PDF upload and text extraction
- Resume + job description comparison
- AI-generated score and suggestions
- Simple results UI

What should change next:

- Move API calls off the frontend
- Stop storing API keys in browser local storage
- Split the single-file app into modular HTML/CSS/JS files
- Add role/company targeting instead of only resume vs. JD matching
- Add saved iterations and side-by-side comparisons

## 3. Recommended Architecture

### Frontend

Use a simple static frontend with:

- `HTML` for layout
- `CSS` for styling and responsive design
- `JavaScript` for DOM logic and page interactions
- Minimal `TypeScript` only for shared data models and API payload types

Recommended frontend structure:

```text
/index.html
/styles/
  base.css
  layout.css
  components.css
/scripts/
  app.js
  ui.js
  upload.js
  analysis.js
  compare.js
  state.js
/types/
  analysis.ts
  session.ts
```

### Backend on AWS

Keep the backend small and hackathon-friendly:

- `S3` for resume file uploads
- `API Gateway` for frontend-to-backend requests
- `Lambda` for orchestration and prompt generation
- `Textract` for PDF text extraction when PDF parsing in-browser is weak
- `DynamoDB` for saved analyses and iteration history
- `Cognito` only if you want user accounts
- `CloudFront + S3 static hosting` for deployment

### AI Layer

Design the AI layer so the model provider can be swapped later.

Two practical paths:

- Path A: Keep using the current OpenAI-based analysis flow, but call it only from Lambda
- Path B: Move to an AWS-native LLM path later if your team wants a more AWS-centered demo

For the hackathon, the best move is:

- Use AWS for hosting, storage, extraction, and persistence
- Use a single backend analysis service with a clean prompt/template system
- Keep the response schema strict and JSON-based

## 4. Suggested Core User Flow

1. User uploads resume PDF or pastes resume text
2. User selects target role
3. User selects target company or company style
4. User pastes a job description or chooses a sample JD template
5. Backend extracts resume text and builds an analysis payload
6. AI returns:
   - overall score
   - keyword match score
   - missing skills
   - bullet rewrites
   - recommended projects/certifications
   - company-specific suggestions
7. User edits and reruns analysis
8. App stores each version so the user can compare improvements over time

## 5. Feature Backlog (15 Ideas)

1. **Role presets**
   Prebuilt evaluation modes for SWE, QA, DevOps, Data, Product, and Security.

2. **Company profile tuning**
   Tailor feedback to Amazon-style leadership language, Google-style technical depth, Meta-style impact, etc.

3. **ATS keyword coverage score**
   Show matched, missing, and weakly represented keywords.

4. **Bullet strength analyzer**
   Flag vague bullets and rewrite them with action verbs, metrics, and outcomes.

5. **Section completeness checker**
   Detect missing sections like Projects, Skills, Certifications, or Summary.

6. **Resume version history**
   Save multiple resume iterations and compare scores over time.

7. **Side-by-side diff view**
   Compare original bullet text against rewritten bullet text.

8. **Suggested projects to close gaps**
   Recommend 2-3 portfolio projects based on missing skills.

9. **FAANG readiness checklist**
   Show whether the resume demonstrates scale, ownership, metrics, testing, leadership, and system thinking.

10. **Job description parser**
    Auto-extract required skills, nice-to-haves, seniority level, and domain.

11. **Resume tailoring mode**
    Generate a targeted version of the resume for one selected job.

12. **LinkedIn/About Me generator**
    Turn the resume into a short profile summary or headline.

13. **Interview prep output**
    Generate likely interview talking points from the strongest bullets.

14. **Export recommendations**
    Download the analysis as PDF or copy to clipboard as structured notes.

15. **Confidence warnings**
    Flag suspected exaggeration risk, unclear ownership, or unsupported claims.

## 6. MVP Scope

For an MVP, focus on the smallest version that still feels complete.

### Must Have

- Resume upload
- Resume text extraction
- Job description input
- Role selector
- Company selector
- Analysis score
- Matching vs. missing keyword view
- Bullet rewrite suggestions
- Basic skill-gap guidance
- Secure backend API

### Nice to Have

- Saved sessions
- Resume version comparisons
- Export/share results
- Sample job descriptions
- Project recommendations

### Defer

- Full user auth
- Collaboration/workspace features
- Complex dashboards
- Long-term analytics

## 7. Frontend Implementation Plan

### UI Pages

Keep it to 3 pages or views:

1. **Landing / Upload**
   Upload resume, choose role/company, paste JD

2. **Analysis Results**
   Score, missing keywords, bullet rewrites, recommendations

3. **History / Compare**
   Previous runs and before/after comparison

### Component Breakdown

- `ResumeUploader`
- `RoleSelector`
- `CompanySelector`
- `JobDescriptionInput`
- `AnalysisSummaryCard`
- `KeywordGapPanel`
- `BulletRewriteList`
- `ProjectSuggestionsPanel`
- `VersionHistoryPanel`

### State Model

Use plain JS app state with minimal TS interfaces:

```ts
export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
  targetRole: string;
  targetCompany: string;
}

export interface AnalysisResponse {
  score: number;
  keywordScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  weakBullets: Array<{
    original: string;
    issue: string;
    suggestion: string;
  }>;
  companyAdvice: string[];
  projectSuggestions: string[];
}
```

## 8. Backend Implementation Plan

### API Endpoints

- `POST /upload-resume`
  Upload file or text

- `POST /analyze`
  Run resume analysis

- `GET /analysis/{id}`
  Fetch one saved result

- `GET /history/{userOrSessionId}`
  Fetch previous runs

### Lambda Responsibilities

- Validate input
- Extract PDF text if needed
- Normalize resume and JD text
- Build role/company-specific prompt
- Call AI provider
- Parse strict JSON response
- Save result to DynamoDB

### DynamoDB Tables

- `analysis_sessions`
- `analysis_results`
- Optional: `role_profiles` and `company_profiles`

## 9. Prompt Strategy

Use prompt templates rather than one giant prompt.

Recommended prompt inputs:

- resume text
- job description
- target role
- target company
- evaluation rubric

Recommended output blocks:

- score
- keyword analysis
- bullet rewrite suggestions
- section feedback
- company-specific advice
- suggested next projects

This lets you maintain separate rubrics for:

- SWE
- QA
- Data roles
- Product roles
- Company-specific expectations

## 10. Security and Reliability Notes

- Do not keep API keys in the browser
- Do not call the model directly from the frontend in production
- Validate and sanitize uploaded files
- Put file size limits on resume uploads
- Add retry/error handling for model failures
- Cache repeated analyses when the same resume/JD pair is submitted

## 11. Phased Delivery Plan

### Phase 1: Refactor Prototype

Goal: turn the current single HTML file into a cleaner frontend.

Tasks:

- Split HTML, CSS, and JS into separate files
- Add role and company selectors
- Refine result cards
- Clean up prompt generation
- Add loading, empty, and error states

### Phase 2: Add AWS Backend

Goal: make the app secure and demo-ready.

Tasks:

- Create API Gateway + Lambda endpoints
- Move AI calls to Lambda
- Add S3 upload support
- Add DynamoDB persistence
- Deploy static frontend with S3/CloudFront

### Phase 3: Add Smart Targeting

Goal: make the app feel specialized and differentiated.

Tasks:

- Add role presets
- Add company-specific rubrics
- Add keyword scoring
- Add stronger bullet rewrite rules
- Add suggested projects and certifications

### Phase 4: Add Iteration Features

Goal: help users improve across multiple resume drafts.

Tasks:

- Save previous runs
- Add comparison mode
- Show score delta between versions
- Export analysis results

### Phase 5: Polish for Demo

Goal: make the project presentation-ready.

Tasks:

- Improve design and responsiveness
- Add sample resumes and sample job descriptions
- Add one-click demo mode
- Prepare a strong demo script

## 12. Suggested Team Split

### Frontend

- Build upload flow, selectors, result views, and compare screens

### Backend

- Build Lambda APIs, storage, prompt routing, and persistence

### AI / Prompting

- Define scoring rubric, role/company templates, and output schema

### Demo / Product

- Curate sample resumes, sample JDs, and user stories for presentation

## 13. Best Hackathon Demo Story

Position the app as:

"An AI resume reviewer that does more than generic ATS scoring. It adapts your resume to the exact role and company you want, explains what is missing, rewrites weak bullets, and gives you a practical roadmap to close the gap."

## 14. Immediate Next Steps

1. Refactor the current prototype into separate files
2. Add `target role` and `target company` inputs
3. Define the analysis JSON schema for MVP
4. Move the analysis call to a backend endpoint
5. Add saved result history
6. Prepare 2-3 polished demo scenarios
