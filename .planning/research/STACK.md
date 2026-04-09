# Stack Research: Limpa Fossa Express

**Confidence:** MEDIUM — Versions based on training data through Aug 2025. Verify live before scaffolding.

---

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

---

## Installation Sequence

```bash
# 1. Scaffold
npm create vite@latest limpa-fossa-express -- --template react-ts
cd limpa-fossa-express

# 2. Tailwind 3 (NOT v4)
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 3. shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button form input select textarea dialog card badge

# 4. Runtime dependencies
npm install @supabase/supabase-js recharts framer-motion react-hook-form zod @hookform/resolvers date-fns lucide-react

# 5. Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

---

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

---

## Critical Compatibility Note

**Tailwind 3 vs 4:** shadcn/ui uses `tailwind.config.js` which is incompatible with Tailwind 4's CSS-first config. Using v4 breaks the entire UI setup — this is a hard blocker.

---

## Roadmap Implications

- **Phase 1**: Install Vite + React 18 + Tailwind 3 + shadcn/ui together. Locking this in before any components prevents mid-project style system changes.
- **Phase 2 (UI)**: Build components statically first, wire animations only below the fold.
- **Phase 3 (Form)**: react-hook-form + Zod validation before connecting to Supabase. Validate offline first.
- **Phase 4 (Supabase)**: Set RLS policies in dashboard to allow anonymous inserts into `appointments`. Test via browser console before writing React code.
- **Phase 5 (Charts)**: Wrap Recharts in `React.lazy()` + `Suspense` — avoid blocking LCP.
- **Performance**: LCP < 2.5s is a hard constraint. Keep Framer Motion animations below the fold only.

---

## Open Questions (Verify Before Starting)

1. Has Vite 6 reached stable? → `npm info vite version`
2. Framer Motion v12 released? → `npm info framer-motion version`
3. shadcn/ui added official Tailwind 4 support? → Check ui.shadcn.com/docs
4. React 19 validated by Recharts team? → Check their GitHub releases
