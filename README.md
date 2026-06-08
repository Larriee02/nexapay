# NexaPay

Modern fintech payments platform built with React 18, Vite, Tailwind CSS, Framer Motion, and Recharts.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Demo accounts

| Email | Password | Role |
|-------|----------|------|
| alex@demo.com | demo123 | Customer |
| biz@demo.com | demo123 | Merchant |
| admin@demo.com | demo123 | Admin |

OTP verification accepts **any 6-digit code**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy:vercel` | Deploy to Vercel |
| `npm run deploy:netlify` | Deploy to Netlify |

## Features

- **Landing**: Hero parallax, scroll progress, stats, features, pricing, testimonials, FAQ
- **Customer**: Dashboard, payments (send/receive/transfer/scheduled/QR), cards, analytics, transactions, bills, wallet, notifications, settings
- **Merchant**: Dashboard, invoices, refunds
- **Admin**: Dashboard, users, fraud, analytics
- **Public**: Privacy, terms, security, contact
- Dark/light theme, PWA, responsive sidebar layout
- Mock data in `src/data/mockData.js`, auth state in `localStorage`

## Deployment

### Vercel

```bash
npm run build
npm run deploy:vercel
```

Uses `vercel.json` SPA rewrites.

### Netlify

```bash
npm run build
npm run deploy:netlify
```

Uses `netlify.toml` and `public/_redirects`.

## Tech stack

- Vite 5 + React 18
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- Recharts
- Lucide React
- vite-plugin-pwa

## License

MIT
