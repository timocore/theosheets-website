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

Copy `.env.example` to `.env` and fill in the values. See `.env.example` for the full list.

Minimum for local development:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_URL` — `http://localhost:3000`
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`

### 3. Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
