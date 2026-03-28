import { analyzeResume } from "./analysis.js";
import { handlePdfUpload } from "./upload.js";
import { GENERIC_JOB_DESCRIPTION } from "./state.js";

// Get DOM elements
function getDomElements() {
  return {
    // Form elements
    targetRole: document.getElementById("targetRole"),
    targetCompany: document.getElementById("targetCompany"),
    resumeText: document.getElementById("resumeText"),
    jobText: document.getElementById("jobText"),
    uploadResumeBtn: document.getElementById("uploadResumeBtn"),
    resumeFile: document.getElementById("resumeFile"),
    uploadStatus: document.getElementById("uploadStatus"),
    useGenericJdBtn: document.getElementById("useGenericJdBtn"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    errorMsg: document.getElementById("errorMsg"),
    loader: document.getElementById("loader"),
    
    // Container elements
    inputContainer: document.getElementById("inputContainer"),
    resultsContainer: document.getElementById("resultsContainer"),
    
    // Results elements
    analysisTarget: document.getElementById("analysisTarget"),
    scoreNumber: document.getElementById("scoreNumber"),
    scoreArc: document.getElementById("scoreArc"),
    scoreSubscores: document.getElementById("scoreSubscores"),
    matchedLabel: document.getElementById("matchedLabel"),
    matchedKeywords: document.getElementById("matchedKeywords"),
    missingLabel: document.getElementById("missingLabel"),
    missingKeywords: document.getElementById("missingKeywords"),
    keywordProgress: document.getElementById("keywordProgress"),
    issueList: document.getElementById("issueList"),
    originalScore: document.getElementById("originalScore"),
    originalResume: document.getElementById("originalResume"),
    improvedResume: document.getElementById("improvedResume"),
    newAnalysisBtn: document.getElementById("newAnalysisBtn"),
    downloadPdfBtn: document.getElementById("downloadPdfBtn")
  };
}

// Validation
function validateRequest(request) {
  if (!request.resumeText) {
    return "Add resume text or upload a PDF before running analysis.";
  }

  if (!request.targetRole) {
    return "Enter a target role.";
  }

  if (!request.targetCompany) {
    return "Enter a target company.";
  }

  return "";
}

// Show/hide loading state
function setLoading(dom, isLoading) {
  dom.loader.hidden = !isLoading;
  dom.analyzeBtn.disabled = isLoading;
  dom.analyzeBtn.textContent = isLoading ? "Analyzing..." : "ANALYZE RESUME FIT";
}

// Show error
function showError(dom, message) {
  dom.errorMsg.textContent = message;
  dom.errorMsg.hidden = false;
}

// Clear error
function clearError(dom) {
  dom.errorMsg.textContent = "";
  dom.errorMsg.hidden = true;
}

// Animate score arc
function animateScore(score) {
  const scoreArc = document.getElementById("scoreArc");
  const circumference = 2 * Math.PI * 52; // radius = 52
  const dashArray = (score / 100) * circumference;

  if (scoreArc) {
    setTimeout(() => {
      scoreArc.style.strokeDasharray = `${dashArray} ${circumference}`;
    }, 300);
  }
}

// Highlight weak bullets in original resume
function highlightWeakBullets(resumeText, weakBullets) {
  if (!weakBullets || weakBullets.length === 0) {
    return resumeText;
  }

  let highlightedText = resumeText;
  
  weakBullets.forEach((bullet, index) => {
    const original = bullet.original;
    if (original && highlightedText.includes(original)) {
      const severity = bullet.severity || (index < 2 ? 'red' : 'yellow');
      const highlighted = `<span class="resume-line resume-line--${severity}" data-issue="${index}">${original}</span>`;
      highlightedText = highlightedText.replace(original, highlighted);
    }
  });

  return highlightedText;
}

// Format resume text with proper styling
function formatResumeText(text, isImproved = false) {
  const lines = text.split('\n');
  let formatted = '';
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      formatted += '<br>';
      return;
    }
    
    // Name (first non-empty line, all caps or title case)
    if (index === 0 || (index < 3 && trimmed.length < 50 && /^[A-Z\s]+$/.test(trimmed))) {
      formatted += `<div class="resume-name">${trimmed}</div>`;
    }
    // Contact info (email, phone, links)
    else if (trimmed.includes('@') || trimmed.includes('http') || trimmed.match(/\(\d{3}\)/)) {
      formatted += `<div class="resume-contact">${trimmed}</div>`;
    }
    // Section headers (all caps, short)
    else if (trimmed.length < 30 && /^[A-Z\s&]+$/.test(trimmed)) {
      formatted += `<div class="resume-section-title">${trimmed}</div>`;
    }
    // Bullets
    else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      const bulletText = trimmed.substring(1).trim();
      const className = isImproved ? 'resume-line resume-line--blue' : 'resume-line';
      formatted += `<div class="${className} resume-bullet">${bulletText}</div>`;
    }
    // Regular lines
    else {
      const className = isImproved && index > 5 ? 'resume-line resume-line--blue' : 'resume-line';
      formatted += `<div class="${className}">${trimmed}</div>`;
    }
  });
  
  return formatted;
}

