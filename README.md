# PromoHub

PromoHub is a monorepo marketplace for booking creator promotion pages from both a Next.js web app and a React Native CLI mobile app.

## Stack

- `web`: Next.js App Router frontend plus API routes
- `mobile`: React Native CLI app source
- `prisma`: shared Neon/PostgreSQL schema and seed script
- `packages/shared`: validation, constants, and shared types
- `packages/db`: generated Prisma client wrapper

## Setup

1. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL`
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client and run migrations:

```bash
npx prisma generate --schema ./prisma/schema.prisma
npx prisma migrate dev --schema ./prisma/schema.prisma
```

4. Seed demo data:

```bash
npm run db:seed
```

5. Start the web app:

```bash
npm run dev
```

## Demo credentials

- Admin: `admin@promohub.com` / `password123`
- Creator: `creator@promohub.com` / `password123`
- User: `user@promohub.com` / `password123`

## Web routes

- `/` landing page
- `/login` and `/register`
- `/explore`
- `/pages/[id]`
- `/pages/[id]/book`
- `/dashboard`
- `/creator`
- `/creator/pricing?pageId=<page-id>`
- `/pages/new`
- `/pages/[id]/edit`
- `/admin`

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/pages`
- `GET /api/pages`
- `GET /api/pages/[id]`
- `PUT /api/pages/[id]`
- `DELETE /api/pages/[id]`
- `PATCH /api/pages/[id]/status`
- `POST /api/pricing`
- `GET /api/pricing/[pageId]`
- `PUT /api/pricing/[id]`
- `POST /api/bookings`
- `GET /api/bookings/my`
- `GET /api/bookings/creator`
- `PATCH /api/bookings/[id]/status`
- `GET /api/admin/dashboard`
- `GET /api/admin/pages`
- `GET /api/admin/users`
- `GET /api/admin/bookings`

## Mobile app

The `mobile` workspace is structured for React Native CLI and uses the same API endpoints as the web app.

- Update `mobile/src/services/api.ts` with your local or deployed API host.
- Android emulator can usually hit local Next.js with `http://10.0.2.2:3000/api`.
- For release builds, point the base URL to your deployed Vercel domain.
- If you created this repo from scratch without first running React Native CLI, generate the native `android/` and `ios/` shells inside `mobile/` before building device binaries.

Common commands:

```bash
npm install
npm run start -w mobile
npm run android -w mobile
npm run ios -w mobile
```

Android release build:

```bash
cd mobile/android
./gradlew assembleRelease
```

iOS release builds should be created in Xcode after installing native dependencies.

## Notes

- Authentication uses JWTs in `httpOnly` cookies for web and bearer tokens for mobile.
- Validation is shared with Zod across the stack.
- Prisma client is generated into `packages/db/generated/client`.
- Deploy the `web` workspace to Vercel with `DATABASE_URL` and `JWT_SECRET` configured.
