# Limpa Fossa Express

## What This Is

Landing page profissional e de alta conversão para serviços de limpeza de fossa, desentupimento e limpeza de caixa de gordura. Permite que clientes agendem serviços online de forma rápida, e transmite credibilidade visual através de métricas públicas de satisfação. Produto voltado para clientes finais que precisam de atendimento urgente ou programado.

## Core Value

O cliente agenda o serviço em menos de 60 segundos, sem telefonemas — e chega com confiança pelo que vê na página.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section com CTA "Agendar Agora" visível acima da dobra
- [ ] Cards de serviços: Limpeza de Fossa, Desentupimento, Limpeza de Caixa de Gordura
- [ ] Formulário de agendamento funcional (Nome, WhatsApp, Endereço, Serviço, Data/Hora)
- [ ] Integração com Supabase para persistir agendamentos
- [ ] Seção pública de credibilidade com gráficos de satisfação e tempo de atendimento
- [ ] Botão flutuante de WhatsApp para contato imediato
- [ ] Design mobile-first, responsivo, com paleta Verde + Azul + Branco
- [ ] Animações suaves de scroll

### Out of Scope

- Painel admin/dashboard interno — não é v1, complexidade desnecessária para conversão
- Autenticação de usuário — agendamento público sem login
- App mobile nativo — web responsivo é suficiente para v1
- Pagamento online — agendamento sem cobrança direta na plataforma

## Context

Projeto greenfield. Nicho: serviços de saneamento/limpeza residencial e comercial no Brasil. Público-alvo: proprietários e síndicos que precisam de atendimento rápido, muitas vezes em situação de urgência.

Tech stack definido no PRD:
- **Frontend**: React + Vite + TypeScript
- **UI/Styling**: Tailwind CSS + shadcn/ui + Radix UI
- **Backend/DB**: Supabase (PostgreSQL) — tabela `appointments`
- **Deploy**: Vercel ou Netlify (CI/CD)
- **Charts**: Recharts ou Shadcn Charts (seção de credibilidade pública)
- **Animações**: Framer Motion ou CSS transitions

## Constraints

- **Tech Stack**: React + Vite + TS + Tailwind + Supabase — stack fixo conforme PRD
- **Design**: Paleta verde, azul e branco — definida no tailwind.config.js
- **Mobile-First**: Layout responsivo obrigatório desde o início
- **Performance**: Landing page deve carregar rapidamente (LCP < 2.5s) — conversão depende de velocidade

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dashboard visual = seção pública de credibilidade | Mostrar métricas (satisfação, tempo de atendimento) para converter visitantes, não para gestão interna | — Pending |
| Supabase como backend | Sem necessidade de servidor próprio, PostgreSQL gerenciado, SDK client-side direto | — Pending |
| shadcn/ui + Radix UI | Componentes acessíveis e customizáveis sobre Tailwind, sem overhead de libs pesadas | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after initialization*