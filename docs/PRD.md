# CodeKids — Product Requirement Document (PRD)

## 1. Executive Summary

- **Product Name**: CodeKids
- **Target Audience**: Elementary school students, primarily Grades 4–6 (ages 9–12).
- **Competition Theme**: Innovating Education Through Technology
- **Subtheme**: Web Education for Kids
- **Product Philosophy**: **LEARN → UNDERSTAND → PRACTICE → CREATE**
- **Core Objective**: Deliver a web-based educational experience where children learn foundational programming concepts, test their understanding, practice coding interactively in a safe environment, build a mini personal website, and earn a completion certificate.

CodeKids is designed to feel like a **genuine educational product**—clean, structured, and visually engaging—avoiding both dry, generic school portals and overly gamified "game UI" distractors.

---

## 2. Core User Personas & Journeys

### Persona A: The Guided Learner (Beginner)
- **Profile**: A 4th–6th grade student with zero prior coding experience.
- **Journey**:
  1. Arrives at the Homepage and clicks **"Mulai Belajar"**.
  2. Enters the **Learning Hub** and sees the **Recommended Learning Path** (01 → 02 → 03 → 04 → 05 → 06).
  3. Begins Topic 01 ("Apa Itu Coding?"), completes the 5 structured learning sections, and takes the 5-question quiz.
  4. Progresses step-by-step through Algorithm, HTML, CSS, JavaScript, and culminates in the Final Project.
  5. Builds their website, types their name, and receives a personalized certificate.

### Persona B: The Self-Directed Learner (Curious Explorer)
- **Profile**: A student who already understands basic computer concepts or wants to jump into HTML/CSS directly.
- **Journey**:
  1. Opens the **Learning Hub**.
  2. Notices all topics are unlocked and directly selects Topic 03 ("HTML Basics") or Topic 06 ("Final Project").
  3. Completes the desired interactive practice or final project without mandatory prerequisite lockouts.

---

## 3. Product Principles & Boundaries

### Included Features (In-Scope)
- **6-Topic Curriculum**: What is Coding?, Algorithm, HTML Basics, CSS Basics, JavaScript Basics, Final Project.
- **No Mandatory Locking**: All 6 learning topics are instantly accessible; a recommended path is displayed visually for guidance.
- **Structured Content**: Multi-section lesson reader with targeted illustrations (only where they improve understanding).
- **Interactive Quiz Engine**: 1 question at a time, 4 large readable options, instant visual feedback, concise explanation, retry loop.
- **Safe Sandboxed Code Environment**: Side-by-side Editor & Live Preview rendered safely inside an isolated client-side iframe sandbox.
- **Final Project & Certificate**: Guided prompt to build a mini website (HTML + CSS + JS) with a client-generated certificate containing the student's name.
- **Client-Side Progress Persistence**: Uses browser `localStorage` to preserve progress (Not Started, In Progress, Completed) without requiring account login.

### Explicit Non-Goals / Anti-Patterns (Out-of-Scope)
- **No User Accounts / Authentication**: No sign-up, sign-in, password reset, or user profile creation.
- **No Heavy Gamification**: No XP points, levels, coin systems, dynamic leaderboards, avatars, or social feeds.
- **No Distracting Game UI**: Avoid cartoonish overlays, excessive animations, sound effect clutter, or pastel saturation.
- **No Mandatory Unlocking**: No locked content gates or forced linear restrictions.
- **No Backend Infrastructure**: Entirely client-side execution; no API servers or database dependencies.

---

## 4. Module & Feature Specifications

### 4.1 Learning Hub (`/learn`)
- **Header Banner**: "Yuk, Mulai Belajar Coding!" & "Apa yang Akan Kamu Pelajari?"
- **Recommended Path Visualizer**: A clear numbered step indicator (01 to 06).
- **Topic Cards Grid**: 6 distinct cards presenting:
  - Topic number badge (01 - 06)
  - Topic title & short descriptive blurb
  - Status badge: `Belum dimulai` (Default), `Sedang belajar`, `Selesai`
  - Direct Action Button: "Mulai Belajar" / "Lanjutkan" / "Ulangi"
- **Persistence**: Reads/writes status to `localStorage`.

### 4.2 Lesson Experience (`/learn/[topicId]`)
- **Focused View**: Single topic context without distracting global navigation sidebars.
- **Header**: Topic title, level badge, step indicator (e.g., "Materi 1 dari 5").
- **Content Renderer**: Markdown/Structured sections formatted with clear typography, key callouts, code snippets, and optional purposeful diagrams.
- **Navigation Controls**: Next section, previous section, and "Lanjut ke Quiz / Practice" CTA at the end.

### 4.3 Quiz Engine (`/learn/[topicId]/quiz`)
- **Progress Header**: "Soal X dari Y" with visual progress bar.
- **Question Card**: Single prominent question text.
- **Options**: 4 large interactive response buttons with accessible focus rings and key indicators.
- **Feedback Banner**: Immediate color-coded state (Success `#42C88A` or Retry `#FF6B6B`), concise explanation text, and "Lanjut" button.
- **Score Summary Screen**:
  - Final score (e.g., 5/5 or 80%)
  - Encouraging message
  - Actions: "Coba Lagi" (Retry) or "Kembali ke Learning Hub".

### 4.4 Interactive Coding Practice (`/learn/[topicId]/practice`)
- **Split Layout**: Split workspace featuring Editor (left) and Live Preview (right), responsive stack on mobile.
- **Controls Bar**: Run Code button, Reset Code button, Hint toggle, Exercise prompt instructions.
- **Security & Execution**: Code renders inside a sandboxed `<iframe>` with `sandbox="allow-scripts"` and restricted parent access.
- **Validation**: Automatic check of output against lesson goals (e.g., "Contains `<h1>` tag", "Background color is blue").

### 4.5 Final Project & Certificate (`/project` & `/certificate`)
- **Project Brief**: Build a personal mini-website combining HTML (Heading, Paragraph, Button), CSS (Colors, Fonts, Spacing), and JS (Button click interaction).
- **Completion Trigger**: User clicks "Selesaikan & Ambil Sertifikat".
- **Modal Input**: Student types their full name.
- **Certificate Generator**: Renders high-resolution formatted certificate view with student name, date, CodeKids branding, and download/print capabilities.

---

## 5. Non-Functional Requirements

- **Performance**: Lighthouse score > 90 on Desktop/Mobile. Fast static initial paint.
- **Accessibility**: WCAG 2.1 AA compliance (keyboard navigable quiz options, high contrast ratios, visible focus outlines, semantic tags).
- **Responsiveness**: Fully fluid layout supporting Mobile (<640px), Tablet (640px–1024px), and Desktop (>1024px).
