export const ROLE_OPTIONS = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "product-manager", label: "Product Manager" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "security-engineer", label: "Security Engineer" }
];

export const COMPANY_OPTIONS = [
  { value: "amazon", label: "Amazon" },
  { value: "google", label: "Google" },
  { value: "meta", label: "Meta" },
  { value: "netflix", label: "Netflix" },
  { value: "apple", label: "Apple" },
  { value: "general-faang", label: "General FAANG Style" }
];

export const STEM_MAJOR_OPTIONS = [
  { value: "computer-science", label: "Computer Science" },
  { value: "computer-engineering", label: "Computer Engineering" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "electrical-engineering", label: "Electrical Engineering" },
  { value: "data-science", label: "Data Science" },
  { value: "information-systems", label: "Information Systems" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "other", label: "Other STEM Major" }
];

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: "amazon-swe",
    label: "Amazon SWE Intern / New Grad",
    role: "software-engineer",
    company: "amazon",
    description: `We are looking for a Software Engineer who can design, build, test, and operate scalable services.

Basic qualifications:
- Experience with Java, Python, or TypeScript
- Strong knowledge of data structures and algorithms
- Familiarity with AWS services such as Lambda, S3, DynamoDB, or API Gateway
- Ability to write maintainable code, automated tests, and clear technical documentation

Preferred qualifications:
- Demonstrated ownership of technical projects
- Ability to work across ambiguous requirements and deliver measurable results
- Experience improving reliability, performance, or deployment workflows`
  },
  {
    id: "google-qa",
    label: "Google QA / SDET",
    role: "qa-engineer",
    company: "google",
    description: `We are hiring a QA Engineer to improve product quality across web applications and backend services.

Responsibilities:
- Build automated test suites for UI and API layers
- Partner with software engineers to debug issues and prevent regressions
- Create test plans, test cases, and quality metrics dashboards

Qualifications:
- Experience with JavaScript or Python
- Experience with Selenium, Playwright, Cypress, or similar automation tools
- Understanding of CI/CD pipelines and defect tracking workflows
- Strong analytical thinking and communication skills`
  },
  {
    id: "meta-data",
    label: "Meta Data Analyst",
    role: "data-analyst",
    company: "meta",
    description: `We are looking for a Data Analyst who can turn large, ambiguous product datasets into business insights.

Requirements:
- Strong SQL and spreadsheet skills
- Experience building dashboards in Tableau, Power BI, or Looker
- Ability to define KPIs, run ad hoc analysis, and communicate findings clearly
- Experience working with product, engineering, and operations stakeholders

Preferred:
- Python or R experience
- A portfolio showing experimentation, reporting, or data storytelling`
  },
  {
    id: "apple-pm",
    label: "Apple Product Manager",
    role: "product-manager",
    company: "apple",
    description: `We are seeking a Product Manager to define product direction, align cross-functional teams, and drive execution.

Responsibilities:
- Translate customer needs into product requirements
- Prioritize roadmap decisions using data and business impact
- Work closely with engineering, design, and leadership teams

Qualifications:
- Strong communication and stakeholder management
- Experience writing product requirements, user stories, and launch plans
- Comfort with product analytics, experimentation, and KPI tracking
- Ability to balance user experience, technical constraints, and business value`
  }
];

export const appState = {
  currentAnalysisId: null,
  analysisHistory: []
};

export function createAnalysisRecord(request, response) {
  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `analysis-${Date.now()}`;

  return {
    id,
    createdAt: new Date().toISOString(),
    request,
    response
  };
}

export function addAnalysisRecord(record) {
  appState.currentAnalysisId = record.id;
  appState.analysisHistory = [record, ...appState.analysisHistory].slice(0, 8);
  return record;
}

export function setCurrentAnalysis(id) {
  appState.currentAnalysisId = id;
}

export function getAnalysisHistory() {
  return [...appState.analysisHistory];
}

export function getAnalysisById(id) {
  return appState.analysisHistory.find((record) => record.id === id) ?? null;
}
