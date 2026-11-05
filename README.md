# BookNook — A Small Online Library

Live site: **TODO — replace this line with your deployed Vercel URL before submission.**

BookNook is a community-powered mini library where readers can discover books, contribute titles, borrow available copies for seven days, and return them for the next reader.

## Features
- Responsive home page with a three-slide Swiper hero, six newest arrivals, and two editorial sections.
- Email/password registration and login with Better Auth, plus Google social login.
- Private routes for adding books, managing your own books (loaded through the JWT-protected `GET /books?mine=1` query), viewing borrowed books, and profile details.
- Book CRUD with categories, cover image URL or secure server-side imgbb upload, descriptions, contributor information, and copy counts.
- Borrow and return workflow with atomic inventory updates, availability checks, and duplicate active-borrow prevention.
- Toast feedback, loading indicators, custom not-found page, route-specific page titles, and light/dark theme.

## Tech stack
Next.js App Router, TypeScript, Tailwind CSS, Better Auth, MongoDB Adapter, Swiper.js, Sonner, Lucide, Express API (separate repository), MongoDB, JWT.

## Run locally
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and fill in your MongoDB, Better Auth, Google OAuth, server-side imgbb, and API JWT settings.
3. Install dependencies: `npm install`.
4. Start the server project first (see `../server/README.md`).
5. Run `npm run dev` and open `http://localhost:3000`.

## Environment variables
See `.env.example`. `API_JWT_SECRET` must match the server's secret exactly. Configure Google OAuth callback URL as `http://localhost:3000/api/auth/callback/google` for local development and the equivalent deployed URL in production. Use a strong unique secret in production.

## Deployment
Deploy this client folder as a Next.js project on Vercel. Set all variables from `.env.example` in Vercel Project Settings. Deploy the Express server separately (for example, Render), set `CLIENT_URL` to the deployed client origin, and set `NEXT_PUBLIC_API_URL` to the deployed API URL. Ensure MongoDB Atlas allows the server and Next.js deployment to connect. Add the deployed Google OAuth callback URL in Google Cloud Console.
