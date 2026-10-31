# hackathons

Three projects that started at hackathons between 2024 and 2025 and were reworked in June 2026, kept in one repo with their commit histories: an AI meal planner, an API uptime monitor and a WhatsApp chat analyser.

<p align="center">
  <img src="docs/images/nutrisha-recipe.webp" width="100%" alt="Nutrisha's Recipes page in the dark theme: an ingredient list with eggs, tomatoes and onion, one found recipe, Tomato and egg shakshuka, and its card with calories, protein, fat and carbohydrate, the ingredients and three steps">
</p>

**Status:** Finished projects, kept for reference. None is deployed. All three run on your own machine with SQLite. Only Nutrisha's recipe generator and chat need an outside service: its small Python service calls Ollama Cloud with your API key. The original repositories are no longer public; this repo keeps their history.

## What is in it

| Folder | What it is | Built with | Started |
|---|---|---|---|
| [ITFest-Nutrisha/](ITFest-Nutrisha/) | Find recipes from what is in your fridge, plan the week's meals and ask a chat assistant about a recipe. Built by a team of three at ITFest. | React and Mantine, Fastify, SQLite, Flask with Ollama Cloud for the LLM | March 2024 |
| [APIWatchdog/](APIWatchdog/) | WatchDog, a status page for your APIs. It polls each endpoint, keeps the last ten answers and shows uptime per app. | React and Tailwind, Express 5, SQLite | April 2024 |
| [Yappinator-One-Thousand/](Yappinator-One-Thousand/) | Upload a WhatsApp chat export and get a "Wrapped"-style dashboard: who writes more, reply times, top words, red flags and messages per month. | React and Tailwind, Express 5, SQLite | March 2025 |

In June 2026 all three moved to npm workspaces and SQLite, and APIWatchdog and Yappinator got new dark designs.

## Screenshots

<table>
<tr>
<td width="50%" valign="top"><img src="docs/images/apiwatchdog-dashboard.webp" alt="WatchDog's public dashboard: four made-up apps such as Bookshop API and Weather service, each with a status badge from Operational to Major outage and a check, warning or cross per endpoint"></td>
<td width="50%" valign="top"><img src="docs/images/yappinator-dashboard.webp" alt="Yappinator's Chat Analysis for a made-up chat between Sam and Alex: message counts, average reply times, two red flags, top words per person and a line chart of messages per month from January to June 2024"></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="docs/images/nutrisha-home.webp" alt="Nutrisha's home page for a demo user: a greeting card, today's breakfast, lunch and dinner, and charts of the week's calories, protein, fat and carbohydrate"></td>
<td width="50%" valign="top"><img src="docs/images/apiwatchdog-app.webp" alt="WatchDog's page for one app: overall uptime, endpoint count, open reports, a bar of the last ten answers and an uptime ring per endpoint, and one bug report"></td>
</tr>
</table>

## Run one

Each folder installs and runs on its own. All three need Node 20 or newer. From the repo root, one at a time:

```bash
cd APIWatchdog && npm install && npm run dev:be     # API on :3000, then `npm run dev:fe` in a second terminal
cd Yappinator-One-Thousand && npm install && npm run dev
cd ITFest-Nutrisha && npm install && npm run build --workspace @nutrisha/shared && npm run dev:backend   # then `npm run dev:frontend`
```

Each opens on http://localhost:5173. Ports, demo data, Nutrisha's LLM service and a fix for a missing native module on Linux: [docs/getting-started.md](docs/getting-started.md).

## How the repo was made

Each project was its own repository first. In July 2026 they were merged here with `git subtree`, one folder each, so `git log` still shows every original commit.

## Docs

- [docs/](docs/README.md): setup for every project and how the images were made
- Each folder's README; APIWatchdog and Yappinator also keep a `corpus/` wiki with their design, decisions and UI test plans
- Repo-wide wiki: [corpus/](corpus/index.md)

## License

Nutrisha and Yappinator carry their own MIT license files. APIWatchdog has none, so all rights are reserved for it.
