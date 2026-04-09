# Architecture Research: Limpa Fossa Express

**Confidence:** HIGH — Canonical, well-established stack with no ambiguity about component boundaries.

---

## System Overview

```
Browser / Client
├── Presentation Layer
│   ├── HeroSection          (static, CTA anchor link)
│   ├── ServicesSection      (static, 3 service cards)
│   ├── AppointmentSection   (interactive, calls service layer)
│   │   └── AppointmentForm  → useAppointmentForm hook
│   └── CredibilitySection   (charts, static data for v1)
├── Service Layer (lib/)
│   ├── supabase.ts          (createClient singleton)
│   └── appointments.ts      (createAppointment(), getStats())
└── Floating UI
    └── WhatsAppButton       (static anchor, always visible)

Supabase (hosted)
├── PostgreSQL DB
│   └── appointments table
└── RLS Policies
    └── anon: INSERT only, no SELECT
```

---

## Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `App.tsx` | Assembles all sections, root layout | All section components |
| `HeroSection` | CTA above fold, heading | None (static) |
| `ServicesSection` | 3 service type cards | None (static) |
| `AppointmentForm` | Renders form inputs, shows submission feedback | `useAppointmentForm` hook |
| `useAppointmentForm` | Form state, validation, async submission | `lib/appointments.ts` |
| `CredibilitySection` | Public metrics, charts | Static data (v1) |
| `WhatsAppButton` | Floating contact shortcut | None (static `wa.me` link) |
| `lib/supabase.ts` | Supabase client singleton | Imported by `lib/appointments.ts` only |
| `lib/appointments.ts` | All DB operations | `lib/supabase.ts` |

---

## Recommended Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AppointmentSection.tsx
│   │   └── CredibilitySection.tsx
│   ├── ui/                      (shadcn/ui generated — never edit manually)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── AppointmentForm.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── supabase.ts              (client singleton)
│   └── appointments.ts          (DB operations)
├── types/
│   └── index.ts                 (Appointment, ServiceType, FormData)
├── hooks/
│   └── useAppointmentForm.ts    (form state + submission logic)
├── assets/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Data Flow

**Appointment Submission:**
```
User fills form
  → useAppointmentForm.handleSubmit(formData)
  → lib/appointments.ts createAppointment(data)
  → supabase.from('appointments').insert([data])
  → Supabase PostgreSQL
  → status = 'success' → confirmation shown
  → status = 'error'   → error message shown
```

**Credibility Section (v1):**
```
Static data array hardcoded in CredibilitySection.tsx
  → passed as props to Recharts components
  → chart renders immediately, no async
```

**Navigation:**
```
Hero CTA button href="#agendar"
  → CSS scroll-behavior: smooth
  → AppointmentSection scrolls into view
  → No React Router involved
```

---

## Suggested Build Order

```
1. Project scaffolding (Vite + TS + Tailwind + shadcn/ui init)
2. Design tokens (palette in tailwind.config.js)
3. Static sections: Hero, Services, Footer
4. Supabase: lib/supabase.ts + lib/appointments.ts + DB table + RLS policies
5. AppointmentForm + useAppointmentForm (depends on step 4)
6. CredibilitySection with static data + Recharts (independent)
7. WhatsAppButton floating (independent)
8. Framer Motion scroll animations (independent, last)
```

Steps 1-3 produce a deployable page immediately. Step 4 is the gating dependency for the form. Steps 6-8 are safe to parallelize or defer.

---

## Anti-Patterns

1. **Direct Supabase calls in components** — always go through `lib/appointments.ts`
2. **Using service role key client-side** — use anon key only; service role bypasses all RLS
3. **Skipping RLS** — exposes all customer PII (name, phone, address) via public API key
4. **All sections in App.tsx** — one file per section in `components/sections/`
5. **React Router for single-scroll landing page** — use `id` anchors instead

---

## Integration Points

| Service | Pattern | Critical Notes |
|---------|---------|----------------|
| Supabase | `@supabase/supabase-js` singleton, `VITE_SUPABASE_*` env vars | Anon key only. RLS: INSERT for anon, no SELECT |
| Vercel/Netlify | Git push CI/CD, env vars in dashboard | `VITE_` prefix required for browser exposure |
| WhatsApp | Static `https://wa.me/55[number]?text=...` | No API, no SDK, no key needed |

---

## Roadmap Implications

- **Phase 1**: Scaffolding + design tokens + static sections — deployable with zero backend risk
- **Phase 2**: Supabase setup (table + RLS + client) + form — tightly coupled, do together
- **Phase 3**: Credibility charts + WhatsApp button + animations — all independent, additive polish
- RLS configuration needs a dedicated checklist item — most dangerous omission in this stack
