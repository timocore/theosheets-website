# TheoSheets — Architecture Plan

> **Status:** Planning phase — review before implementation  
> **Last updated:** March 9, 2025

---

## 1. Folder Structure

```
TheoSheets/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── globals.css
│   │   ├── (public)/
│   │   │   ├── sheet-music/
│   │   │   │   ├── page.tsx            # Catalog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx        # Product page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   └── policies/
│   │   │       ├── layout.tsx
│   │   │       ├── refund-policy/
│   │   │       ├── terms-of-use/
│   │   │       ├── licensing/
│   │   │       ├── privacy-policy/
│   │   │       └── cookie-notice/
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── order-success/
│   │   │   └── page.tsx
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── set-password/
│   │   │       └── page.tsx
│   │   ├── account/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # Dashboard redirect
│   │   │   ├── purchases/
│   │   │   ├── downloads/
│   │   │   ├── receipts/
│   │   │   ├── profile/
│   │   │   └── email-preferences/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/
│   │   │   ├── download/
│   │   │   ├── newsletter/
│   │   │   ├── products/
│   │   │   └── search/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── products/
│   │           ├── page.tsx
│   │           ├── new/
│   │           │   └── page.tsx
│   │           └── [id]/
│   │               └── edit/
│   │                   └── page.tsx
│   ├── components/
│   │   ├── ui/                         # Base primitives
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── catalog/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── SortDropdown.tsx
│   │   ├── product/
│   │   │   ├── ProductHero.tsx
│   │   │   ├── PreviewAudioPlayer.tsx
│   │   │   ├── PreviewViewer.tsx
│   │   │   └── RelatedProducts.tsx
│   │   ├── cart/
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartItem.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── PaymentSection.tsx
│   │   ├── account/
│   │   │   ├── AccountNav.tsx
│   │   │   └── DownloadList.tsx
│   │   ├── shared/
│   │   │   ├── SerifHeading.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   ├── PriceDisplay.tsx
│   │   │   ├── TagPill.tsx
│   │   │   ├── ReviewSummary.tsx
│   │   │   └── NewsletterBlock.tsx
│   │   └── admin/
│   │       ├── FileUploadField.tsx
│   │       ├── VariantSelector.tsx
│   │       └── ProductForm.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── stripe.ts
│   │   ├── s3.ts
│   │   ├── email.ts
│   │   ├── analytics.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useCart.ts
│   │   └── useMediaQuery.ts
│   ├── store/
│   │   └── cart-store.ts              # Zustand or context for cart
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── index.ts
│   └── config/
│       ├── site.ts
│       └── constants.ts
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Prisma Schema

### 2.1 Core Models Overview

| Model | Purpose |
|-------|---------|
| `User` | Auth + account; email, password hash, OAuth providers |
| `Account` | NextAuth OAuth account linking |
| `Session` | NextAuth session |
| `VerificationToken` | NextAuth verification |
| `Product` | Sheet music product with all metadata |
| `ProductVariant` | Purchasable variant (PDF, accompaniment, bundle, etc.) |
| `Order` | Purchase record |
| `OrderItem` | Line items in an order |
| `Download` | Secure download record for access control |
| `NewsletterSubscriber` | Email subscription list |
| `PasswordResetToken` | Password reset flow |
| `SetPasswordToken` | Set-password for guest-created accounts |

### 2.2 Product Schema (Detailed)

```prisma
model Product {
  id                    String   @id @default(cuid())
  sku                   String   @unique
  slug                  String   @unique
  status                ProductStatus @default(DRAFT)
  featured              Boolean  @default(false)
  sortOrder             Int      @default(0)

  // Core content
  title                 String
  shortDescription      String?
  longDescription       String?  @db.Text
  aboutThePiece         String?  @db.Text
  whatBuyersShouldKnow  String?  @db.Text

  // Classification
  composer              String?
  instrument            String?
  difficulty            String?
  mood                  String?
  category              String?
  collection            String?
  tags                 String[]  // PostgreSQL array
  durationSeconds       Int?
  pageCount             Int?
  releaseDate           DateTime?
  format                String?  // PDF, Accompaniment, Multitrack, etc.

  // Media (S3 keys or URLs for public assets)
  productImage          String?
  coverImage            String?
  galleryImages         String[] // array of S3 keys
  previewPageImages     String[]
  previewPdfAsset       String?
  previewAudioUrl       String?
  waveformImage         String?
  openGraphImage        String?

  // Private file keys (S3) — never exposed publicly
  fullPdfFile           String?
  accompanimentFile     String?
  multitrackFile        String?
  standaloneMp3File     String?

  // Commerce
  price                 Decimal  @db.Decimal(10, 2)
  compareAtPrice        Decimal? @db.Decimal(10, 2)
  stripeProductId       String?
  stripePriceIds        Json?    // { variantKey: priceId }
  taxCategory           String?
  isActive              Boolean  @default(true)

  // Admin toggles
  enablePreviewAudio    Boolean  @default(false)
  enableStandaloneMp3   Boolean  @default(false)
  enableAccompaniment   Boolean  @default(false)
  enableMultitrack      Boolean  @default(false)

  // Variants / bundles (JSON for v1 predefined variants)
  availableVariants     Json     // e.g. ["pdf", "accompaniment", "bundle"]
  bundleDefinitions     Json?    // e.g. { "bundle": ["pdf", "accompaniment"] }

  // SEO
  seoTitle              String?
  seoDescription        String?  @db.Text

  // Relationships
  relatedProductIds     String[] // array of product IDs

  // Internal
  adminNotes            String?  @db.Text
  internalName          String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  variants              ProductVariant[]
  orderItems            OrderItem[]
}

