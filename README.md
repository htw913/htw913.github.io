# JUSTIN / HTW913 — AI Product Engineer Portfolio

[Open the public portfolio](https://htw913.github.io/)

An original, bilingual personal portfolio for Justin / HTW913. It presents his work, product thinking, design approach, and engineering practice. GoDuck is one selected project and the character used for portfolio navigation; this site is **not** a GoDuck product website.

## V4.2 experience

- Cinematic entry with an explicit Enter / Skip path, keyboard support, and a reduced-motion fallback.
- Three.js hero scene and an original, poseable GoDuck guide modeled from Justin's approved image. The character can blink, wave, look toward the pointer, respond to clicks, and guide visitors to About, Works, GoDuck's case study, or Contact. WebGL failure falls back to the approved visual.
- GSAP and ScrollTrigger for motion, Lenis for desktop smooth scrolling, and opt-in Web Audio. Third-party runtime files are local under `assets/vendor/`.
- Responsive Chinese and English content, visible email contact actions, touch and keyboard support.

## Content boundaries

1. Justin is the homepage's subject. GoDuck appears as a selected case and portfolio guide.
2. GoDuck's public status is always **「敬请期待」 / “Coming Soon”**. Its case study describes product vision, not a published web app, usage results, or commercial outcomes.
3. No private GoDuck repository files or unpublished code belong in this public portfolio.
4. No human portrait is used. Case-study visuals are illustrations, not screenshots of live products.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. A local HTTP server is needed for the Three.js module imports. There is no package installation, backend, API key, or build step.

## Source and verification

- `index.html`, `project.html`: static page entry points.
- `assets/data.js`, `assets/app.js`: bilingual public content and rendering.
- `assets/v4-experience.js`, `assets/v4-2.js`, `assets/motion.js`: intro, cursor, guide, contact, GSAP / Lenis / audio orchestration.
- `assets/scene3d.js`, `assets/duck-guide3d.js`, `assets/goduck-v42-model.js`: real Three.js scenes and mascot.
- [`GODUCK_V42_MODEL_SOURCE.md`](./GODUCK_V42_MODEL_SOURCE.md): approved reference provenance and modeling approach.
- [`V42_VISUAL_ACCEPTANCE.md`](./V42_VISUAL_ACCEPTANCE.md): browser evidence, A–J acceptance results, Lighthouse data, and issues fixed.
- `.github/workflows/pages.yml`: validates static files and deploys `main` to GitHub Pages.
