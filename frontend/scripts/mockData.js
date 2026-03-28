export const MOCK_RESUMES = {
  before: `HOKIE STUDENT
Email: hokie.student@vt.edu | Phone: (540) 555-0123

EDUCATION
Virginia Tech
Computer Science
Expected Graduation: May 2025

EXPERIENCE

Software Intern - Local Startup
Summer 2024
- Worked on website
- Fixed bugs
- Helped team with coding tasks
- Attended meetings

IT Help Desk - Virginia Tech
September 2023 - Present
- Answer phone calls
- Help students with computer problems
- Reset passwords

PROJECTS

Personal Website
- Made a website using HTML and CSS
- Added some JavaScript

Group Project
- Worked with team on class project
- Used Java

SKILLS
Java, Python, HTML, CSS, JavaScript, Microsoft Office`,

  after: `HOKIE STUDENT
Email: hokie.student@vt.edu | Phone: (540) 555-0123 | LinkedIn: linkedin.com/in/hokiestudent | GitHub: github.com/hokiestudent

EDUCATION
Virginia Tech, Blacksburg, VA
Bachelor of Science in Computer Science, GPA: 3.7/4.0
Expected Graduation: May 2025
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Operating Systems

TECHNICAL SKILLS
Languages: Java, Python, JavaScript, TypeScript, SQL, Swift
Frameworks & Tools: React, Node.js, Express, Git, Docker, AWS (S3, Lambda), Xcode, SwiftUI
Databases: PostgreSQL, MongoDB, MySQL

EXPERIENCE

Software Engineering Intern - TechStart Solutions, Roanoke, VA
May 2024 - August 2024
- Developed and deployed 3 full-stack web features using React and Node.js, improving user engagement by 25%
- Reduced application load time by 40% through code optimization and implementing lazy loading strategies
- Collaborated with cross-functional team of 5 engineers using Agile methodology, participating in daily standups and sprint planning
- Wrote 50+ unit tests achieving 85% code coverage, reducing production bugs by 30%

IT Support Specialist - Virginia Tech IT Services, Blacksburg, VA
September 2023 - Present
- Resolve 20+ technical support tickets daily with 95% customer satisfaction rating
- Automated password reset workflow using Python scripts, reducing average resolution time from 15 to 3 minutes
- Created documentation and training materials for common issues, decreasing repeat tickets by 20%
- Mentor 3 new team members on support protocols and troubleshooting techniques

PROJECTS

iOS Expense Tracker App | Swift, SwiftUI, Core Data, CloudKit
- Built native iOS application with 1,000+ downloads enabling users to track expenses and visualize spending patterns
- Implemented iCloud sync using CloudKit, allowing seamless data synchronization across devices
- Designed intuitive UI/UX following Apple Human Interface Guidelines with 4.5-star App Store rating
- Integrated Chart framework for interactive data visualizations and spending analytics

Full-Stack Task Management Platform | React, TypeScript, Node.js, PostgreSQL, AWS
- Architected and deployed RESTful API serving 500+ requests/day with 99.9% uptime
- Implemented JWT authentication and role-based access control for secure multi-user environment
- Deployed on AWS using EC2, RDS, and S3 with automated CI/CD pipeline via GitHub Actions
- Optimized database queries reducing average response time from 800ms to 120ms

LEADERSHIP & ACTIVITIES
Vice President, VT Computer Science Club - Organized 10+ technical workshops and hackathons with 200+ participants
Volunteer Coding Instructor - Taught Python fundamentals to 30+ high school students through VT outreach program`
};

export const MOCK_JOB_DESCRIPTION = `Apple - Software Engineer, iOS Platform

We are seeking a Software Engineer to join our iOS Platform team and help build the next generation of features for millions of users worldwide.

Key Qualifications:
- Strong foundation in Computer Science fundamentals including data structures, algorithms, and software design
- Proficiency in Swift and experience with iOS development frameworks (UIKit, SwiftUI)
- Experience building scalable, maintainable applications with clean architecture
- Understanding of RESTful APIs and backend integration
- Familiarity with version control systems (Git) and collaborative development workflows
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities

Preferred Qualifications:
- Experience with Core Data, CloudKit, or other persistence frameworks
- Knowledge of iOS performance optimization and memory management
- Contributions to open source projects or published apps on the App Store
- Understanding of accessibility and inclusive design principles
- Experience with unit testing and test-driven development
- Passion for creating exceptional user experiences

Education:
- BS in Computer Science, Computer Engineering, or equivalent experience

At Apple, we believe in innovation, excellence, and creating products that enrich people's lives. Join us in building technology that makes a difference.`;