enum ProductStatus {
  DRAFT
  PUBLISHED
}
```

### 2.3 Full Prisma Schema (Draft)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                    String    @id @default(cuid())
  email                 String?   @unique
  emailVerified         DateTime?
  passwordHash          String?
  name                  String?
  image                 String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  accounts              Account[]
  sessions              Session[]
  orders                Order[]
  newsletterPrefs       NewsletterPreference?
  downloads             Download[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Product {
  id                    String   @id @default(cuid())
  sku                   String   @unique
  slug                  String   @unique
  status                ProductStatus @default(DRAFT)
  featured              Boolean  @default(false)
  sortOrder             Int      @default(0)

  title                 String
  shortDescription      String?
  longDescription       String?  @db.Text
  aboutThePiece         String?  @db.Text
  whatBuyersShouldKnow  String?  @db.Text

  composer              String?
  instrument            String?
  difficulty            String?
  mood                  String?
  category              String?
  collection            String?
  tags                  String[]
  durationSeconds       Int?
  pageCount             Int?
  releaseDate           DateTime?
  format                String?

  productImage          String?
  coverImage            String?
  galleryImages         String[]
  previewPageImages     String[]
  previewPdfAsset       String?
  previewAudioUrl       String?
  waveformImage         String?
  openGraphImage        String?

  fullPdfFile           String?
  accompanimentFile     String?
  multitrackFile        String?
  standaloneMp3File     String?

  price                 Decimal  @db.Decimal(10, 2)
  compareAtPrice        Decimal? @db.Decimal(10, 2)
  stripeProductId       String?
  stripePriceIds        Json?
  taxCategory           String?
  isActive              Boolean  @default(true)

  enablePreviewAudio    Boolean  @default(false)
  enableStandaloneMp3   Boolean  @default(false)
  enableAccompaniment   Boolean  @default(false)
  enableMultitrack      Boolean  @default(false)

  availableVariants     Json
  bundleDefinitions     Json?

  seoTitle              String?
  seoDescription        String?  @db.Text
  relatedProductIds     String[]
  adminNotes            String?  @db.Text
  internalName          String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  variants              ProductVariant[]
  orderItems            OrderItem[]
}

enum ProductStatus {
  DRAFT
  PUBLISHED
}

model ProductVariant {
  id          String   @id @default(cuid())
  productId   String
  key         String   // "pdf", "accompaniment", "bundle", etc.
  name        String
  stripePriceId String?
  price       Decimal  @db.Decimal(10, 2)
  sortOrder   Int      @default(0)

  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems  OrderItem[]
}

model Order {
  id                String   @id @default(cuid())
  orderNumber       String   @unique
  userId            String?
  guestEmail        String?
  status            OrderStatus @default(PENDING)
  subtotal          Decimal  @db.Decimal(10, 2)
  taxAmount         Decimal  @db.Decimal(10, 2)
  discountAmount    Decimal  @db.Decimal(10, 2) @default(0)
  total             Decimal  @db.Decimal(10, 2)
  currency          String   @default("usd")
  stripePaymentIntentId String?
  stripeSessionId   String?
  couponCode        String?
  billingAddress    Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user              User?    @relation(fields: [userId], references: [id])
  items             OrderItem[]
  downloads         Download[]
}

enum OrderStatus {
  PENDING
  PAID
  FULFILLED
  REFUNDED
  FAILED
}

model OrderItem {
  id            String   @id @default(cuid())
  orderId       String
  productId     String
  variantId     String?
  variantKey    String   // "pdf", "accompaniment", etc.
  quantity      Int      @default(1)
  unitPrice     Decimal  @db.Decimal(10, 2)
  totalPrice    Decimal  @db.Decimal(10, 2)
  productSnapshot Json?  // title, slug for receipts

  order         Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product       Product  @relation(fields: [productId], references: [id])
  variant       ProductVariant? @relation(fields: [variantId], references: [id])
}

model Download {
  id          String   @id @default(cuid())
  orderId     String
  userId      String?
  productId   String
  assetType   String   // "pdf", "accompaniment", "multitrack", "mp3"
  s3Key       String
  expiresAt   DateTime?
  downloadCount Int   @default(0)
  createdAt   DateTime @default(now())

  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  user        User?    @relation(fields: [userId], references: [id])
}

model NewsletterSubscriber {
  id          String   @id @default(cuid())
  email       String   @unique
  status      String   @default("active")  // active, unsubscribed, bounced
  source      String?
  subscribedAt DateTime @default(now())
  unsubscribedAt DateTime?
}

model NewsletterPreference {
  id          String   @id @default(cuid())
  userId      String   @unique
  productUpdates Boolean @default(true)
  marketing   Boolean  @default(false)
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model PasswordResetToken {
  id          String   @id @default(cuid())
  email       String
  token       String   @unique
  expiresAt   DateTime
  usedAt      DateTime?
  createdAt   DateTime @default(now())
}

model SetPasswordToken {
  id          String   @id @default(cuid())
  userId      String
  token       String   @unique
  expiresAt   DateTime
  usedAt      DateTime?
  createdAt   DateTime @default(now())
}
```

