# CodeKids 🚀

**CodeKids** is an interactive educational web platform designed to teach foundational coding concepts to elementary school students (primarily Grades 4–6, ages 9–12).

---

## 🌟 Product Concept & Philosophy

CodeKids makes learning to code approachable, structured, and fun without relying on distracting game UI mechanics or locked lesson barriers.

### Core Philosophy:
**LEARN → UNDERSTAND → PRACTICE → CREATE**

- **Guided & Self-Directed Paths**: Beginners follow a recommended path (01 to 06), while experienced learners can directly jump into any topic.
- **Immediate Feedback**: Instant visual feedback on quizzes and live code execution.
- **Safe Interactive Coding**: Side-by-side code editor and sandboxed live preview iframe.
- **Zero Login Friction**: No accounts or passwords required; progress persists locally via browser `localStorage`.

---

## 📚 Curriculum Overview

1. **01 — Apa Itu Coding?**: Learn what coding is, computer instructions, and real-world applications.
2. **02 — Algorithm**: Understand algorithms, logical sequencing, and step-by-step problem solving.
3. **03 — HTML Basics**: Discover page structures, headings, paragraphs, and buttons.
4. **04 — CSS Basics**: Learn colors, typography, background styling, and visual layout.
5. **05 — JavaScript Basics**: Explore variables, simple logic, and interactive button events.
6. **06 — Final Project & Certificate**: Build your first mini website and generate an official completion certificate!

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS
- **Persistence**: Safe client-side `localStorage` wrapper
- **Sandbox Execution**: Isolated client-side `<iframe>` environment

---

## 📂 Project Structure

```
codekids/
├── docs/                      # Master project & technical specs
│   ├── PRD.md                 # Product Requirement Document
│   ├── DESIGN_SYSTEM.md       # Visual identity & UI token guidelines
│   ├── CURRICULUM.md          # 6-topic content & data specifications
│   ├── TECHNICAL_SPEC.md      # Sandbox security & client persistence specs
│   └── AI_AGENT_RULES.md      # 15 mandatory AI development rules
├── src/
│   ├── app/                   # Next.js App Router pages
│   ├── components/            # UI components (hub, lesson, quiz, editor, layout)
│   ├── content/               # Structured curriculum data
│   ├── lib/                   # Safe storage & sandbox generator utilities
│   ├── types/                 # Shared TypeScript interfaces
│   └── hooks/                 # Custom React state hooks
├── public/                    # Static assets & illustrations
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build & Type Check
```bash
npm run build
```

---

## 🎨 Design System Quick Reference

- **Primary Blue**: `#4F7DF3`
- **Dark Navy**: `#17233C`
- **Accent Yellow**: `#FFD84D`
- **Success Green**: `#42C88A`
- **Error Red**: `#FF6B6B`
- **Background**: `#F6F8FC`
