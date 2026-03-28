# Demo Mode Documentation

## Overview

The demo page (`demo.html`) provides a mock environment to test the Resume Reviewer interface without making actual API calls. The demo now features a visual document view with traffic-light highlighting and simplified, focused feedback.

## New Features

### Document View with Visual Feedback

Resumes are displayed as styled documents (mimicking Google Docs/Word) with a traffic-light highlighting system:

- 🔴 **Red highlights** - Sections needing significant improvement (weak bullets, missing keywords, vague language)
- 🟡 **Yellow highlights** - Minor improvements suggested (slight rewording, formatting tweaks)
- 🟢 **Green highlights** - Already strong content, keep as-is

### Simplified Feedback Panel

The left panel contains four focused sections:

1. **Overall Fit Score** - Bold percentage with visual progress bar
2. **Keyword Coverage** - Percentage with matched (✓) vs missing (✗) keyword chips
3. **Suggested Changes** - Top 5 priority edits, numbered and clickable

### Interactive Navigation

Click any suggested change to:
- Automatically scroll to the corresponding highlighted section in the document
- Pulse animation draws attention to the specific line

## Demo Scenarios

### Hokie Student - Before (Weak Resume)
- **Score**: 42/100
- **Keyword Coverage**: 35%
- **Character**: Computer Science student with basic experience
- **Issues Highlighted**:
  - Vague bullet points without metrics (heavy red highlighting)
  - Missing iOS-specific skills
  - Weak project descriptions
  - Task-focused rather than impact-focused
  - Generic skills section

### Hokie Student - After (Improved Resume)
- **Score**: 87/100
- **Keyword Coverage**: 82%
- **Character**: Same student with significantly improved resume
- **Improvements Shown**:
  - Quantified achievements with metrics (green highlighting)
  - iOS app development experience (Swift, SwiftUI)
  - Strong technical skills section organized by category
  - Impact-focused bullet points
  - Leadership and community involvement
  - Only minor yellow suggestions remaining

## How to Use

1. Open `demo.html` in your browser
2. Select a demo scenario from the dropdown:
   - "Hokie Student - Before" for the weak resume example
   - "Hokie Student - After" for the improved resume example
3. Click "Run mock analysis" to see the results
4. Review the document view with color-coded highlights
5. Click suggested changes to navigate to specific sections
6. Compare the two scenarios to understand improvement patterns

## Target Profile

- **Name**: Hokie Student
- **Major**: Computer Science (Virginia Tech)
- **Target Role**: Software Engineer
- **Target Company**: Apple
- **Focus**: iOS development position

## Mock Data Files

- `scripts/mockData.js` - Contains all mock resumes, analysis responses, and document structure
- `scripts/demo.js` - Demo page logic, document rendering, and interactive navigation

## Key Differences: Before vs. After

| Aspect | Before | After |
|--------|--------|-------|
| Bullet Points | Vague, task-focused (red) | Specific, impact-focused with metrics (green) |
| Technical Skills | Generic list (yellow) | Organized by category with iOS focus (green) |
| Projects | Basic descriptions (red) | Detailed with tech stack and outcomes (green) |
| Metrics | None | Quantified achievements throughout |
| iOS Experience | Missing (red) | Strong (Swift, SwiftUI, App Store) (green) |
| Leadership | Not mentioned | VP of CS Club, volunteer instructor (green) |
| Contact Info | Basic email/phone (yellow) | Includes LinkedIn, GitHub (green) |

## Visual Design

The document view is designed to resemble professional document editors:
- White page with shadow on gray background
- Readable font (Segoe UI, 11pt)
- Proper margins and spacing
- Section headers in uppercase with letter spacing
- Centered header with name and contact info
- Color-coded highlights with left border indicators

## Navigation

- From main app (`index.html`): Click "Try Demo Mode" in the header
- From demo page (`demo.html`): Click "Back to Live Mode" in the header

## No API Required

The demo page uses pre-generated mock responses and does not make any external API calls. This means:
- No API key needed
- Instant results (with simulated 1.5s delay for realism)
- No costs incurred
- Works offline
- Perfect for presentations and testing

## Technical Implementation

- Pure JavaScript (ES6 modules)
- No build step required
- Document lines are structured data with highlight metadata
- Click handlers link suggested changes to document sections
- Smooth scrolling and pulse animations for better UX
- Responsive layout with sticky document panel
