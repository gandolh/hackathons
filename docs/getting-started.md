# Getting started

How to run each of the three projects. They share nothing, so install and run each one from its own folder. The [main README](../README.md) has the short version.

Checked on 2026-11-16 with Node 22.23 and npm 10 on Linux. You need Node 22.12 or newer: Yappinator's `concurrently` 10 needs Node 22, and Nutrisha's Vite 8 needs 22.12. Each project's frontend uses port 5173, so run one at a time.

npm 10 rewrites each project's `package-lock.json` on `npm install`. The changes are metadata only, and `git checkout -- package-lock.json` undoes them.

## APIWatchdog

```bash
cd APIWatchdog
npm install
npm run dev:be       # the API on port 3000, data in packages/be/data/watchdog.db
npm run dev:fe       # second terminal: http://localhost:5173
```

The list starts empty. `node playwright/scripts/seed.cjs` adds a test user and two apps; its endpoints point at httpstat.us, so to see real answers, register apps whose endpoints you control. The API polls every endpoint once a minute and keeps the last ten answers. A network error counts as a 503.

Environment variables, all optional: `PORT`, `DB_PATH` for another SQLite file, and `EMAIL` and `PASSWORD` for the Gmail account that mails the owner when someone files a bug report. Without them that mail fails quietly. If the API runs on another port, start the page with `VITE_API_URL` set to its address. `npm run build` builds both packages. More, including the UI test plans: [APIWatchdog/playwright/README.md](../APIWatchdog/playwright/README.md).

## Yappinator-One-Thousand

```bash
cd Yappinator-One-Thousand
npm install
npm run dev          # the API on port 4000 and the page on http://localhost:5173
```

Register an account on the page, then upload a WhatsApp chat exported as `.txt`. The parser reads lines that start like `16.03.2024, 21:05 - Name: `, the day-first format of an Android export; other formats are skipped. The chat is parsed in the browser and only the parsed messages are sent to the API, which stores them in `packages/be/data/yappinator.db`. Set `JWT_SECRET` outside a local run; `packages/be/.env.example` lists the variables. The page always calls the API on http://localhost:4000. The API accepts requests only from http://localhost:5173, or from the address in `CORS_ORIGIN`. If Vite moves to 5174 because 5173 is taken, sign-in fails until you free the port or set `CORS_ORIGIN`.

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

Environment variables, all optional: `PORT`, `HOST` and `DATABASE_PATH` for another SQLite file. The page always calls the API on port 8080. `HOST` defaults to `0.0.0.0`, so other machines on your network can reach the API; set it to `127.0.0.1` to keep it local.

Register on the page. The recipe list starts empty: recipes come from the LLM service or from `POST /recipes`, whose fields are in `packages/shared/src/index.ts`. Searching by ingredients only finds recipes that are already stored.

**Generate new recipes** and the chat button need the Flask service in [OllamaAPI/](../ITFest-Nutrisha/OllamaAPI/README.md) on port 5000, which calls Ollama Cloud:

```bash
cd OllamaAPI
pip install -r requirements.txt
cp .env.example .env      # then set OLLAMA_API_KEY
python app.py
```

The service was not run in the checks on 2026-11-01 and 2026-11-16, since it needs an API key. The backend's own README has its endpoints: [packages/backend/README.md](../ITFest-Nutrisha/packages/backend/README.md).
