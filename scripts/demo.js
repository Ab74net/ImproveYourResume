import { MOCK_RESUMES, MOCK_JOB_DESCRIPTION, MOCK_ANALYSIS_BEFORE, MOCK_ANALYSIS_AFTER } from "./mockData.js";
import { ROLE_OPTIONS, COMPANY_OPTIONS, STEM_MAJOR_OPTIONS } from "./state.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function scoreRingClass(score) {
  if (score >= 75) {
    return "score-ring-large";
  }
  if (score >= 50) {
    return "score-ring-large score-ring--mid";
  }
  return "score-ring-large score-ring--low";
}

function getDomElements() {
  return {
    demoScenario: document.getElementById("demoScenario"),
    targetRole: document.getElementById("targetRole"),
    targetCompany: document.getElementById("targetCompany"),
    stemMajor: document.getElementById("stemMajor"),
    resumeText: document.getElementById("resumeText"),
    jobText: document.getElementById("jobText"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    errorMsg: document.getElementById("errorMsg"),
    loader: document.getElementById("loader"),
    emptyState: document.getElementById("emptyState"),
    resultsView: document.getElementById("resultsView"),
    scoreBadge: document.getElementById("scoreBadge"),
    scoreProgressBar: document.getElementById("scoreProgressBar"),
    keywordScore: document.getElementById("keywordScore"),
    keywordChips: document.getElementById("keywordChips"),
    changeList: document.getElementById("changeList"),
    documentView: document.getElementById("documentView")
  };
}

function populateSelect(selectElement, options, placeholder) {
  selectElement.innerHTML = [
    `<option value="">${escapeHtml(placeholder)}</option>`,
    ...options.map(
      (option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`
    )
  ].join("");
}

function setLoading(dom, isLoading) {
  dom.loader.hidden = !isLoading;
  dom.analyzeBtn.disabled = isLoading;
  dom.analyzeBtn.textContent = isLoading ? "Analyzing..." : "Run mock analysis";
}

function loadScenario(dom, scenario) {
  if (!scenario) {
    dom.resumeText.value = "";
    dom.jobText.value = "";
    dom.targetRole.value = "";
    dom.targetCompany.value = "";
    dom.stemMajor.value = "";
    dom.analyzeBtn.disabled = true;
    dom.emptyState.hidden = false;
    dom.resultsView.hidden = true;
    return;
  }

  const resumeText = scenario === "before" ? MOCK_RESUMES.before : MOCK_RESUMES.after;
  
  dom.resumeText.value = resumeText;
  dom.jobText.value = MOCK_JOB_DESCRIPTION;
  dom.targetRole.value = "software-engineer";
  dom.targetCompany.value = "apple";
  dom.stemMajor.value = "computer-science";
  dom.analyzeBtn.disabled = false;
}

function renderKeywordChips(matchingSkills, missingSkills) {
  const matched = matchingSkills.slice(0, 4).map(skill => 
    `<span class="keyword-chip keyword-chip--matched">
      <span class="keyword-chip__icon">✓</span>
      ${escapeHtml(skill)}
    </span>`
  ).join("");

  const missing = missingSkills.slice(0, 4).map(skill => 
    `<span class="keyword-chip keyword-chip--missing">
      <span class="keyword-chip__icon">✗</span>
      ${escapeHtml(skill)}
    </span>`
  ).join("");

  return matched + missing;
}

function renderChangeList(changes) {
  const severityLabels = {
    high: "High priority",
    medium: "Medium priority",
    low: "Low priority"
  };
  
  return changes.map(change => 
    `<li class="change-item" data-target="${escapeHtml(change.targetLine)}">
      <span class="change-item__severity change-item__severity--${escapeHtml(change.severity)}" 
            title="${severityLabels[change.severity] || 'Priority indicator'}"></span>
      <p class="change-item__text">${escapeHtml(change.text)}</p>
    </li>`
  ).join("");
}

function renderDocumentView(documentLines) {
  const header = documentLines.filter(line => line.type === "header-name" || line.type === "header-contact");
  const body = documentLines.filter(line => line.type !== "header-name" && line.type !== "header-contact");

  const headerHtml = `
    <div class="document-header">
      ${header.map(line => {
        if (line.type === "header-name") {
          return `<h1 class="document-header__name">${escapeHtml(line.text)}</h1>`;
        }
        const highlightClass = line.highlight ? `document-line--highlight-${line.highlight}` : "";
        return `<p class="document-header__contact document-line ${highlightClass}" data-line-id="${escapeHtml(line.id)}">${escapeHtml(line.text)}</p>`;
      }).join("")}
    </div>
  `;

  const bodyHtml = body.map(line => {
    const highlightClass = line.highlight ? `document-line--highlight-${line.highlight}` : "";
    
    if (line.type === "section-title") {
      return `<h2 class="document-section__title document-line ${highlightClass}" data-line-id="${escapeHtml(line.id)}">${escapeHtml(line.text)}</h2>`;
    }
    
    return `<p class="document-line ${highlightClass}" data-line-id="${escapeHtml(line.id)}">${escapeHtml(line.text)}</p>`;
  }).join("");

  return headerHtml + bodyHtml;
}

function attachChangeListeners(dom) {
  const changeItems = dom.changeList.querySelectorAll(".change-item");
  
  changeItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const targetLine = dom.documentView.querySelector(`[data-line-id="${targetId}"]`);
      
      if (targetLine) {
        // Scroll to the line
        targetLine.scrollIntoView({ behavior: "smooth", block: "center" });
        
        // Add pulse animation
        targetLine.classList.add("pulse");
        setTimeout(() => {
          targetLine.classList.remove("pulse");
        }, 1000);
      }
    });
  });
}

function renderAnalysis(dom, response) {
  dom.emptyState.hidden = true;
  dom.resultsView.hidden = false;

  // Render score
  dom.scoreBadge.className = scoreRingClass(response.score);
  dom.scoreBadge.textContent = String(response.score);
  dom.scoreProgressBar.style.width = `${response.score}%`;

  // Render keyword coverage
  dom.keywordScore.textContent = `${response.keywordScore}%`;
  dom.keywordChips.innerHTML = renderKeywordChips(response.matchingSkills, response.missingSkills);

  // Render suggested changes
  dom.changeList.innerHTML = renderChangeList(response.topChanges);

  // Render document view
  dom.documentView.innerHTML = renderDocumentView(response.documentLines);

  // Attach click listeners to change items
  attachChangeListeners(dom);
}

async function runMockAnalysis(dom) {
  const scenario = dom.demoScenario.value;
  
  if (!scenario) {
    return;
  }

  setLoading(dom, true);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockResponse = scenario === "before" ? MOCK_ANALYSIS_BEFORE : MOCK_ANALYSIS_AFTER;
  
  renderAnalysis(dom, mockResponse);
  setLoading(dom, false);
}

function initialize() {
  const dom = getDomElements();

  populateSelect(dom.targetRole, ROLE_OPTIONS, "Choose a target role");
  populateSelect(dom.targetCompany, COMPANY_OPTIONS, "Choose a target company");
  populateSelect(dom.stemMajor, STEM_MAJOR_OPTIONS, "Choose your STEM major");

  dom.demoScenario.addEventListener("change", () => {
    const scenario = dom.demoScenario.value;
    loadScenario(dom, scenario);
  });

  dom.analyzeBtn.addEventListener("click", () => {
    runMockAnalysis(dom);
  });
}

window.addEventListener("DOMContentLoaded", initialize);
