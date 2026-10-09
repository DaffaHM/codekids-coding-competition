# CodeKids — Design System Specification

## 1. Design Philosophy & Brand Identity

CodeKids balances **modern technology (70%)** with **approachable playfulness (30%)**. It targets elementary school students in grades 4–6 (ages 9–12). The design is clean, friendly, credible, and educational.

### Design Principles:
1. **Purposeful Visuals**: Illustrations and diagrams are included *only* when they enhance conceptual understanding. Avoid decorative graphic clutter.
2. **Selective Mascot Usage**: The mascot **Robo** appears as a friendly learning companion on key milestone screens (e.g., Welcome, Quiz Completion, Certificate), never dominating or cluttering lesson content.
3. **Low Cognitive Load**: High contrast, readable typography, clear call-to-actions, and straightforward navigation.
4. **Anti-Patterns to Avoid**:
   - No excessive pastel color palettes or rainbow gradients.
   - No noisy emoji overload or cartoon decorations.
   - No heavy glassmorphism, 3D graphics, or distracting game UI overlays.
   - No excessive border-radii on every single container element.

---

## 2. Color Palette

The color system uses Tailwind CSS custom utility extensions mapped to CSS custom properties.

| Color Name | Hex Code | Purpose / Application |
| :--- | :--- | :--- |
| **Primary Blue** | `#4F7DF3` | Brand primary, main action buttons, active navigation, active step indicators |
| **Dark Navy** | `#17233C` | Primary text headings, dark structural background elements, contrast cards |
| **Accent Yellow** | `#FFD84D` | Key highlights, celebratory callouts, badge accents, star indicators |
| **Pure White** | `#FFFFFF` | Card backgrounds, editor background, primary container fills |
| **App Background** | `#F6F8FC` | Soft neutral page background |
| **Success Green** | `#42C88A` | Correct quiz answers, completion badges, success alerts, valid code indicators |
| **Error Red** | `#FF6B6B` | Incorrect quiz feedback, code error highlights, alert callouts |

### Neutral Tones & Muted States:
- **Text Body**: `#2D3748` (Slate 800)
- **Text Muted**: `#718096` (Slate 500)
- **Border Neutral**: `#E2E8F0` (Slate 200)
- **Card Hover Background**: `#EEF2FF` (Indigo 50)

---

## 3. Typography System

### Font Families:
- **Headings / Titles**: `Fredoka`, `Baloo 2`, or sans-serif rounded fallback (`var(--font-fredoka)`). Friendly, crisp display feel.
- **Body / Interface**: `Nunito`, `Inter`, or system sans-serif (`var(--font-nunito)`). Maximum legibility for young readers.
- **Code / Editor**: `JetBrains Mono`, `Fira Code`, or monospace (`var(--font-jetbrains)`). Clean character separation (`0` vs `O`, `l` vs `1`).

### Type Scale:
- **Display 1 (Hero)**: `3rem` (48px) / Line Height 1.2 / Font Weight 700
- **Heading 1 (Page Title)**: `2.25rem` (36px) / Line Height 1.25 / Font Weight 700
- **Heading 2 (Section Title)**: `1.75rem` (28px) / Line Height 1.3 / Font Weight 600
- **Heading 3 (Card Title)**: `1.25rem` (20px) / Line Height 1.4 / Font Weight 600
- **Body Large**: `1.125rem` (18px) / Line Height 1.6 / Font Weight 400 or 600
- **Body Regular**: `1rem` (16px) / Line Height 1.5 / Font Weight 400
- **Caption / Small**: `0.875rem` (14px) / Line Height 1.4 / Font Weight 500
- **Code Editor**: `0.95rem` (15px) / Monospace / Line Height 1.5

---

## 4. UI Components & Tokens

### Buttons & Interactive Elements
- **Primary Button**: Background `#4F7DF3`, Text `#FFFFFF`, Rounded `0.75rem` (12px), Shadow `0 4px 6px -1px rgba(79, 125, 243, 0.2)`. Hover: `#3B68E0`. Active scale: `0.98`.
- **Secondary / Outline Button**: Border `2px solid #4F7DF3`, Text `#4F7DF3`, Background Transparent. Hover: `#F0F4FE`.
- **Success Button / Indicator**: Background `#42C88A`, Text `#FFFFFF`.
- **Quiz Option Card**: White card with `2px solid #E2E8F0`, rounded `1rem` (16px), padding `1.25rem`.
  - *Hover State*: Border `#4F7DF3`, Background `#F6F8FC`.
  - *Selected / Correct State*: Border `#42C88A`, Background `#E8F8F0`, Text `#17233C`.
  - *Incorrect State*: Border `#FF6B6B`, Background `#FEEFEF`, Text `#17233C`.

### Cards & Containers
- **Border Radius**: Cards `1rem` (16px), Buttons `0.75rem` (12px), Badges `9999px` (Full pill).
- **Box Shadows**: Soft ambient shadow `0 10px 25px -5px rgba(23, 35, 60, 0.05)`.
- **Borders**: Clean `1px solid #E2E8F0` or `2px solid` for focus states.

---

## 5. Responsive & Layout Rules

- **Container Max Width**: `1200px` centered with auto padding (`px-4 sm:px-6 lg:px-8`).
- **Breakpoints**:
  - `sm`: `640px` (Mobile landscape / small tablets)
  - `md`: `768px` (Tablets portrait)
  - `lg`: `1024px` (Desktops / Laptops)
  - `xl`: `1280px` (Large displays)
- **Mobile Editor Layout**: On screens `< 768px`, editor and preview toggle via tabs (Editor Tab vs Live Output Tab) to ensure comfortable typing space for smaller devices. On screens `>= 768px`, standard 50/50 side-by-side split.

---

## 6. Accessibility (a11y) Standards

- **Contrast Ratios**: Minimum 4.5:1 for body text against backgrounds.
- **Focus Rings**: All interactive elements display a prominent focus outline (`ring-2 ring-[#4F7DF3] ring-offset-2`).
- **Color Independence**: Quiz options and success badges use visible icons (e.g., Checkmark `✓` or Cross `✗`) in addition to color indicators.
- **Touch Targets**: Minimum target size of `44px x 44px` on mobile for comfortable tapping by children.
