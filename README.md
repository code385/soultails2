# Soultails — Veterinary Care Website

Next.js 14 · TypeScript · Tailwind CSS · Sanity CMS · Supabase · Stripe · Resend

---

## Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up database (Supabase)
1. Go to supabase.com → New project
2. Copy your database URL and direct URL into `.env.local`
3. Run migrations:
```bash
npx prisma db push
npx ts-node prisma/seed.ts   # Creates first admin user
```

### 4. Set up Sanity CMS
1. Go to sanity.io → Create project → Note the Project ID
2. Add Project ID to `.env.local`
3. Deploy Sanity Studio:
```bash
npx sanity deploy
```
Or access it locally at: `http://localhost:3000/studio`

### 5. Set up Stripe
1. Go to stripe.com → Get API keys
2. Add keys to `.env.local`
3. Set up webhook (for local testing):
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the webhook secret to STRIPE_WEBHOOK_SECRET in .env.local
```

### 6. Set up Resend (email)
1. Go to resend.com → Create API key
2. Add domain (soultails.com) to verify sending
3. Add API key to `.env.local`

### 7. Set up Cloudinary (images)
1. Go to cloudinary.com → Free account
2. Copy cloud name, API key, API secret to `.env.local`

### 8. Run development server
```bash
npm run dev
# Open http://localhost:3000
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About Dr. Claudia |
| `/services` | All services |
| `/services/[slug]` | Individual service landing page |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/book` | Booking form |
| `/contact` | Contact form |
| `/studio` | Sanity CMS (blog + services) |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin overview |
| `/admin/bookings` | Manage bookings |
| `/admin/messages` | Contact messages |

---

## Admin Login

After running seed:
- URL: `http://localhost:3000/admin/login`
- Email: `admin@soultails.com`
- Password: `SoultailsAdmin2024!`
- **⚠️ Change password immediately after first login**

---

## Adding Blog Posts (for Dr. Claudia)

1. Go to `https://soultails.com/studio`
2. Login with her Sanity account
3. Click **Blog Posts** → **New post**
4. Fill in: Title, short description, cover image, category, content
5. Click **Publish** — goes live instantly

---

## Design System

All colors and fonts are defined in **one file**:
```
src/lib/tokens.ts       ← Change design tokens here
src/app/globals.css     ← CSS variables (auto-updated from tokens)
tailwind.config.ts      ← Tailwind theme (uses same values)
```

To change the primary color across the entire site → update `primary` in `tokens.ts` and `--color-primary` in `globals.css`.

---

## Deployment (Vercel)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/soultails.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to vercel.com → Import project from GitHub
2. Add all environment variables from `.env.local`
3. Deploy

### 3. Connect soultails.com domain
1. In Vercel: Settings → Domains → Add `soultails.com`
2. In Hostinger: Change nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. SSL auto-provisions within minutes

### 4. Set up Stripe webhook for production
1. Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://soultails.com/api/stripe/webhook`
3. Events: `checkout.session.completed`, `checkout.session.expired`
4. Copy webhook secret → update `STRIPE_WEBHOOK_SECRET` in Vercel env vars

---

## Tech Stack

| Layer | Tool | Cost |
|-------|------|------|
| Framework | Next.js 14 (App Router) | Free |
| Deployment | Vercel Hobby | Free |
| Database | Supabase Postgres | Free |
| CMS | Sanity (blog + services) | Free |
| Images | Cloudinary | Free |
| Email | Resend (3000/mo) | Free |
| AI Chat | Botpress | Free |
| Payments | Stripe | 1.5% + 20p/txn |
| Domain | Hostinger | ~£10/yr (Claudia pays) |

**Monthly infra cost: £0**

---

## Security Features

- NextAuth with JWT sessions (8-hour expiry)
- Bcrypt password hashing (12 rounds)
- Rate limiting on login (5 attempts / 15 min lockout)
- Stripe webhook signature verification
- HTTP security headers on all routes
- Admin routes protected by server-side session checks
- All env vars never exposed to client

---

## File Structure

```
soultails/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages with Navbar + Footer
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── book/
│   │   │   └── contact/
│   │   ├── admin/             # Protected admin panel
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   └── messages/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── contact/
│   │   │   ├── stripe/
│   │   │   └── admin/
│   │   └── studio/            # Embedded Sanity Studio
│   ├── components/            # Reusable components
│   ├── emails/                # Email templates
│   ├── lib/                   # Utilities (auth, prisma, sanity, stripe, resend)
│   ├── sanity/schemas/        # CMS content schemas
│   └── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Create first admin user
├── .env.example               # Environment variables template
└── tailwind.config.ts         # Design system (colors, fonts)
```
