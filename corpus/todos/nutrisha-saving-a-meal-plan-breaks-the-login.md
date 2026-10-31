---
title: Saving a meal plan in Nutrisha breaks the user's password
created: 2026-11-01
status: open
tags: [ITFest-Nutrisha, backend, auth, security]
---

# Saving a meal plan in Nutrisha breaks the user's password

Found on 2026-11-01. After **Add** and **Save** on a recipe, the user can no longer sign in with their password.

Reproduced against the API: sign in, then `PUT /users/:id` with the user object exactly as the page sends it. The next `POST /auth/login` with the real password answers 400.

## Context

- `POST /auth/login` returns the user with its bcrypt hash in `password`, and the page keeps that object in `localStorage.authenticatedUser`.
- `HandlePrepareMeal` in [SelectedRecipeCard.tsx](../../ITFest-Nutrisha/packages/frontend/src/components/recipes/SelectedRecipeCard.tsx) sends that whole object, hash included, to `PUT /users/:id`.
- `updateUser` in [userService.ts](../../ITFest-Nutrisha/packages/backend/src/services/userService.ts) merges it and calls `saveUser`, which hashes `password` again. Even an update with no password re-hashes the stored hash, so any update breaks the login.
- The comments say this mirrors the Spring Boot `UserMapper`, so the 2024 version probably had the same bug.
- Related: the API returns the hash to the browser at all, and `/users` has no access check.

## Acceptance

Saving a meal plan from the page leaves the password working. The backend hashes a password only when a new one is given, and no answer carries the hash.
