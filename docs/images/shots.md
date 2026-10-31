# README images

How each image was made, so the next refresh is a re-run. Take an image again when the screen it shows changes.

| File | Shows | How to reach that state | Viewport | Data | Taken |
|---|---|---|---|---|---|
| nutrisha-recipe.webp | The Recipes page with one recipe open | backend with `DATABASE_PATH` on a scratch file, frontend; signed in by putting the login answer in `localStorage.authenticatedUser`; add eggs, tomatoes and onion, **Search**, click the shakshuka | 1440×900 @2x | a demo user, Ana Marin at `demo@example.com`, and eight made-up recipes posted to `POST /recipes` | 2026-11-01 |
| nutrisha-home.webp | Home with today's plan and the week's charts | same, open `/`; cropped to the top 1450 px | 1440×900 @2x | the same user with a week's meal plan set through `PUT /users/:id` | 2026-11-01 |
| nutrisha-chat-2024.webp | The chat assistant answering a question | cropped from `ITFest-Nutrisha/Screenshoots/chatbot-answer.png`, the 2024 hackathon screenshot, to the chat panel only | 380×600 crop | the hackathon's own data | 2024 |
| apiwatchdog-dashboard.webp | The public dashboard with four apps | `npm run dev:be` with `DB_PATH` on a scratch file, `npm run dev:fe`, open `/` | 1440×520 @2x | four made-up apps whose endpoints point at a local stub on port 3999 that answers 200, 429, 500, 502 or 503 by path; polling set to 3 s with `POST /api/setInterval` until each endpoint had ten answers, then to 3600 s | 2026-11-01 |
| apiwatchdog-app.webp | One app's page, Weather service | same, open `/pubdash/<app id>` | 1440×640 @2x | same, plus one bug report written straight into the database, so no mail was attempted | 2026-11-01 |
| yappinator-dashboard.webp | Chat Analysis for one chat | API with a random `JWT_SECRET`, Vite; a user registered through `POST /api/auth/register` and its token put in `localStorage.token`; upload the chat on `/`, **Analyze Chat**; cropped above the footer | 1440×900 @2x, full page | a generated chat between two made-up people, Sam and Alex, about 2,100 lines from January to June 2024 in the Android day-first format | 2026-11-01 |
| yappinator-upload.webp | The upload screen with a file picked | same, before **Analyze Chat**; cropped to the centre | 1440×900 @2x | same | 2026-11-01 |

Captured with Playwright and Chrome, then `ffmpeg -i shot.png -vf <crop> -c:v libwebp -quality 82 shot.webp`.

All three load their fonts from Google Fonts: Geist, Inter, JetBrains Mono and Material Symbols. Where that is blocked, the capture serves the same fonts from their npm packages, `@fontsource-variable/*` and `material-symbols`, through Playwright's request routing, together with the `.material-symbols-outlined` class rule that Google's stylesheet carries.

What is left out, and why:

- **The 2024 screenshots in `ITFest-Nutrisha/Screenshoots/`.** They show a Gmail address in the header, so the READMEs no longer embed them whole. The chat panel is cropped from one of them, because the chat needs an Ollama Cloud key and could not be run again.
- **Nutrisha's chat and recipe generator today.** Same reason.
