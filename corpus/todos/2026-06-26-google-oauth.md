---
title: Add Google OAuth login
created: 2026-06-26
status: open
tags: [auth, oauth]
---

# Add Google OAuth login

Add "Continue with Google" as a second login option alongside email/password.

## Context

Email/password auth is implemented in `packages/be/src/auth.js` and `packages/fe/src/modules/auth`. The Stitch design system and route guards are in place. Google OAuth should slot in as an additional provider without replacing the existing flow.

## What to do

1. Register the app in Google Cloud Console, get a client ID + secret.
2. BE: Add `passport-google-oauth20` (or `google-auth-library`) to `packages/be`. Handle the OAuth callback, create or fetch the user in the `users` table (add a `google_id` column), issue a JWT.
3. FE: Add a "Sign in with Google" button to `AuthPage`. Redirect to BE's `/api/auth/google` endpoint.
4. Store the JWT the same way as email/password (localStorage → axios interceptor).
5. Update `corpus/wiki/decisions.md` with the chosen OAuth library.

## Acceptance

- User can click "Sign in with Google" and be redirected back as an authenticated session.
- Existing email/password flow is unchanged.
- `users` table has a nullable `google_id TEXT UNIQUE` column.
