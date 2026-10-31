# Routing: how work routes in this repo
<!-- Read by the orchestrate skill. Tune freely, keep it short. -->

**Implement skill:** plan-split-dispatch
**Review skill:** a general-purpose agent over the diff, plus the touched project's `npm run build`
**PR skill:** propose git commands; the owner pushes
**Issue tracker:** none. Findings go to the project's `corpus/todos/`, or to this one for Nutrisha
**Code host:** GitHub, gandolh/hackathons, public

## Intent routing
| Signal | Intent | Route to |
|--------|--------|----------|
| New idea or finding for WatchDog or Yappinator | capture | that project's corpus: add todo |
| New idea or finding for Nutrisha or the whole repo | capture | this corpus: add todo |
| Ready to build, 3 or more chunks | build | brief, then plan-split-dispatch |
| Ready to build, 1 or 2 files | build, small | brief, then implement inline |
| A screen to test | test | the project's `corpus/test-plans/` and `playwright/README.md` |
| README, docs/ or screenshots refresh | docs | readme-docs, then `docs/images/shots.md` |
| Prose needs a style pass | docs | unslop |
| "what does the wiki say about X" | query | corpus-flow: query wiki |

## Knowledge routing: which layer answers which question
| Question shape | Route to |
|---|---|
| "How do I run X?" | [docs/getting-started.md](../docs/getting-started.md) |
| "What is in this repo and where does it stand?" | [wiki/overview.md](wiki/overview.md), [wiki/status.md](wiki/status.md) |
| "Why is WatchDog or Yappinator built this way?" | that project's `corpus/wiki/decisions.md` and `architecture.md` |
| "Where did this come from?" | `git log -- <folder>` and the `Import ...` merge commits |
| "Did I get every usage?" for a rename | `grep -rnw` inside the project folder |

## READ / SKIP / SKILLS
| Task type | READ | SKIP | SKILLS |
|-----------|------|------|--------|
| Change one project | that folder's README and corpus, the brief | the other two folders | plan-split-dispatch |
| UI change | the project's `corpus/wiki/design.md`, the test plan | backend internals | impeccable, ui-test-plans |
| README or images | README.md, docs/, docs/images/shots.md | project internals | readme-docs, unslop |
