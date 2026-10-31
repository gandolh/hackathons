# Log

## [2026-11-01] maintenance | Corpus bootstrapped, README and docs refreshed, two builds fixed

The root corpus started with CLAUDE.md, routing.md, lint.sh, the overview and the status page. It points to the WatchDog and Yappinator corpora instead of copying them, and tracks Nutrisha, which has none. The root README follows the readme-docs standard now, with six images from local runs on made-up data, one crop of a 2024 screenshot, and `docs/README.md`, `docs/getting-started.md` and `docs/images/shots.md`. APIWatchdog got its first README, Yappinator's two-line README was rewritten, and Nutrisha's README lost its links to the original repo's images, which no longer load, and its MongoDB run steps. Fixed: APIWatchdog's frontend build and Yappinator's root build; both projects' logs have the details. Findings: two Nutrisha todos here, one in Yappinator's corpus. Checked by running all three; see [wiki/status.md](wiki/status.md).
