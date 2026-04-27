# PowerXPro Landing Page Optimization Playbook

Complete workflow for optimizing PowerXPro landing pages. Follow this process for any new page.

---

## Credentials & Tools

### Cloudflare Stream (for video hosting)
```
ACCOUNT_ID = "7a6e1fad95b03d6e23f9b3542f818c5e"
API_TOKEN  = "cfut_REDACTED_LOAD_FROM_ENV"
CUSTOMER_SUBDOMAIN = "customer-8ocoyclfhfvlpft9"
```

### PageSpeed API
```
KEY_1 = "AIzaSyBqxfoff3pZnXDIrLaOyp6Fyjjfn0c2pd4"
KEY_2 = "AIzaSyDAwf7NN8_-V2pjTqboZYjcguhJACDpccA"
```

### Existing Video UID Mapping
Always check `d:/TrustedNutraProducts/PowerXPro/v3/cf-video-mapping.json` FIRST before uploading any video. Many clips are shared across pages and already uploaded.

---

## Starting a New Page

### Step 0 — Baseline PageSpeed (ALWAYS first)
```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://powerxpro.trustednutraproduct.com/PATH_TO_PAGE&strategy=desktop&key=KEY_1&category=performance&category=seo&category=accessibility&category=best-practices" > "C:/Users/TECHNO~1.PK/AppData/Local/Temp/PAGE_desktop.json"

curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://powerxpro.trustednutraproduct.com/PATH_TO_PAGE&strategy=mobile&key=KEY_2&category=performance&category=seo&category=accessibility&category=best-practices" > "C:/Users/TECHNO~1.PK/AppData/Local/Temp/PAGE_mobile.json"
```

Then extract scores with this Python snippet:
```python
import json, os
for label, fname in [('DESKTOP', 'PAGE_desktop.json'), ('MOBILE', 'PAGE_mobile.json')]:
    with open(os.path.join('C:/Users/TECHNO~1.PK/AppData/Local/Temp', fname)) as f:
        data = json.load(f)
    lr = data['lighthouseResult']; cats = lr['categories']; audits = lr['audits']
    print(f'\n=== {label} ===')
    for cat in ['performance', 'seo', 'accessibility', 'best-practices']:
        print(f'  {cat}: {int(cats.get(cat, {}).get("score", 0) * 100)}')
    for m in ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time',
              'cumulative-layout-shift', 'speed-index', 'interactive']:
        print(f'  {m}: {audits.get(m, {}).get("displayValue", "N/A")}')
    for item in audits.get('resource-summary', {}).get('details', {}).get('items', []):
        rt = item.get('resourceType', '')
        if rt in ['total', 'image', 'script', 'stylesheet', 'font']:
            print(f'  {rt}: {item.get("requestCount",0)} reqs, {int(item.get("transferSize",0)/1024)}KB')
```

### Step 1 — Scan page structure
```bash
# Count lines, videos, images, dead code patterns
wc -l path/to/page.html
```

```
Grep: <video|<source src|youtube|videoId|iframe  → Find all video elements
Grep: class="fa |class="fas                       → Font Awesome usage count
Grep: Merriweather                                → Is it actually used?
Grep: \$\(|jQuery                                  → jQuery usage (might be real)
Grep: greyhead|buylink|RedBarTimer                → Dead setTimeouts
Grep: indexwritten-sl-scarcitybar|special\.html   → 5 junk 404 CSS/HTML files
Grep: class="mt-tryit-banner"                     → The 1-bottle "Try It First" banner
Grep: slidereveal|#menu-bar                       → Dead jQuery slidereveal
```

### Step 2 — Propose phases to the user

