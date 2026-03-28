# Demo Page Layout Guide

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEMO PAGE HEADER                         │
│  Resume Reviewer Studio - Demo Mode                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────────────────────┐
│   INPUT PANEL        │  │        RESULTS PANEL                  │
│   (Left Side)        │  │        (Right Side)                   │
│                      │  │                                        │
│  • Demo Scenario     │  │  ┌──────────────┬──────────────────┐ │
│  • Target Role       │  │  │  FEEDBACK    │  DOCUMENT VIEW   │ │
│  • Target Company    │  │  │  PANEL       │                  │ │
│  • STEM Major        │  │  │              │  ┌─────────────┐ │ │
│  • Resume Text       │  │  │  ┌────────┐  │  │ Legend:     │ │ │
│  • Job Description   │  │  │  │ Score  │  │  │ 🔴🟡🟢      │ │ │
│  • [Analyze Button]  │  │  │  │  87    │  │  └─────────────┘ │ │
│                      │  │  │  │ ━━━━━  │  │                  │ │
│                      │  │  │  └────────┘  │  ┌─────────────┐ │ │
│                      │  │  │              │  │  DOCUMENT   │ │ │
│                      │  │  │  Keywords:   │  │             │ │ │
│                      │  │  │  82%         │  │  HOKIE      │ │ │
│                      │  │  │  ✓ Swift     │  │  STUDENT    │ │ │
│                      │  │  │  ✗ UIKit     │  │  ─────────  │ │ │
│                      │  │  │              │  │             │ │ │
│                      │  │  │  Changes:    │  │  EDUCATION  │ │ │
│                      │  │  │  ① Change 1  │  │  [green]    │ │ │
│                      │  │  │  ② Change 2  │  │             │ │ │
│                      │  │  │  ③ Change 3  │  │  EXPERIENCE │ │ │
│                      │  │  │  ④ Change 4  │  │  [red/yel]  │ │ │
│                      │  │  │  ⑤ Change 5  │  │             │ │ │
│                      │  │  │              │  │  PROJECTS   │ │ │
│                      │  │  └──────────────┘  │  [green]    │ │ │
│                      │  │                     └─────────────┘ │ │
└──────────────────────┘  └──────────────────────────────────────┘
```

## Component Breakdown

### Feedback Panel (380px wide)

**Overall Fit Score**
- Large circular badge (120px diameter)
- Score number (87)
- Color: green (75+), yellow (50-74), red (<50)
- Progress bar below

**Keyword Coverage**
- Large percentage (82%)
- Keyword chips:
  - Green with ✓ for matched
  - Red with ✗ for missing
  - Max 4 of each shown

**Suggested Changes**
- Numbered list (1-5)
- Severity dot (right side):
  - Red = high priority
  - Yellow = medium priority
  - Green = low priority
- Clickable items
- Hover effect: shift right, shadow

### Document View (Flexible width)

**Legend Bar**
- Centered at top
- Three items: 🔴 Needs improvement | 🟡 Minor changes | 🟢 Already strong

**Document Container**
- Gray background (#e5e7eb)
- Padding and shadow for depth

**Document Page**
- White background
- Max width: 850px
- Centered
- Shadow for paper effect
- Padding: 56px 64px

**Document Content**
- Header: Name (20pt, bold) + Contact (10pt)
- Section titles: 11.5pt, uppercase, bold
- Body text: 11pt, line-height 1.5
- Highlights:
  - Red: rgba(254, 226, 226, 0.7) + #dc2626 border
  - Yellow: rgba(254, 243, 199, 0.7) + #d97706 border
  - Green: rgba(220, 252, 231, 0.7) + #16a34a border

## Interaction Flow

1. User selects demo scenario
2. Form auto-populates
3. User clicks "Run mock analysis"
4. 1.5s loading animation
5. Results appear:
   - Feedback panel renders on left
   - Document view renders on right
6. User reviews score and keywords
7. User clicks a suggested change
8. Document scrolls to target line
9. Target line pulses (1s animation)
10. User reviews highlighted section

## Responsive Behavior

**Desktop (>1024px)**
- Two-column layout
- Document panel sticky
- Full features

**Tablet/Mobile (<1024px)**
- Single column (stacked)
- Feedback panel first
- Document panel below
- Document container max-height: 600px
- Scrollable document

## Color Palette

**Highlights**
- Red: #dc2626 (border), rgba(254, 226, 226, 0.7) (bg)
- Yellow: #d97706 (border), rgba(254, 243, 199, 0.7) (bg)
- Green: #16a34a (border), rgba(220, 252, 231, 0.7) (bg)

**Score Ring**
- High (75+): #0f766e to #115e59 gradient
- Mid (50-74): #d97706 to #b45309 gradient
- Low (<50): #dc2626 to #991b1b gradient

**Document**
- Page: #ffffff
- Background: #e5e7eb
- Text: #1f2937
- Section titles: #111827
- Contact: #4b5563

## Typography

**Document**
- Font: Segoe UI, system-ui, -apple-system
- Name: 20pt, bold
- Section titles: 11.5pt, bold, uppercase
- Body: 11pt
- Contact: 10pt

**Feedback Panel**
- Score: 2.5rem, bold
- Keyword %: 2rem, bold
- Section titles: 0.88rem, uppercase
- Change text: 0.88rem
- Chips: 0.78rem

## Animation Details

**Pulse Effect**
```css
@keyframes pulse-highlight {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```
Duration: 1s
Easing: ease

**Change Item Hover**
- Transform: translateX(3px)
- Shadow: 0 2px 8px rgba(15, 118, 110, 0.15)
- Duration: 0.2s
- Easing: ease

**Score Progress Bar**
- Width transition: 0.6s ease
- Animates from 0 to score%
