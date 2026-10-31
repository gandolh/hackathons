# Yappinator-One-Thousand

A yapper that interprets other people's yapping. Upload a WhatsApp chat export and get a "Wrapped"-style dashboard of the conversation: who writes more, how fast each side replies, each person's top words, red flags and messages per month.

<p align="center">
  <img src="../docs/images/yappinator-dashboard.webp" width="100%" alt="Chat Analysis for a made-up chat between Sam and Alex: message counts, average reply times, two red flags, top words per person and a line chart of messages per month">
</p>

The chat is parsed in your browser and the parsed messages go to the app's own API, which stores them under your account in SQLite. Nothing is sent to an outside service.

<p align="center">
  <img src="../docs/images/yappinator-upload.webp" width="60%" alt="The upload screen with a chat file picked and an Analyze Chat button">
</p>

Three npm workspaces: `packages/fe` is a React and Tailwind page, `packages/be` an Express 5 API with sign-up, sign-in and SQLite, and `packages/shared` the types both use. It started at a hackathon in March 2025 and was rebuilt in June 2026.

## Run it

```bash
npm install
npm run dev          # the API on port 4000 and the page on http://localhost:5173
```

Register on the page, then upload a chat exported as `.txt`. The parser reads the day-first Android format, `16.03.2024, 21:05 - Name: message`. Variables and a fix for a missing native module on Linux: [../docs/getting-started.md](../docs/getting-started.md#yappinator-one-thousand). The project wiki is in [corpus/](corpus/index.md).

## License

MIT, see [LICENSE](LICENSE).
