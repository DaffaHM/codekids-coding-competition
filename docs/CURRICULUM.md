# CodeKids — Curriculum Architecture & Content Specification

## 1. Overview & Learning Path

The CodeKids curriculum is structured into **6 core topics** adhering to the philosophy:
**LEARN → UNDERSTAND → PRACTICE → CREATE**

Recommended Learning Sequence:
`01. Apa Itu Coding?` → `02. Algorithm` → `03. HTML` → `04. CSS` → `05. JavaScript` → `06. Final Project`

---

## 2. Topic Details & Learning Goals

### Topic 01: Apa Itu Coding? (What is Coding?)
- **Format**: 5 structured material sections + 5 Multiple-Choice Questions (MCQs) quiz.
- **Learning Goals**:
  - Understand what coding is in simple terms.
  - Understand that computers require explicit, unambiguous instructions.
  - Recognize everyday applications of software and code (games, apps, robots, websites).
  - Understand that instructions must be clear and ordered.
  - Get introduced to the roles of HTML, CSS, and JavaScript.
- **Content Sections**:
  1. *Apa itu Coding?*: Coding adalah cara kita berbicara dan memberikan instruksi kepada komputer.
  2. *Komputer Membutuhkan Instruksi*: Komputer itu pintar, tapi dia butuh panduan langkah demi langkah.
  3. *Coding Ada di Sekitar Kita*: Dari game favoritmu, aplikasi HP, hingga mesin cuci otomatis.
  4. *Coding Harus Jelas dan Berurutan*: Instruksi harus urut dan tidak membingungkan.
  5. *Bahasa Pemrograman*: Mengenal HTML (struktur), CSS (tampilan), dan JavaScript (aksi).

---

### Topic 02: Algorithm (Algoritma)
- **Format**: Learning material + Sequence/ordering interactive quiz activities.
- **Learning Goals**:
  - Understand what an algorithm is (a step-by-step recipe/plan to solve a problem).
  - Understand sequence and exact order of execution.
  - Identify logical bugs when steps are out of order.
- **Content Sections**:
  1. *Apa itu Algoritma?*: Algoritma adalah langkah-langkah berurutan untuk menyelesaikan masalah (seperti resep membuat kue).
  2. *Pentingnya Urutan (Sequence)*: Mengapa urutan menyikat gigi atau memakai sepatu itu penting.
  3. *Menemukan Langkah yang Hilang*: Melatih logika anak menemukan instruksi yang terlewat.

---

### Topic 03: HTML Basics (Dasar HTML)
- **Format**: Learning material + Interactive Code Editor & Live Preview.
- **Learning Goals**:
  - Understand that HTML creates the structure and skeleton of a webpage.
  - Recognize tags like `<h1>` to `<h6>`, `<p>`, `<button>`, `<img>`.
  - Write basic elements and observe live rendering instantly.
- **Practice Challenge**:
  - Task: Create a heading `<h1>Halo, Aku CodeKids!</h1>`, a paragraph `<p>Aku sedang belajar HTML.</p>`, and a button `<button>Klik Aku</button>`.

---

### Topic 04: CSS Basics (Dasar CSS)
- **Format**: Learning material + Interactive Code Editor & Live Preview.
- **Learning Goals**:
  - Understand that CSS styles the appearance of HTML elements (colors, sizes, fonts).
  - Learn basic CSS properties: `color`, `background-color`, `font-size`, `text-align`, `border-radius`.
  - Connect CSS declarations to HTML elements.
- **Practice Challenge**:
  - Task: Style a heading with color `#4F7DF3`, change paragraph text size, and add a background color to a button.

---

### Topic 05: JavaScript Basics (Dasar JavaScript)
- **Format**: Learning material + Interactive Code Editor & Live Preview.
- **Learning Goals**:
  - Understand that JavaScript gives life, interactivity, and logic to websites.
  - Learn basic concepts: variables (`let`, `const`), simple functions, and button click events (`onclick`).
  - Introduce simple conditional checks (`if/else`) and safe age-appropriate loops.
- **Practice Challenge**:
  - Task: Attach an `onclick` alert or text change event to a button.

---

### Topic 06: Final Project & Certificate (Proyek Akhir & Sertifikat)
- **Format**: Brief instructions + Full HTML/CSS/JS Coding Workspace + Live Output + Certificate Modal.
- **Project Brief**: "Buat Website Pertamamu!"
- **Requirements**:
  1. Add a custom heading with your name or website title.
  2. Add at least one paragraph describing yourself or your favorite hobby.
  3. Apply custom colors and font styling using CSS.
  4. Create an interactive button that triggers a JavaScript action (e.g., changes text or shows a greeting message).
- **Certificate Trigger**: Upon fulfilling the requirements, the student enters their name to generate and print/download their official CodeKids certificate.

---

## 3. Data Schemas (TypeScript Contracts)

```typescript
export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown formatted
  illustrationType?: 'diagram' | 'comparison' | 'code-preview' | 'none';
  illustrationData?: Record<string, unknown>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CodePractice {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  instructions: string[];
  solutionHints: string[];
  validationRules: {
    ruleId: string;
    description: string;
    checker: string; // Evaluation strategy identifier
  }[];
}

export interface Topic {
  id: string;
  number: string; // e.g., "01"
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  type: 'quiz_topic' | 'coding_topic' | 'project_topic';
  sections: LessonSection[];
  quizQuestions?: QuizQuestion[];
  codePractice?: CodePractice;
}
```
