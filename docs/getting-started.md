# Getting started

How to run each of the three projects. They share nothing, so install and run each one from its own folder. The [main README](../README.md) has the short version.

Checked on 2026-11-01 with Node 24 on Linux. Each project's frontend uses port 5173, so run one at a time.

## APIWatchdog

```bash
cd APIWatchdog
npm install
npm run dev:be       # the API on port 3000, data in packages/be/data/watchdog.db
npm run dev:fe       # second terminal: http://localhost:5173
```

The list starts empty. `node playwright/scripts/seed.cjs` adds a test user and two apps; its endpoints point at httpstat.us, so to see real answers, register apps whose endpoints you control. The API polls every endpoint once a minute and keeps the last ten answers. A network error counts as a 503.

Environment variables, all optional: `PORT`, `DB_PATH` for another SQLite file, and `EMAIL` and `PASSWORD` for the Gmail account that mails the owner when someone files a bug report. Without them that mail fails quietly. `npm run build` builds both packages. More, including the UI test plans: [APIWatchdog/playwright/README.md](../APIWatchdog/playwright/README.md).

## Yappinator-One-Thousand

```bash
cd Yappinator-One-Thousand
npm install
npm run dev          # the API on port 4000 and the page on http://localhost:5173
```

Register an account on the page, then upload a WhatsApp chat exported as `.txt`. The parser reads lines that start like `16.03.2024, 21:05 - Name: `, the day-first format of an Android export; other formats are skipped. The chat is parsed in the browser and only the parsed messages are sent to the API, which stores them in `packages/be/data/yappinator.db`. Set `JWT_SECRET` outside a local run; `packages/be/.env.example` lists the variables.

If Vite stops with `Cannot find module '../lightningcss.linux-x64-gnu.node'` or "Cannot find native binding", npm skipped a platform package (npm issue 4828). Delete `node_modules` and `packages/fe/node_modules` and install again, or add the two packages for your platform without saving them:

```bash
cd packages/fe
npm install --no-save lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu
```

## ITFest-Nutrisha

```bash
cd ITFest-Nutrisha
npm install
npm run build --workspace @nutrisha/shared    # the backend imports the built types
npm run dev:backend                           # the API on port 8080, data in packages/backend/data/nutrisha.db
npm run dev:frontend                          # second terminal: http://localhost:5173
```

Register on the page. The recipe list starts empty: recipes come from the LLM service or from `POST /recipes`, whose fields are in `packages/shared/src/index.ts`. Searching by ingredients only finds recipes that are already stored.

**Generate new recipes** and the chat button need the Flask service in [OllamaAPI/](../ITFest-Nutrisha/OllamaAPI/README.md) on port 5000, which calls Ollama Cloud:

```bash
cd OllamaAPI
pip install -r requirements.txt
cp .env.example .env      # then set OLLAMA_API_KEY
python app.py
```

The service was not run on 2026-11-01, since it needs an API key. The backend's own README has its endpoints: [packages/backend/README.md](../ITFest-Nutrisha/packages/backend/README.md).
