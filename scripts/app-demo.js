// Mock resume data (Hokie Student - Before version)
const MOCK_RESUME = {
  name: "HOKIE STUDENT",
  contact: "Email: hokie.student@vt.edu | Phone: (540) 555-0123",
  sections: [
    {
      title: "EDUCATION",
      lines: [
        { text: "Virginia Tech", highlight: "green", id: "education-school" },
        { text: "Computer Science", highlight: null, id: "education-major" },
        { text: "Expected Graduation: May 2025", highlight: null, id: "education-grad" }
      ]
    },
    {
      title: "EXPERIENCE",
      lines: [
        { text: "Software Intern - Local Startup", highlight: null, id: "experience-title-1" },
        { text: "Summer 2024", highlight: null, id: "experience-date-1" },
        { text: "• Worked on website", highlight: "red", id: "experience-bullet-1", bullet: true },
        { text: "• Fixed bugs", highlight: "red", id: "experience-bullet-2", bullet: true },
        { text: "• Helped team with coding tasks", highlight: "red", id: "experience-bullet-3", bullet: true },
        { text: "• Attended meetings", highlight: "red", id: "experience-bullet-4", bullet: true },
        { text: "", highlight: null, id: "experience-spacer" },
        { text: "IT Help Desk - Virginia Tech", highlight: null, id: "experience-title-2" },
        { text: "September 2023 - Present", highlight: null, id: "experience-date-2" },
        { text: "• Answer phone calls", highlight: "red", id: "experience-bullet-5", bullet: true },
        { text: "• Help students with computer problems", highlight: "yellow", id: "experience-bullet-6", bullet: true },
        { text: "• Reset passwords", highlight: "yellow", id: "experience-bullet-7", bullet: true }
      ]
    },
    {
      title: "PROJECTS",
      lines: [
        { text: "Personal Website", highlight: null, id: "project-title-1" },
        { text: "• Made a website using HTML and CSS", highlight: "red", id: "project-bullet-1", bullet: true },
        { text: "• Added some JavaScript", highlight: "red", id: "project-bullet-2", bullet: true },
        { text: "", highlight: null, id: "project-spacer" },
        { text: "Group Project", highlight: null, id: "project-title-2" },
        { text: "• Worked with team on class project", highlight: "yellow", id: "project-bullet-3", bullet: true },
        { text: "• Used Java", highlight: "yellow", id: "project-bullet-4", bullet: true }
      ]
    },
    {
      title: "SKILLS",
      lines: [
        { text: "Java, Python, HTML, CSS, JavaScript, Microsoft Office", highlight: "yellow", id: "skills-section" }
      ]
    }
  ]
};

// Render the resume document
function renderResume() {
  const container = document.getElementById('documentContent');
  
  let html = `
    <div class="doc-header">
      <div class="doc-name">${MOCK_RESUME.name}</div>
      <div class="doc-contact doc-line" id="header-contact">${MOCK_RESUME.contact}</div>
    </div>
  `;
  
  MOCK_RESUME.sections.forEach(section => {
    html += `<div class="doc-section-title">${section.title}</div>`;
    
    section.lines.forEach(line => {
      if (line.text === '') {
        html += '<div style="height: 12px;"></div>';
        return;
      }
      
      const highlightClass = line.highlight ? `doc-line--${line.highlight}` : '';
      const bulletClass = line.bullet ? 'doc-bullet' : '';
      
      html += `<div class="doc-line ${highlightClass} ${bulletClass}" id="${line.id}">${line.text}</div>`;
    });
  });
  
  container.innerHTML = html;
}

// Animate donut chart
function animateDonut() {
  const arc = document.querySelector('.donut-arc');
  const score = 62;
  const circumference = 2 * Math.PI * 60; // radius = 60
  const fillLength = (score / 100) * circumference;
  
  setTimeout(() => {
    arc.setAttribute('stroke-dasharray', `${fillLength} ${circumference}`);
  }, 300);
}

// Handle fix item clicks
function setupFixItemClicks() {
  const fixItems = document.querySelectorAll('.fix-item');
  
  fixItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetLine = document.getElementById(targetId);
      
      if (targetLine) {
        // Scroll to the line
        targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add pulse animation
        targetLine.classList.add('pulse');
        setTimeout(() => {
          targetLine.classList.remove('pulse');
        }, 400);
      }
    });
  });
}

// Handle JD input buttons
function setupJdButtons() {
  const analyzeBtn = document.getElementById('analyzeWithJdBtn');
  const skipBtn = document.getElementById('skipJdBtn');
  const jdSection = document.getElementById('jdInputSection');
  const analysisView = document.getElementById('analysisView');
  const jobBadge = document.getElementById('jobBadge');
  const jdInput = document.getElementById('jobDescriptionInput');
  
  analyzeBtn.addEventListener('click', () => {
    const jdText = jdInput.value.trim();
    
    if (jdText) {
      // Show job badge
      jobBadge.hidden = false;
      
      // Parse job title (mock - just use first line or default)
      const firstLine = jdText.split('\n')[0];
      const jobTitle = firstLine.length > 50 ? 'Software Engineer Intern' : firstLine;
      document.getElementById('jobTitle').textContent = jobTitle;
    }
    
    // Hide JD section, show analysis
    jdSection.hidden = true;
    analysisView.hidden = false;
    
    // Render resume and animate
    renderResume();
    animateDonut();
    setupFixItemClicks();
  });
  
  skipBtn.addEventListener('click', () => {
    // Hide JD section, show analysis without job badge
    jdSection.hidden = true;
    analysisView.hidden = false;
    jobBadge.hidden = true;
    
    // Render resume and animate
    renderResume();
    animateDonut();
    setupFixItemClicks();
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupJdButtons();
});
