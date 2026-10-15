<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CodeKids Project Guidelines for AI Agents

For complete developer and AI agent working rules, refer to:
- [`docs/AI_AGENT_RULES.md`](file:///d:/Coding/codekids/docs/AI_AGENT_RULES.md): The 16 mandatory development rules.
- [`docs/PRD.md`](file:///d:/Coding/codekids/docs/PRD.md): Current product requirement status.
- [`docs/DESIGN_SYSTEM.md`](file:///d:/Coding/codekids/docs/DESIGN_SYSTEM.md): Visual tokens and styling guide.
- [`docs/CURRICULUM.md`](file:///d:/Coding/codekids/docs/CURRICULUM.md): Content syllabus and challenges.
- [`docs/TECHNICAL_SPEC.md`](file:///d:/Coding/codekids/docs/TECHNICAL_SPEC.md): Technical architecture and library policy.
- [`prompts/RAW_PROMPT_LOG.md`](file:///d:/Coding/codekids/prompts/RAW_PROMPT_LOG.md): Historical raw prompt journal.

## Core Rules Summary
1. **Never break working features**: Always test affected flows after modifications.
2. **Strictly bounded scope**: Only edit files required for the specific prompt.
3. **Always log development prompts**: Record every user prompt into `prompts/RAW_PROMPT_LOG.md`.
4. **Zero compilation errors**: Run `npx tsc --noEmit` before finishing any implementation task.
5. **Documentation tasks are documentation only**: Do not alter `.tsx`, `.ts`, `.css`, or source code during documentation tasks.

