# Mentib DeepMatch (mentib.us)

**A Tinder-style swipe tool for the dealmaking world** — deep matching for
investors, startups, corporations, and family funds. Pick your role, set your
deal preferences, and swipe through a scored deck. Swipe right to shortlist;
matches ≥ 70 trigger "It's a Match" with the scoring breakdown. Export your
shortlist as JSON.

## How the deep-match engine scores every card
| Signal | Weight |
|---|---|
| Sector overlap (your prefs vs. profile) | 35 pts |
| Stage fit (raise stage vs. target stages) | 25 pts |
| Check-size / raise-target overlap | 25 pts |
| Geography overlap | 15 pts |
| Shared thesis & values (AGI safety, open standards, x402…) | +15 pts bonus |
| Traction ≥ 70 | +5 pts |

The deck is pre-ranked by match score. Every card shows the score ring and the
top scoring reasons — no black box.

## Data
Seeded with the real AGIF ecosystem (WorldForge, SmartCiti.X, WAVE,
Diagnostic.X, Robotics DAO, trueforge, Sentinel Stream, Sapient.X, Dyva,
PlaudGuard-AI, Locator.X, Cognition.X) plus the capital side (AGI Future
Foundation PBC, 66-W3, AGI Accelerator Fund, Metropolis Track 04, AGI Corp,
Metaversal/RP1) and sample family funds. **Swap `data.js` for your own book —
the engine is fully data-driven.**

## Run on the web
It's a static site — open `index.html` or deploy to Vercel:
```bash
vercel --prod
```
Then add the custom domain (`mentib.us`) in the Vercel dashboard. DNS already
points to Vercel at Hostinger.

## Run as a desktop app (Electron)
```bash
npm install
npm start          # launches the desktop app
npm run dist       # build installers (mac/win/linux)
```
The Electron shell wraps the same web app — one codebase, interoperable
across macOS, Windows, and Linux. External links open in the system browser.

## Stack
Pure HTML/CSS/JS — no build step, no dependencies for the web app.
Electron + electron-builder only for desktop packaging.

## TODO
- [ ] Wire mutual matching to a backend (both sides swipe → real match)
- [ ] Real data integrations (CRM, deal flow, x402 payment rails)
- [ ] Agent mode — let an agent swipe/negotiate via the Email API
