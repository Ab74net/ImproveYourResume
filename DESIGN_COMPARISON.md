# Design Comparison: Before vs After

## Visual Identity

### Before
```
Colors: Teal (#0f766e), Blue gradients, Generic tech palette
Typography: IBM Plex Sans, Space Grotesk (standard weights)
Feel: Generic SaaS, AI tool, startup aesthetic
```

### After
```
Colors: VT Maroon (#861F41), VT Orange (#E5751F), Paper texture
Typography: Barlow Condensed (900), Inter (editorial weights)
Feel: Bold editorial, university brand, confident and intentional
```

## Layout Philosophy

### Before
- Symmetric two-column grid
- Centered content
- Equal padding everywhere
- Soft rounded corners (24px)
- Floating cards with blur backdrop

### After
- Asymmetric, intentional layouts
- Overlapping elements
- Varied white space
- Sharp corners (0px) or pill shapes (999px)
- Solid backgrounds with editorial shadows

## Hero Section

### Before
```
┌─────────────────────────────────────┐
│  [Small badge]                      │
│  Resume Reviewer Studio             │
│  Upload a resume, target a role...  │
│  [chip] [chip] [chip] [chip]        │
└─────────────────────────────────────┘
```

### After
```
┌─────────────────────────────────────┐
│ [POWERED BY AI] [INSTANT FEEDBACK]  │
│                                     │
│ YOUR RESUME.        [resume card]   │
│   LET'S REVIEW IT.    [card]        │
│                         [card]      │
│ ● ○ ○                               │
└─────────────────────────────────────┘
```

## Typography Scale

### Before
- H1: 2.1rem - 4.2rem (clamp)
- H2: Default
- Body: 1.02rem
- Style: Readable, professional

### After
- H1: 60px - 140px (clamp)
- H2: 40px - 72px (clamp)
- Body: 16px - 18px
- Style: OVERSIZED, UPPERCASE, BOLD

## Button Styles

### Before
```css
.primary-btn {
  border-radius: 14px;
  padding: 0.92rem 1.15rem;
  background: linear-gradient(135deg, teal...);
  font-weight: 700;
}
```

### After
```css
.btn--primary {
  border-radius: 999px;
  padding: 16px 32px;
  background: #861F41;
  font-family: Barlow Condensed;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Card Styles

### Before
```css
.summary-card {
  border: 1px solid rgba(255,255,255,0.42);
  border-radius: 24px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(16px);
  box-shadow: 0 22px 60px rgba(7,17,31,0.12);
}
```

### After
```css
.score-card {
  border: none;
  border-radius: 0;
  background: #FFFFFF;
  box-shadow: 0 4px 12px rgba(26,26,26,0.08);
}

.step-card {
  box-shadow: 12px 12px 0px #861F41;
}
```

## Section Transitions

### Before
- Flat horizontal divisions
- Consistent spacing
- No visual breaks

### After
- Diagonal clip-path cuts
- Varied section heights
- Strong visual hierarchy
- Maroon section with white text
- 8px maroon border on demo section

## Form Elements

### Before
```css
input {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  background: var(--surface-strong);
}
```

### After
```css
.form-input {
  border: 2px solid var(--gray-300);
  border-radius: 0;
  padding: 14px 16px;
  background: var(--white);
}

.form-input:focus {
  border-color: var(--vt-maroon);
  box-shadow: 0 0 0 3px rgba(134,31,65,0.1);
}
```

## Color Usage

### Before
- Primary: Teal (#0f766e)
- Accent: Orange (#d97706)
- Background: Blue gradient
- Text: Dark blue (#142033)

### After
- Primary: VT Maroon (#861F41)
- Secondary: VT Orange (#E5751F)
- Background: Off-white (#F5F5F0) with paper texture
- Text: Near black (#1A1A1A)

## Spacing System

### Before
- Consistent: 16px, 24px, 32px
- Symmetric padding
- Equal gaps

### After
- Varied: 20px, 32px, 40px, 60px, 100px
- Asymmetric padding
- Intentional white space

## Shadow Strategy

### Before
- Soft shadows everywhere
- Blur radius: 22px - 60px
- Subtle depth

### After
- Editorial shadows on step cards (12px solid)
- Soft shadows on score cards (4px - 8px)
- No shadows on many elements
- High contrast depth

## Animation Approach

### Before
- Minimal animations
- Focus on functionality

### After
- Scroll reveal (fade + translate)
- Hover lifts (translateY)
- Scale transforms on buttons
- Smooth transitions (0.3s ease)

## Responsive Strategy

### Before
- Breakpoint: 1080px, 720px
- Stack columns
- Reduce padding

### After
- Breakpoints: 1200px, 900px, 600px
- Hide hero images on mobile
- Single column layouts
- Maintain visual hierarchy

## Brand Personality

### Before
- Professional
- Tech-focused
- Neutral
- Approachable

### After
- Bold
- University-branded
- Confident
- Editorial

## User Experience

### Before
- Immediate access to form
- Compact layout
- All content visible

### After
- Hero introduction
- Scrollable sections
- Progressive disclosure
- Storytelling flow

## Accessibility

### Before
- Good contrast
- Focus styles
- Semantic HTML

### After
- Maintained contrast (maroon/orange tested)
- Enhanced focus styles (3px orange outline)
- Semantic HTML preserved
- Added scroll reveal for engagement
