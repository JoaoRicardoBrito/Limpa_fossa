# Features Research: Limpa Fossa Express

**Domain:** High-conversion local service landing page (septic tank cleaning — Brazil)
**Confidence:** MEDIUM

---

## Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero com CTA acima da dobra | Primeira tela responde "o que é isso?" e "como ajo?" em menos de 3s | LOW | Botão "Agendar Agora" — não link |
| Lista de serviços com nomes/descrições | Usuário confirma que o negócio faz o que precisa antes de continuar | LOW | 3 cards: Fossa, Desentupimento, Caixa de Gordura |
| WhatsApp sempre visível | Usuários em urgência querem contactar imediatamente, não preencher form | LOW | Botão flutuante é padrão brasileiro |
| Declaração de área de atendimento | "Atendem meu bairro?" é top-3 pergunta de usuários locais | LOW | Cidade/região no hero resolve |
| Sinais de confiança básicos | Sem prova, usuários abandonam — especialmente para serviços in-home | MEDIUM | Total de jobs, anos de negócio, % satisfação |
| Layout mobile-first responsivo | 70-80% das buscas locais no Brasil são em mobile | LOW | Não opcional — layout não-responsivo mata conversão |
| Formulário de agendamento | A ação de conversão principal — deve ser simples e rápida | MEDIUM | Máx 5 campos: Nome, WhatsApp, Serviço, Endereço, Data/Hora |
| Velocidade < 3s | Usuários urgentes abandonam páginas lentas mais rápido que qualquer outro grupo | MEDIUM | Compressão de imagem, sem scripts pesados bloqueando render |
| Headline clara | Ambiguidade mata conversões imediatamente | LOW | Padrão: "Limpeza de Fossa em [Cidade] — Atendimento Rápido" |
| Nome e branding visíveis | Páginas sem marca parecem golpe para serviços in-home | LOW | Logo + paleta consistente (Verde + Azul + Branco) |

---

## Differentiators (Vantagem Competitiva)

| Feature | Proposta de Valor | Complexity | Notes |
|---------|-------------------|------------|-------|
| Dashboard público de credibilidade com métricas reais | Concorrentes mostram copy estático. Números agregados reais parecem honestos e são difíceis de falsificar | MEDIUM | Recharts + dados do Supabase. Pode seeder com dados iniciais realistas |
| Promessa de agendamento em < 60 segundos | Transforma agendamento em diferencial — o core value do PROJECT.md | MEDIUM | Requer form genuinamente rápido (5 campos, sem login) |
| WhatsApp-first como canal paralelo | Brasil: WhatsApp é canal dominante. Mensagem pré-preenchida = zero atrito alternativo | LOW | Complementa o form; não substitui (form captura dados para Supabase) |
| Framing de urgência ("Atendemos hoje") | Emergência ressoa com caso de uso #1: falha sanitária urgente | LOW | Copy + badge apenas. Sem custo de implementação além da redação |
| Galeria de fotos antes/depois | Prova tangível de competência. Concorrentes raramente fazem bem | LOW | WebP estáticas em /public. Sem lib de lightbox para v1 |
| Transparência de preços (faixas, não exatos) | Maioria dos concorrentes esconde preços. "A partir de R$ X" reduz ansiedade | LOW | Faixas por tipo de serviço, não calculadora de orçamento |
| Animações suaves de scroll | Página parece mais profissional que brochura estática | LOW | Framer Motion. Manter sutil |

---

## Anti-Features (Não Construir)

| Feature | Por que Solicitada | Por que Problemática | Alternativa |
|---------|-------------------|---------------------|-------------|
| Contas de usuário / login | "Clientes rastreiam agendamentos" | Complexidade de auth + fricção de login mata conversão | Confirmação via WhatsApp. Sem conta necessária |
| Pagamento online | "Cobrar antecipado" | Integração com Pagar.me/MercadoPago = complexidade significativa + abandono | Cobrar no local. Form agenda, não cobra |
| Dashboard admin / CRM | "Gerenciar agendamentos" | Fora de escopo. Não contribui para conversão | Console do Supabase para v1 |
| Live chat de terceiros (Intercom, Crisp) | "Suporte a visitantes" | Scripts 100-300KB, penalizam LCP, competem com CTA WhatsApp | Botão flutuante WhatsApp cobre isso completamente |
| Embeds de redes sociais | "Mostrar que estamos ativos" | Scripts lentos, quebradiços, distraem do CTA | Links para perfis no footer |
| Hero com vídeo animado em background | "Parece premium" | Penalidade severa de LCP. Terrível em dados móveis | Imagem WebP estática com overlay = mesma percepção |
| Blog / seção de conteúdo | "Tráfego SEO orgânico" | Investimento consistente de longo prazo. Distrai do foco single-page | Se priorizado depois, /blog como rota separada |
| Multi-idioma (PT + EN) | "Visitantes internacionais" | Área de atendimento é local Brasil | PT-BR apenas |

---

## Dependências de Features

```
[Formulário de Agendamento]
    └──requires──> [Integração Supabase]
                       └──requires──> [schema da tabela appointments]

[Dashboard de Credibilidade]
    └──requires──> [Integração Supabase]
    └──enhances──> [Seção de Sinais de Confiança]

[WhatsApp CTA]
    └──enhances──> [Formulário de Agendamento] (canal paralelo, não substituto)

[Cards de Serviço]
    └──feeds──> [Formulário de Agendamento] (pré-seleciona tipo de serviço)

[Hero CTA]
    └──links-to──> [Formulário de Agendamento] (smooth scroll anchor #agendar)
```

---

## Priorização para MVP

| Feature | Valor | Custo | Prioridade |
|---------|-------|-------|-----------|
| Hero + CTA | HIGH | LOW | P1 |
| Formulário de Agendamento | HIGH | MEDIUM | P1 |
| Integração Supabase | HIGH | MEDIUM | P1 |
| Cards de Serviço | HIGH | LOW | P1 |
| Botão Flutuante WhatsApp | HIGH | LOW | P1 |
| Layout mobile-first | HIGH | LOW | P1 |
| Sinais de confiança (estáticos) | HIGH | LOW | P1 |
| LCP < 2.5s | HIGH | LOW | P1 |
| Animações de scroll | MEDIUM | LOW | P2 |
| Dashboard Recharts | MEDIUM | MEDIUM | P2 |
| Seção de preços (faixas) | MEDIUM | LOW | P2 |
| Galeria de fotos | MEDIUM | LOW | P2 |

---

## Implicações no Roadmap

1. **Phase 1 deve entregar o loop completo de agendamento**: Hero → Cards → Form → Supabase. Co-dependentes, sem valor de conversão em isolamento.
2. **Sinais de confiança podem ser seeded** com dados realistas no dia 1 — dashboard com Recharts é upgrade P2.
3. **Botão WhatsApp é baixo custo, alto valor** — incluir no Phase 1 como componente único.
4. **Evitar feature creep no Phase 1**: Pagamento, auth, admin, chat widgets são anti-padrões documentados para este nicho.
5. **Phase 2: seção de credibilidade com Recharts** — reutiliza conexão Supabase já estabelecida.
