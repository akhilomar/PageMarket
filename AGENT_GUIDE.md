# PromoHub Agent Guide

This file gives a coding agent a fast mental model of the repository.

## What This Project Is

PromoHub is a monorepo for a creator promotion marketplace.

- `web/` is the main product surface.
- `web/` contains both the frontend and backend.
- Backend logic lives in Next.js App Router API routes under `web/app/api/`.
- `mobile/` is a React Native CLI client that talks to the same backend endpoints.
- `prisma/` contains the shared database schema and seed script.
- `packages/shared/` contains shared validation, constants, and TypeScript types.
- `packages/db/` exposes the generated Prisma client wrapper.

## High-Level Architecture

Request flow:

1. Web UI or mobile app sends requests to the Next.js backend.
2. Next.js API routes validate input with shared Zod schemas.
3. API routes use Prisma to read/write Neon PostgreSQL.
4. Auth uses JWT.
5. Web stores JWT in `httpOnly` cookies.
6. Mobile stores JWT in AsyncStorage and sends it as a bearer token.

## Monorepo Layout

```text
promohub/
  web/                Next.js app (frontend + API backend)
  mobile/             React Native CLI app
  prisma/             Prisma schema + seed
  packages/
    shared/           Shared types, constants, validation
    db/               Prisma client wrapper
```

## What Lives Where

### `web/`

Use this workspace for almost all product and backend changes.

- `app/`:
  Next.js routes and pages.
- `app/api/`:
  REST API endpoints for auth, pages, pricing, bookings, and admin.
- `components/`:
  Reusable web UI and form components.
- `lib/`:
  Auth helpers, Axios client, query helpers, utilities, and API response helpers.
- `middleware.ts`:
  Route protection for dashboard/admin/creator areas.

Main web entry points:

- `web/app/page.tsx` for landing page
- `web/app/explore/page.tsx` for page discovery
- `web/app/dashboard/page.tsx` for user dashboard
- `web/app/creator/page.tsx` for creator dashboard
- `web/app/admin/page.tsx` for admin dashboard

### `mobile/`

Use this workspace for mobile-only UI and app flow.

- `App.tsx`:
  mobile app root
- `src/navigation/`:
  navigation structure
- `src/screens/`:
  mobile screens
- `src/services/api.ts`:
  shared backend base URL and Axios setup
- `src/context/auth-context.tsx`:
  mobile auth state and token bootstrap
- `src/storage/token.ts`:
  AsyncStorage token persistence

Important note:

- This repo contains the React Native CLI app source structure.
- If native `android/` and `ios/` folders have not been generated yet, they must be created before building device binaries.

### `prisma/`

- `schema.prisma`:
  source of truth for the database
- `seed.ts`:
  demo seed data

When changing data models, update:

1. `prisma/schema.prisma`
2. any affected Zod schemas in `packages/shared/src/validators.ts`
3. API route logic in `web/app/api/`
4. UI forms in web and mobile if needed

### `packages/shared/`

This is the contract layer shared across apps.

- `src/validators.ts`:
  request validation schemas
- `src/types.ts`:
  common app-level types
- `src/constants.ts`:
  shared option lists and constants

If an API payload changes, update here first.

### `packages/db/`

- `src/prisma.ts`:
  Prisma singleton wrapper

## Core Domain Models

Main entities:

- `User`
- `PromotionPage`
- `Pricing`
- `Booking`

Roles:

- `USER`
- `CREATOR`
- `ADMIN`

Typical ownership rules:

- creators own `PromotionPage`
- brands/users create `Booking`
- admins approve pages and view platform-wide data

## API Surface

Most backend work happens under `web/app/api/`.

Main route groups:

- `auth/`
- `pages/`
- `pricing/`
- `bookings/`
- `admin/`

If an agent needs backend behavior, this is usually the first place to inspect.

## Auth Model

Web:

- login/register via `/api/auth/*`
- token stored in `httpOnly` cookie
- protected pages also use `middleware.ts`

Mobile:

- login with `mobileClient: true`
- token returned in response body
- token stored with AsyncStorage
- token attached as bearer auth in Axios interceptor

## Where To Start For Common Tasks

Add or change API behavior:

1. check `packages/shared/src/validators.ts`
2. update route in `web/app/api/...`
3. update client forms or screens

Change database schema:

1. edit `prisma/schema.prisma`
2. run Prisma generate/migrate
3. update shared validators/types
4. update API and UI

Change web UI:

1. inspect `web/app/...`
2. inspect `web/components/...`

Change mobile UI:

1. inspect `mobile/src/screens/...`
2. inspect `mobile/src/components/...`

Change auth:

1. inspect `web/lib/auth.ts`
2. inspect `web/lib/route-auth.ts`
3. inspect `web/app/api/auth/...`
4. inspect `mobile/src/context/auth-context.tsx`

## Local Setup Assumptions

Root scripts are in the monorepo `package.json`.

Common flow:

1. `npm install`
2. `npx prisma generate --schema ./prisma/schema.prisma`
3. `npx prisma migrate dev --schema ./prisma/schema.prisma`
4. `npm run db:seed`
5. `npm run dev`

## Practical Agent Tips

- Prefer making shared API contract changes in `packages/shared/` first.
- Prefer backend changes in `web/` rather than creating a separate server.
- Treat `prisma/schema.prisma` as the database source of truth.
- Keep web and mobile aligned to the same endpoint shapes.
- If mobile behavior seems broken locally, check `mobile/src/services/api.ts` first because the base URL is environment-sensitive.
