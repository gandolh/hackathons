# Open Questions

Only genuinely unresolved questions live here. Delete an entry the moment it's answered — history belongs in `log.md`.

---

## parseWapp correctness

`packages/fe/src/modules/home/utils/index.ts` parses the WhatsApp `.txt` export format. What WhatsApp export format variants does it handle? (Android vs iOS, different date formats, system messages.) Is it production-ready or still a draft?

---

## Old BE/ and frontend/ directories

`BE/` and `frontend/` still exist at the repo root. They are superseded by `packages/be` and `packages/fe`. Should they be deleted? (They're kept for now so git history diffs remain readable.)

---

## Google OAuth

Deferred. See `corpus/todos/2026-06-26-google-oauth.md`.
