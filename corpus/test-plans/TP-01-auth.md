# TP-01 — Authentication

Run setup & fixtures: [playwright/README.md](../../playwright/README.md).

## Goal

Verify that register, login, route guards, and sign-out all work end-to-end.

## Cases

1. **Redirect unauthenticated to login** — Navigate to `http://localhost:5173/` with no token in localStorage. Should redirect to `/login`.
2. **Redirect unauthenticated dashboard to login** — Navigate directly to `/dashboard` with no token. Should redirect to `/login`.
3. **Register — happy path** — Go to `/register`, fill `tester@example.com` / `password1234`, submit. Should redirect to `/` (upload screen).
4. **Register — duplicate email** — Register again with the same email. Should show an inline error (not a crash).
5. **Register — short password** — Try `short` (5 chars). Should show an error (server rejects or browser minLength fires).
6. **Login — happy path** — Sign out (clear localStorage), go to `/login`, sign in with `tester@example.com` / `password1234`. Should land on `/`.
7. **Login — wrong password** — Enter correct email + wrong password. Should show "Invalid credentials" or similar error.
8. **Guest-only guard** — While logged in, navigate to `/login`. Should redirect to `/`.
9. **Sign out** — On the upload screen, there is no sign-out button; on the Dashboard, click "Sign out". Token and convId should be removed from localStorage, and page should redirect to `/`.

## Pass criteria

All redirects happen correctly (no flash of wrong content). Errors appear inline on the form. No full-page crashes. localStorage state matches expectations after each action.
