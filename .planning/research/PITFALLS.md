# Pitfalls Research: Limpa Fossa Express

**Domain:** React + Vite + Supabase public booking landing page (local service, Brazil)
**Confidence:** HIGH (Supabase RLS, form patterns, performance); MEDIUM (CRO para mercado brasileiro)

---

## Pitfall 1: RLS Desabilitado Expõe Todos os Agendamentos

**O que dá errado:**
Tabelas Supabase têm RLS desabilitado por padrão. Sem RLS + política de INSERT, a chave `anon` (visível em DevTools) permite `SELECT * FROM appointments` direto do browser — vazando nome, telefone e endereço de todos os clientes. Violação direta de LGPD.

**Como evitar:**
```sql
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert appointments"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);
-- Sem política SELECT para anon = zero acesso de leitura
```

**Sinais de alerta:**
- `supabase.from('appointments').select('*')` no console do browser retorna dados
- Supabase Table Editor mostra "RLS disabled" na tabela

**Fase:** Phase 1 — Database setup (antes de qualquer dado ser inserido)

---

## Pitfall 2: Spam de Bots via INSERT Público Aberto

**O que dá errado:**
Sem rate limiting, um bot pode POST milhares de agendamentos falsos por minuto, inundando a tabela e fazendo o dono perseguir leads fantasmas ou atingir limites do free tier do Supabase.

**Como evitar:**
1. Integrar Cloudflare Turnstile ou hCaptcha (ambos gratuitos, React-friendly) no submit
2. Adicionar campo honeypot (input oculto que usuários reais nunca preenchem)
3. Considerar trigger Postgres rejeitando mesmo telefone em 60 segundos

**Fase:** Phase 2 — Booking form

---

## Pitfall 3: Chave Supabase Commitada no Git

**O que dá errado:**
O arquivo `.env` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` vai para o git. Qualquer pessoa com acesso ao repositório pode fazer chamadas arbitrárias à instância Supabase.

**Como evitar:**
1. Adicionar `.env`, `.env.local`, `.env.production` ao `.gitignore` ANTES do primeiro commit
2. Usar `.env.example` com valores placeholder como referência commitada
3. Configurar variáveis no dashboard Vercel/Netlify para produção

**Fase:** Phase 0 — Inicialização do projeto (antes do primeiro commit)

---

## Pitfall 4: Form Perde Estado em Navegação, Causando Abandono

**O que dá errado:**
Usuário preenche 5 campos, navega de volta (ou o browser crasha em situação de urgência às 23h), e perde tudo. Vai ligar para o concorrente.

**Como evitar:**
1. `useEffect` que persiste valores do form em `sessionStorage` a cada mudança (debounced ~500ms)
2. No mount, ler `sessionStorage` e popular `defaultValues`
3. Limpar `sessionStorage` no submit bem-sucedido

**Fase:** Phase 2 — Booking form

---

## Pitfall 5: LCP Estourado por Imagem de Hero Não-Otimizada ou Bundle Pesado

**O que dá errado:**
Imagem hero de 2-4MB ou bundle com Recharts + Framer Motion carregado eagerly causa LCP > 4s em 4G mobile — comum no interior/subúrbio brasileiro onde o serviço opera.

**Como evitar:**
1. Hero em WebP, máx 150KB, máx 1440px. Usar `srcset` para tamanhos responsivos
2. `React.lazy()` + `Suspense` para Recharts (está abaixo da dobra)
3. `rollupOptions.output.manualChunks` no Vite para separar vendors
4. Lighthouse CI: LCP < 2.5s em mobile simulado antes de cada deploy

**Fase:** Phase 1 (hero) + Phase 3 (credibilidade com Recharts)

---

## Pitfall 6: Número WhatsApp Malformado na URL

**O que dá errado:**
`wa.me/(11) 99999-9999` não funciona. WhatsApp abre em erro. Usuário urgente abandona.

**Como evitar:**
1. Normalizar: remover não-dígitos, adicionar prefixo `55` se ausente
2. Formato correto: `https://wa.me/5511999999999` (apenas dígitos, sem `+`, sem espaços)
3. Testar em dispositivo móvel real antes de publicar

**Fase:** Phase 2 — CTA / integração WhatsApp

---

## Pitfall 7: Date Picker Permite Agendamentos Impossíveis

**O que dá errado:**
Sem restrições, clientes agendam às 3h da manhã de domingo. O negócio recebe agendamento legítimo que não pode cumprir.