**6-Phase Playbook** (adjust based on what's on the page):

| Phase | What | Est. time |
|---|---|---|
| 1 | Dead code cleanup | 5 min |
| 2 | Video migration to CF Stream | 10-30 min (per video upload) |
| 3 | CLS fix (image dimensions) | 5 min |
| 4 | SEO tags + JSON-LD schema | 5 min |
| 5 | Image compression (conservative) | 3-5 min |
| 6 | Top loading bar | 1 min |

---

## Phase 1: Dead Code Cleanup

### Standard removals (most pages have these):

**5 junk HTML files as stylesheets** (they're all 404 error pages):
- `css/indexwritten-sl-scarcitybar2.html`
- `css/written-lucas-h3.html`
- `css/special.html`
- `css/vertical-atc.html`
- `css/promo2.html`

Delete files + remove `<link>` tags from HTML.

**Fonts that are likely unused:**
- Google Material Icons (`family=Material+Icons`) — usually 0 usage
- Merriweather — CHECK first, might be used in CSS

**Dead JS:**
- `slidereveal.js` + `$(function() { $("#menu-bar").slideReveal... })` — only kept on pages where jQuery is still needed for other things
- Lucky Orange commented block
- Dead setTimeouts: `hideGreyHead()`, `showBuyLink()`, `showRedBarTimer()` — all reference non-existent elements

**Font Awesome icons:**
- If page uses only 2-3 icons (`fa-lock`, `fa-arrow-right`), replace with inline SVGs:
  - Lock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512" fill="currentColor" style="vertical-align:-1px;margin-right:4px"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>`
  - Arrow right: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512" fill="currentColor" style="vertical-align:-1px;margin-left:4px"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`
- If 10+ icons, keep CDN (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css`) — don't waste time

### Consolidate Google Fonts into single request:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
```

### Add preconnects:
```html
<link rel="preconnect" href="https://customer-8ocoyclfhfvlpft9.cloudflarestream.com">
```

### Always:
- Move `<meta charset="utf-8">` to be **first** child of `<head>` (SEO best practice)
- Keep `t.js` tracking script
- Keep ClickBank Trust Badge script (`//cbtb.clickbank.net/?vendor=powerxpro`)

---

## Phase 2: Video Migration to Cloudflare Stream

### For each video on page:
1. Check `v3/cf-video-mapping.json` — if UID exists, reuse it
2. If new, upload via API:
   - Files < 200 MB → simple POST to `/stream`
   - Files ≥ 200 MB → TUS resumable upload

### Upload script template:
```python
import requests, json, os

ACCOUNT_ID = '7a6e1fad95b03d6e23f9b3542f818c5e'
API_TOKEN  = 'cfut_REDACTED_LOAD_FROM_ENV'
BASE = 'd:/TrustedNutraProducts/PowerXPro/v3'

VIDEOS = {
    'videos/CLIP_PATH.mp4': 'descriptive-slug',
    # ...
}

mapping_file = 'D:/TrustedNutraProducts/PowerXPro/v3/cf-video-mapping.json'
with open(mapping_file) as f: mapping = json.load(f)

for rel_path, slug in VIDEOS.items():
    if rel_path in mapping:
        print(f'SKIP: {slug} -> {mapping[rel_path]}'); continue
    local_path = os.path.join(BASE, rel_path)
    print(f'Uploading {slug} ({os.path.getsize(local_path) // 1024 // 1024} MB)...', flush=True)
    with open(local_path, 'rb') as f:
        resp = requests.post(
            f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream',
            headers={'Authorization': f'Bearer {API_TOKEN}'},
            files={'file': (slug + '.mp4', f, 'video/mp4')},
            data={'meta': json.dumps({'name': slug})}
        )
    if resp.status_code in (200, 201):
        mapping[rel_path] = resp.json()['result']['uid']
        with open(mapping_file, 'w') as f: json.dump(mapping, f, indent=2)
        print(f'  OK -> {mapping[rel_path]}', flush=True)
```

### For 200MB+ files — use TUS (with resume + retry):
```python
from tusclient import client
from tusclient.storage import filestorage
import time, os

def tus_upload(path, label):
    size = os.path.getsize(path)
    storage = filestorage.FileStorage('D:/TrustedNutraProducts/PowerXPro/tus_store.json')
    my_client = client.TusClient(
        f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream',
        headers={'Authorization': f'Bearer {API_TOKEN}'}
    )
    uploader = my_client.uploader(
        path, chunk_size=50 * 1024 * 1024,
        metadata={'name': label},
        store_url=True, url_storage=storage,
        retries=8, retry_delay=10
    )
    while uploader.offset < size:
        try:
            uploader.upload_chunk()
            pct = (uploader.offset / size) * 100
            print(f'  {uploader.offset // 1024 // 1024}/{size // 1024 // 1024} MB ({pct:.1f}%)', flush=True)
        except Exception as e:
            print(f'  RETRY: {e}', flush=True); time.sleep(10)
    uid = uploader.url.rstrip('/').split('/')[-1].split('?')[0]
    return uid
```

### After encoding, wait until video status is `ready`:
```python
import requests
r = requests.get(f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream/{UID}',
                 headers={'Authorization': f'Bearer {API_TOKEN}'}).json()
# r['result']['status']['state'] should be 'ready'
```

### Replace inline videos with CF Stream poster pattern:

**Simple videos (inline clips):**
```html
<!-- OLD -->
<div class="mv-player" data-video-id="X">
    <span class="mv-badge">...</span>
    <video muted playsinline preload="metadata">
        <source src="../videos/X.mp4" type="video/mp4">
    </video>
    <div class="mv-play-overlay" onclick="togglePlayPause(this)">
        <div class="mv-play-btn">...svg icons...</div>
    </div>
    <div class="mv-progress-bar">...</div>
    <button class="mv-mute-btn">...</button>
    <div class="mv-end-cta">...</div>
</div>

<!-- NEW -->
<div class="mv-player" data-video-id="X" data-cf-uid="UID_FROM_MAPPING">
    <span class="mv-badge">...</span>
    <img class="mv-poster" src="https://customer-8ocoyclfhfvlpft9.cloudflarestream.com/UID_FROM_MAPPING/thumbnails/thumbnail.jpg?time=5s" alt="video" loading="lazy" width="1280" height="720">
    <div class="mv-play-overlay" onclick="cfPlay(this)">
        <div class="mv-play-btn">
            <svg class="mv-play-icon" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6,3 20,12 6,21"/></svg>
        </div>
    </div>
</div>
```

**Add `cfPlay()` function + CSS** (remove old mv-player JS/IIFE entirely):
```html
<style>
.mv-player video, .mv-player .mv-poster { width:100%; height:auto; display:block; max-height:340px; object-fit:contain; background:#111; }
.mv-player { aspect-ratio: 16/9; }
.mv-player iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }
</style>
<script>
function cfPlay(overlay) {
    var player = overlay.closest('.mv-player');
    var uid = player.getAttribute('data-cf-uid');
    if (!uid) return;
    player.innerHTML =
        '<iframe src="https://customer-8ocoyclfhfvlpft9.cloudflarestream.com/' + uid + '/iframe?autoplay=true&startTime=3s" ' +
        'allow="autoplay; encrypted-media; fullscreen; picture-in-picture" ' +
        'allowfullscreen frameborder="0" ' +
        'style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>';
}
</script>
```

**IMPORTANT:** `startTime=3s` skips the first 3 seconds (static intro on all our clips). Thumbnail `?time=5s` grabs a poster frame past the static.

**For the MAIN VSL (edvsl, prostatevsl style):** use the custom HLS.js player with HD-locked looping thumbnail + blue overlay → custom player on click (volume, quality, fullscreen). Copy from `v3/edvsl/index.html` or `v3/prostatevsl/index.html`.

### Sections almost always deleted (after video migration):
- **PLACEMENT #2: Energy Transformation Video**
- **PLACEMENT #4: Science/Mechanism** (How Men's/Prostate Health Declines After 40)
- **PLACEMENT #7: Symptoms re-agitation** (gym exhaustion + laptop image)
- **PLACEMENT #8: Video Testimonial** (Real Men, Real Results — Hear His Story)
- **1-bottle `mt-tryit-banner`** ("Just Want To Try It First?") — keep `<div id="buynow"></div>` anchor for scroll links
- **intro-thumb.mp4** (9-10MB silent looping video, replaced by CF Stream thumbnail)

### "Click to read text version" link — replace with in-page reveal:
```html
<a href="#" id="reveal-text-version" style="color:#2563eb;">Read the text version of the PowerX Pro presentation</a>
<script>
document.getElementById('reveal-text-version').addEventListener('click', function(e) {
    e.preventDefault();
    var sections = document.getElementById('magicalSections');
    if (sections) {
        sections.style.display = 'block';
        sections.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
</script>
```

---

## Phase 3: CLS Fix (Add width/height to all images)

Use this Python script (adapt `HTML` path for new page):
```python
from PIL import Image
import re, os

HTML = 'd:/TrustedNutraProducts/PowerXPro/v3/PAGE/PATH.html'
HTML_DIR = os.path.dirname(HTML)

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

REMOTE_DIMS = {
    'mbg-mob.png': (551, 551),
    'Layer_1_sz.png': (150, 150), 'Layer_1.png': (150, 150),
    'Layer_1_s.png': (150, 150), 'Layer_1_ta.png': (150, 150),
    'Layer_1_to.png': (150, 150), 'Layer_1_tp.png': (150, 150),
    'Simple-promise---As-Seen-On-Bar.png': (753, 73),
    'credit-cards-logos.png': (391, 64),
}

_cache = {}
def get_dims(src):
    if src in _cache: return _cache[src]
    # Remote CDN badges
    filename = src.split('/')[-1].split('?')[0]
    if filename in REMOTE_DIMS:
        _cache[src] = REMOTE_DIMS[filename]; return _cache[src]
    if 'cloudflarestream.com' in src and '/thumbnails/' in src:
        _cache[src] = (1280, 720); return _cache[src]
    if src.startswith(('http://', 'https://', '//')):
        _cache[src] = None; return None
    clean = src.split('?')[0]
    path = os.path.normpath(os.path.join(HTML_DIR, clean))
    if not os.path.exists(path):
        _cache[src] = None; return None
    try:
        if path.lower().endswith('.svg'):
            with open(path, 'r', encoding='utf-8', errors='ignore') as sf: svg = sf.read(2048)
            w = re.search(r'\bwidth=["\'](\d+)', svg); h = re.search(r'\bheight=["\'](\d+)', svg)
            if w and h: _cache[src] = (int(w.group(1)), int(h.group(1)))
            else:
                vb = re.search(r'viewBox=["\']\s*[\d\.]+\s+[\d\.]+\s+([\d\.]+)\s+([\d\.]+)', svg)
                _cache[src] = (int(float(vb.group(1))), int(float(vb.group(2)))) if vb else None
        else:
            img = Image.open(path); _cache[src] = img.size
    except: _cache[src] = None
    return _cache[src]

def process_img(match):
    tag = match.group(0)
    if re.search(r'\bwidth\s*=', tag) and re.search(r'\bheight\s*=', tag): return tag
    src_m = re.search(r'''\bsrc\s*=\s*["']([^"']+)["']''', tag)
    if not src_m: return tag
    dims = get_dims(src_m.group(1))
    if not dims: return tag
    return re.sub(r'(\s*/?>)$', f' width="{dims[0]}" height="{dims[1]}"\\1', tag, count=1)

new_content, _ = re.subn(r'<img\b[^>]*>', process_img, content)
with open(HTML, 'w', encoding='utf-8') as f: f.write(new_content)
```

### CRITICAL: Add baseline CSS to prevent stretching:
```css
/* CLS fix: preserve aspect ratio when CSS and attrs disagree */
img { height: auto; }
```

Specific rules like `.rounded-circle { height: 150px }` still override via specificity.

---

## Phase 4: SEO Tags + JSON-LD Schema

Add to `<head>` (after `<meta charset>`, `<meta viewport>`, `<meta robots>`):
```html
<meta name="description" content="PAGE-SPECIFIC description, ~155 chars, keyword-rich">
<meta name="author" content="Trusted Nutra Products">
<title>Page-specific title | PowerX Pro</title>
<link rel="canonical" href="https://powerxpro.trustednutraproduct.com/PATH/">

<!-- Open Graph -->
<meta property="og:type" content="product">
<meta property="og:title" content="Page-specific OG title">
<meta property="og:description" content="Page-specific OG description">
<meta property="og:image" content="https://powerxpro.trustednutraproduct.com/v3/creative-assets/unboxing/52_id-52-imagereference-1-bottles-vigorpng-prompt-Cle.jpg">
<meta property="og:url" content="https://powerxpro.trustednutraproduct.com/PATH/">
<meta property="og:site_name" content="Trusted Nutra Products">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

Add JSON-LD before `</body>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PowerX Pro",
  "description": "Science-backed male performance formula...",
  "image": "https://powerxpro.trustednutraproduct.com/v3/creative-assets/unboxing/47_id-47-imagereference-1-bottles-vigorpng-prompt-Clo.jpg",
  "brand": { "@type": "Brand", "name": "Trusted Nutra Products" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "49.00", "highPrice": "69.00", "priceCurrency": "USD",
    "availability": "https://schema.org/InStock", "offerCount": "3"
  }
}
</script>
```

### Fix generic link text:
- "Click here" → descriptive phrase
- "here" (alone) → descriptive phrase

### NOTE: `noindex` stays
All VSL pages have `<meta name="robots" content="noindex">` — keep it. Caps SEO score at ~60 but that's intentional for affiliate pages.

---

## Phase 5: Image Compression (Conservative — NO stretch, NO crop)

Use quality 85, re-encode only (no resize):
```python
from PIL import Image
import os, re

HTML = 'd:/TrustedNutraProducts/PowerXPro/v3/PAGE/PATH.html'
HTML_DIR = os.path.dirname(HTML)

with open(HTML, 'r', encoding='utf-8') as f:
    content = f.read()

srcs = set()
for m in re.finditer(r'''\bsrc\s*=\s*["']([^"']+)["']''', content):
    s = m.group(1).split('?')[0]
    if s.startswith('http'): continue
    srcs.add(s)

for src in srcs:
    path = os.path.normpath(os.path.join(HTML_DIR, src))
    if not os.path.exists(path): continue
    ext = path.lower().rsplit('.', 1)[-1]
    if ext not in ('jpg', 'jpeg', 'png', 'webp'): continue
    size_before = os.path.getsize(path)
    if size_before < 100 * 1024: continue  # skip already-small
    try:
        img = Image.open(path)
        tmp = path + '.tmp'
        if ext == 'webp':
            if img.mode not in ('RGB', 'RGBA'): img = img.convert('RGBA')
            img.save(tmp, 'WEBP', quality=85, method=4)
        elif ext == 'png':
            img.save(tmp, 'PNG', optimize=True)
        else:
            if img.mode != 'RGB': img = img.convert('RGB')
            img.save(tmp, 'JPEG', quality=85, optimize=True, progressive=True)
        if os.path.getsize(tmp) < size_before:
            os.replace(tmp, path)
            print(f'  {size_before//1024}KB -> {os.path.getsize(path)//1024}KB  {src}')
        else:
            os.remove(tmp)
    except Exception as e:
        print(f'  ERR: {e}')
```

Then add cache-busting:
```python
import re
HTML = 'd:/TrustedNutraProducts/PowerXPro/v3/PAGE/PATH.html'
VERSION = 'v=YYYYMMDD'  # use today's date
with open(HTML, 'r', encoding='utf-8') as f: content = f.read()
content = re.sub(r'(\.(webp|png|jpg|jpeg|svg))\?v=[0-9a-z]+', r'\1?' + VERSION, content, flags=re.I)
def add_v(m):
    url = m.group(1)
    if '?' in url or 'cloudflarestream.com' in url or url.startswith('http'):
        return m.group(0)
    return m.group(0).replace(url, url + '?' + VERSION)
content = re.sub(
    r'''(?:src|href)\s*=\s*["'](\.\.?/[^"']+\.(?:webp|png|jpg|jpeg|svg))["']''',
    add_v, content, flags=re.I)
with open(HTML, 'w', encoding='utf-8') as f: f.write(content)
```

### Rules:
- **Quality 85** — visually indistinguishable from original
- **NO resize** — dimensions preserved exactly
- **NO crop** — aspect ratio preserved exactly
- **Skip <100KB files** — already efficient
- Only replace if new file is smaller

---

## Phase 6: Minimal Top Loading Bar

Add right after `<body>`:
```html
<!-- Minimal top loading bar (auto-hides on DOMContentLoaded, non-blocking) -->
<style>
    #pg-loadbar { position:fixed; top:0; left:0; right:0; height:3px; z-index:9999; background:transparent; pointer-events:none; transition:opacity 0.25s ease; }
    #pg-loadbar::after { content:""; display:block; height:100%; width:0%; background:linear-gradient(90deg,#c8922a,#e8b84a,#c8922a); animation:pgLoadFill 1.2s ease-out forwards; box-shadow:0 0 8px rgba(200,146,42,0.6); }
    #pg-loadbar.done { opacity:0; }
    @keyframes pgLoadFill { 0% { width:0%; } 60% { width:70%; } 100% { width:100%; } }
</style>
<div id="pg-loadbar"></div>
<script>document.addEventListener('DOMContentLoaded',function(){var b=document.getElementById('pg-loadbar');if(b){setTimeout(function(){b.classList.add('done');setTimeout(function(){if(b.parentNode)b.parentNode.removeChild(b);},300);},200);}});</script>
```

**Why minimal?** Full-viewport skeleton loaders caused Lighthouse to treat the skeleton as LCP, hurting scores. Thin 3px bar doesn't cover content — no LCP impact.

---

## Commit + Deploy

### Commit style:
```
git add v3/PAGE/ v3/cf-video-mapping.json
git commit -m "$(cat <<'EOF'
Short descriptive one-liner

Phase X — Description:
- bullet points...

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push origin main
```

### Wait 60-90s for Hostinger auto-deploy, then re-run PageSpeed for comparison.

---

## Rules & Gotchas

### ALWAYS:
1. ✅ **Run baseline PageSpeed BEFORE making any changes**
2. ✅ **Check `cf-video-mapping.json` before uploading videos** (most are already there)
3. ✅ **Use `img { height: auto }` baseline** to prevent stretching
4. ✅ **Save CF UID mapping after each upload** (in case of crash)
5. ✅ **Open page locally before committing** (`start "" "path/to/file.html"`)
6. ✅ **Commit only HTML + images + mapping JSON** — not Python scripts with API tokens

### NEVER:
1. ❌ Don't commit Python helper scripts with API tokens
2. ❌ Don't resize or crop images (user explicitly said no stretch)
3. ❌ Don't remove `<meta name="robots" content="noindex">` (intentional)
4. ❌ Don't remove `t.js` tracking script
5. ❌ Don't remove ClickBank Trust Badge script (`cbtb.clickbank.net`)
6. ❌ Don't skip the visual approval step before committing

### When user says "do not commit push":
- Make all changes locally only
- Open page in browser for manual visual check
- Wait for user approval before any git action

### Known issues (can't fix):
- `noindex` caps SEO score at ~60 (intentional)
- `robots.txt` Cloudflare prepend flagged as invalid (cosmetic only)
- ClickBank Trust Badge injects an `<img>` without alt (external, can't fix)

---

## Expected Improvements (average across 4 pages)

| Metric | Baseline | After |
|---|---:|---:|
| Performance Desktop | 64-94 | 79-98 |
| Performance Mobile | 54-72 | 59-71 |
| SEO | 33-42 | 46-54 |
| Best Practices | 54-96 | 77-96 |
| CLS | 0.002-1.494 | 0-0.043 |
| Page Weight | 28-121 MB | 1.6-7.3 MB |

---

## Pages Already Optimized (reference)

| Page | Last Commit | Perf D/M |
|---|---|---|
| v3/edvsl/ | `997bb1c` | (pending re-test) |
| v3/short/go/ | `a36146d` | 79 / 71 |
| v3/prostatevsl/ | `8c2c0d4` | (pending re-test) |
| v3/dtc/ | `4dd4557` | 95 / 66 |
| v3/best/go/go.html | (in progress) | 89 / 70 baseline |

Copy any of these as a reference when working on similar-template pages.
