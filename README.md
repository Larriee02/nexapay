# NexaPay

NexaPay is a full-stack demo wallet. React and Vite power the interface, Express serves the same-origin API, and PostgreSQL stores accounts, sessions, wallets, transfers, tickets, and contact messages.

## Run locally

Use Node.js 22.12 or newer and Docker Compose.

```bash
cp .env.example .env
npm ci
docker compose up -d --wait
npm run db:migrate
npm run db:seed
npm run dev
```

Open [NexaPay](http://localhost:5173) or [the admin workspace](http://localhost:5173/admin). PostgreSQL listens locally on port 55432. Compose uses a named volume, so the database survives container restarts.

| Role | Email | Local password |
| --- | --- | --- |
| Customer with demo funds | alex@demo.com | demo123 |
| Second customer wallet | jamie@demo.com | demo123 |
| Merchant | biz@demo.com | demo123 |
| Administrator | admin@demo.com | demo123 |

To try both sides of a transfer, sign in as Alex, send a small amount to Jamie, then check each account's Transactions page. You can also create an account with a zero-balance wallet and send it funds from a seeded wallet.

The admin workspace includes account listings, transfer activity, monthly metrics, the shared ticket queue, and an inbox for public contact submissions. The contact form confirms receipt after the database stores the message. Admins read messages in the inbox.

## Configuration

- `DATABASE_URL` points to a PostgreSQL database. Compose credentials are for local development.
- `SMTP_URL` and `MAIL_FROM` enable password recovery. The mail service delivers a time-limited, single-use recovery code.
- `HOST` and `PORT` control the HTTP listener. The default interface is loopback.
- `SECURE_COOKIES=true` enforces HTTPS cookies. `NODE_ENV=production` also enables this.
- `TRUST_PROXY_HOPS` is optional. Set it to the number of trusted proxy hops in front of the Node server only if your deployment uses one.
- To provision a non-demo admin, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running `npm run db:seed`. Use a fresh database for hosted deployments and keep demo seed accounts local.

## Production build

```bash
npm run lint
npm run build
npm start
```

The standalone Node server serves the built frontend and `/api` on the same origin. Run migrations against the deployment database before starting it.

## Deploy to Vercel

Import the repository using the Vite framework preset and the repository root. Vercel serves the static frontend from `dist` and runs the shared Express app as a Node function for `/api/*`.

With no database configured, Vercel serves the public preview and reports database-backed features as unavailable. To enable those features, connect a hosted PostgreSQL database and set its pooled, TLS-enabled connection string as the server-side `DATABASE_URL` for Production. The production build runs pending schema migrations using that connection. For Preview deployments, use a separate database, configure its `DATABASE_URL`, and run `npm run db:migrate` against it before testing.

Provision the first administrator once using the hosted `DATABASE_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in a trusted shell with `NODE_ENV=production npm run db:seed`. Customer accounts can register through the hosted signup page. Configure `SMTP_URL` and `MAIL_FROM` on Vercel to enable password recovery.

Wallet transfers move simulated USD between NexaPay accounts. Bank integration and scheduled execution are outside this implementation. Cards, bill payments, notifications, merchant invoices and refunds, and the original fraud screen use sample data.
