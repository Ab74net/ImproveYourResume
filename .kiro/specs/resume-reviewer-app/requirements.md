# Requirements Document: Resume Reviewer Web Application

## Introduction

The Resume Reviewer is a web application that helps job candidates improve their resumes for specific target roles (Software Engineer, QA Engineer, DevOps Engineer, Data Analyst, Data Scientist, Product Manager, Security Engineer, ML Engineer) and companies (Amazon, Google, Meta, Netflix, Apple, Microsoft). The system analyzes resumes against job descriptions, provides structured feedback with match scores, identifies skill gaps, rewrites weak bullet points, and offers actionable project recommendations. Users can iterate on their resumes and compare improvements over time using a serverless AWS architecture.

## Glossary

- **System**: The Resume Reviewer web application
- **User**: A job candidate using the application to improve their resume
- **Resume**: A document describing a candidate's work experience, education, and skills
- **Job_Description**: A document describing requirements and responsibilities for a target position
- **Analysis**: The process of evaluating a resume against a job description
- **Analysis_Result**: The structured output from an analysis containing scores, feedback, and recommendations
- **Session**: A unique user interaction period identified by a session ID
- **Target_Role**: One of the supported job roles (SWE, QA, DevOps, Data Analyst, Data Scientist, Product Manager, Security Engineer, ML Engineer)
- **Target_Company**: One of the supported companies (Amazon, Google, Meta, Netflix, Apple, Microsoft, Generic)
- **Match_Score**: A numerical score (0-100) indicating how well a resume aligns with a job description
- **Keyword_Score**: A numerical score (0-100) indicating keyword alignment between resume and job description
- **Skill_Gap**: A skill or technology present in the job description but not clearly demonstrated in the resume
- **Weak_Bullet**: A resume bullet point that could be improved with stronger verbs, metrics, or clarity
- **Project_Suggestion**: A recommended project to help close identified skill gaps
- **Version_History**: A chronological record of all analyses performed in a session
- **AI_Provider**: The external service (OpenAI or AWS Bedrock) used to generate analysis
- **Upload_Lambda**: AWS Lambda function handling resume file uploads and text extraction
- **Analyze_Lambda**: AWS Lambda function orchestrating resume analysis
- **History_Lambda**: AWS Lambda function retrieving analysis history
- **Textract**: AWS service for extracting text from PDF documents
- **Frontend**: The client-side web application running in the user's browser
- **Backend**: The server-side AWS infrastructure processing requests

## Requirements

### Requirement 1: Resume Upload and Text Extraction

**User Story:** As a user, I want to upload my resume as a PDF or paste text directly, so that the system can analyze my resume content.

#### Acceptance Criteria

1. WHEN a user uploads a PDF file, THE System SHALL extract text from the PDF using AWS Textract
2. WHEN a user pastes resume text directly, THE System SHALL accept the text without file upload
3. WHEN a PDF upload fails, THE System SHALL provide a fallback option to paste text manually
4. WHEN text extraction completes, THE System SHALL display the extracted text to the user for verification
5. THE System SHALL reject files larger than 5MB
6. THE System SHALL reject files that are not PDF format
7. WHEN a resume is uploaded, THE System SHALL generate a unique resume ID
8. WHEN a resume is uploaded, THE System SHALL store the file in S3 with encryption at rest

### Requirement 2: Role and Company Selection

**User Story:** As a user, I want to select my target role and company, so that the analysis is tailored to my specific job search goals.

#### Acceptance Criteria

1. THE System SHALL provide selection options for at least 8 target roles
2. THE System SHALL provide selection options for at least 6 target companies plus a generic option
3. WHEN a user selects a role, THE System SHALL display a description of that role
4. WHEN a user selects a company, THE System SHALL display cultural values and resume style preferences for that company
5. THE System SHALL require both role and company selection before allowing analysis
6. WHEN a user changes role or company selection, THE System SHALL update the displayed guidance

### Requirement 3: Job Description Input

**User Story:** As a user, I want to provide a job description, so that the system can compare my resume against specific job requirements.

#### Acceptance Criteria

1. THE System SHALL accept job description text up to 20,000 characters
2. WHEN a user selects a role and company combination, THE System SHALL offer sample job descriptions
3. THE System SHALL require a non-empty job description before allowing analysis
4. WHEN a user pastes a job description, THE System SHALL validate the text is not composed entirely of whitespace
5. THE System SHALL strip HTML tags and scripts from job description input

### Requirement 4: Resume Analysis Execution

**User Story:** As a user, I want to analyze my resume against a job description, so that I can receive structured feedback and recommendations.

#### Acceptance Criteria

1. WHEN a user initiates analysis, THE System SHALL validate that resume text, job description, target role, and target company are all provided
2. WHEN validation passes, THE Analyze_Lambda SHALL build a role-specific and company-specific prompt
3. WHEN the prompt is built, THE Analyze_Lambda SHALL call the AI_Provider with the prompt
4. IF the AI_Provider call fails, THEN THE Analyze_Lambda SHALL retry up to 3 times with exponential backoff
5. WHEN the AI_Provider returns a response, THE Analyze_Lambda SHALL parse and validate the JSON response
6. IF the JSON response is invalid, THEN THE Analyze_Lambda SHALL return an error to the user
7. WHEN analysis completes, THE System SHALL save the Analysis_Result to DynamoDB
8. WHEN analysis completes, THE System SHALL return the Analysis_Result to the Frontend within 30 seconds
9. THE System SHALL process analysis requests with a p95 latency of less than 15 seconds

### Requirement 5: Score Calculation and Display

**User Story:** As a user, I want to see an overall score for my resume, so that I can quickly understand how well it aligns with the job description.

#### Acceptance Criteria

1. THE System SHALL calculate a Match_Score between 0 and 100
2. THE System SHALL calculate a Keyword_Score between 0 and 100
3. WHEN displaying the Match_Score, THE System SHALL show a color-coded badge (red for 0-49, amber for 50-74, green for 75-100)
4. WHEN displaying the Match_Score, THE System SHALL provide a 2-3 sentence explanation of the score
5. THE System SHALL display both Match_Score and Keyword_Score in the analysis results

### Requirement 6: Keyword and Skill Gap Analysis

**User Story:** As a user, I want to see which skills match the job description and which are missing, so that I can identify gaps in my resume.

#### Acceptance Criteria

1. WHEN analysis completes, THE System SHALL identify skills present in both the resume and job description
2. WHEN analysis completes, THE System SHALL identify skills present in the job description but not in the resume
3. THE System SHALL display matching skills with green visual indicators
4. THE System SHALL display missing skills with amber visual indicators
5. THE System SHALL highlight critical missing skills with additional emphasis
6. THE System SHALL ensure matching skills and missing skills contain no duplicate entries
7. WHEN no skill gaps are found, THE System SHALL display an appropriate empty state message

### Requirement 7: Bullet Point Rewriting

**User Story:** As a user, I want to see suggestions for improving weak bullet points, so that I can strengthen my resume content.

#### Acceptance Criteria

1. WHEN analysis completes, THE System SHALL identify up to 5 weak bullet points from the resume
2. FOR EACH weak bullet, THE System SHALL provide the original text, a description of the issue, and a rewritten suggestion
3. WHEN rewriting bullets, THE System SHALL apply the selected company's preferred bullet format
4. WHEN the target company is Amazon, THE System SHALL use STAR format (Situation, Task, Action, Result) for bullet rewrites
5. WHEN the target company is Google, THE System SHALL use "Accomplished X as measured by Y by doing Z" format for bullet rewrites
6. THE System SHALL ensure rewritten suggestions are different from the original text
7. THE System SHALL provide a copy-to-clipboard function for each bullet suggestion
8. THE System SHALL display a side-by-side diff view comparing original and suggested bullets

### Requirement 8: Project Suggestions

**User Story:** As a user, I want to receive project recommendations that address my skill gaps, so that I can take concrete action to improve my qualifications.

#### Acceptance Criteria

1. WHEN skill gaps are identified, THE System SHALL generate 2-3 project suggestions
2. FOR EACH project suggestion, THE System SHALL provide a title, description, skills covered, estimated time, and difficulty level
3. THE System SHALL ensure each project suggestion covers at least 2 missing skills
4. THE System SHALL sort project suggestions by number of skills covered in descending order
5. WHEN no skill gaps exist, THE System SHALL return an empty array of project suggestions
6. THE System SHALL provide expandable details for each project suggestion

### Requirement 9: Analysis History and Persistence

**User Story:** As a user, I want to view my previous analyses, so that I can track my resume improvements over time.

#### Acceptance Criteria

1. WHEN a user requests history, THE History_Lambda SHALL query DynamoDB for all analyses in the session
2. THE System SHALL sort analysis history by timestamp in descending order (newest first)
3. FOR EACH historical analysis, THE System SHALL display the analysis ID, timestamp, score, target role, and target company
4. THE System SHALL support pagination with a default limit of 10 analyses per page
5. THE System SHALL support a maximum of 50 analyses per page
6. WHEN a session has no analyses, THE System SHALL display an appropriate empty state message
7. THE System SHALL persist all Analysis_Results to DynamoDB immediately after completion

### Requirement 10: Version Comparison

**User Story:** As a user, I want to compare two resume versions, so that I can see how my changes improved my score and addressed skill gaps.

#### Acceptance Criteria

1. WHEN a user selects two analyses for comparison, THE System SHALL calculate the score delta between them
2. THE System SHALL identify skills that are newly matching in the second analysis
3. THE System SHALL identify skill gaps that were resolved in the second analysis
4. THE System SHALL identify new skill gaps that appeared in the second analysis
5. THE System SHALL identify bullet points that were improved between versions
6. WHEN comparing analysis A to analysis B, THE System SHALL ensure the score delta equals the negative of comparing B to A
7. THE System SHALL display a score trend visualization across multiple analyses
8. THE System SHALL require that both analyses belong to the same session

### Requirement 11: Session Management

**User Story:** As a user, I want my analyses to be grouped in a session, so that I can maintain privacy and organize my work.

#### Acceptance Criteria

1. WHEN a user first accesses the application, THE System SHALL generate a unique session ID using UUID v4
2. THE System SHALL store the session ID in an httpOnly cookie
3. THE System SHALL associate all uploads and analyses with the current session ID
4. THE System SHALL expire sessions after 24 hours of inactivity
5. THE System SHALL ensure analyses from different sessions are isolated from each other
6. WHEN a session expires, THE System SHALL generate a new session ID on the next visit

### Requirement 12: Data Security and Privacy

**User Story:** As a user, I want my resume data to be secure and private, so that I can trust the application with sensitive information.

#### Acceptance Criteria

1. THE System SHALL encrypt all resume files at rest in S3 using AES-256 encryption
2. THE System SHALL transmit all data over HTTPS only
3. THE System SHALL store AI_Provider API keys in AWS Secrets Manager
4. THE System SHALL never expose API keys to the Frontend
5. THE System SHALL redact personally identifiable information from application logs
6. THE System SHALL implement a data retention policy of 30 days for resume files
7. THE System SHALL allow users to delete their resume data on request
8. THE System SHALL validate all file uploads to prevent malware
9. THE System SHALL sanitize all text inputs to prevent injection attacks

### Requirement 13: Input Validation

**User Story:** As a system administrator, I want all inputs to be validated, so that the system remains secure and stable.

#### Acceptance Criteria

1. THE System SHALL validate that resume text is between 1 and 50,000 characters
2. THE System SHALL validate that job description text is between 1 and 20,000 characters
3. THE System SHALL validate that target role is one of the supported role values
4. THE System SHALL validate that target company is one of the supported company values
5. THE System SHALL validate that all UUID fields conform to UUID v4 format
6. THE System SHALL validate that all timestamp fields conform to ISO 8601 format
7. WHEN validation fails, THE System SHALL return a 400 status code with descriptive error messages
8. THE System SHALL strip special characters from file names before storage

### Requirement 14: Error Handling and Recovery

**User Story:** As a user, I want clear error messages and recovery options, so that I can resolve issues and complete my analysis.

#### Acceptance Criteria

1. WHEN a file upload fails, THE System SHALL display an error message and offer to paste text manually
2. WHEN the AI_Provider is unavailable, THE System SHALL return a 503 status code and suggest retrying later
3. WHEN JSON parsing fails, THE System SHALL log the error and return a user-friendly error message
4. WHEN DynamoDB write fails, THE System SHALL retry up to 3 times with exponential backoff
5. IF all DynamoDB retries fail, THEN THE System SHALL return the analysis to the user but warn that history was not saved
6. WHEN rate limit is exceeded, THE System SHALL return a 429 status code with a Retry-After header
7. THE System SHALL display a countdown timer when rate limited before allowing retry
8. THE System SHALL provide a retry button for all recoverable errors

### Requirement 15: Rate Limiting

**User Story:** As a system administrator, I want to prevent abuse through rate limiting, so that the system remains available for all users.

#### Acceptance Criteria

1. THE System SHALL limit each session to 5 analysis requests per minute
2. WHEN a session exceeds the rate limit, THE System SHALL return a 429 status code
3. WHEN rate limited, THE System SHALL include a Retry-After header set to 60 seconds
4. THE System SHALL reset the rate limit counter after 60 seconds
5. THE System SHALL apply rate limiting at the API Gateway level

### Requirement 16: Role Profile Management

**User Story:** As a system administrator, I want to maintain role profiles, so that analysis can be tailored to different job types.

#### Acceptance Criteria

1. THE System SHALL maintain a profile for each supported Target_Role
2. FOR EACH role profile, THE System SHALL define a display name, description, key skills, evaluation criteria, common tools, and sample bullet patterns
3. THE System SHALL ensure evaluation criteria weights sum to 1.0 for each role profile
4. THE System SHALL ensure each role profile contains at least 5 key skills
5. WHEN a role is selected, THE Analyze_Lambda SHALL load the corresponding role profile
6. THE System SHALL validate that a profile exists for every supported Target_Role

### Requirement 17: Company Profile Management

**User Story:** As a system administrator, I want to maintain company profiles, so that analysis can reflect company-specific preferences.

#### Acceptance Criteria

1. THE System SHALL maintain a profile for each supported Target_Company
2. FOR EACH company profile, THE System SHALL define cultural values, resume style guide, keyword preferences, phrases to avoid, and sample successful bullets
3. THE System SHALL ensure each company profile contains at least 3 cultural values
4. THE System SHALL ensure each company profile contains at least 5 keyword preferences
5. WHEN a company is selected, THE Analyze_Lambda SHALL load the corresponding company profile
6. THE System SHALL validate that a profile exists for every supported Target_Company

### Requirement 18: Prompt Generation

**User Story:** As a system administrator, I want the system to generate context-aware prompts, so that AI analysis is accurate and relevant.

#### Acceptance Criteria

1. WHEN building a prompt, THE Analyze_Lambda SHALL include the resume text, job description, role evaluation criteria, and company style guide
2. THE Analyze_Lambda SHALL format evaluation criteria with their percentage weights
3. THE Analyze_Lambda SHALL include company cultural values in the prompt
4. THE Analyze_Lambda SHALL include preferred keywords and phrases to avoid in the prompt
5. THE Analyze_Lambda SHALL include sample successful bullets from the company profile
6. THE Analyze_Lambda SHALL specify the expected JSON output schema in the prompt
7. THE Analyze_Lambda SHALL ensure the complete prompt stays within the AI_Provider's token limit

