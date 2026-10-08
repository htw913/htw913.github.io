# CODEX TASK — JUSTIN PERSONAL PORTFOLIO / TRIONN-INSPIRED V3

**Decision: MODIFY THEN ACCEPT.** Preserve site scope. Do not touch any GoDuck product repo or portray GoDuck as a web application. This is the personal portfolio of Justin / HTW913.

## Start here

1. Open this independent folder in Codex. Inspect `index.html`, `project.html`, `assets/data.js`, `assets/app.js`, `assets/styles.css`, `assets/motion.js`, `assets/scene3d.js`.
2. Load installed UI/UX or frontend-design skills **only if actually present**, and report their exact names. Do not claim a skill was called if unavailable.
3. Verify baseline with a real browser at 1440x900 and 390x844; record screenshots before any additional design changes.
4. Run `bash scripts/vendor-deps.sh` with network access. This fetches pinned third-party libraries and updates relative references; retain upstream copyright/license notices. **No local node_modules**. Do not silently publish with unavailable CDN dependencies.
5. Run `python3 -m http.server 8765` from the portfolio root; use a local browser to inspect all interactions, pages, languages, and fallbacks.

## Visual reference and implementation logic

Read https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

Use its *principles*, not its assets, brand identity, proprietary shaders or literal layouts:
- One shared animation scheduler: GSAP ticker manages Lenis; ScrollTrigger controls scroll scrubbing and progressive reveals.
- `assets/scene3d.js`: Three.js WebGL sculpture on the **personal portfolio hero**. Hold/pointer charging and raycasting; low-cost idle motion; only render while the hero is visible.
- `assets/motion.js`: GSAP hero entrance, ScrollTrigger sectional motion, Lenis integration, project-card tilt, opt-in synthesized Web Audio. Do not autoplay sound.
- Accessible real DOM text; 3D must be decorative and have a CSS fallback.
- Avoid fake screenshots, fake users, invented metrics, fake company employment, non-user portraits.

## Data/content truth constraints

- This site is an **AI Product Engineer / independent AI builder portfolio**, not the GoDuck product website.
- GoDuck is an AI Growth Companion / 微信小程序, described by real user value: feeling understood, doing small actions together, goals and meaningful moments. It displays `敬请期待` / `Coming soon`, with no published development milestones.
- No GoDuck web app exists; do not add a browser demo link or pretend a conceptual phone mockup is an actual screenshot.
- Other independent case studies: cloud-first CI/CD for mini programs, AI-assisted delivery method, dragon-fruit fitness concept. Label case studies honestly.
- No portrait photos unless explicitly supplied and approved by the user.

## Test requirements — BLOCKERS if not met

- Every home and detail page loads at the deployed base path, including `index.html`, `project.html?id=goduck`, and other IDs.
- Chinese and English text, anchor navigation, back buttons and sound toggle work; no blank/hidden text if JS, GSAP, Lenis or WebGL fails.
- Three.js is actually imported and draws a live canvas on a supported desktop browser, not a flattened poster image; test orbit, raycast, hover/hold and return to idle. Confirm the canvas is absent on mobile/reduced-motion.
- GSAP + ScrollTrigger properly registers and drives scenes; Lenis is synchronized to GSAP ticker, and there are no competing RAF loops or scroll containers.
- Web Audio defaults OFF and only creates an AudioContext after the user chooses to enable it. Stop sound on hidden tabs.
- Test `prefers-reduced-motion`, touch, keyboard, low-end performance, refresh/deep links. Guard WebGL context loss.
- No horizontal overflow or console errors; take real browser screenshots at 1440, 390, and representative detail pages.
- Performance target: Lighthouse mobile >= 80, desktop >= 90 on tested hardware/network (targets, not guaranteed claims). Report actual measurements, JS payload size, frame pacing and any failures.
- Respect GitHub Pages subpath hosting; no localhost URLs or secrets.

## Phase gates

- **P0 — Real functionality:** dependencies vendored, no blank screens; all links and 4 cases load.
- **P1 — Motion refinement:** cohesive timings, responsive type, 3D sculpture quality, contrast and hover/hold feel.
- **P2 — Evidence:** console log capture, video recording of interactions, screenshots, Lighthouse and CI checks.
- **P3 — Deployment:** use a **new public GitHub Pages repository** for this site. Never publish GoDuck source, internal documents, sensitive content, or private repo files. Publish only after user approves the final visuals.

## Required final response

Provide: 1) branch/commit, 2) files changed, 3) what was implemented and verified, 4) actual live preview/screenshots, 5) metrics, 6) remaining limitations, 7) deployment URL **only after it returns HTTP 200**. Do not report an implemented effect as verified without testing it.
