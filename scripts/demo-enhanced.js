import { MOCK_RESUMES, MOCK_ANALYSIS_BEFORE } from "./mockData.js";

// Render resume document from line data
function renderResume(containerId, lines) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  lines.forEach((line) => {
    const div = document.createElement("div");
    div.id = line.id;
    div.textContent = line.text;

    // Apply type-specific classes
    if (line.type === "header-name") {
      div.className = "resume-name";
    } else if (line.type === "header-contact") {
      div.className = "resume-contact";
    } else if (line.type === "section-title") {
      div.className = "resume-section-title";
    } else if (line.text.startsWith("-")) {
      div.className = "resume-bullet";
    } else {
      div.className = "resume-line";
    }

    // Apply highlight colors
    if (line.highlight) {
      div.classList.add(`resume-line--${line.highlight}`);
    }

    container.appendChild(div);
  });
}

// Generate improved resume lines (with blue highlights for new content)
function generateImprovedResumeLines() {
  return [
    { id: "header-name-after", text: "HOKIE STUDENT", type: "header-name" },
    { 
      id: "header-contact-after", 
      text: "Email: hokie.student@vt.edu | Phone: (540) 555-0123 | LinkedIn: linkedin.com/in/hokiestudent | GitHub: github.com/hokiestudent", 
      type: "header-contact", 
      highlight: "blue" 
    },
    { id: "education-section-after", text: "EDUCATION", type: "section-title" },
    { id: "education-school-after", text: "Virginia Tech, Blacksburg, VA", type: "text", highlight: "blue" },
    { 
      id: "education-degree-after", 
      text: "Bachelor of Science in Computer Science, GPA: 3.7/4.0", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "education-grad-after", text: "Expected Graduation: May 2025", type: "text" },
    { 
      id: "education-coursework-after", 
      text: "Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Operating Systems", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "skills-section-after", text: "TECHNICAL SKILLS", type: "section-title", highlight: "blue" },
    { 
      id: "skills-languages-after", 
      text: "Languages: Java, Python, JavaScript, TypeScript, SQL, Swift", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "skills-frameworks-after", 
      text: "Frameworks & Tools: React, Node.js, Express, Git, Docker, AWS (S3, Lambda), Xcode, SwiftUI", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "skills-databases-after", 
      text: "Databases: PostgreSQL, MongoDB, MySQL", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "experience-section-after", text: "EXPERIENCE", type: "section-title" },
    { 
      id: "experience-title-1-after", 
      text: "Software Engineering Intern - TechStart Solutions, Roanoke, VA", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "experience-date-1-after", text: "May 2024 - August 2024", type: "text" },
    { 
      id: "experience-bullet-1-after", 
      text: "- Developed and deployed 3 full-stack web features using React and Node.js, improving user engagement by 25%", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-2-after", 
      text: "- Reduced application load time by 40% through code optimization and implementing lazy loading strategies", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-3-after", 
      text: "- Collaborated with cross-functional team of 5 engineers using Agile methodology, participating in daily standups and sprint planning", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-4-after", 
      text: "- Wrote 50+ unit tests achieving 85% code coverage, reducing production bugs by 30%", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-title-2-after", 
      text: "IT Support Specialist - Virginia Tech IT Services, Blacksburg, VA", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "experience-date-2-after", text: "September 2023 - Present", type: "text" },
    { 
      id: "experience-bullet-5-after", 
      text: "- Resolve 20+ technical support tickets daily with 95% customer satisfaction rating", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-6-after", 
      text: "- Automated password reset workflow using Python scripts, reducing average resolution time from 15 to 3 minutes", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-7-after", 
      text: "- Created documentation and training materials for common issues, decreasing repeat tickets by 20%", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "experience-bullet-8-after", 
      text: "- Mentor 3 new team members on support protocols and troubleshooting techniques", 
      type: "text", 
      highlight: "blue" 
    },
    { id: "projects-section-after", text: "PROJECTS", type: "section-title" },
    { 
      id: "project-title-1-after", 
      text: "iOS Expense Tracker App | Swift, SwiftUI, Core Data, CloudKit", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-1-after", 
      text: "- Built native iOS application with 1,000+ downloads enabling users to track expenses and visualize spending patterns", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-2-after", 
      text: "- Implemented iCloud sync using CloudKit, allowing seamless data synchronization across devices", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-3-after", 
      text: "- Designed intuitive UI/UX following Apple Human Interface Guidelines with 4.5-star App Store rating", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-4-after", 
      text: "- Integrated Chart framework for interactive data visualizations and spending analytics", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-title-2-after", 
      text: "Full-Stack Task Management Platform | React, TypeScript, Node.js, PostgreSQL, AWS", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-5-after", 
      text: "- Architected and deployed RESTful API serving 500+ requests/day with 99.9% uptime", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-6-after", 
      text: "- Implemented JWT authentication and role-based access control for secure multi-user environment", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-7-after", 
      text: "- Deployed on AWS using EC2, RDS, and S3 with automated CI/CD pipeline via GitHub Actions", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "project-bullet-8-after", 
      text: "- Optimized database queries reducing average response time from 800ms to 120ms", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "leadership-section-after", 
      text: "LEADERSHIP & ACTIVITIES", 
      type: "section-title", 
      highlight: "blue" 
    },
    { 
      id: "leadership-1-after", 
      text: "Vice President, VT Computer Science Club - Organized 10+ technical workshops and hackathons with 200+ participants", 
      type: "text", 
      highlight: "blue" 
    },
    { 
      id: "leadership-2-after", 
      text: "Volunteer Coding Instructor - Taught Python fundamentals to 30+ high school students through VT outreach program", 
      type: "text", 
      highlight: "blue" 
    }
  ];
}

// Animate score arc on page load
function animateScore() {
  const scoreArc = document.querySelector(".score-arc");
  const score = 62;
  const circumference = 2 * Math.PI * 52; // radius = 52
  const dashArray = (score / 100) * circumference;

  if (scoreArc) {
    setTimeout(() => {
      scoreArc.style.strokeDasharray = `${dashArray} ${circumference}`;
    }, 300);
  }
}

// Setup click handlers for issue items to scroll to resume lines
function setupIssueClicks() {
  const issueItems = document.querySelectorAll(".issue-item");

  issueItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      if (!targetId) return;

      // Find matching line in original resume
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Scroll to element
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add pulse animation
        targetElement.classList.add("pulse");
        setTimeout(() => {
          targetElement.classList.remove("pulse");
        }, 400);
      }
    });
  });
}

// Initialize demo page
function initialize() {
  // Render both resumes
  renderResume("originalResume", MOCK_ANALYSIS_BEFORE.documentLines);
  renderResume("improvedResume", generateImprovedResumeLines());

  // Animate score
  animateScore();

  // Setup issue click handlers
  setupIssueClicks();
}

// Run on page load
window.addEventListener("DOMContentLoaded", initialize);