export const MOCK_ANALYSIS_BEFORE = {
  score: 42,
  keywordScore: 35,
  scoreExplanation: "The resume shows basic technical experience but lacks measurable impact, specific technical depth, and clear demonstration of skills relevant to iOS development. Bullets are vague and don't showcase the scope or outcomes of work.",
  matchingSkills: [
    "Java",
    "Python",
    "JavaScript",
    "HTML/CSS",
    "Team collaboration"
  ],
  missingSkills: [
    "Swift",
    "iOS development",
    "SwiftUI/UIKit",
    "RESTful APIs",
    "Git version control",
    "Unit testing",
    "System design",
    "Performance optimization"
  ],
  topChanges: [
    {
      id: "change-1",
      severity: "high",
      text: "Add measurable impact to 'Worked on website' - specify technologies, features built, and quantifiable results",
      targetLine: "experience-bullet-1"
    },
    {
      id: "change-2",
      severity: "high",
      text: "Replace 'Fixed bugs' with specific quantity and impact metrics",
      targetLine: "experience-bullet-2"
    },
    {
      id: "change-3",
      severity: "high",
      text: "Build an iOS project using Swift/SwiftUI to demonstrate platform expertise",
      targetLine: "projects-section"
    },
    {
      id: "change-4",
      severity: "medium",
      text: "Add technical skills section with frameworks and tools (Git, React, Node.js, etc.)",
      targetLine: "skills-section"
    },
    {
      id: "change-5",
      severity: "medium",
      text: "Include GPA, relevant coursework, and leadership activities in education section",
      targetLine: "education-section"
    }
  ],
  documentLines: [
    { id: "header-name", text: "HOKIE STUDENT", type: "header-name" },
    { id: "header-contact", text: "Email: hokie.student@vt.edu | Phone: (540) 555-0123", type: "header-contact", highlight: "yellow" },
    { id: "education-section", text: "EDUCATION", type: "section-title", highlight: "yellow" },
    { id: "education-school", text: "Virginia Tech", type: "text" },
    { id: "education-major", text: "Computer Science", type: "text" },
    { id: "education-grad", text: "Expected Graduation: May 2025", type: "text" },
    { id: "experience-section", text: "EXPERIENCE", type: "section-title" },
    { id: "experience-title-1", text: "Software Intern - Local Startup", type: "text" },
    { id: "experience-date-1", text: "Summer 2024", type: "text" },
    { id: "experience-bullet-1", text: "- Worked on website", type: "text", highlight: "red" },
    { id: "experience-bullet-2", text: "- Fixed bugs", type: "text", highlight: "red" },
    { id: "experience-bullet-3", text: "- Helped team with coding tasks", type: "text", highlight: "red" },
    { id: "experience-bullet-4", text: "- Attended meetings", type: "text", highlight: "red" },
    { id: "experience-title-2", text: "IT Help Desk - Virginia Tech", type: "text" },
    { id: "experience-date-2", text: "September 2023 - Present", type: "text" },
    { id: "experience-bullet-5", text: "- Answer phone calls", type: "text", highlight: "red" },
    { id: "experience-bullet-6", text: "- Help students with computer problems", type: "text", highlight: "yellow" },
    { id: "experience-bullet-7", text: "- Reset passwords", type: "text", highlight: "yellow" },
    { id: "projects-section", text: "PROJECTS", type: "section-title", highlight: "red" },
    { id: "project-title-1", text: "Personal Website", type: "text" },
    { id: "project-bullet-1", text: "- Made a website using HTML and CSS", type: "text", highlight: "red" },
    { id: "project-bullet-2", text: "- Added some JavaScript", type: "text", highlight: "red" },
    { id: "project-title-2", text: "Group Project", type: "text" },
    { id: "project-bullet-3", text: "- Worked with team on class project", type: "text", highlight: "yellow" },
    { id: "project-bullet-4", text: "- Used Java", type: "text", highlight: "yellow" },
    { id: "skills-section", text: "SKILLS", type: "section-title", highlight: "yellow" },
    { id: "skills-list", text: "Java, Python, HTML, CSS, JavaScript, Microsoft Office", type: "text", highlight: "yellow" }
  ],
  weakBullets: [
    {
      original: "Worked on website",
      issue: "Too vague - doesn't specify what you built, technologies used, or impact achieved",
      suggestion: "Developed 3 responsive web features using React and Node.js, improving user engagement by 25% and reducing page load time by 40%"
    },
    {
      original: "Fixed bugs",
      issue: "Lacks context about complexity, quantity, or impact of bug fixes",
      suggestion: "Identified and resolved 20+ critical bugs in production codebase, reducing customer-reported issues by 30% through systematic debugging and root cause analysis"
    },
    {
      original: "Helped team with coding tasks",
      issue: "Unclear what specific contributions you made or how you added value",
      suggestion: "Collaborated with 5-person engineering team using Agile methodology, contributing to 3 sprint releases and participating in code reviews to maintain 85% test coverage"
    },
    {
      original: "Made a website using HTML and CSS",
      issue: "Doesn't demonstrate complexity, purpose, or any measurable outcome",
      suggestion: "Built responsive portfolio website with modern CSS Grid and Flexbox, achieving 95+ Lighthouse performance score and mobile-first design"
    },
    {
      original: "Answer phone calls",
      issue: "Describes task rather than impact or efficiency improvements",
      suggestion: "Resolve 20+ technical support tickets daily with 95% customer satisfaction rating, documenting solutions to reduce repeat issues by 20%"
    }
  ],
  sectionFeedback: [
    {
      section: "Technical Skills",
      status: "improve",
      feedback: "List is too generic. Add frameworks, tools, and iOS-specific technologies. Organize by category (Languages, Frameworks, Tools) for better readability."
    },
    {
      section: "Projects",
      status: "missing",
      feedback: "Projects lack technical depth and measurable outcomes. Add an iOS project using Swift to demonstrate platform-specific skills Apple is looking for."
    },
    {
      section: "Experience",
      status: "improve",
      feedback: "Bullets are task-focused rather than impact-focused. Add metrics, scope, and technical details. Show what you accomplished, not just what you did."
    },
    {
      section: "Education",
      status: "improve",
      feedback: "Add GPA if strong (3.5+), relevant coursework, and any CS-related activities or leadership roles to strengthen academic foundation."
    }
  ],
  companyAdvice: [
    "Apple values innovation and user experience - highlight any projects where you focused on design, usability, or creating delightful user interactions",
    "Demonstrate iOS platform knowledge by building a Swift/SwiftUI project and publishing it to the App Store or showcasing it on GitHub",
    "Apple emphasizes collaboration and cross-functional work - expand on teamwork examples with specific outcomes and team size",
    "Show attention to detail and quality through testing, code reviews, and performance optimization examples"
  ],
  projectSuggestions: [
    "Build a native iOS app using SwiftUI with Core Data persistence and publish to App Store - demonstrates platform expertise and end-to-end ownership",
    "Contribute to an open-source Swift project on GitHub - shows community engagement and collaborative coding skills",
    "Create a portfolio showcasing iOS development work with detailed technical write-ups - helps Apple recruiters see your technical depth and communication skills"
  ]
};

