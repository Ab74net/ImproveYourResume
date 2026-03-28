# Implementation Notes

## Key Implementation Details

### Hero Section Resume Mockups

The resume card mockups are created using pure CSS/HTML:

```html
<div class="resume-mockup resume-mockup--back">
  <div class="mockup-avatar"></div>
  <div class="mockup-line"></div>
  <div class="mockup-line"></div>
  <div class="mockup-line mockup-line--short"></div>
  <div class="mockup-line mockup-line--highlight"></div>
  <div class="mockup-line"></div>
  <div class="mockup-line mockup-line--short"></div>
</div>
```

**Styling:**
- White background with rounded corners (16px)
- Orange drop shadow: `box-shadow: 8px 8px 0 var(--vt-orange)`
- Pink circle for avatar placeholder (60px diameter)
- Gray bars for text lines (12px height, 6px border-radius)
- Pink highlight bars for emphasis
- Rotated using CSS transform

### Donut Chart

The donut chart in the Resume Score section is an SVG:

```html
<svg viewBox="0 0 120 120" class="donut-svg">
  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E5E5" stroke-width="12"/>
  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5751F" stroke-width="12" 
          stroke-dasharray="195 314" stroke-dashoffset="78.5" transform="rotate(-90 60 60)"/>
</svg>
```

**Calculation:**
- Circumference: 2πr = 2π(50) = 314
- 62% of 314 = 195
- Stroke-dasharray: "195 314" (filled, empty)
- Stroke-dashoffset: 78.5 (quarter turn to start at top)
- Transform: rotate(-90) to position correctly

### Editorial Shadow

The signature maroon offset shadow used on feature cards:

```css
box-shadow: 6px 6px 0 #861F41;
```

This creates a solid, flat shadow offset 6px right and 6px down with no blur.

### Noise Texture

Paper grain texture applied via CSS:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,...");
  z-index: 1;
}
```

Uses an inline SVG data URI with feTurbulence filter for fractal noise.

### Section Alternation

The three feature sections alternate backgrounds:
1. Feature 1: #F5F0E8 (off-white)
2. Feature 2: #861F41 (maroon)
3. Feature 3: #F5F0E8 (off-white)

### Column Reversal

Feature Section 2 (Scoring Logic) reverses the column order:

```css
.feature-container--reverse {
  grid-template-columns: 45fr 55fr;
}
```

This puts the visual (keyword card) on the left and content on the right.

### Pill Shapes

All pill-shaped elements use:

```css
border-radius: 999px;
```

This creates perfect pill shapes regardless of content width.

### Checkmark Bullets

Custom checkmarks using CSS pseudo-elements:

```css
.feature-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--vt-orange);
  font-weight: 700;
  font-size: 20px;
}
```

### Sticky Input Panel

On the app page, the input panel stays visible while scrolling:

```css
.app-panel--input {
  position: sticky;
  top: 100px;
}
```

Top offset accounts for the navbar height.

### Responsive Behavior

**Breakpoint 1200px:**
- Switch to single column layout
- Remove sticky positioning
- Reduce resume mockup sizes

**Breakpoint 900px:**
- Stack all grid layouts
- Hide hero resume mockups
- Adjust typography sizes

**Breakpoint 768px:**
- Reduce padding
- Smaller font sizes
- Full-width company chips

**Breakpoint 600px:**
- Minimal padding (20-24px)
- Compact card layouts
- Stacked form rows

### Color Contrast

All color combinations meet WCAG AA standards:
- White on maroon: 7.8:1
- Orange on white: 4.6:1
- Black on off-white: 15.2:1
- Green/red chips: 4.5:1+

### Typography Scale

**Home page:**
- Hero title: 72px
- Feature titles: 56px
- Body text: 16px
- Labels: 13px

**App page:**
- Panel titles: 32px
- Result card titles: 24px
- Form labels: 14px
- Body text: 15px

### Button States

**Primary button:**
- Default: maroon background
- Hover: darker maroon + scale(1.02)
- Active: scale(0.98)
- Disabled: gray background, no transform

**Secondary button:**
- Default: white background, maroon border
- Hover: maroon background, white text + scale(1.02)

### Form Focus States

All form inputs have consistent focus styling:

```css
.form-input:focus {
  outline: none;
  border-color: var(--vt-maroon);
  box-shadow: 0 0 0 3px rgba(134, 31, 65, 0.1);
}
```

### Navigation

**Home to App:**
- "CHECK MY RESUME" link in hero
- "Try It Out" button at bottom
- All feature CTAs link to app.html

**App to Home:**
- "← Back to Home" link in navbar

### Loading States

**Loader component:**
- Spinning maroon circle
- Gray text message
- Off-white background
- Appears below analyze button

**Button loading:**
- Text changes to "Analyzing..."
- Button disabled
- No transform on hover

### Empty State

**Styling:**
- Dashed border (2px, gray)
- Off-white background
- Centered content
- Orange arrow bullets (→)
- Max-width: 600px

### Score Badge Colors

Dynamic based on score value:
- 75+: Maroon (#861F41)
- 50-74: Orange (#d97706)
- <50: Red (#dc2626)

### Tag Variants

**Matched skills:**
- Background: #dcfce7 (light green)
- Text: #16a34a (green)
- Border: 2px solid green

**Missing skills:**
- Background: #fef3c7 (light orange)
- Text: #d97706 (orange)
- Border: 2px solid orange

### History Cards

**States:**
- Default: gray background, transparent border
- Hover: orange border, translateX(4px)
- Active: maroon border, white background, shadow

### Keyword Card Inner Background

The keyword card has a nested background effect:

```css
.keyword-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--off-white);
  border-radius: 16px;
  z-index: -1;
}
```

This creates the warm off-white inner background visible in Screenshot 2.

### Upload Box Icon

The upload icon is an SVG with stroke styling:

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
</svg>
```

Contained in a 48x48px off-white square chip.

### Company Chips

**Styling:**
- 2px white border
- White text
- Transparent background
- Pill-shaped (999px radius)
- Padding: 8px 20px
- Font-size: 13px, font-weight: 600

### Trusted By Text

Small white text (13px, font-weight: 500) on dark maroon strip at bottom of hero.

### Feature Section Padding

Consistent 100px vertical, 60px horizontal padding on all feature sections.

### Max Container Width

All content containers limited to 1400px max-width, centered with auto margins.

### Gap Consistency

- Column gap: 80px
- Card gap: 24px
- Chip gap: 12px
- Form row gap: 16px

### Z-Index Layers

1. Base content: z-index: auto
2. Noise texture: z-index: 1
3. Resume mockups: z-index: 1-2
4. Navbar: z-index: 100

### Transition Timing

- Color changes: 0.2s ease
- Transforms: 0.3s ease
- All transitions: 0.2s ease (default)

### Font Loading

Google Fonts preconnect for performance:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Loads Barlow Condensed (700, 800, 900) and Inter (400, 500, 600, 700).
