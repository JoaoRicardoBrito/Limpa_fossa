# Santa Clara ECO

**Landing page profissional e de alta conversão para serviços de saneamento ambiental.**

Empresa fundada em 2011, sediada em **Teresina, Piauí**. Oferece limpeza de fossa, desentupimento de rede de esgoto, limpeza de caixa de gordura e hidrojateamento.

**Objetivo:** permitir que clientes agendem serviços online em menos de 60 segundos, sem telefonemas, transmitindo confiança através de métricas reais e design limpo.

---

## Contato da empresa

| Canal | Dado |
|---|---|
| WhatsApp | [(86) 99900-6920](https://wa.me/5586999006920) |
| Instagram | [@santaclaraeco](https://www.instagram.com/santaclaraeco) |
| Localização | Teresina, Piauí e região |

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Framework UI |
| Vite | 8 | Bundler e dev server |
| TypeScript | 6 | Tipagem estática |
| Tailwind CSS | 3 | Estilização utility-first |
| framer-motion | 12 | Animações declarativas |
| react-hook-form + zod | 7 + 4 | Formulários e validação |
| @supabase/supabase-js | 2 | Persistência de agendamentos |
| recharts | 3 | Gráficos de credibilidade |
| lucide-react | 1 | Ícones |

---

## Pré-requisitos

- Node.js 18+
- npm ou pnpm

---

## Como rodar (desenvolvimento)

```bash
cd Site_Limpa_Fossa
npm install
npm run dev
```

O servidor Vite sobe em `http://localhost:5173`.

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Variáveis de ambiente

Crie o arquivo `Site_Limpa_Fossa/.env` com:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

> **Atenção:** nunca suba a chave `service_role` no frontend.

---

## Estrutura do projeto

```
Site_Limpa_Fossa/
├── src/
│   ├── assets/                  # Imagens estáticas
│   │   ├── Logo.png             # Logo da Santa Clara ECO
│   │   ├── instagram.png        # Ícone Instagram
│   │   ├── whastapp.png         # Ícone WhatsApp
│   │   ├── caminhao1.jpeg       # Fotos da frota
│   │   ├── caminhao2.jpeg
│   │   ├── caminhao3.jpeg
│   │   └── caminhao5.jpeg
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Header.tsx           # Navegação sticky com Logo.png
│   │   │   ├── HeroSection.tsx      # Seção principal com CTA
│   │   │   ├── AboutSection.tsx     # Nossa História 🌿 (desde 2011)
│   │   │   ├── FleetSection.tsx     # Nossa Frota 🚛 (carrossel automático)
│   │   │   ├── ServicesSection.tsx  # Cards de serviços (4 opções)
│   │   │   ├── CredibilitySection.tsx # Gráficos e KPIs (lazy-loaded)
│   │   │   ├── AppointmentSection.tsx # Formulário de agendamento
│   │   │   ├── SocialSection.tsx    # WhatsApp + Instagram CTA
│   │   │   └── Footer.tsx           # Contato e redes sociais
│   │   ├── ui/                  # Componentes base (button, card, badge)
│   │   └── WhatsAppButton.tsx   # Botão flutuante WhatsApp
│   ├── hooks/
│   │   └── useAppointmentForm.ts  # Lógica do formulário com Zod
│   ├── lib/
│   │   ├── constants.ts         # WA_NUMBER, waLink()
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── utils.ts             # cn() e utilitários
│   ├── services/
│   │   └── appointments.ts      # createAppointment()
│   ├── types/
│   │   └── index.ts             # ServiceType, SERVICE_LABELS
│   ├── App.tsx                  # Composição das seções
│   └── main.tsx                 # Bootstrap React
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Seções do site (ordem de renderização)

1. **Header** — Logo + navegação sticky
2. **HeroSection** — Headline, subtítulo, CTA e indicadores de confiança
3. **AboutSection** — Nossa História 🌿, fundada em 2011, missão ambiental
4. **FleetSection** — Nossa Frota 🚛, carrossel com auto-avanço a cada 5s
5. **ServicesSection** — 4 cards de serviço (clicáveis → pré-selecionam no formulário)
6. **CredibilitySection** — KPIs e gráficos (lazy-loaded para performance)
7. **AppointmentSection** — Formulário de agendamento integrado ao Supabase
8. **SocialSection** — CTAs WhatsApp e Instagram
9. **Footer** — Contato, localização, redes sociais e copyright
10. **WhatsAppButton** — Botão flutuante fixo

---

## Serviços disponíveis

| Valor (DB) | Label exibido |
|---|---|
| `limpeza-fossa` | Limpeza de Fossa |
| `desentupimento` | Desentupimento de Rede de Esgoto |
| `caixa-gordura` | Caixa de Gordura |
| `hidrojateamento` | Hidrojateamento |

Tipos definidos em [`src/types/index.ts`](Site_Limpa_Fossa/src/types/index.ts). Para adicionar um serviço, basta incluir o valor no `ServiceType`, `SERVICE_LABELS`, no enum Zod em `useAppointmentForm.ts` e no `<select>` do formulário.

---

## Formulário de agendamento

- Validação com **Zod** offline (sem chamada Supabase)
- Horário de atendimento: **seg–sáb, 07h–18h** (rejeitado no front)
- Persiste rascunho em `sessionStorage` durante a sessão
- Serviço pré-selecionado ao clicar em um card de serviço
- Sucesso: exibe resumo + link direto para WhatsApp

---

## Boas práticas mantidas

- `CredibilitySection` carregada com `React.lazy()` + `Suspense` (não afeta LCP)
- Imagens da frota com `loading="lazy"`
- Animações `framer-motion` abaixo do fold
- Formulário validado no cliente com Zod antes de qualquer requisição

---

## Deploy

Recomendado: **Vercel** (deploy zero-config para Vite).

1. Conecte o repositório no painel Vercel
2. Defina a pasta raiz como `Site_Limpa_Fossa`
3. Configure as variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)

---

## Como contribuir

1. Abra uma issue descrevendo o problema ou feature
2. Crie um branch baseado em `master` (`feat/`, `fix/`)
3. Abra um PR com descrição e screenshots

---

© 2026 Santa Clara ECO — Teresina, Piauí