export const MOCK_ANALYSIS_AFTER = {
  score: 87,
  keywordScore: 82,
  scoreExplanation: "Strong resume with clear technical depth, measurable impact, and relevant iOS development experience. Demonstrates both breadth and depth in software engineering with specific metrics and outcomes. Well-aligned with Apple's focus on quality and user experience.",
  matchingSkills: [
    "Swift",
    "SwiftUI",
    "iOS development",
    "Computer Science fundamentals",
    "RESTful APIs",
    "Git version control",
    "Unit testing",
    "Cloud integration (CloudKit)"
  ],
  missingSkills: [
    "UIKit experience",
    "Objective-C",
    "Performance profiling tools",
    "Accessibility implementation"
  ],
  topChanges: [
    {
      id: "change-1",
      severity: "low",
      text: "Add measurable outcome to mentorship bullet (e.g., reduced onboarding time by 40%)",
      targetLine: "experience-mentor"
    },
    {
      id: "change-2",
      severity: "low",
      text: "Consider adding UIKit experience alongside SwiftUI to show broader iOS knowledge",
      targetLine: "skills-section"
    },
    {
      id: "change-3",
      severity: "low",
      text: "Implement accessibility features (VoiceOver, Dynamic Type) in iOS app",
      targetLine: "projects-ios"
    },
    {
      id: "change-4",
      severity: "low",
      text: "Add demo video or case study link for iOS Expense Tracker app",
      targetLine: "projects-ios"
    },
    {
      id: "change-5",
      severity: "low",
      text: "Consider obtaining Apple Developer certifications to strengthen platform expertise",
      targetLine: "education-section"
    }
  ],
  documentLines: [
    { id: "header-name", text: "HOKIE STUDENT", type: "header-name" },
    { id: "header-contact", text: "Email: hokie.student@vt.edu | Phone: (540) 555-0123 | LinkedIn: linkedin.com/in/hokiestudent | GitHub: github.com/hokiestudent", type: "header-contact", highlight: "green" },
    { id: "education-section", text: "EDUCATION", type: "section-title", highlight: "green" },
    { id: "education-school", text: "Virginia Tech, Blacksburg, VA", type: "text", highlight: "green" },
    { id: "education-degree", text: "Bachelor of Science in Computer Science, GPA: 3.7/4.0", type: "text", highlight: "green" },
    { id: "education-grad", text: "Expected Graduation: May 2025", type: "text" },
    { id: "education-coursework", text: "Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Operating Systems", type: "text", highlight: "green" },
    { id: "skills-section", text: "TECHNICAL SKILLS", type: "section-title", highlight: "yellow" },
    { id: "skills-languages", text: "Languages: Java, Python, JavaScript, TypeScript, SQL, Swift", type: "text", highlight: "green" },
    { id: "skills-frameworks", text: "Frameworks & Tools: React, Node.js, Express, Git, Docker, AWS (S3, Lambda), Xcode, SwiftUI", type: "text", highlight: "green" },
    { id: "skills-databases", text: "Databases: PostgreSQL, MongoDB, MySQL", type: "text", highlight: "green" },
    { id: "experience-section", text: "EXPERIENCE", type: "section-title" },
    { id: "experience-title-1", text: "Software Engineering Intern - TechStart Solutions, Roanoke, VA", type: "text", highlight: "green" },
    { id: "experience-date-1", text: "May 2024 - August 2024", type: "text" },
    { id: "experience-bullet-1", text: "- Developed and deployed 3 full-stack web features using React and Node.js, improving user engagement by 25%", type: "text", highlight: "green" },
    { id: "experience-bullet-2", text: "- Reduced application load time by 40% through code optimization and implementing lazy loading strategies", type: "text", highlight: "green" },
    { id: "experience-bullet-3", text: "- Collaborated with cross-functional team of 5 engineers using Agile methodology, participating in daily standups and sprint planning", type: "text", highlight: "green" },
    { id: "experience-bullet-4", text: "- Wrote 50+ unit tests achieving 85% code coverage, reducing production bugs by 30%", type: "text", highlight: "green" },
    { id: "experience-title-2", text: "IT Support Specialist - Virginia Tech IT Services, Blacksburg, VA", type: "text", highlight: "green" },
    { id: "experience-date-2", text: "September 2023 - Present", type: "text" },
    { id: "experience-bullet-5", text: "- Resolve 20+ technical support tickets daily with 95% customer satisfaction rating", type: "text", highlight: "green" },
    { id: "experience-bullet-6", text: "- Automated password reset workflow using Python scripts, reducing average resolution time from 15 to 3 minutes", type: "text", highlight: "green" },
    { id: "experience-bullet-7", text: "- Created documentation and training materials for common issues, decreasing repeat tickets by 20%", type: "text", highlight: "green" },
    { id: "experience-mentor", text: "- Mentor 3 new team members on support protocols and troubleshooting techniques", type: "text", highlight: "yellow" },
    { id: "projects-section", text: "PROJECTS", type: "section-title" },
    { id: "projects-ios", text: "iOS Expense Tracker App | Swift, SwiftUI, Core Data, CloudKit", type: "text", highlight: "yellow" },
    { id: "project-bullet-1", text: "- Built native iOS application with 1,000+ downloads enabling users to track expenses and visualize spending patterns", type: "text", highlight: "green" },
    { id: "project-bullet-2", text: "- Implemented iCloud sync using CloudKit, allowing seamless data synchronization across devices", type: "text", highlight: "green" },
    { id: "project-bullet-3", text: "- Designed intuitive UI/UX following Apple Human Interface Guidelines with 4.5-star App Store rating", type: "text", highlight: "green" },
    { id: "project-bullet-4", text: "- Integrated Chart framework for interactive data visualizations and spending analytics", type: "text", highlight: "green" },
    { id: "project-title-2", text: "Full-Stack Task Management Platform | React, TypeScript, Node.js, PostgreSQL, AWS", type: "text", highlight: "green" },
    { id: "project-bullet-5", text: "- Architected and deployed RESTful API serving 500+ requests/day with 99.9% uptime", type: "text", highlight: "green" },
    { id: "project-bullet-6", text: "- Implemented JWT authentication and role-based access control for secure multi-user environment", type: "text", highlight: "green" },
    { id: "project-bullet-7", text: "- Deployed on AWS using EC2, RDS, and S3 with automated CI/CD pipeline via GitHub Actions", type: "text", highlight: "green" },
    { id: "project-bullet-8", text: "- Optimized database queries reducing average response time from 800ms to 120ms", type: "text", highlight: "green" },
    { id: "leadership-section", text: "LEADERSHIP & ACTIVITIES", type: "section-title", highlight: "green" },
    { id: "leadership-1", text: "Vice President, VT Computer Science Club - Organized 10+ technical workshops and hackathons with 200+ participants", type: "text", highlight: "green" },
    { id: "leadership-2", text: "Volunteer Coding Instructor - Taught Python fundamentals to 30+ high school students through VT outreach program", type: "text", highlight: "green" }
  ],
  weakBullets: [
    {
      original: "Mentor 3 new team members on support protocols and troubleshooting techniques",
      issue: "Good leadership example but could add measurable outcome of mentorship",
      suggestion: "Mentor 3 new team members on support protocols and troubleshooting techniques, reducing their onboarding time by 40% and improving team ticket resolution rate by 15%"
    }
  ],
  sectionFeedback: [
    {
      section: "Technical Skills",
      status: "strong",
      feedback: "Well-organized with clear categorization. Strong iOS and full-stack coverage. Consider adding accessibility tools or performance profiling experience if applicable."
    },
    {
      section: "Projects",
      status: "strong",
      feedback: "Excellent iOS project demonstrating platform expertise with App Store presence. Full-stack project shows versatility. Both include metrics and technical depth."
    },
    {
      section: "Experience",
      status: "strong",
      feedback: "Bullets are impact-focused with clear metrics and scope. Shows progression from support role to engineering. Demonstrates collaboration and technical growth."
    },
    {
      section: "Leadership",
      status: "strong",
      feedback: "Strong leadership section showing community involvement and teaching ability - aligns well with Apple's collaborative culture."
    }
  ],
  companyAdvice: [
    "Your iOS Expense Tracker app is a strong differentiator - consider adding a brief demo video or detailed case study to your portfolio",
    "Highlight your focus on user experience and Apple HIG compliance in interviews - this aligns perfectly with Apple's design philosophy",
    "Your automation and optimization examples (password reset script, database query optimization) demonstrate the efficiency mindset Apple values",
    "Consider obtaining Apple Developer certifications or completing Apple's Swift curriculum to further strengthen your platform expertise"
  ],
  projectSuggestions: [
    "Add UIKit experience by building a complex navigation flow or custom UI components - rounds out your iOS skill set beyond SwiftUI",
    "Implement accessibility features (VoiceOver, Dynamic Type) in your existing iOS app - Apple strongly emphasizes inclusive design",
    "Explore iOS performance optimization by profiling your app with Instruments and documenting improvements - shows advanced platform knowledge"
  ]
};
