---
title: The test fixture's dates are in a format the parser skips
created: 2026-11-01
status: open
tags: [upload, parser, tests]
---

# The test fixture's dates are in a format the parser skips

Found on 2026-11-01 while taking the README images. `parseWapp` in [utils/index.ts](../../packages/fe/src/modules/home/utils/index.ts) only reads lines that start like `16.03.2024, 21:05 - Name: `. [sample-chat.txt](../../playwright/fixtures/sample-chat.txt) is written as `1/1/24, 10:00 - Alice: `, so none of its 17 lines is read and the upload in TP-02 sends an empty chat. WhatsApp's export format depends on the phone and its language, so real exports in that shape are dropped the same way.

The README images used a generated chat in the day-first format; how it was made is in the root [docs/images/shots.md](../../../docs/images/shots.md).

## Acceptance

The fixture is in a format the parser reads, or the parser also reads the `M/D/YY, HH:MM` format, and an upload with no readable lines tells the user instead of showing an empty dashboard.
