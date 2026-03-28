# Quick Reference Guide

## Page URLs

- **Home/Marketing**: `index.html`
- **App/Demo**: `app.html`

## Home Page Flow

1. User lands on hero section
2. Scrolls to "Find Out Your Resume Score" section
3. Sees two CTAs:
   - **"Try It Out"** → Goes to app.html
   - **"More Info ↓"** → Smooth scrolls to next section
4. Can explore remaining feature sections
5. Bottom CTA also links to app.html

## App Page Flow

### Initial State
- Shows job description input section
- User can paste JD or skip

### With Job Description
1. User pastes JD text
2. Clicks "Analyze with Job Description"
3. Job badge appears: "Tailored to: [Job Title]"
4. Resume document renders with highlights
5. Analysis panel shows scores and keywords
6. Keywords are matched against JD

### Without Job Description
1. User clicks "Skip — just check my resume"
2. No job badge shown
3. Resume document renders with highlights
4. Analysis panel shows general scores
5. Keywords are generic tech skills

## Interactive Features

### Document Highlighting
- **Green**: Strong content (education, good bullets)
- **Yellow**: Needs improvement (generic descriptions)
- **Red**: Weak content (vague bullets, filler)
- **None**: Neutral content

### Click Interactions
1. Click any fix item in right panel
2. Document scrolls to corresponding line
3. Line pulses for 0.4s
4. User sees exact location of issue

### Animations
- Donut chart fills from 0 to 62% (1.5s)
- Coverage bar fills to 50% (1s)
- Arrow bounces on "More Info" link
- Fix items slide right on hover
- Lines pulse when clicked

## Color Reference

### VT Brand
- Maroon: `#861F41`
- Orange: `#E5751F`
- Off-white: `#F5F0E8`
- Black: `#1A1A1A`

### Highlights
- Green: `rgba(76, 175, 80, 0.18)` + `#4CAF50` border
- Yellow: `rgba(255, 193, 7, 0.22)` + `#FFC107` border
- Red: `rgba(211, 47, 47, 0.15)` + `#D32F2F` border

### UI Elements
- Light gray: `#E5E5E5`
- Gray text: `#6B6B6B`
- White: `#FFFFFF`

## Typography Scale

### Home Page
- Hero title: 72px
- Feature titles: 56px
- Body: 16px
- Labels: 13px

### App Page
- JD title: 36px
- Section titles: 18px
- Document name: 28px
- Document sections: 16px
- Body: 14-15px
- Labels: 11-13px

## Component Patterns

### Pill Buttons
```css
border-radius: 999px;
padding: 16px 32px;
text-transform: uppercase;
font-family: 'Barlow Condensed';
```

### Section Cards
```css
background: white;
border-radius: 12px;
padding: 32px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

### Editorial Shadow
```css
box-shadow: 6px 6px 0 #861F41;
```

### Keyword Chips
```css
border-radius: 999px;
padding: 8px 16px;
background: rgba(color, 0.15);
font-weight: 600;
```

## Mock Data Structure

### Resume Sections
1. Education (3 lines)
2. Experience (12 lines, 2 jobs)
3. Projects (7 lines, 2 projects)
4. Skills (1 line)

### Highlights Applied
- Green: 1 line (education school)
- Yellow: 5 lines (improvable bullets)
- Red: 8 lines (weak bullets)
- None: 11 lines (neutral content)

### Keywords
**Matched (5):**
- Java
- Python
- Git
- Node.js
- REST APIs

**Missing (5):**
- AWS
- CI/CD
- Leadership
- Metrics
- Agile

### Scores
- Overall: 62
- Structure: 74 (green)
- Impact: 58 (red)
- Keywords: 61 (orange)

### Top Fixes (5)
1. 🔴 Quantify your bullets
2. 🔴 Rewrite internship bullets
3. 🟡 Add missing keywords
4. 🟡 Strengthen project descriptions
5. 🟡 Expand club roles

## Responsive Breakpoints

### 1200px
- Single column layout
- Remove sticky positioning
- Reduce padding

### 768px
- Mobile padding (20-32px)
- Stack subscores
- Full-width buttons
- Smaller fonts

## File Structure

```
/
├── index.html              # Home/marketing page
├── app.html                # Demo app page
├── styles/
│   ├── home.css           # Home page styles
│   └── app-demo.css       # App page styles
└── scripts/
    └── app-demo.js        # App functionality
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- ES6 JavaScript
- SVG animations
- Smooth scrolling API

## Performance Notes

- Google Fonts preconnected
- Inline SVG for donut chart
- CSS-only animations (no JS libraries)
- Minimal DOM manipulation
- Efficient event delegation

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy
- Focus-visible styles
- Color contrast meets WCAG AA
- Keyboard navigation supported
- Smooth scroll respects prefers-reduced-motion

## Testing Checklist

### Home Page
- [ ] Hero section displays correctly
- [ ] Resume mockups visible on desktop
- [ ] "Try It Out" button links to app.html
- [ ] "More Info" link smooth scrolls
- [ ] Arrow bounces continuously
- [ ] Company chips display in footer
- [ ] Responsive on mobile

### App Page
- [ ] JD input section shows first
- [ ] Textarea accepts input
- [ ] "Analyze" button works
- [ ] "Skip" button works
- [ ] Job badge shows/hides correctly
- [ ] Resume renders with highlights
- [ ] Donut animates to 62%
- [ ] Coverage bar animates to 50%
- [ ] Fix items are clickable
- [ ] Clicking scrolls to line
- [ ] Line pulses on click
- [ ] Responsive on mobile

## Common Issues

**Donut not animating:**
- Check stroke-dasharray calculation
- Ensure 300ms delay before animation
- Verify SVG viewBox and circle radius

**Scroll not working:**
- Check element IDs match data-target
- Verify scrollIntoView is supported
- Check smooth scroll CSS

**Highlights not showing:**
- Verify highlight classes in CSS
- Check data structure has highlight property
- Ensure IDs are unique

**Mobile layout broken:**
- Check media query breakpoints
- Verify grid-template-columns changes
- Test padding reductions
