# Limpa Fossa Express

**Landing page profissional e de alta conversão para serviços de limpeza de fossa, desentupimento e limpeza de caixa de gordura.**

**Objetivo:** permitir que clientes agendem serviços online em menos de 60 segundos, sem telefonemas, garantindo confiança através de métricas e design claro.

---

**Conteúdo deste README**

- **Project:** Visão geral e propósito.
- **Stack:** Tecnologias usadas.
- **Como executar:** instruções de instalação, desenvolvimento e build.
- **Variáveis de ambiente:** o que configurar (ver `Site_Limpa_Fossa/.env.example`).
- **Estrutura do projeto:** descrição dos arquivos e pastas principais.
- **Scripts úteis:** scripts definidos em `Site_Limpa_Fossa/package.json`.
- **Deploy:** nota sobre deployment (Vercel) e recomendações.
- **Contribuição e estilo:** convenções e ferramentas de desenvolvimento.

---

**Project**

Limpa Fossa Express é uma SPA (Vite + React + TypeScript) focada em conversão para serviços de limpeza de fossas e desentupimento. A aposta principal é oferecer agendamento rápido, UX móvel otimizado e credibilidade por meio de métricas e seções de prova social.

**Restrições importantes**

- Tech Stack fixa: React + Vite + TypeScript + Tailwind CSS + Supabase.
- Mobile-first e performance (LCP < 2.5s) são requisitos de produto.

---

**Stack / Dependências principais**

- React 18
- Vite
- TypeScript
- Tailwind CSS 3
- @supabase/supabase-js (cliente)
- react-hook-form + zod (formulários e validação)
- recharts (gráficos de credibilidade)
- framer-motion (animações declarativas)

Veja o manifest em [Site_Limpa_Fossa/package.json](Site_Limpa_Fossa/package.json).

---

**Pré-requisitos (desenvolvimento)**

- Node.js (recomenda-se v18+ ou a versão suportada pelo projeto)
- npm ou pnpm

---

**Como rodar (desenvolvimento)**

1. Abra um terminal na raiz do projeto e entre na pasta do site:

```bash
cd Site_Limpa_Fossa
npm install
npm run dev
```

O comando `npm run dev` inicia o servidor Vite (ver `Site_Limpa_Fossa/package.json`).

**Build para produção**

```bash
cd Site_Limpa_Fossa
npm run build
```

**Preview do build**

```bash
npm run preview
```

---

**Variáveis de ambiente**

O projeto usa Supabase para persistência de agendamentos. Configure as variáveis no arquivo de ambiente na raiz do site:

- `VITE_SUPABASE_URL` — URL do projeto Supabase.
- `VITE_SUPABASE_ANON_KEY` — chave `anon` (NUNCA subir a `service_role` no frontend).

Exemplo em [Site_Limpa_Fossa/.env.example](Site_Limpa_Fossa/.env.example).

---

**Scripts disponíveis** (ver `Site_Limpa_Fossa/package.json`)

- `dev`: inicia Vite em modo desenvolvimento
- `build`: compila TypeScript (`tsc -b`) e roda `vite build`
- `preview`: serve o build gerado
- `lint`: roda `eslint` no código

---

**Estrutura principal do projeto**

- [Site_Limpa_Fossa/package.json](Site_Limpa_Fossa/package.json) — manifest do frontend
- [Site_Limpa_Fossa/vite.config.ts](Site_Limpa_Fossa/vite.config.ts) — configuração do Vite
- [Site_Limpa_Fossa/tailwind.config.js](Site_Limpa_Fossa/tailwind.config.js) — configuração Tailwind (paleta verde/azul/branco)
- [Site_Limpa_Fossa/src/App.tsx](Site_Limpa_Fossa/src/App.tsx) — ponto de entrada do app React
- [Site_Limpa_Fossa/src/main.tsx](Site_Limpa_Fossa/src/main.tsx) — bootstrap do React
- [Site_Limpa_Fossa/src/index.css](Site_Limpa_Fossa/src/index.css) — estilos globais / Tailwind
- [Site_Limpa_Fossa/src/components](Site_Limpa_Fossa/src/components) — componentes UI e seções (Hero, Header, Footer, etc.)
- [Site_Limpa_Fossa/src/hooks/useAppointmentForm.ts](Site_Limpa_Fossa/src/hooks/useAppointmentForm.ts) — lógica do formulário de agendamento
- [Site_Limpa_Fossa/src/lib/supabase.ts](Site_Limpa_Fossa/src/lib/supabase.ts) — cliente Supabase
- [Site_Limpa_Fossa/src/services/appointments.ts](Site_Limpa_Fossa/src/services/appointments.ts) — métodos para criar/consultar agendamentos
- [Site_Limpa_Fossa/tsconfig.json](Site_Limpa_Fossa/tsconfig.json) — configuração TypeScript do app

---

**Conveniências de desenvolvimento e qualidade**

- ESLint para linting (`npm run lint`).
- Prettier + `prettier-plugin-tailwindcss` (recomenda-se configurar localmente) para formatação e ordenação de classes Tailwind.

**Boas práticas**

- Mantenha as animações do Framer Motion abaixo do fold para não afetar LCP.
- Carregue Recharts com `React.lazy()` + `Suspense` para não bloquear LCP.
- Valide formulários offline com `zod` antes de enviar para Supabase.

---

**Deploy**

Recomendado: Vercel (deploy zero-config para Vite). Ao conectar o repositório, defina as variáveis de ambiente listadas acima no painel de ambiente do projeto Vercel.

---

**Como contribuir**

- Abra uma issue descrevendo o problema ou feature.
- Crie um branch baseado em `main` com um nome claro (`feat/`, `fix/`).
- Abra um PR com descrição e screenshots/steps para reproduzir.

---

**Contatos / Créditos**

- Projeto: Limpa Fossa Express
- Arquivos principais e design system desenvolvidos com Tailwind + componentes shadcn-style (custom UI).

---

**Licença**

Nenhuma licença especificada no repositório. Adicione um arquivo `LICENSE` se desejar publicar com termos explícitos.

---

