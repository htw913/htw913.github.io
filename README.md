**V3 TRIONN-INSPIRED PORTFOLIO: Read `README_V3.md` and `CODEX_V3_TRIONN_TASK.md` first.**

# JUSTIN / HTW913 — Cyber Editorial Portfolio

An **original, bilingual personal portfolio** for an AI Product Engineer (NOT a GoDuck product site), developed in lightweight HTML/CSS/vanilla JavaScript. Built for GitHub Pages and Codex editing; no npm install, backend, API keys, or dependencies.

## IA

- Hero: Justin / HTW913 and AI-product positioning, CSS 3D prism and orbital motion.
- Selected works: GoDuck, Cloud-first Build, AI Delivery System, Dragon Fruit Fitness concept.
- Project case studies: separate URL `project.html?id=<project>` for each.
- Capabilities, About, Contact; Chinese and English toggle.

## Truth and visual restrictions — mandatory

1. This is **Justin's personal portfolio**, not a GoDuck homepage. The portfolio homepage must lead with Justin's name and work.
2. GoDuck is an AI Growth Companion targeting a **WeChat Mini Program**. On every portfolio surface its public status must be **「敬请期待」 / “Coming soon”**. Do not reveal development percent, milestones, unfinished backend, build status, or a public timeline in GoDuck promotional content.
3. **No GoDuck web app exists.** This site is not a GoDuck web app. Do not create a fabricated GoDuck browser screenshot, search portal, SaaS dashboard, public download link, user activity metric, revenue, launch date, testimonial, or commercial success story.
4. GoDuck public product copy describes **benefits and intended experiences** (emotional companionship, doing small actions together, gentle goal companionship, memorable moments) and should be read as a **product vision**, not assertions that every feature is deployed.
5. No human photos, avatars, generated human faces or portraits whatsoever without the owner's own images and explicit authorization. CSS-only abstract 3D geometry and illustrative duck mascot are permitted. Artwork is **visualization, not evidence of a live UI**.
6. Other cases must remain truthful: Cloud-first Build and AI Delivery System are engineering practices in the GoDuck workflow, **not commercial standalone products**; Dragon Fruit Fitness is a **concept**.
7. Keep private GoDuck repository files, internal documentation, customer data, secrets, credentials, or unpublished code off this public site.
8. Only verified public proof may be linked. The generic GitHub profile is `https://github.com/htw913`.

## Local preview

From this folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. Go to a card or open `project.html?id=goduck` etc. Refresh and switch EN/中, check mobile 390px width. The website can also be opened directly as `file://` because all resources are relative.

## File map

- `index.html`: personal homepage semantic HTML
- `project.html`: generic case-study page
- `assets/data.js`: bilingual **public display copy** and verified project boundaries
- `assets/app.js`: page rendering, language switch, reveal and pointer motion
- `assets/styles.css`: futuristic editorial visual system, CSS 3D and responsive behavior
- `.github/workflows/pages.yml`: GitHub Pages automation
- `.nojekyll`: static GitHub Pages handling
- `CODEX_DEPLOY.md`: Codex execution contract

## Motion

CSS 3D prism floats, 3 orbit rings, energy sphere, moving ticker, glass-card hover elevation, intersection-based reveal, and pointer-directed orbital tilt. If `prefers-reduced-motion: reduce`, animations are suppressed. No WebGL/Three.js dependency is needed. No artificial loading screens that stop job recruiters reaching content.

## Deploy

Create **a separate PUBLIC portfolio repository**, never deploy your private GoDuck code. For root URL `https://htw913.github.io/`, name repo `htw913.github.io`; otherwise use `https://htw913.github.io/<repo>/`. GitHub repository Settings → Pages → Build and deployment → Source: **GitHub Actions**. Push to main and confirm `Publish personal portfolio` passes, then open the exact URL. Do not call this project "live" before completing this check.
