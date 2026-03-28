import { analyzeResume } from "./analysis.js";
import {
  addAnalysisRecord,
  createAnalysisRecord,
  getAnalysisById,
  getAnalysisHistory,
  setCurrentAnalysis,
  ROLE_OPTIONS,
  COMPANY_OPTIONS,
  STEM_MAJOR_OPTIONS,
  SAMPLE_JOB_DESCRIPTIONS,
  GENERIC_JOB_DESCRIPTION
} from "./state.js";
import {
  getDomElements,
  populateSamples,
  populateSelect,
  setLoading,
  showError,
  clearError,
  renderAnalysis
} from "./ui.js";
import { handlePdfUpload } from "./upload.js";
import { config } from "./config.js";

function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function getFormRequest(dom) {
  const targetRole = dom.targetRole.value.trim();
  const targetCompany = dom.targetCompany.value.trim();
  const stemMajor = dom.stemMajor.value.trim();

  return {
    resumeText: dom.resumeText.value.trim(),
    jobDescription: dom.jobText.value.trim(),
    targetRole,
    targetCompany,
    stemMajor,
    targetRoleLabel: getOptionLabel(ROLE_OPTIONS, targetRole),
    targetCompanyLabel: getOptionLabel(COMPANY_OPTIONS, targetCompany),
    stemMajorLabel: stemMajor ? getOptionLabel(STEM_MAJOR_OPTIONS, stemMajor) : undefined
  };
}

function validateRequest(request) {
  if (!request.resumeText) {
    return "Add resume text or upload a PDF before running analysis.";
  }

  if (!request.jobDescription) {
    return "Paste a job description or load one of the sample prompts.";
  }

  if (!request.targetRole) {
    return "Choose a target role so the review has a clear rubric.";
  }

  if (!request.targetCompany) {
    return "Choose a target company or style before analyzing.";
  }

  return "";
}

function loadSampleJobDescription(dom) {
  const sampleId = dom.sampleJobDescription.value;
  const sample = SAMPLE_JOB_DESCRIPTIONS.find((item) => item.id === sampleId);

  if (!sample) {
    showError(dom, "Choose a sample job description first.");
    return;
  }

  clearError(dom);
  dom.jobText.value = sample.description;
  
  // Set text input values directly (no longer using select dropdowns)
  const roleOption = ROLE_OPTIONS.find(r => r.value === sample.role);
  const companyOption = COMPANY_OPTIONS.find(c => c.value === sample.company);
  
  if (roleOption) {
    dom.targetRole.value = roleOption.label;
  }
  if (companyOption) {
    dom.targetCompany.value = companyOption.label;
  }
}

async function runAnalysis(dom) {
  clearError(dom);

  // Get API key from config
  const apiKey = config.getApiKey();
  
  if (!apiKey) {
    showError(dom, "API key not configured. Please check scripts/config.js and add your API key.");
    return;
  }

  const request = getFormRequest(dom);
  const validationMessage = validateRequest(request);

  if (validationMessage) {
    showError(dom, validationMessage);
    return;
  }

  setLoading(dom, true);

  try {
    const response = await analyzeResume(apiKey, request);
    const record = addAnalysisRecord(createAnalysisRecord(request, response));
    renderAnalysis(dom, record, getAnalysisHistory(), handleHistorySelection.bind(null, dom));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showError(dom, `Something went wrong: ${message}`);
  } finally {
    setLoading(dom, false);
  }
}

function handleHistorySelection(dom, analysisId) {
  const record = getAnalysisById(analysisId);

  if (!record) {
    return;
  }

  setCurrentAnalysis(record.id);
  renderAnalysis(dom, record, getAnalysisHistory(), handleHistorySelection.bind(null, dom));
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });
}

function initialize() {
  const dom = getDomElements();

  // No longer populate role and company as select dropdowns - they're now text inputs with datalists
  populateSelect(dom.stemMajor, STEM_MAJOR_OPTIONS, "Choose your STEM major (optional)");
  populateSamples(dom.sampleJobDescription, SAMPLE_JOB_DESCRIPTIONS);

  // Set default values for text inputs
  dom.targetRole.value = "Software Engineer";
  dom.targetCompany.value = "Amazon";

  dom.uploadResumeBtn.addEventListener("click", () => {
    dom.resumeFile.click();
  });

  dom.resumeFile.addEventListener("change", (event) => {
    handlePdfUpload(event, dom);
  });

  dom.loadSampleBtn.addEventListener("click", () => {
    loadSampleJobDescription(dom);
  });

  dom.analyzeBtn.addEventListener("click", () => {
    runAnalysis(dom);
  });

  // Add handler for "Use Generic Sample" button
  const useGenericJdBtn = document.getElementById("useGenericJdBtn");
  if (useGenericJdBtn) {
    useGenericJdBtn.addEventListener("click", () => {
      dom.jobText.value = GENERIC_JOB_DESCRIPTION;
      clearError(dom);
    });
  }

  [dom.resumeText, dom.jobText].forEach((element) => {
    element.addEventListener("input", () => {
      if (!dom.errorMsg.hidden) {
        clearError(dom);
      }
    });
  });

  setupScrollReveal();
}

window.addEventListener("DOMContentLoaded", initialize);