// Render results
function renderResults(dom, analysis, request) {
  // Hide input, show results
  dom.inputContainer.hidden = true;
  dom.resultsContainer.hidden = false;

  // Set target
  dom.analysisTarget.innerHTML = `Analysis: <strong>${request.targetRole} at ${request.targetCompany}</strong>`;

  // Set score
  dom.scoreNumber.textContent = analysis.overallScore || 0;
  dom.originalScore.textContent = `Score: ${analysis.overallScore || 0}/100`;
  animateScore(analysis.overallScore || 0);

  // Set subscores (using strengths as proxy)
  const strengths = analysis.strengths || [];
  dom.scoreSubscores.innerHTML = strengths.slice(0, 3).map(s => 
    `<span class="subscore subscore--green">${s}</span>`
  ).join('');

  // Keywords
  const matched = analysis.matchedKeywords || [];
  const missing = analysis.missingKeywords || [];
  const total = matched.length + missing.length;
  const percentage = total > 0 ? Math.round((matched.length / total) * 100) : 0;

  dom.matchedLabel.textContent = `MATCHED (${matched.length}/${total})`;
  dom.matchedKeywords.innerHTML = matched.map(k => 
    `<span class="chip chip--matched">${k}</span>`
  ).join('');

  dom.missingLabel.textContent = `MISSING (${missing.length}/${total})`;
  dom.missingKeywords.innerHTML = missing.map(k => 
    `<span class="chip chip--missing">${k}</span>`
  ).join('');

  dom.keywordProgress.style.width = `${percentage}%`;

  // Issues
  const issues = analysis.suggestedChanges || [];
  dom.issueList.innerHTML = issues.slice(0, 5).map((issue, index) => {
    const severity = issue.severity || 'yellow';
    return `
      <div class="issue-item issue-item--${severity}">
        <span class="issue-number">${index + 1}</span>
        <div class="issue-content">
          <div class="issue-title">${issue.title || 'Improvement needed'}</div>
          <p class="issue-text">${issue.description || ''}</p>
        </div>
      </div>
    `;
  }).join('');

  // Original resume with highlights
  const highlightedOriginal = highlightWeakBullets(request.resumeText, analysis.weakBullets);
  dom.originalResume.innerHTML = formatResumeText(highlightedOriginal, false);

  // Improved resume
  dom.improvedResume.innerHTML = formatResumeText(analysis.improvedResume || request.resumeText, true);

  // Store for PDF download
  window.currentAnalysis = {
    improvedResume: analysis.improvedResume || request.resumeText,
    targetRole: request.targetRole,
    targetCompany: request.targetCompany
  };
}

// Download PDF
function downloadPdf() {
  if (!window.currentAnalysis) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const { improvedResume, targetRole, targetCompany } = window.currentAnalysis;

  // Add title
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Improved Resume', 20, 20);

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Optimized for: ${targetRole} at ${targetCompany}`, 20, 28);

  // Add resume content
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(improvedResume, 170);
  doc.text(lines, 20, 40);

  // Save
  const filename = `resume_improved_${Date.now()}.pdf`;
  doc.save(filename);
}

// Run analysis
async function runAnalysis(dom) {
  clearError(dom);

  const request = {
    resumeText: dom.resumeText.value.trim(),
    targetRole: dom.targetRole.value.trim(),
    targetCompany: dom.targetCompany.value.trim(),
    jobDescription: dom.jobText.value.trim() || 'generic'
  };

  const validationMessage = validateRequest(request);
  if (validationMessage) {
    showError(dom, validationMessage);
    return;
  }

  setLoading(dom, true);

  try {
    const analysis = await analyzeResume(null, request);
    renderResults(dom, analysis, request);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showError(dom, `Something went wrong: ${message}`);
  } finally {
    setLoading(dom, false);
  }
}

// Initialize
function initialize() {
  const dom = getDomElements();

  // Set defaults
  dom.targetRole.value = "Software Engineer Intern";
  dom.targetCompany.value = "Google";

  // Upload PDF
  dom.uploadResumeBtn.addEventListener("click", () => {
    dom.resumeFile.click();
  });

  dom.resumeFile.addEventListener("change", (event) => {
    handlePdfUpload(event, dom);
  });

  // Use generic JD
  dom.useGenericJdBtn.addEventListener("click", () => {
    dom.jobText.value = GENERIC_JOB_DESCRIPTION;
    clearError(dom);
  });

  // Analyze
  dom.analyzeBtn.addEventListener("click", () => {
    runAnalysis(dom);
  });

  // New analysis
  dom.newAnalysisBtn.addEventListener("click", () => {
    dom.inputContainer.hidden = false;
    dom.resultsContainer.hidden = true;
    clearError(dom);
  });

  // Download PDF
  dom.downloadPdfBtn.addEventListener("click", () => {
    downloadPdf();
  });

  // Clear errors on input
  [dom.resumeText, dom.jobText, dom.targetRole, dom.targetCompany].forEach((element) => {
    element.addEventListener("input", () => {
      if (!dom.errorMsg.hidden) {
        clearError(dom);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", initialize);
