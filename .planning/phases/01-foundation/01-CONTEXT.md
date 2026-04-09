# Phase 1: Foundation - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning
**Source:** User design requirements + PRD

<domain>
## Phase Boundary

Phase 1 delivers a fully static, deployable landing page with all visual sections complete: Header, Hero, Services grid, and Footer. No backend, no forms. The page should look production-ready and be mobile-first responsive.

This phase covers GSD requirements: NAV-01, NAV-02, HERO-01, HERO-02, HERO-03, SERV-01, CTA-03

</domain>

<decisions>
## Implementation Decisions

### Project Scaffolding
- Scaffold React + Vite + TypeScript project in `Site_Limpa_Fossa/` directory
- Use `npm create vite@latest` with `react-ts` template
- Tailwind CSS version **3** (NOT v4 — v4 is incompatible with shadcn/ui)
- Install shadcn/ui via `npx shadcn@latest init`
- Install Tailwind 3: `npm install -D tailwindcss@3 postcss autoprefixer`
- Add `.env`, `.env.local` to `.gitignore` before first commit

### Design Tokens
- Primary color palette in `tailwind.config.js`:
  - Verde: primary brand color (ex: `#16a34a` / green-600)
  - Azul: secondary/accent (ex: `#2563eb` / blue-600)
  - Branco: backgrounds / text on dark
- Add custom color aliases: `brand-green`, `brand-blue`

### Header
- Logo text: **"Limpa Fossa Express"** (text-based logo, no image needed for v1)
- Navigation menu: Início, Serviços, Agendamento, Contato
- Mobile: hamburger menu or simplified inline links
- Sticky header with background on scroll

### Hero Section
- Title: **"Limpeza de Fossa Rápida e Sem Complicação"**
- Subtitle: brief supporting copy (ex: "Atendimento em até 2 horas. Profissionais certificados.")
- CTA button: **"Agendar Agora"** — links to `#agendamento` anchor (smooth scroll)
- CTA secondary: optional WhatsApp link as text ("ou fale pelo WhatsApp")
- Service area badge: ex: "Atendemos em [Cidade]"
- Hero image: placeholder gradient background (green-to-blue) — no stock photo required for v1
- Visible above fold on 360px mobile

### Services Section
- Grid of 3 cards (responsive: 1 col mobile, 3 col desktop)
- Service 1: **Limpeza de Fossa** — modern icon (Lucide: `Droplets` or `Waves`)
- Service 2: **Desentupimento** — icon (Lucide: `Pipe` or `Wrench`)
- Service 3: **Caixa de Gordura** — icon (Lucide: `Container` or `Box`)
- Each card: icon + name + short description (2 lines)
- Use shadcn/ui Card component

### Footer
- Contact info: phone placeholder, WhatsApp number placeholder
- Service area text: ex: "Atendemos em [Cidade] e região"
- Social links: Instagram, Facebook (placeholder href="#")
- Copyright line

### Performance
- Hero image: use CSS gradient instead of photo (zero image weight)
- No external fonts that block rendering (use system font stack or preload)
- No animation libraries in Phase 1 (Framer Motion in Phase 3)

### Claude's Discretion
- Exact green/blue hex values (pick from Tailwind palette that looks premium)
- Font choice (system stack or a single Google Font like Inter preloaded)
- Card hover effects (subtle shadow on hover is fine)
- Exact footer structure/layout

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` — Core value, constraints, decisions
- `.planning/REQUIREMENTS.md` — v1 requirements with IDs
- `.planning/ROADMAP.md` — Phase goals and success criteria

### Research
- `.planning/research/STACK.md` — Stack versions, install sequence, what NOT to use
- `.planning/research/ARCHITECTURE.md` — Project structure, component organization
- `.planning/research/PITFALLS.md` — Critical pitfalls (esp. Tailwind 3 vs 4, LCP)

</canonical_refs>

<specifics>
## Specific Requirements

1. The scaffold goes in `Site_Limpa_Fossa/` (not the root — keep `.planning/` separate)
2. Tailwind 3 is MANDATORY — v4 breaks shadcn/ui
3. Hero must be visible above fold at 360px without scrolling
4. LCP < 2.5s — no heavy images, lazy-load nothing above the fold
5. shadcn/ui components: Button, Card, Badge — install these specifically
6. `.gitignore` must include `.env*` before first commit

</specifics>

<deferred>
## Deferred to Later Phases

- Booking form and Supabase integration → Phase 2
- Recharts credibility charts → Phase 3
- Framer Motion scroll animations → Phase 3
- WhatsApp floating button → Phase 3
- Form validation, RLS, env vars → Phase 2

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-09 via user design requirements*
