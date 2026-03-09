# TheoSheets

Premium digital sheet music storefront for piano music, accompaniment products, and multitrack products.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- NextAuth (auth)
- Stripe (payments)
- AWS S3 (file storage)
- Resend (email)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Minimum for local development:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_URL` — `http://localhost:3000`
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`

For checkout:

- `STRIPE_SECRET_KEY` — Stripe secret key (sk_test_... for test mode)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (pk_test_...)
- `STRIPE_WEBHOOK_SECRET` — For local dev: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

For email (Resend):

- `RESEND_API_KEY` — Resend API key
- `EMAIL_FROM` — Sender address, e.g. "TheoSheets <hello@example.com>"

For file downloads (S3):

- `AWS_ACCESS_KEY_ID` — AWS credentials
- `AWS_SECRET_ACCESS_KEY` — AWS credentials
- `AWS_REGION` — e.g. us-east-1
- `S3_BUCKET` — Bucket name for private files
- `S3_PRIVATE_PREFIX` — Optional, default `private/`
- `S3_PREVIEW_PREFIX` — Optional, default `preview/`

### 3. Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema (or create migration)
npm run db:push

# Seed sample products
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — App Router pages and API routes
- `src/components/` — Reusable UI components
- `src/lib/` — Core utilities (Prisma, auth, Stripe, etc.)
- `src/config/` — Site config and constants
- `prisma/` — Schema and migrations

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run build` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |
