import { renderHistoryList } from "./compare.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderTagList(items, variantClass, emptyText) {
  if (!items.length) {
    return `<p class="placeholder-text">${escapeHtml(emptyText)}</p>`;
  }

  return items
    .map((item) => `<span class="tag ${variantClass}">${escapeHtml(item)}</span>`)
    .join("");
}

function renderBulletList(items) {
  if (!items.length) {
    return `<p class="placeholder-text">No weak bullets were flagged in this pass.</p>`;
  }

  return items
    .map((item) => `
      <article class="stack-item">
        <p class="stack-item__label">Original</p>
        <p class="stack-item__text">${escapeHtml(item.original)}</p>
        <p class="stack-item__label">Issue</p>
        <p class="stack-item__text">${escapeHtml(item.issue)}</p>
        <p class="stack-item__label">Suggested rewrite</p>
        <p class="stack-item__text">${escapeHtml(item.suggestion)}</p>
      </article>
    `)
    .join("");
}

function renderSectionFeedback(items) {
  if (!items.length) {
    return `<p class="placeholder-text">Section-level feedback will appear here after analysis.</p>`;
  }

  return items
    .map((item) => {
      const status = ["strong", "improve", "missing"].includes(item.status) ? item.status : "improve";

      return `
        <article class="stack-item">
          <div class="feedback-row">
            <strong>${escapeHtml(item.section)}</strong>
            <span class="feedback-status feedback-status--${status}">${escapeHtml(status)}</span>
          </div>
          <p class="stack-item__text">${escapeHtml(item.feedback)}</p>
        </article>
      `;
    })
    .join("");
}

function renderTextStack(items, emptyText) {
  if (!items.length) {
    return `<p class="placeholder-text">${escapeHtml(emptyText)}</p>`;
  }

  return items
    .map((item) => `
      <article class="stack-item">
        <p class="stack-item__text">${escapeHtml(item)}</p>
      </article>
    `)
    .join("");
}

function scoreRingClass(score) {
  if (score >= 75) {
    return "score-ring";
  }

  if (score >= 50) {
    return "score-ring score-ring--mid";
  }

  return "score-ring score-ring--low";
}

export function getDomElements() {
  return {
    apiKey: document.getElementById("apiKey"),
    targetRole: document.getElementById("targetRole"),
    targetCompany: document.getElementById("targetCompany"),
    stemMajor: document.getElementById("stemMajor"),
    sampleJobDescription: document.getElementById("sampleJobDescription"),
    loadSampleBtn: document.getElementById("loadSampleBtn"),
    uploadResumeBtn: document.getElementById("uploadResumeBtn"),
    resumeFile: document.getElementById("resumeFile"),
    uploadStatus: document.getElementById("uploadStatus"),
    resumeText: document.getElementById("resumeText"),
    jobText: document.getElementById("jobText"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    errorMsg: document.getElementById("errorMsg"),
    loader: document.getElementById("loader"),
    emptyState: document.getElementById("emptyState"),
    resultsView: document.getElementById("resultsView"),
    scoreBadge: document.getElementById("scoreBadge"),
    scoreExplanation: document.getElementById("scoreExplanation"),
    keywordScore: document.getElementById("keywordScore"),
    targetSummary: document.getElementById("targetSummary"),
    focusSummary: document.getElementById("focusSummary"),
    matchingSkills: document.getElementById("matchingSkills"),
    missingSkills: document.getElementById("missingSkills"),
    weakBullets: document.getElementById("weakBullets"),
    sectionFeedback: document.getElementById("sectionFeedback"),
    companyAdvice: document.getElementById("companyAdvice"),
    projectSuggestions: document.getElementById("projectSuggestions"),
    historyList: document.getElementById("historyList")
  };
}

export function populateSelect(selectElement, options, placeholder) {
  selectElement.innerHTML = [
    `<option value="">${escapeHtml(placeholder)}</option>`,
    ...options.map(
      (option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`
    )
  ].join("");
}

export function populateSamples(selectElement, options) {
  selectElement.innerHTML = [
    `<option value="">Choose a sample JD</option>`,
    ...options.map(
      (option) => `<option value="${escapeHtml(option.id)}">${escapeHtml(option.label)}</option>`
    )
  ].join("");
}

export function setLoading(dom, isLoading) {
  dom.loader.hidden = !isLoading;
  dom.analyzeBtn.disabled = isLoading;
  dom.analyzeBtn.textContent = isLoading ? "Analyzing..." : "Analyze resume fit";
}

export function showError(dom, message) {
  dom.errorMsg.textContent = message;
  dom.errorMsg.hidden = false;
}

export function clearError(dom) {
  dom.errorMsg.textContent = "";
  dom.errorMsg.hidden = true;
}

export function renderAnalysis(dom, record, history, onSelectHistory) {
  const { request, response } = record;

  dom.emptyState.hidden = true;
  dom.resultsView.hidden = false;

  dom.scoreBadge.className = scoreRingClass(response.score);
  dom.scoreBadge.textContent = String(response.score);
  dom.scoreExplanation.textContent = response.scoreExplanation || "The model did not provide a score explanation.";
  dom.keywordScore.textContent = `${response.keywordScore}%`;
  
  const targetText = request.stemMajorLabel
    ? `${request.targetRoleLabel} for ${request.targetCompanyLabel} (${request.stemMajorLabel})`
    : `${request.targetRoleLabel} for ${request.targetCompanyLabel}`;
  
  dom.targetSummary.textContent = targetText;
  dom.focusSummary.textContent =
    "Use this score as a presentation baseline, then iterate on metrics, keywords, and proof of impact.";

  dom.matchingSkills.innerHTML = renderTagList(
    response.matchingSkills,
    "tag--match",
    "No matched skills were detected yet."
  );

  dom.missingSkills.innerHTML = renderTagList(
    response.missingSkills,
    "tag--missing",
    "No obvious keyword gaps were detected."
  );

  dom.weakBullets.innerHTML = renderBulletList(response.weakBullets);
  dom.sectionFeedback.innerHTML = renderSectionFeedback(response.sectionFeedback);
  dom.companyAdvice.innerHTML = renderTextStack(
    response.companyAdvice,
    "Company-specific recommendations will appear here."
  );
  dom.projectSuggestions.innerHTML = renderTextStack(
    response.projectSuggestions,
    "Project suggestions will appear here when the analysis finds skill gaps."
  );

  renderHistoryList(dom.historyList, history, record.id, onSelectHistory);
}
