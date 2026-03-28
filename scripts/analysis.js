const MODEL_NAME = "gpt-4o-mini";

function clampScore(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
}

function normalizeTextList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function normalizeWeakBullets(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      original: String(item?.original ?? "").trim(),
      issue: String(item?.issue ?? "").trim(),
      suggestion: String(item?.suggestion ?? "").trim()
    }))
    .filter((item) => item.original || item.issue || item.suggestion);
}

function normalizeSectionFeedback(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      section: String(item?.section ?? "").trim(),
      status: String(item?.status ?? "improve").trim().toLowerCase(),
      feedback: String(item?.feedback ?? "").trim()
    }))
    .filter((item) => item.section || item.feedback);
}

function extractJson(content) {
  const cleaned = String(content ?? "")
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace >= 0) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

function buildPrompt(request) {
  const stemMajorSection = request.stemMajor && request.stemMajorLabel
    ? `\n\nCANDIDATE STEM MAJOR:\n${request.stemMajorLabel}\n\nConsider the candidate's educational background when evaluating technical foundation, relevant coursework alignment, and suggesting skill development paths that build on their major.`
    : '';

  return `You are an expert resume reviewer helping candidates tailor their resume to a specific role and company.

Return ONLY valid JSON. No markdown. No commentary.

Analyze the candidate's resume against the target role, target company style, and job description.

Scoring rules:
- "score" is the overall resume presentation score from 0 to 100
- "keyword_score" is the keyword alignment score from 0 to 100
- Focus on clarity, measurable impact, relevance, role alignment, and company fit
- Do not reward keyword stuffing or fabricated experience

JSON schema:
{
  "score": 0,
  "keyword_score": 0,
  "score_explanation": "2-3 sentence explanation",
  "matching_skills": ["skill"],
  "missing_skills": ["skill"],
  "weak_bullets": [
    {
      "original": "Original bullet",
      "issue": "Why this bullet is weak",
      "suggestion": "Improved version"
    }
  ],
  "section_feedback": [
    {
      "section": "Projects",
      "status": "strong | improve | missing",
      "feedback": "Short explanation"
    }
  ],
  "company_advice": ["Short company-specific recommendation"],
  "project_suggestions": ["1 practical project or next step"]
}

Constraints:
- Return up to 8 matching skills
- Return up to 8 missing skills
- Return up to 5 weak bullets
- Return up to 4 section_feedback items
- Return up to 4 company_advice items
- Return up to 3 project_suggestions items
- Suggestions should be supportive, specific, and realistic

TARGET ROLE:
${request.targetRole}

TARGET COMPANY:
${request.targetCompany}${stemMajorSection}

RESUME:
${request.resumeText}

JOB DESCRIPTION:
${request.jobDescription}`;
}

function normalizeAnalysis(raw) {
  const matchingSkills = normalizeTextList(raw?.matching_skills);
  const missingSkills = normalizeTextList(raw?.missing_skills);
  const derivedKeywordScore = matchingSkills.length + missingSkills.length > 0
    ? Math.round((matchingSkills.length / (matchingSkills.length + missingSkills.length)) * 100)
    : 0;

  return {
    score: clampScore(raw?.score),
    keywordScore: clampScore(raw?.keyword_score ?? derivedKeywordScore),
    scoreExplanation: String(raw?.score_explanation ?? "").trim(),
    matchingSkills,
    missingSkills,
    weakBullets: normalizeWeakBullets(raw?.weak_bullets),
    sectionFeedback: normalizeSectionFeedback(raw?.section_feedback),
    companyAdvice: normalizeTextList(raw?.company_advice),
    projectSuggestions: normalizeTextList(raw?.project_suggestions)
  };
}

export async function analyzeResume(apiKey, request) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildPrompt(request)
        }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Analysis failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("The model returned an empty response.");
  }

  const parsed = JSON.parse(extractJson(content));
  return normalizeAnalysis(parsed);
}