**Como evitar:**
1. Definir horário comercial como constante: Seg-Sáb 07:00-18:00
2. Passar predicados `disabled` rejeitando: datas passadas, domingos, horários fora do expediente
3. Exibir "Atendemos seg-sáb das 7h às 18h" próximo ao campo
4. Para MVP: usar dropdown com horários pré-definidos (07:00, 09:00, 11:00, 14:00, 16:00)

**Fase:** Phase 2 — Booking form

---

## Pitfall 8: Sem Feedback Visual Após Submissão

**O que dá errado:**
Após submit, a página não mostra nada ou brevemente pisca sucesso. Usuários clicam "Agendar" múltiplas vezes criando agendamentos duplicados, ou ligam para confirmar criando carga de suporte.

**Como evitar:**
1. Desabilitar botão de submit imediatamente no primeiro clique; mostrar loading spinner
2. No sucesso: substituir form por tela de confirmação com serviço selecionado + link WhatsApp para confirmar
3. No erro: mensagem específica, campos preenchidos mantidos para retry
4. `disabled={submitting}` no botão

**Fase:** Phase 2 — Booking form

---

## Pitfall 9: Variáveis de Produção Não Configuradas, Falha Silenciosa

**O que dá errado:**
Supabase client inicializa com `undefined` quando `VITE_SUPABASE_URL` não está no dashboard do Vercel. Vite não falha em build com vars ausentes. O client só lança erro na primeira query — falha silenciosa para o usuário.

**Como evitar:**
```ts
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}
```

**Fase:** Phase 4 — Deploy

---

## Pitfall 10: Métricas de Credibilidade Hardcoded em Vez de Dados Reais

**O que dá errado:**
Percentuais de satisfação hardcoded nunca mudam, parecem desonestos para usuários atentos, e entram em conflito quando dados reais são depois conectados.

**Como evitar:**
1. Definir stats agregadas via função Postgres com `SECURITY DEFINER` retornando apenas totais
2. Se não há dados reais no lançamento: mostrar placeholders com "baseado em atendimentos piloto" OU metas claramente marcadas como objetivos
3. Schema desde o início deve ter colunas `status` e `satisfaction_score` mesmo se não usadas inicialmente

**Fase:** Phase 1 (schema) + Phase 3 (seção de credibilidade)

---

## Mapeamento de Pitfalls por Fase

| Pitfall | Fase de Prevenção | Verificação |
|---------|------------------|-------------|
| RLS desabilitado | Phase 1: Database setup | `SELECT` como anon retorna 0 linhas |
| Bot spam via INSERT | Phase 2: Booking form | CAPTCHA renderiza; honeypot no DOM |
| Env vars no git | Phase 0: Init | `.gitignore` contém `.env*` antes do 1º commit |
| Form perde estado | Phase 2: Booking form | Refresh no meio do preenchimento; campos persistem |
| LCP > 2.5s | Phase 1 (hero) + Phase 3 | Lighthouse mobile < 2.5s em produção |
| WhatsApp malformado | Phase 2: CTA | href match `^https://wa\.me/55\d{10,11}$` |
| Agendamentos impossíveis | Phase 2: Booking form | Date picker rejeita domingo e datas passadas |
| Sem feedback de submissão | Phase 2: Booking form | Tela de sucesso persiste; duplo-clique prevenido |
| Env vars em produção ausentes | Phase 4: Deploy | Form alcança Supabase na URL de produção |
| Métricas hardcoded | Phase 1 (schema) + Phase 3 | Dados do chart vêm de query Supabase |

---

## Checklist "Parece Pronto Mas Não Está"

- [ ] RLS: Table Editor mostra "RLS enabled" E `SELECT *` como anon retorna 0 linhas
- [ ] WhatsApp: Abre chat real no mobile (não só desktop)
- [ ] Form: Após submit bem-sucedido, tabela Supabase mostra nova linha E usuário vê tela de confirmação persistente
- [ ] Mobile 360px: CTA visível acima da dobra, campos tappable, date picker usável
- [ ] Env vars: Form atinge Supabase na URL de produção (verificar via Supabase logs)
- [ ] Duplo submit: Clicar "Agendar" duas vezes não cria dois agendamentos idênticos
- [ ] Date constraints: Date picker rejeita ontem, domingos e horários fora do expediente
- [ ] Credibilidade: Charts renderizam com dados reais ou placeholder explícito — não silenciosamente vazio
- [ ] Lighthouse mobile: LCP < 2.5s, CLS < 0.1 na URL deployada
- [ ] Error state: Quebrar conexão Supabase e submeter form — usuário vê mensagem útil, não tela branca
