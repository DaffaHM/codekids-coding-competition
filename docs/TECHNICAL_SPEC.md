# CodeKids — Technical Architecture Specification

## 1. Core Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+ (Strict Mode)
- **Styling**: Tailwind CSS v4 / PostCSS
- **State Management**: React 19 Client Hooks (`useState`, `useContext`, custom hooks)
- **Client Persistence**: Browser `localStorage` with SSR/hydration safety wrappers
- **Testing & Verification**: Next.js ESLint, TypeScript Type Checker (`tsc`), Native Next Build

---

## 2. Directory Structure Architecture

```
codekids/
├── docs/                      # Architectural & product documentation
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── CURRICULUM.md
│   ├── TECHNICAL_SPEC.md
│   └── AI_AGENT_RULES.md
├── src/
│   ├── app/                   # Next.js App Router routes
│   │   ├── layout.tsx         # Root layout with font declarations & providers
│   │   ├── page.tsx           # Homepage (Hero, Why, How, Try Coding, CTA, Footer)
│   │   ├── learn/
│   │   │   ├── page.tsx       # Learning Hub (6 Topic Cards, Path)
│   │   │   └── [topicId]/
│   │   │       ├── page.tsx   # Lesson Section Reader
│   │   │       ├── quiz/
│   │   │       │   └── page.tsx # Quiz View (Questions, Feedback, Score)
│   │   │       └── practice/
│   │   │           └── page.tsx # Interactive Sandbox Editor View
│   │   ├── project/
│   │   │   └── page.tsx       # Final Project Workspace
│   │   └── certificate/
│   │       └── page.tsx       # Certificate Display & Print/Download View
│   ├── components/
│   │   ├── ui/                # Atomic design components (Button, Card, Badge, Modal, Callout)
│   │   ├── layout/            # Navbar, Footer, Section Containers
│   │   ├── hub/               # Topic Cards, Path Indicator, Progress Banner
│   │   ├── lesson/            # Content Renderer, Diagram Viewers, Pagination
│   │   ├── quiz/              # Question Card, Option Button, Score Summary
│   │   ├── editor/            # Code Editor Component, Live Preview Iframe, Console
│   │   └── certificate/       # Certificate Card, Print Handler
│   ├── content/               # Static typed curriculum content
│   │   ├── topics.ts          # Central 6-topic definition dataset
│   │   └── quizzes.ts         # Topic quiz questions and explanations
│   ├── lib/                   # Utility modules
│   │   ├── storage.ts         # Safe localStorage persistence layer
│   │   ├── sandbox.ts         # HTML/CSS/JS iframe document generator & sanitizer
│   │   └── constants.ts       # Global brand & app configuration constants
│   ├── types/                 # Shared TypeScript interfaces
│   │   ├── curriculum.ts      # Topic, Section, Quiz, CodePractice definitions
│   │   └── progress.ts        # User progress, score, persistence schemas
│   └── hooks/                 # Custom React hooks
│       └── useProgress.ts     # Client state management for learning progress
├── public/                    # Static assets (SVGs, icons, logos, Robo illustrations)
├── package.json
├── tsconfig.json
├── tailwind.config.ts / postcss.config.mjs
└── README.md
```

---

## 3. Sandboxed Coding Sandbox Security Architecture

### Problem:
Evaluating user-written HTML, CSS, and JavaScript directly inside the main application window poses severe security risks (DOM pollution, XSS, global variable leaks).

### Solution: Safe Isolated Client-Side Iframe Sandbox

1. **Isolation Layer**: Code execution occurs exclusively within an `<iframe>` configured with strict sandbox attributes:
   ```html
   <iframe
     sandbox="allow-scripts"
     srcdoc="<compiled_html_doc>"
     title="CodeKids Live Preview"
     className="w-full h-full border-0"
   />
   ```
2. **Compilation Pipeline**:
   The `sandbox.ts` utility accepts three strings (`html`, `css`, `js`) and constructs a clean HTML document string:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <style>
         /* Normalization & custom user CSS */
         ${userCss}
       </style>
     </head>
     <body>
       ${userHtml}
       <script>
         try {
           ${userJs}
         } catch (err) {
           console.error(err.message);
         }
       </script>
     </body>
   </html>
   ```
3. **Communication**: Console errors or messages are trapped inside the iframe script block and transmitted safely to the parent editor via `window.parent.postMessage()` if console feedback is enabled.

---

## 4. Client-Side Persistence Architecture (`localStorage`)

### Data Model:
```typescript
export interface UserProgressData {
  topics: Record<string, {
    status: 'not_started' | 'in_progress' | 'completed';
    lastSectionIndex: number;
    quizScore?: number;
    quizCompleted: boolean;
    practiceCompleted: boolean;
    updatedAt: string;
  }>;
  finalProject: {
    completed: boolean;
    studentName?: string;
    completedAt?: string;
  };
}
```

### Storage Resilience (`lib/storage.ts`):
- Wraps `localStorage.getItem()` and `localStorage.setItem()` inside `try-catch` blocks to gracefully handle private browsing mode restrictions, disabled storage, or quota exceptions.
- Provides fallback to in-memory state if `localStorage` fails.
- Avoids React SSR Hydration Mismatch by delaying `localStorage` reads until after client mount (`useEffect`).

---

## 5. Third-Party Library Policy

To ensure high performance, zero unexpected breaking changes, and minimal bundle bloat, CodeKids maintains a **strict zero unnecessary library policy**:
- **Code Editor**: Clean, lightweight textarea/code input container with line numbering and syntax highlighting hints. (Avoid heavy web editors like Monaco unless proved strictly necessary).
- **Icons**: Clean inline SVGs or lightweight SVG icon helper components.
- **Animations**: CSS transitions and Tailwind utility keyframes (`transition-all duration-300`).
- **Certificate Printing/Download**: Clean CSS `@media print` rules and HTML5 Canvas / SVG rendering.
