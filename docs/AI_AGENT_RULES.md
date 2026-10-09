# CodeKids — AI Agent Working Rules

These rules govern all automated and AI-assisted development work on the CodeKids repository. Every AI assistant, agent, or developer collaborating on this project MUST follow these guidelines strictly without exception.

---

## The 15 Mandatory Rules

1. **Read Project Documentation First**: Always inspect `/docs/PRD.md`, `/docs/DESIGN_SYSTEM.md`, `/docs/CURRICULUM.md`, and `/docs/TECHNICAL_SPEC.md` before making architectural or visual changes.
2. **Preserve Existing Design Decisions**: Do not alter established color palettes, typography specs, or layout patterns unless explicitly requested by the project lead.
3. **Do Not Introduce Unnecessary Libraries**: Rely on native Web APIs, React built-ins, and Tailwind CSS. Always evaluate native solutions before considering new npm packages.
4. **Do Not Redesign Unrelated Components**: When fixing a bug or adding a feature to a specific page or component, keep your scope strictly bounded. Do not touch unrelated pages.
5. **Reuse Existing Components**: Search the codebase for existing UI components (`src/components/ui/`) before creating custom elements.
6. **Maintain Responsive Behavior**: Every interface modification must look clean and operate smoothly across Mobile, Tablet, and Desktop screens.
7. **Maintain Accessibility (a11y)**: Ensure clear contrast ratios, visible focus outlines, keyboard navigation support, visible icons alongside colors, and proper ARIA labels.
8. **Avoid Unnecessary Abstraction**: Keep code straightforward, readable, and typed. Do not introduce over-engineered design patterns, factory classes, or complex state managers.
9. **Explain Significant Technical Decisions**: When introducing architectural changes or refactoring core logic, document your rationale clearly in code comments or PR commit messages.
10. **Test Affected Functionality**: Always verify interactive behaviors (such as quiz scoring, editor compilation, or navigation) after implementing changes.
11. **Check for Build & Type Errors**: Run `npm run build` and TypeScript checks (`npx tsc --noEmit`) to verify zero compilation or lint errors before marking a task complete.
12. **Do Not Remove Working Functionality**: Never delete working code, tests, or features without explicit task justification.
13. **Keep UI Consistent with `DESIGN_SYSTEM.md`**: Follow exact hex values (`#4F7DF3`, `#17233C`, `#FFD84D`, `#42C88A`, `#FF6B6B`), font definitions, and spacing tokens.
14. **Keep Content Appropriate for Grades 4–6**: Ensure tone, explanations, and instructions are clear, friendly, and accessible for ages 9–12.
15. **Prioritize Real User Experience Over Visual Novelty**: Focus on clarity, immediate feedback, and intuitive learning flow over flashy animations or complex 3D graphics.