---

## 3. Core Domain Models (TypeScript)

### 3.1 Product Types

```typescript
// src/types/product.ts
export type ProductStatus = 'DRAFT' | 'PUBLISHED';
export type VariantKey = 'pdf' | 'accompaniment' | 'multitrack' | 'bundle' | 'mp3';

export interface ProductVariantDef {
  key: VariantKey;
  name: string;
  price: number;
  stripePriceId?: string;
}

export interface BundleDefinition {
  [bundleKey: string]: VariantKey[];
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}
```

### 3.2 Order Types

```typescript
// src/types/order.ts
export type OrderStatus = 'PENDING' | 'PAID' | 'FULFILLED' | 'REFUNDED' | 'FAILED';

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[];
}

export interface DownloadableAsset {
  productTitle: string;
  assetType: string;
  downloadUrl: string;  // signed, time-limited
  expiresAt?: Date;
}
```

### 3.3 Cart Types

```typescript
// src/types/cart.ts
export interface CartItem {
  productId: string;
  variantKey: string;
  quantity: number;
  product?: Product;  // hydrated for display
}
```

---

## 4. App Routes

| Route | Purpose | Auth |
|-------|---------|------|
| `/` | Home | Public |
| `/sheet-music` | Catalog | Public |
| `/sheet-music/[slug]` | Product page | Public |
| `/cart` | Cart | Public |
| `/checkout` | Checkout | Public |
| `/order-success` | Post-purchase | Public |
| `/about` | About | Public |
| `/contact` | Contact | Public |
| `/faq` | FAQ | Public |
| `/policies/refund-policy` | Refund policy | Public |
| `/policies/terms-of-use` | Terms | Public |
| `/policies/licensing` | Licensing | Public |
| `/policies/privacy-policy` | Privacy | Public |
| `/policies/cookie-notice` | Cookies | Public |
| `/auth/signin` | Sign in | Public |
| `/auth/signup` | Sign up | Public |
| `/auth/reset-password` | Reset password | Public |
| `/auth/set-password` | Set password (from email) | Public |
| `/account` | Dashboard redirect | Protected |
| `/account/purchases` | Purchases | Protected |
| `/account/downloads` | Downloads | Protected |
| `/account/receipts` | Receipts | Protected |
| `/account/profile` | Profile | Protected |
| `/account/email-preferences` | Email prefs | Protected |
| `/admin` | Admin dashboard | Admin |
| `/admin/products` | Product list | Admin |
| `/admin/products/new` | New product | Admin |
| `/admin/products/[id]/edit` | Edit product | Admin |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/auth/[...nextauth]` | NextAuth |
| `/api/cart` | Cart CRUD |
| `/api/checkout` | Create Stripe session / payment intent |
| `/api/webhooks/stripe` | Stripe webhooks |
| `/api/download/[token]` | Secure signed download |
| `/api/newsletter` | Subscribe / unsubscribe |
| `/api/products` | Product list (admin) |
| `/api/products/[id]` | Product CRUD (admin) |
| `/api/search` | Catalog search |
| `/api/upload` | S3 presigned upload (admin) |

---

## 5. Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js + TypeScript + Tailwind
2. Configure Prisma + PostgreSQL
3. Run migrations
4. Create seed script with sample products
5. Set up env template

### Phase 2: Auth & Core Layout
1. NextAuth with credentials + Google
2. User model + session
3. Header, Footer, layout
4. Cart store (Zustand) + cart persistence
5. Base UI components (SerifHeading, CTAButton, etc.)

### Phase 3: Catalog & Product
1. Catalog page with filters, search, sort
2. Product page with hero, preview, audio player
3. Preview viewer (modal) with watermark
4. Product card, filter sidebar, search bar

### Phase 4: Commerce
1. Stripe integration (Products, Prices)
2. Cart page
3. Checkout page (custom UI + Stripe Elements)
4. Webhook: order creation, fulfillment
5. Guest checkout → auto-create account + set-password email

### Phase 5: File Storage & Downloads
1. S3 client + presigned URLs
2. Download API with access control
3. Account downloads section
4. Order success page

### Phase 6: Account & Email
1. Account dashboard layout + nav
2. Purchases, receipts, profile, email prefs
3. Resend/Postmark integration
4. Transactional emails (order, receipt, set-password, reset)
5. Newsletter signup + confirmation

### Phase 7: Admin
1. Admin layout + auth guard
2. Product CRUD
3. File upload (S3 presigned)
4. Variant management
5. Publish/unpublish, featured

### Phase 8: Polish
1. Policy pages
2. FAQ
3. SEO (metadata, sitemap, structured data)
4. Analytics hooks
5. Performance (images, lazy load)

---

## 6. Key Technical Decisions

| Area | Decision | Rationale |
|------|----------|------------|
| Auth | NextAuth.js | Mature, Next.js native, supports credentials + OAuth |
| Cart | Zustand + localStorage | Simple, no DB for guest cart; sync on login |
| Payments | Stripe Payment Intents | Custom checkout UI, full control |
| Files | S3 + presigned URLs | Private by default; time-limited download links |
| Email | Resend | Simple API, good deliverability |
| Admin | Internal route group | Lightweight; no separate app |
| Search | Prisma full-text | Sufficient for v1; can add Algolia/Meilisearch later |

---

## 7. Environment Variables

```
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET=
S3_PREVIEW_PREFIX=
S3_PRIVATE_PREFIX=
RESEND_API_KEY=
EMAIL_FROM=
```

---

## 8. Guest Checkout Flow (Detailed)

```
1. Guest adds items to cart → cart stored in localStorage
2. Guest goes to checkout → enters email + billing
3. Stripe processes payment
4. Webhook receives payment_intent.succeeded:
   a. Look up email in User table
   b. If user exists → attach Order to userId
   c. If user does NOT exist:
      - Create User (email, no password)
      - Create SetPasswordToken (expires 7 days)
      - Attach Order to new userId
      - Send "Set your password" email with link to /auth/set-password?token=...
   d. Create Order, OrderItems, Download records
   e. Send order confirmation, receipt, downloads-ready emails
5. Redirect to /order-success
6. User can access account via "Set password" link or password reset
```

---

## 9. Design System (TheoSheets)

| Token | Value | Usage |
|-------|-------|-------|
| Background (light) | `#F5F0E8` / parchment | Catalog, product, cart |
| Background (hero) | `#2C2416` / dark warm | Home hero |
| Accent | `#C9A227` / honey gold | CTAs, highlights |
| Text primary | `#3D3630` / soft charcoal | Body |
| Text secondary | `#6B635B` | Muted |
| Border | `#E5DDD4` | Soft warm borders |
| Serif | Playfair Display or Cormorant Garamond | Headlines |
| Sans | Source Sans 3 or DM Sans | Body, UI |

---

## 10. Next Steps

1. **Review this plan** — Confirm folder structure, schema, phases, and design tokens.
2. **Phase 1** — Initialize project and database.
3. **Phase 2** — Auth and layout.
4. **Proceed sequentially** through phases 3–8.

---

*This document serves as the implementation blueprint. Adjust as needed before coding.*