### Requirement 19: AI Provider Abstraction

**User Story:** As a system administrator, I want to support multiple AI providers, so that the system can switch providers without code changes.

#### Acceptance Criteria

1. THE System SHALL define an AI_Provider interface with call and validateConfig methods
2. THE System SHALL implement the interface for OpenAI
3. THE System SHALL implement the interface for AWS Bedrock
4. THE System SHALL select the AI_Provider based on configuration
5. WHEN calling an AI_Provider, THE System SHALL validate the provider configuration before making the request
6. THE System SHALL handle provider-specific response formats transparently
7. THE System SHALL support configuring model, temperature, and max tokens for each provider

### Requirement 20: Response Parsing and Validation

**User Story:** As a system administrator, I want AI responses to be validated, so that the system handles malformed responses gracefully.

#### Acceptance Criteria

1. WHEN parsing an AI response, THE System SHALL strip markdown code fences if present
2. THE System SHALL validate that the response contains valid JSON
3. THE System SHALL validate that required fields (score, matchingSkills, missingSkills) are present
4. THE System SHALL validate that score is between 0 and 100
5. THE System SHALL validate that keywordScore is between 0 and 100
6. THE System SHALL validate that matchingSkills and missingSkills are arrays
7. THE System SHALL validate that weakBullets contains between 0 and 10 items
8. IF validation fails, THEN THE System SHALL throw a ParseError with a descriptive message

### Requirement 21: Export Functionality

**User Story:** As a user, I want to export my analysis results, so that I can save or share my recommendations.

#### Acceptance Criteria

1. THE System SHALL provide an option to copy all recommendations to clipboard
2. THE System SHALL provide an option to export analysis as PDF
3. WHEN exporting to PDF, THE System SHALL include the score, skill gaps, bullet rewrites, and project suggestions
4. THE System SHALL provide an option to export a comparison report between two versions
5. WHEN copying to clipboard, THE System SHALL format the content as readable text

### Requirement 22: Frontend Performance

**User Story:** As a user, I want the application to load quickly and respond smoothly, so that I have a good user experience.

#### Acceptance Criteria

1. THE Frontend SHALL lazy load the history page components only when the user navigates to history
2. THE Frontend SHALL defer loading of the PDF library until a PDF upload is initiated
3. THE Frontend SHALL debounce text input changes to avoid excessive re-renders
4. THE Frontend SHALL cache role and company profiles in localStorage
5. THE Frontend SHALL display loading states immediately when analysis is initiated
6. THE Frontend SHALL use optimistic UI updates to reduce perceived latency

### Requirement 23: Backend Performance and Scalability

**User Story:** As a system administrator, I want the backend to scale efficiently, so that the system can handle many concurrent users.

#### Acceptance Criteria

1. THE System SHALL support at least 1000 concurrent users
2. THE System SHALL handle at least 100 analysis requests per minute
3. THE Upload_Lambda SHALL keep the deployment package size below 50MB
4. THE System SHALL use Lambda layers for shared dependencies
5. THE System SHALL implement request deduplication for identical resume and job description pairs
6. THE System SHALL use DynamoDB batch operations when fetching multiple items
7. THE System SHALL set AI_Provider timeout to 30 seconds

### Requirement 24: API Endpoints

**User Story:** As a frontend developer, I want well-defined API endpoints, so that I can integrate with the backend reliably.

#### Acceptance Criteria

1. THE System SHALL provide a POST endpoint at /api/upload-resume accepting file or text
2. THE System SHALL provide a POST endpoint at /api/analyze accepting analysis requests
3. THE System SHALL provide a GET endpoint at /api/history/{sessionId} returning analysis history
4. THE System SHALL provide a GET endpoint at /api/analysis/{analysisId} returning a specific analysis
5. THE System SHALL provide a POST endpoint at /api/compare accepting two analysis IDs
6. THE System SHALL return appropriate HTTP status codes (200, 400, 404, 429, 500, 503)
7. THE System SHALL include CORS headers allowing requests from the application domain
8. THE System SHALL return all responses in JSON format

