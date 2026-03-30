# Improve_Your_Resume

Nowadays it seems harder then ever for New Grads and Undergraduates studying Computer Science and Related Fields to Land Jobs. 

This tool is designed to help improve and tailor your resume to a job you are trying to apply to, and it will give you feedback on your current resume, and things you can do to imporve on it. 

## How to Run

1. Clone the repo
2. `cd backend`
3. Copy `.env.example` to `.env` and paste your OpenAI API key
4. `npm install`
5. `npm start`
6. Open http://localhost:3001 in your browser

That's it.

## What You Get

- Secure API key storage (never exposed to browser)
- AI-powered resume analysis using GPT-4
- Keyword matching and gap analysis
- Bullet point rewrites with metrics
- Company-specific advice
- Full improved resume generation

## Project Structure

```
/resume-app
├── /backend
│   ├── server.js          # Express server, all API routes
│   ├── prompts.js         # OpenAI prompt templates
│   ├── .env               # Your API key (git-ignored)
│   ├── .env.example       # Template
│   └── package.json
├── /frontend
│   ├── index.html         # Home page
│   ├── app.html           # Main app
│   ├── demo.html          # Demo with mock data
│   ├── /scripts           # JavaScript modules
│   └── /styles            # CSS files
└── README.md
```

## API Endpoint

**POST** `/api/resume-review`

Request:
```json
{
  "resumeText": "...",
  "targetCompany": "Google",
  "targetRole": "Software Engineer Intern",
  "jobDescription": "..." 
}
```

Response:
```json
{
  "overallScore": 62,
  "targetRole": "Software Engineer Intern",
  "targetCompany": "Google",
  "strengths": ["..."],
  "weakBullets": [...],
  "rewrittenBullets": [...],
  "missingKeywords": [...],
  "matchedKeywords": [...],
  "suggestedChanges": [...],
  "improvedResume": "..."
}
```

## Features

- ✅ Secure backend (API key never exposed)
- ✅ One command to run everything
- ✅ No build step required
- ✅ Rate limiting built-in
- ✅ Error handling
- ✅ CORS enabled

## Requirements

- Node.js 16+ 
- OpenAI API key

## Troubleshooting

**Backend not starting?**
- Check that `.env` file exists in `backend/` folder
- Verify `OPENAI_API_KEY` is set in `.env`
- Run `npm install` in `backend/` folder

**Can't connect to backend?**
- Make sure backend is running (`npm start` in `backend/` folder)
- Check console for "✓ Server: http://localhost:3001"
- Try http://localhost:3001/health to verify

**API errors?**
- Verify your OpenAI API key is valid
- Check you have billing enabled on OpenAI account
- Review backend terminal for error messages

## Security

- API key stored in `backend/.env` (git-ignored)
- Never sent to browser
- Cannot be extracted by users
- Safe for production deployment

## Cost

Typical analysis costs $0.01-0.03 using GPT-4.
Set up billing alerts on OpenAI dashboard.

## License

MIT
