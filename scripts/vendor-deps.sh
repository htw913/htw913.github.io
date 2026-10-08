#!/usr/bin/env bash
# Vendor animation dependencies without a local npm install. Run online once before deploying.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/vendor
fetch(){
 local src="$1" dest="$2" alt="$3" tmp
 tmp="$(mktemp)"
 if ! curl -fLsS --retry 2 --connect-timeout 10 --max-time 35 "$src" -o "$tmp"; then
   curl -fLsS --retry 2 --connect-timeout 10 --max-time 35 "$alt" -o "$tmp"
 fi
 test "$(wc -c < "$tmp")" -gt 5000 || { echo "Unexpected empty asset: $dest" >&2; rm -f "$tmp"; exit 1; }
 mv "$tmp" "$dest"
 echo "OK: $dest ($(wc -c < "$dest") bytes)"
}
fetch 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js' assets/vendor/gsap.min.js 'https://unpkg.com/gsap@3.13.0/dist/gsap.min.js'
fetch 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js' assets/vendor/ScrollTrigger.min.js 'https://unpkg.com/gsap@3.13.0/dist/ScrollTrigger.min.js'
fetch 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js' assets/vendor/lenis.min.js 'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js'
fetch 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js' assets/vendor/three.module.js 'https://unpkg.com/three@0.174.0/build/three.module.js'
fetch 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.core.js' assets/vendor/three.core.js 'https://unpkg.com/three@0.174.0/build/three.core.js'
python3 - <<'PY'
from pathlib import Path
base=Path('.')
urls={
 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js':'./assets/vendor/gsap.min.js',
 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js':'./assets/vendor/ScrollTrigger.min.js',
 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js':'./assets/vendor/lenis.min.js',
}
for file in [base/'index.html',base/'project.html']:
 s=file.read_text()
 for u,v in urls.items():s=s.replace(u,v)
 file.write_text(s)
scene=base/'assets/scene3d.js'
s=scene.read_text().replace("'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js'","'./vendor/three.module.js'")
scene.write_text(s)
PY
# Check files and source terms; verify upstream licenses before release.
node --check assets/scene3d.js
node --check assets/motion.js
printf '%s\n' 'All dependencies vendored locally. Commit assets/vendor and retain license notices.'