### Requirement 25: Logging and Monitoring

**User Story:** As a system administrator, I want comprehensive logging, so that I can troubleshoot issues and monitor system health.

#### Acceptance Criteria

1. THE System SHALL log all API requests with timestamp, endpoint, and session ID
2. THE System SHALL log all errors with stack traces to CloudWatch
3. THE System SHALL never log full resume text or job descriptions
4. THE System SHALL redact personally identifiable information from logs
5. THE System SHALL log AI_Provider response times and token usage
6. THE System SHALL create CloudWatch metrics for analysis success rate, latency, and error rate
7. THE System SHALL create CloudWatch alarms for error rate exceeding 5%

### Requirement 26: Infrastructure as Code

**User Story:** As a system administrator, I want infrastructure defined as code, so that deployment is repeatable and version-controlled.

#### Acceptance Criteria

1. THE System SHALL define all AWS resources using CloudFormation or AWS SAM
2. THE System SHALL version control all infrastructure definitions
3. THE System SHALL support deployment to multiple environments (dev, staging, prod)
4. THE System SHALL define IAM roles and policies with least privilege access
5. THE System SHALL configure API Gateway throttling limits in infrastructure code
6. THE System SHALL define DynamoDB table schemas in infrastructure code

### Requirement 27: Mobile Responsiveness

**User Story:** As a user, I want to use the application on my mobile device, so that I can work on my resume anywhere.

#### Acceptance Criteria

1. THE Frontend SHALL render correctly on screen widths from 320px to 2560px
2. THE Frontend SHALL use responsive layout techniques (flexbox, grid, media queries)
3. WHEN viewed on mobile, THE Frontend SHALL stack components vertically
4. WHEN viewed on mobile, THE Frontend SHALL provide touch-friendly button sizes (minimum 44x44px)
5. THE Frontend SHALL test on iOS Safari, Android Chrome, and mobile Firefox

### Requirement 28: Accessibility

**User Story:** As a user with disabilities, I want the application to be accessible, so that I can use it with assistive technologies.

#### Acceptance Criteria

1. THE Frontend SHALL use semantic HTML elements (header, nav, main, section, article)
2. THE Frontend SHALL provide alt text for all images and icons
3. THE Frontend SHALL ensure all interactive elements are keyboard accessible
4. THE Frontend SHALL provide ARIA labels for screen readers where needed
5. THE Frontend SHALL maintain a color contrast ratio of at least 4.5:1 for text
6. THE Frontend SHALL support browser zoom up to 200% without breaking layout

### Requirement 29: Content Security Policy

**User Story:** As a system administrator, I want to prevent XSS attacks, so that the application is secure against code injection.

#### Acceptance Criteria

1. THE Frontend SHALL define a Content Security Policy in the HTML meta tag
2. THE Content Security Policy SHALL restrict script sources to self and approved CDNs
3. THE Content Security Policy SHALL restrict style sources to self and inline styles
4. THE Content Security Policy SHALL restrict image sources to self and data URIs
5. THE Content Security Policy SHALL restrict API connections to the application domain

### Requirement 30: Testing and Quality Assurance

**User Story:** As a developer, I want comprehensive tests, so that I can ensure code quality and prevent regressions.

#### Acceptance Criteria

1. THE System SHALL include unit tests for all validation functions
2. THE System SHALL include unit tests for prompt building logic
3. THE System SHALL include unit tests for response parsing
4. THE System SHALL include property-based tests for score bounds, keyword uniqueness, and comparison symmetry
5. THE System SHALL include integration tests for the complete analysis workflow
6. THE System SHALL achieve at least 80% code coverage for backend Lambda functions
7. THE System SHALL run all tests in CI/CD pipeline before deployment
