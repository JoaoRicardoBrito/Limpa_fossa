<!-- GSD:project-start source:PROJECT.md -->
## Project

**Limpa Fossa Express**

Landing page profissional e de alta conversão para serviços de limpeza de fossa, desentupimento e limpeza de caixa de gordura. Permite que clientes agendem serviços online de forma rápida, e transmite credibilidade visual através de métricas públicas de satisfação. Produto voltado para clientes finais que precisam de atendimento urgente ou programado.

**Core Value:** O cliente agenda o serviço em menos de 60 segundos, sem telefonemas — e chega com confiança pelo que vê na página.

### Constraints

- **Tech Stack**: React + Vite + TS + Tailwind + Supabase — stack fixo conforme PRD
- **Design**: Paleta verde, azul e branco — definida no tailwind.config.js
- **Mobile-First**: Layout responsivo obrigatório desde o início
- **Performance**: Landing page deve carregar rapidamente (LCP < 2.5s) — conversão depende de velocidade
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | 18.3.x | UI rendering | Last stable 18; safest given shadcn/Recharts compatibility risks with React 19 |
| Vite | 5.4+ | Dev server + bundler | Production standard; Vite 6 was RC-only as of Aug 2025 |
| TypeScript | 5.4+ | Type safety | shadcn scaffolding targets TS 5.x; use `strict: true` |
| Tailwind CSS | 3.4.x | Utility styling | **shadcn/ui requires Tailwind 3 — do NOT use v4** |
| shadcn/ui | latest CLI | Accessible component system | CLI code-generator, not a package; `npx shadcn@latest init` |
| @supabase/supabase-js | 2.43+ | Backend client | Stable v2; client-only usage valid with Row Level Security |
### Supporting Libraries
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Recharts | 2.12+ | Charts for credibility section | SVG-based, React-friendly |
| Framer Motion | 11.x | Scroll animations | v11 shed ~30% bundle vs v10; use `whileInView` |
| react-hook-form | 7.51+ | Scheduling form state | Minimal re-renders, native TypeScript |
| zod | 3.22+ | Form validation | Validates WhatsApp (BR format), date/time, service |
| @hookform/resolvers | 3.x | Wires Zod into react-hook-form | Required bridge |
| date-fns | 3.x | Date formatting | Explicit pt-BR locale support |
| lucide-react | 0.400+ | Icons | Same icon lib shadcn uses internally |
### Dev Tools
| Tool | Purpose |
|------|---------|
| ESLint 9.x | Linting (flat config) |
| Prettier 3.x + `prettier-plugin-tailwindcss` | Formatting + class sorting |
| `@vitejs/plugin-react` | React Fast Refresh |
| Vercel | Deploy — free tier, zero-config for Vite SPAs |
## Installation Sequence
# 1. Scaffold
# 2. Tailwind 3 (NOT v4)
# 3. shadcn/ui
# 4. Runtime dependencies
# 5. Dev dependencies
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Tailwind CSS v4 | Config format incompatible with shadcn/ui — hard blocker | Tailwind 3.4.x |
| React 19 | shadcn, Radix, Recharts not all validated | React 18.3.x |
| Create React App | Unmaintained since 2023 | Vite 5 |
| Material UI / Chakra UI | Heavy bundles, fight Tailwind | shadcn/ui + Tailwind |
| Axios | Supabase client handles all API calls | Supabase client |
| moment.js | 4.7MB, maintenance mode | date-fns |
| Redux / Zustand | No global state needed for landing page | useState + useContext |
| Formik | Behind react-hook-form in maintenance | react-hook-form |
| Chart.js | Canvas-based, poor React DX | Recharts |
## Critical Compatibility Note
## Roadmap Implications
- **Phase 1**: Install Vite + React 18 + Tailwind 3 + shadcn/ui together. Locking this in before any components prevents mid-project style system changes.
- **Phase 2 (UI)**: Build components statically first, wire animations only below the fold.
- **Phase 3 (Form)**: react-hook-form + Zod validation before connecting to Supabase. Validate offline first.
- **Phase 4 (Supabase)**: Set RLS policies in dashboard to allow anonymous inserts into `appointments`. Test via browser console before writing React code.
- **Phase 5 (Charts)**: Wrap Recharts in `React.lazy()` + `Suspense` — avoid blocking LCP.
- **Performance**: LCP < 2.5s is a hard constraint. Keep Framer Motion animations below the fold only.
## Open Questions (Verify Before Starting)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
