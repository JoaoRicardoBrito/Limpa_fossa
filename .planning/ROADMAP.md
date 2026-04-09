# Roadmap: Limpa Fossa Express

## Overview

Greenfield landing page de alta conversão entregue em 3 fases com risco zero de regressão. A Fase 1 produz uma página estática deployável que valida o visual sem dependência de backend. A Fase 2 fecha o loop de conversão completo — formulário funcional, Supabase com RLS e proteção LGPD. A Fase 3 adiciona credibilidade visual com gráficos lazy-loaded e polish de UX que amplificam conversão sem bloquear o LCP.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Scaffold, design system e seções estáticas (Header, Hero, Services, Footer) — deployável sem backend
- [ ] **Phase 2: Booking & Data** - Formulário completo de agendamento + Supabase com RLS — loop de conversão funcional
- [ ] **Phase 3: Credibility & Polish** - Gráficos de credibilidade lazy-loaded + botão WhatsApp flutuante + animações de scroll

## Phase Details

### Phase 1: Foundation
**Goal**: Visitante pode ver e navegar a landing page com todas as seções estáticas funcionando em mobile e desktop
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, HERO-01, HERO-02, HERO-03, SERV-01, CTA-03
**Success Criteria** (what must be TRUE):
  1. Visitante vê header com logo e nome da empresa em 360px (mobile) sem overflow horizontal
  2. Visitante vê headline, subheadline e botão "Agendar Agora" acima da dobra em dispositivos móveis de 360px
  3. Clicar em "Agendar Agora" rola suavemente até a âncora do formulário (smooth scroll)
  4. Visitante vê os 3 cards de serviço (Limpeza de Fossa, Desentupimento, Caixa de Gordura) com descrição e ícone
  5. Página atinge LCP < 2.5s em simulação 4G mobile no Lighthouse; footer exibe telefone, WhatsApp, área de atendimento e links sociais
**Plans**: TBD
**UI hint**: yes

### Phase 2: Booking & Data
**Goal**: Visitante pode preencher e submeter um agendamento que persiste no Supabase com proteção de PII e feedback claro de sucesso/erro
**Depends on**: Phase 1
**Requirements**: SERV-02, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, DATA-01, DATA-02, DATA-03, DATA-04
**Success Criteria** (what must be TRUE):
  1. Clicar em um card de serviço pré-popula o campo "Serviço" no formulário de agendamento
  2. Formulário exibe erros inline por campo ao perder foco (onBlur), não apenas no submit; seletor de data/hora rejeita datas passadas, domingos e horários fora de Seg-Sáb 07h–18h
  3. Botão "Agendar" fica desabilitado com spinner durante envio; campos preenchidos são preservados em sessionStorage em caso de navegação acidental
  4. Após envio bem-sucedido, visitante vê tela de confirmação com resumo do agendamento e link WhatsApp para confirmar
  5. Em caso de erro no envio, visitante vê mensagem de erro clara com campos mantidos; agendamentos persistem na tabela `appointments` do Supabase com RLS INSERT para anon sem SELECT para anon; credenciais gerenciadas via variáveis de ambiente com erro de inicialização explícito se ausentes
**Plans**: TBD
**UI hint**: yes

### Phase 3: Credibility & Polish
**Goal**: Visitante vê provas sociais visuais e experimenta animações suaves que reforçam confiança sem comprometer a velocidade de carregamento
**Depends on**: Phase 2
**Requirements**: CRED-01, CRED-02, CTA-01, CTA-02
**Success Criteria** (what must be TRUE):
  1. Seção de credibilidade exibe gráficos de satisfação de clientes (%) e tempo médio de atendimento com dados estáticos/mock
  2. Seção de credibilidade é carregada via React.lazy + Suspense e não aparece no critical path do LCP (verificável no Lighthouse)
  3. Botão flutuante de WhatsApp está sempre visível em todas as seções com link `https://wa.me/55XXXXXXXXXXX` e mensagem pré-preenchida
  4. Seções abaixo da dobra revelam-se suavemente ao entrar no viewport durante scroll (Framer Motion) sem afetar o LCP
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Booking & Data | 0/? | Not started | - |
| 3. Credibility & Polish | 0/? | Not started | - |
