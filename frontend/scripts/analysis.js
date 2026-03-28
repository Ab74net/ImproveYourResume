import { config } from './config.js';

/**
 * Analyze resume using secure backend API
 * The API key is stored on the server and never sent to the browser
 */
export async function analyzeResume(apiKey, request) {
  // Note: apiKey parameter is kept for backward compatibility but not used
  // The backend handles authentication with the API key
  
  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        resumeText: request.resumeText,
        jobDescription: request.jobDescription || 'generic',
        targetRole: request.targetRoleLabel || request.targetRole,
        targetCompany: request.targetCompanyLabel || request.targetCompany
      })
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      }
      
      throw new Error(errorBody?.error || `Analysis failed with status ${response.status}.`);
    }

    const analysis = await response.json();
    
    if (!analysis) {
      throw new Error("The backend returned an empty response.");
    }

    // Transform backend response to match frontend expectations
    return {
      score: analysis.overallScore || 0,
      keywordScore: calculateKeywordScore(analysis.matchedKeywords, analysis.missingKeywords),
      scoreExplanation: analysis.strengths?.join(' ') || '',
      matchingSkills: analysis.matchedKeywords || [],
      missingSkills: analysis.missingKeywords || [],
      weakBullets: transformWeakBullets(analysis.weakBullets, analysis.rewrittenBullets),
      sectionFeedback: transformSuggestedChanges(analysis.suggestedChanges),
      companyAdvice: analysis.strengths || [],
      projectSuggestions: extractProjectSuggestions(analysis.suggestedChanges),
      improvedResume: analysis.improvedResume || ''
    };
    
  } catch (error) {
    // Check if backend is not running
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      throw new Error(
        'Cannot connect to backend server. Please ensure the backend is running:\n' +
        '1. cd backend\n' +
        '2. npm install\n' +
        '3. npm start'
      );
    }
    
    throw error;
  }
}

function calculateKeywordScore(matched, missing) {
  const matchedCount = matched?.length || 0;
  const missingCount = missing?.length || 0;
  const total = matchedCount + missingCount;
  
  if (total === 0) return 0;
  
  return Math.round((matchedCount / total) * 100);
}

function transformWeakBullets(weakBullets, rewrittenBullets) {
  if (!weakBullets || !Array.isArray(weakBullets)) return [];
  
  return weakBullets.map(weak => {
    const rewritten = rewrittenBullets?.find(r => r.original === weak.original);
    
    return {
      original: weak.original || '',
      issue: weak.reason || '',
      suggestion: rewritten?.rewritten || 'Consider adding metrics and specific outcomes.'
    };
  });
}

function transformSuggestedChanges(suggestedChanges) {
  if (!suggestedChanges || !Array.isArray(suggestedChanges)) return [];
  
  return suggestedChanges.map(change => ({
    section: change.title || 'General',
    status: change.severity === 'red' ? 'missing' : 'improve',
    feedback: change.description || ''
  }));
}

function extractProjectSuggestions(suggestedChanges) {
  if (!suggestedChanges || !Array.isArray(suggestedChanges)) return [];
  
  return suggestedChanges
    .filter(change => 
      change.title?.toLowerCase().includes('project') ||
      change.description?.toLowerCase().includes('project') ||
      change.title?.toLowerCase().includes('github')
    )
    .map(change => change.description || change.title)
    .slice(0, 3);
}
