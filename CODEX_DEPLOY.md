**SUPERSEDED: Follow `CODEX_V3_TRIONN_TASK.md` for the current release.**

# CODEX EXECUTION CONTRACT — JUSTIN CYBER PORTFOLIO 002

## Mission

Produce, review and deploy **Justin's personal AI Product Engineer portfolio**, using the bundled independent static website. It is NOT the GoDuck company website. Preserve the author-inspired editorial/exhibition approach, reinterpreted as futuristic cyber aesthetic, with polished 3D orbit animations and kinetic type.

## Read first

1. `README.md` (mandatory privacy/truth rules)
2. `index.html`, `project.html`, `assets/data.js`, `assets/styles.css`, `assets/app.js`
3. GitHub Pages Actions workflow under `.github/workflows/pages.yml`

## Scope and technical safeguards

- Work in this portfolio directory and its NEW public repository only.
- DO NOT clone, modify, publish, or expose private GoDuck source or any other project repo.
- If a design/aesthetic skill is available in your **actual** Codex environment, invoke it according to its documented procedure; report its exact name. If unavailable, proceed with direct design review rather than claiming the skill was used.
- Use user-authorized actual screenshots ONLY when supplied; **no human portrait**, synthetic humans, fake GoDuck web interfaces, invented testimonials, or fake business results.
- Keep GoDuck public display `敬请期待 / Coming soon`; no percentage, schedule, internal CI state in its promotional content. No GoDuck web app link or claims.
- Preserve bilingual Chinese-English behavior and the truth-status of other work.
- Improve visual quality through **real rendered** HTML/CSS/JS, never replace the entire website with a static generated composite image.

## QA steps

1. Run `node --check assets/data.js` and `node --check assets/app.js`.
2. Start `python3 -m http.server 8000`, open the actual page in a browser and take **real screenshots** at 1440×900, 768×1024 and 390×844 (also reduced-motion). Use the actual local static site URL, no fake previews.
3. Inspect all 4 project routes and language switching. Verify layout, no horizontal scroll, keyboard nav, reduced motion, real URL behavior, no console errors, correct assets, working call-to-action.
4. Check content facts, future-tense language for product vision, privacy, and all no-portrait restrictions.
5. Verify accessibility basics: heading hierarchy, navigable links, contrast, visible focus, no inaccessible motion-only instructions.
6. Confirm static-relative paths support both personal-root and repository-subpath GitHub Pages deployments.
7. If visual polish is inadequate, improve layout and interaction directly in CSS and JS; report actual changes and screenshots.

## Deployment

1. Confirm GitHub account used is `htw913` or ask for correction if authentication shows another account.
2. Use a separate new public repository. Prefer `htw913.github.io` **if not already occupied**. Never overwrite an existing repository without approval. If occupied, pick a descriptive repo such as `ai-portfolio` and use the correct subpath URL.
3. Check git status for secrets/private data, then commit the portfolio files and push to the portfolio repo's `main` branch.
4. Set **Settings → Pages → Source: GitHub Actions** or provide exact steps if not permitted.
5. Wait for `Publish personal portfolio` workflow success; open the resulting live URL in a browser. Confirm pages and project routes render. If deployment access is blocked, report NOT DEPLOYED, don't claim success.

## Acceptance report

Output: PUBLIC_URL (only if verified), REPO_URL, COMMIT_SHA, screenshot links, responsive QA, keyboard/motion QA, privacy + accuracy checks, known blockers, and one next action for Justin. Do not declare PASS without evidence.
