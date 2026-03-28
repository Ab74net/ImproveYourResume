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
  SAMPLE_JOB_DESCRIPTIONS
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

function validateRequest(apiKey, request) {
  if (!apiKey) {
    return "Enter a model API key for the Stage 1 prototype.";
  }

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
  dom.targetRole.value = sample.role;
  dom.targetCompany.value = sample.company;
}

async function runAnalysis(dom) {
  clearError(dom);

  const apiKey = dom.apiKey.value.trim();
  const request = getFormRequest(dom);
  const validationMessage = validateRequest(apiKey, request);

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

function initialize() {
  const dom = getDomElements();

  populateSelect(dom.targetRole, ROLE_OPTIONS, "Choose a target role");
  populateSelect(dom.targetCompany, COMPANY_OPTIONS, "Choose a target company");
  populateSelect(dom.stemMajor, STEM_MAJOR_OPTIONS, "Choose your STEM major (optional)");
  populateSamples(dom.sampleJobDescription, SAMPLE_JOB_DESCRIPTIONS);

  dom.targetRole.value = "software-engineer";
  dom.targetCompany.value = "amazon";

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

  [dom.resumeText, dom.jobText, dom.apiKey].forEach((element) => {
    element.addEventListener("input", () => {
      if (!dom.errorMsg.hidden) {
        clearError(dom);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", initialize);
