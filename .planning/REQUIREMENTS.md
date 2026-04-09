# Requirements: Limpa Fossa Express

**Defined:** 2026-04-09
**Core Value:** O cliente agenda o serviço em menos de 60 segundos, sem telefonemas — e chega com confiança pelo que vê na página.

---

## v1 Requirements

### Navigation

- [ ] **NAV-01**: Visitante vê header com logo e nome da empresa em todas as visualizações
- [ ] **NAV-02**: Footer exibe informações de contato (telefone, WhatsApp, área de atendimento)

### Hero

- [ ] **HERO-01**: Visitante vê headline clara com nome do serviço e área de atendimento acima da dobra em dispositivos móveis (360px)
- [ ] **HERO-02**: Visitante clica em "Agendar Agora" e é levado diretamente ao formulário via smooth scroll
- [ ] **HERO-03**: Página atinge LCP < 2.5s em conexão 4G mobile simulada (Lighthouse)

### Services

- [ ] **SERV-01**: Visitante vê cards descritivos para os 3 serviços: Limpeza de Fossa, Desentupimento, Caixa de Gordura
- [ ] **SERV-02**: Card de serviço pré-popula o campo correspondente no formulário de agendamento

### Credibility

- [ ] **CRED-01**: Visitante vê gráficos públicos de satisfação de clientes (%) e tempo médio de atendimento na seção de credibilidade
- [ ] **CRED-02**: Seção de credibilidade é carregada de forma lazy (React.lazy + Suspense) para não bloquear LCP

### Booking Form

- [ ] **FORM-01**: Visitante preenche formulário com 5 campos: Nome, WhatsApp, Serviço, Endereço, Data/Hora preferida
- [ ] **FORM-02**: Campos exibem mensagens de erro inline ao perder foco (mode: 'onBlur') — não apenas no submit
- [ ] **FORM-03**: Formulário preserva dados preenchidos em sessionStorage em caso de navegação acidental
- [ ] **FORM-04**: Seletor de data/hora rejeita: datas passadas, domingos e horários fora do expediente (Seg-Sáb 07h-18h)
- [ ] **FORM-05**: Botão "Agendar" é desabilitado com loading spinner durante o envio para prevenir duplo-submit
- [ ] **FORM-06**: Após submissão bem-sucedida, visitante vê tela de confirmação persistente com resumo do agendamento e link WhatsApp para confirmar
- [ ] **FORM-07**: Em caso de erro no envio, visitante vê mensagem clara de erro e pode tentar novamente com campos preenchidos mantidos

### Data

- [ ] **DATA-01**: Agendamentos são persistidos na tabela `appointments` do Supabase (PostgreSQL) com campos: nome, whatsapp, endereço, serviço, data_hora_preferida, criado_em
- [ ] **DATA-02**: Tabela `appointments` tem RLS habilitado: política INSERT para anon, sem política SELECT para anon (proteção de PII / LGPD)
- [ ] **DATA-03**: Credenciais Supabase gerenciadas exclusivamente via variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` — nunca hardcoded
- [ ] **DATA-04**: App dispara erro de inicialização explícito se variáveis de ambiente Supabase estiverem ausentes

### CTAs & Contact

- [ ] **CTA-01**: Botão flutuante de WhatsApp sempre visível, com número normalizado (`https://wa.me/55XXXXXXXXXXX`) e mensagem pré-preenchida
- [ ] **CTA-02**: Seções revelam-se suavemente ao entrar no viewport durante scroll (Framer Motion, apenas abaixo da dobra)
- [ ] **CTA-03**: Footer inclui links para redes sociais do negócio (Instagram e/ou Facebook)

---

## v2 Requirements

### Credibility (Enhanced)

- **CRED-V2-01**: Seção de credibilidade exibe dados reais agregados do Supabase via função PostgreSQL com SECURITY DEFINER
- **CRED-V2-02**: Adicionar coluna `satisfaction_score` e `status` na tabela appointments para métricas reais

### Trust Building

- **TRUST-01**: Galeria de fotos antes/depois com WebP otimizadas
- **TRUST-02**: Seção de preços com faixas por tipo de serviço ("a partir de R$350")
- **TRUST-03**: Badge dinâmico "Atendemos hoje" (disponibilidade configurável)

### Security

- **SEC-01**: Integração Cloudflare Turnstile (anti-spam CAPTCHA) no formulário de agendamento
- **SEC-02**: Campo honeypot oculto para detecção básica de bots

---

## Out of Scope

| Feature | Motivo |
|---------|--------|
| Painel admin / CRM | Sem valor de conversão; console Supabase suficiente para v1 |
| Autenticação de usuário | Agendamento público não requer login — fricção desnecessária |
| Pagamento online | Cobrança presencial é a norma do setor; integração Pagar.me é v2+ |
| React Router / múltiplas rotas | Navegação via âncoras (`#agendar`); landing page single-scroll |
| Multi-idioma (PT+EN) | Serviço local, público 100% PT-BR |
| Live chat (Intercom, Crisp) | Scripts pesados disputam com CTA WhatsApp; botão flutuante cobre isso |
| Embeds de redes sociais | Scripts lentos; links no footer suficientes |
| Hero com vídeo em background | Penalidade severa de LCP em mobile 4G |
| Blog / SEO content | Estratégia de longo prazo, fora do escopo da landing page |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| HERO-01 | Phase 1 | Pending |
| HERO-02 | Phase 1 | Pending |
| HERO-03 | Phase 1 | Pending |
| SERV-01 | Phase 1 | Pending |
| SERV-02 | Phase 2 | Pending |
| CRED-01 | Phase 3 | Pending |
| CRED-02 | Phase 3 | Pending |
| FORM-01 | Phase 2 | Pending |
| FORM-02 | Phase 2 | Pending |
| FORM-03 | Phase 2 | Pending |
| FORM-04 | Phase 2 | Pending |
| FORM-05 | Phase 2 | Pending |
| FORM-06 | Phase 2 | Pending |
| FORM-07 | Phase 2 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 2 | Pending |
| DATA-04 | Phase 2 | Pending |
| CTA-01 | Phase 3 | Pending |
| CTA-02 | Phase 3 | Pending |
| CTA-03 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-09*
*Last updated: 2026-04-09 after initial definition*
