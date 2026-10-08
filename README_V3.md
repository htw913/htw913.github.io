# JUSTIN / HTW913 — Interactive Portfolio V3

Designed for an individual AI product engineer, not a GoDuck consumer web application.

## What's new

- Cinematic hero entrance using GSAP, semantic live DOM headings.
- ScrollTrigger scroll-driven narrative on home and project detail pages.
- Lenis driven by GSAP ticker for desktop fine-pointer devices only.
- Real Three.js interactive abstract WebGL sculpture on compatible desktops; CSS fallback everywhere else.
- Per-card pointer tilt / energy spotlight (motion opt-out on touch and reduced motion).
- User-enabled Web Audio synthesized feedback. Sound defaults OFF, never autoplay.
- No portraits, fake app screens, commercial traction figures, or GoDuck web app links.

## Architecture

Static GitHub Pages-friendly structure, no frameworks or local node_modules. Pinned third-party scripts are vendored under `assets/vendor` so the deployed site does not depend on a runtime CDN. Each dependency is optional for core content, which stays readable when external requests fail.

`assets/data.js`: editorial content / translation source of truth.
`assets/app.js`: case rendering / app interactions.
`assets/motion.js`: motion scheduler and synthesized audio.
`assets/scene3d.js`: Three.js 3D stage / responsive rendering, driven by the GSAP ticker and disposed on pagehide.
`assets/styles.css`: shared visuals, responsive treatments and non-WebGL fallback.

## Preview

Use `python3 -m http.server 8765`, then visit `http://localhost:8765` in a current browser. On a local file:// URL, ES modules and vendor assets can be restricted; use an HTTP server. Chrome with network access needed for the initial CDN prototype.

## Critical notes

- Browser-backed fallback screenshots were verified in an isolated environment without CDN access. **This is not a verification of loaded Three.js / GSAP / Lenis**. Codex should run full end-to-end tests with Internet connectivity or local vendored assets.
- Original reference inspiration: Trionn architecture article (Codrops, 2026), https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/ . This project does not reproduce Trionn proprietary assets or branding.
- Release only after inspecting whether vendor licenses/attribution need to be included.
