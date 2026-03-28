# Final Application Structure

## Page Overview

### 1. Home Page (index.html)
**Purpose:** Marketing and landing page

**Sections:**
- Hero with resume mockups
- Feature Section 1: Resume Score (with "Try It Out" + "More Info" CTAs)
- Feature Section 2: Scoring Logic
- Feature Section 3: Line-by-Line Feedback
- Bottom CTA

**CTAs:**
- "Try It Out" button → Links to `app.html`
- "More Info ↓" link → Smooth scrolls to next section
- Bottom "Try It Out" → Links to `app.html`

### 2. App Page (app.html)
**Purpose:** Full resume analysis tool with real functionality

**Features:**
- Complete form with all inputs:
  - Model API Key
  - Target Role dropdown
  - Target Company dropdown
  - STEM Major dropdown
  - Sample Job Descriptions dropdown + Load button
  - Resume Content textarea + PDF upload
  - Job Description textarea
  - Analyze button
- Two-column layout (input panel + results panel)
- Real AI analysis integration
- History tracking
- All original functionality preserved

**Navbar:**
- "← Home" link (back to index.html)
- "Resume Reviewer" title
- "MOCK DATA RUN" button (orange pill, links to demo.html)

**Layout:**
- Left panel: Sticky input form (480px)
- Right panel: Results display (flexible width)
- Responsive: stacks on mobile

### 3. Demo Page (demo.html)
**Purpose:** Mock data visualization and demo

**Features:**
- Pre-loaded mock resume (Hokie Student)
- Traffic-light highlighting system
- Interactive document view
- Analysis dashboard with:
  - Animated donut chart (62% score)
  - Sub-scores (Structure 74, Impact 58, Keywords 61)
  - Keyword coverage (matched/missing)
  - Top 5 fixes with click-to-scroll
- No form inputs (pure demo)

**Navbar:**
- "← Back to App" link (returns to app.html)
- "Resume Reviewer - Mock Demo" title

**Layout:**
- Left panel: Resume document with highlights
- Right panel: Analysis dashboard
- Fully interactive with animations

## Navigation Flow

```
index.html (Home)
    ↓ "Try It Out" button
app.html (Real App)
    ↓ "MOCK DATA RUN" button
demo.html (Mock Demo)
    ↓ "← Back to App"
app.html
    ↓ "← Home"
index.html
```

## Key Differences

### app.html vs demo.html

**app.html (Real App):**
- ✅ Full form with all inputs
- ✅ API key required
- ✅ PDF upload functionality
- ✅ Sample job descriptions
- ✅ Real AI analysis
- ✅ History tracking
- ✅ Empty state before analysis
- ✅ User provides resume and JD

**demo.html (Mock Demo):**
- ✅ No form inputs
- ✅ Pre-loaded mock data
- ✅ Instant visualization
- ✅ Traffic-light highlights
- ✅ Interactive click-to-scroll
- ✅ Animated charts
- ✅ Always shows results
- ✅ No API calls needed

## File Structure

```
/
├── index.html              # Home/marketing page
├── app.html                # Real resume analysis tool
├── demo.html               # Mock data demo
├── styles/
│   ├── home.css           # Home page styles
│   ├── base.css           # Global VT styles
│   ├── layout.css         # App layout
│   ├── components.css     # Form/result components
│   └── app-demo.css       # Demo page styles
└── scripts/
    ├── app.js             # Real app functionality
    ├── app-demo.js        # Demo functionality
    ├── ui.js              # UI rendering
    ├── upload.js          # PDF upload
    ├── analysis.js        # AI analysis
    ├── state.js           # State management
    └── compare.js         # History comparison
```

## Navbar Buttons

### Home Page (index.html)
- No navbar (just hero and sections)

### App Page (app.html)
```
[← Home]  Resume Reviewer  [MOCK DATA RUN]
```

### Demo Page (demo.html)
```
[← Back to App]  Resume Reviewer - Mock Demo
```

## Color System (Consistent Across All Pages)

**VT Brand:**
- Maroon: #861F41
- Orange: #E5751F
- Off-white: #F5F0E8
- Black: #1A1A1A

**Highlights (Demo only):**
- Green: rgba(76, 175, 80, 0.18)
- Yellow: rgba(255, 193, 7, 0.22)
- Red: rgba(211, 47, 47, 0.15)

## Typography (Consistent)

**Headings:**
- Barlow Condensed (700, 800, 900)
- Uppercase
- Maroon color

**Body:**
- Inter (400, 500, 600, 700)
- Black color
- Line-height: 1.6

## Responsive Behavior

**All pages:**
- Desktop: Two-column layouts
- Tablet (< 1200px): Single column
- Mobile (< 768px): Reduced padding, stacked elements

## User Journey

### First-time User
1. Lands on **index.html** (home page)
2. Reads about features
3. Clicks "Try It Out" → Goes to **app.html**
4. Sees full form, may feel overwhelmed
5. Clicks "MOCK DATA RUN" → Goes to **demo.html**
6. Sees example analysis with highlights
7. Understands what the tool does
8. Returns to **app.html** to try with own resume

### Returning User
1. Goes directly to **app.html**
2. Fills out form with resume and JD
3. Gets real analysis results
4. Can reference **demo.html** anytime via navbar button

## Mock Data Details

**Resume:** Hokie Student (Computer Science, Virginia Tech)

**Sections:**
- Education (3 lines)
- Experience (12 lines, 2 jobs)
- Projects (7 lines, 2 projects)
- Skills (1 line)

**Highlights:**
- 1 green (education)
- 5 yellow (improvable)
- 8 red (weak)
- 12 uncolored (neutral)

**Scores:**
- Overall: 62
- Structure: 74
- Impact: 58
- Keywords: 61

**Keywords:**
- Matched: Java, Python, Git, Node.js, REST APIs
- Missing: AWS, CI/CD, Leadership, Metrics, Agile

## Implementation Notes

### app.html
- Uses original `scripts/app.js` (no changes)
- Connects to real AI analysis API
- Requires API key input
- Full form validation
- PDF upload via PDF.js
- History tracking in session storage

### demo.html
- Uses `scripts/app-demo.js` (standalone)
- No API calls
- Pre-rendered mock data
- Instant visualization
- Interactive features only

### Separation Benefits
- Demo doesn't interfere with real app
- Users can test without API key
- Mock data always available
- Real app remains clean and functional
- Easy to maintain separately

## Testing Checklist

### Home Page
- [ ] "Try It Out" button links to app.html
- [ ] "More Info" link smooth scrolls
- [ ] Arrow bounces continuously
- [ ] All sections visible

### App Page
- [ ] All form fields present
- [ ] Dropdowns populate correctly
- [ ] PDF upload works
- [ ] Sample JD loads
- [ ] Analyze button triggers analysis
- [ ] Results display correctly
- [ ] "MOCK DATA RUN" button links to demo.html
- [ ] "← Home" link returns to index.html

### Demo Page
- [ ] Resume renders with highlights
- [ ] Donut animates to 62%
- [ ] Coverage bar animates to 50%
- [ ] Fix items are clickable
- [ ] Clicking scrolls to line
- [ ] Line pulses on click
- [ ] "← Back to App" returns to app.html

## Future Enhancements

### app.html
- Add job description parsing
- Show tailored keywords based on JD
- Add "relevant to role" highlighting
- Export results as PDF
- Save analysis history to database

### demo.html
- Add "before/after" toggle
- Show multiple resume examples
- Add interactive tutorial
- Highlight improvements in real-time
- Add comparison view
