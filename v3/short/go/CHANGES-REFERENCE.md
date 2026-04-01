# PowerX Pro `short/go` Changes Reference

> Use this document to replicate the same changes on **VigorXPro v2 `short/go/index.html`**.
> Swap product names (`PowerX Pro` -> `VigorX Pro`) and image paths as needed.

---

## 1. Amazon-Style Image Gallery

**What:** Replace stacked product images with a thumbnail + main image gallery (like Amazon product pages).

**Where:** Both `#prod-description` sections (hero + second product section).

### HTML — Replace the stacked images div:

```html
<!-- OLD -->
<div style="display:flex; flex-direction:column; gap:2px; max-width:650px; margin:0 auto;">
    <img src="..." class="img-fluid w-100" alt="..." style="border-radius:12px;">
    <img src="..." class="img-fluid w-100" alt="..." style="border-radius:12px;">
</div>

<!-- NEW -->
<div class="pxp-gallery">
    <div class="pxp-gallery-thumbs">
        <img src="IMAGE_1" alt="..." class="pxp-thumb active" onclick="pxpGallerySelect(this)">
        <img src="IMAGE_2" alt="..." class="pxp-thumb" onclick="pxpGallerySelect(this)">
        <img src="IMAGE_3" alt="..." class="pxp-thumb" onclick="pxpGallerySelect(this)">
        <img src="IMAGE_4" alt="..." class="pxp-thumb" onclick="pxpGallerySelect(this)">
    </div>
    <div class="pxp-gallery-main">
        <div class="pxp-gallery-img-wrap">
            <button class="pxp-arrow pxp-arrow-left" onclick="pxpGalleryNav(this,-1)"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
            <img src="IMAGE_1" alt="Product" class="pxp-main-img">
            <button class="pxp-arrow pxp-arrow-right" onclick="pxpGalleryNav(this,1)"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>
        </div>
    </div>
</div>
```

### Image references used in PowerX Pro:

| Thumb | Path |
|-------|------|
| 1 (default) | `../../creative-assets/unboxing/47_id-47-imagereference-1-bottles-vigorpng-prompt-Clo.jpg` |
| 2 | `../../creative-assets/unboxing/52_id-52-imagereference-1-bottles-vigorpng-prompt-Cle.jpg` |
| 3 | `../../creative-assets/doctor-comparison/53_id-53-imagereference-1-bottles-vigorpng-prompt-A-c.jpg` |
| 4 | `../../creative-assets/banner-ads/7_id-7-imagereference-1-bottles-vigorpng-prompt-Powe.jpg` |

> **For VigorXPro:** Use equivalent images from the VigorXPro `creative-assets/` folder.

### CSS (add inside `<style>` in `<head>`):

```css
/* Product Image Gallery - Amazon style */
.pxp-gallery { display: flex; gap: 10px; max-width: 650px; margin: 0 auto; height: 100%; }
.pxp-gallery-thumbs { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; width: 72px; }
.pxp-thumb { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; border: 2px solid #e0e0e0; cursor: pointer; transition: border-color 0.2s, transform 0.2s; }
.pxp-thumb:hover { border-color: #c8922a; transform: scale(1.05); }
.pxp-thumb.active { border-color: #c8922a; box-shadow: 0 0 0 2px rgba(200,146,42,0.3); }
.pxp-gallery-main { flex: 1; min-width: 0; }
.pxp-gallery-img-wrap { position: relative; display: inline-block; width: 100%; }
.pxp-gallery-img-wrap img.pxp-main-img { width: 100%; height: auto; border-radius: 12px; object-fit: contain; background: #fafafa; transition: opacity 0.3s ease, transform 0.3s ease; cursor: pointer; display: block; }
.pxp-gallery-img-wrap img.pxp-main-img:hover { transform: scale(1.03); }

/* Prev/Next Arrows - rounded square */
.pxp-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.85); border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 3; transition: background 0.2s, transform 0.2s; }
.pxp-arrow:hover { background: #fff; transform: translateY(-50%) scale(1.1); }
.pxp-arrow svg { width: 16px; height: 16px; fill: none; stroke: #333; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.pxp-arrow-left { left: 8px; }
.pxp-arrow-right { right: 8px; }

/* Desktop: bigger thumbs, wider container */
@media (min-width: 992px) {
  #prod-description .container { max-width: 1400px; }
  #prod-description .col-12.col-lg-11 { flex: 0 0 96%; max-width: 96%; }
  .pxp-gallery { max-width: 100%; }
  .pxp-thumb { width: 120px; height: 120px; }
  .pxp-gallery-thumbs { width: 120px; gap: 4px; }
}

/* Mobile: horizontal thumbs below image */
@media (max-width: 768px) {
  .pxp-gallery { flex-direction: column-reverse; gap: 8px; height: auto; max-width: 100%; }
  .pxp-gallery-thumbs { flex-direction: row; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 4px; justify-content: flex-start; }
  .pxp-gallery-thumbs::-webkit-scrollbar { display: none; }
  .pxp-thumb { width: 60px; height: 60px; min-width: 60px; }
  .pxp-gallery-img-wrap img.pxp-main-img { border-radius: 10px; }
  .pxp-arrow { width: 30px; height: 30px; }
  .pxp-arrow svg { width: 14px; height: 14px; }
  .pxp-arrow-left { left: 6px; }
  .pxp-arrow-right { right: 6px; }
}
```

### JS (add before `</body>`):

```js
function pxpGallerySelect(thumb){
  var gallery=thumb.closest('.pxp-gallery');
  gallery.querySelectorAll('.pxp-thumb').forEach(function(t){t.classList.remove('active');});
  thumb.classList.add('active');
  var main=gallery.querySelector('.pxp-gallery-main img.pxp-main-img');
  main.style.opacity='0';
  setTimeout(function(){main.src=thumb.src;main.style.opacity='1';},150);
}
function pxpGalleryNav(btn,dir){
  var gallery=btn.closest('.pxp-gallery');
  var thumbs=Array.from(gallery.querySelectorAll('.pxp-thumb'));
  var active=gallery.querySelector('.pxp-thumb.active');
  var idx=thumbs.indexOf(active);
  idx+=dir;
  if(idx<0)idx=thumbs.length-1;
  if(idx>=thumbs.length)idx=0;
  pxpGallerySelect(thumbs[idx]);
}
```

---

## 2. Trustpilot Rating Bar

**What:** Green star rating bar below "| In Stock" line.

**Where:** After the `.stars` div in both product sections.

### HTML:

```html
<div class="pxp-tp-wrap">
  <span class="pxp-trustpilot-bar">
    <img src="../../Images/star-4.5.svg" alt="Trustpilot Stars" class="pxp-tp-stars">
    <span class="pxp-tp-score">4.7</span>
    <span class="pxp-tp-sep">|</span>
    <span class="pxp-tp-text">Rated <strong>Excellent</strong> based on 2000+ Reviews</span>
  </span>
</div>
```

### Required asset:

- `Images/star-4.5.svg` — Trustpilot-style green 4.5-star SVG (already in project)

### CSS:

```css
.pxp-trustpilot-bar { display: inline-flex; align-items: center; gap: 8px; background: #f5f5f5; border-radius: 6px; padding: 6px 12px; font-family: 'Montserrat', sans-serif; font-size: 13px; color: #333; flex-wrap: nowrap; }
.pxp-tp-wrap { text-align: left; margin-bottom: 8px; }
@media (max-width: 768px) { .pxp-tp-wrap { text-align: center; } }
.pxp-tp-stars { height: 18px; width: auto; flex-shrink: 0; }
.pxp-tp-score { font-weight: 800; font-size: 14px; color: #1a1a1a; }
.pxp-tp-sep { color: #ccc; }
.pxp-tp-text { color: #555; font-size: 12px; white-space: nowrap; }
.pxp-tp-text strong { color: #1a1a1a; }
@media (max-width: 768px) {
  .pxp-trustpilot-bar { font-size: 11px; padding: 5px 10px; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .pxp-tp-stars { height: 14px; }
  .pxp-tp-score { font-size: 12px; }
  .pxp-tp-text { font-size: 10px; white-space: normal; }
  .pxp-tp-sep { display: none; }
}
```

---

## 3. Social Proof Bar (+2K Happy Customers)

**What:** Faces + customer count + stock status below the benefits checklist.

**Where:** After `</ul>` (check-list) in both product sections.

### HTML:

```html
<div class="pxp-social-proof">
  <img src="../../Images/socials.webp" alt="Happy Customers" class="pxp-sp-faces">
  <span class="pxp-sp-text"><strong>+2K</strong> Happy Customers</span>
  <span class="pxp-sp-stock"><span class="pxp-sp-dot"></span> In stock and ready to ship</span>
</div>
```

### Required asset:

- `Images/socials.webp` — Row of overlapping customer face avatars with green check

### CSS:

```css
.pxp-social-proof { display: flex; align-items: center; gap: 10px; padding: 8px 0; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; font-size: 13px; color: #555; flex-wrap: wrap; }
.pxp-sp-faces { height: 28px; width: auto; flex-shrink: 0; }
.pxp-sp-text { font-size: 13px; color: #333; }
.pxp-sp-text strong { color: #1a1a1a; }
.pxp-sp-stock { display: flex; align-items: center; gap: 5px; color: #4a9e6e; font-weight: 600; font-size: 13px; }
.pxp-sp-dot { width: 8px; height: 8px; background: #4a9e6e; border-radius: 50%; display: inline-block; }
@media (max-width: 768px) {
  .pxp-social-proof { font-size: 11px; gap: 6px; justify-content: center; }
  .pxp-sp-faces { height: 22px; }
  .pxp-sp-text, .pxp-sp-stock { font-size: 10px; }
}
```

---

## 4. Tighten Product Description Spacing

**CSS:**

```css
.prod-description h3 { margin-bottom: 0 !important; }
.prod-description .stars { margin-bottom: 4px !important; }
.prod-description .pxp-tp-wrap { margin-bottom: 6px; }
.prod-description p { margin-bottom: 6px !important; margin-top: 4px !important; }
.prod-description .check-list { margin-bottom: 4px; }
.prod-description .check-list li { margin-bottom: 2px; }
.prod-description .pxp-social-proof { margin-bottom: 6px; padding: 4px 0; }
.prod-description .button-center { margin-top: 4px; }
.prod-description .secure-text { margin-top: 4px !important; margin-bottom: 0 !important; }
```

---

## 5. Shrink Top Logo

**What:** Reduce logo size and margins.

```css
.logo-container { text-align: center; margin-top: 5px; padding: 4px 0; }
.logo-wrapper { background-color: #111; display: inline-block; padding: 6px 12px; border-radius: 6px; }
.logo-img { width: 80px; height: auto; display: block; }
@media (max-width: 600px) { .logo-img { width: 65px; } }
```

---

## 6. CTA Buttons — Single Line on Mobile

**What:** Remove all `<br class="d-block d-md-none">` from inside button `<a>` tags.

**CSS:**

```css
@media (max-width: 768px) {
  .riskfree { font-size: 14px !important; padding: 6px 12px !important; border-radius: 28px !important; white-space: nowrap !important; }
  .riskfree a, .riskfree .action { font-size: 14px !important; white-space: nowrap !important; }
}
```

---

## 7. Fix Horizontal Overflow

```css
html, body { overflow-x: hidden; }
```

---

## 8. Moneyback Section — Compact on Mobile

```css
@media (max-width: 768px) {
  #moneyback .row.py-3 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
  #moneyback h2 { margin-top: 0.5rem !important; font-size: 20px !important; }
  #moneyback h3 { font-size: 14px !important; padding-top: 0.5rem !important; }
  #moneyback p { font-size: 14px !important; margin-top: 6px !important; padding-bottom: 2px !important; line-height: 1.3 !important; }
  #moneyback .row.py-2 { padding-top: 0.25rem !important; padding-bottom: 0.5rem !important; }
  #moneyback .mbg-icon { max-width: 70px !important; }
}
```

---

## 9. Testimonial Images — Perfect Circles

```css
#reviews .rounded-circle,
.carousel-item .rounded-circle {
    width: 120px !important;
    height: 120px !important;
    object-fit: cover !important;
    border-radius: 50% !important;
}
@media (max-width: 768px) {
    #carouselExampleControls .rounded-circle,
    .carousel-item .rounded-circle,
    #reviews .rounded-circle {
        width: 100px !important;
        height: 100px !important;
        max-width: 100px !important;
        object-fit: cover !important;
        border-radius: 50% !important;
        aspect-ratio: 1/1;
    }
}
```

---

## 10. Creative Images — Smaller on Mobile

**What:** Add class `pxp-intimacy-img` to large creative images between sections.

```css
@media (max-width: 768px) {
  img.pxp-intimacy-img { max-width: 200px !important; width: 200px !important; margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
}
```

---

## 11. Notification Swiper — Close Button + Timing

### HTML — Replace empty `<div class="custom-close"></div>`:

```html
<button class="custom-close" aria-label="Close">&times;</button>
```

### CSS:

```css
.custom-social-proof .custom-close {
  position: absolute !important; top: 4px !important; right: 4px !important;
  width: 22px !important; height: 22px !important;
  background: rgba(0,0,0,0.5) !important; border: none !important;
  border-radius: 50% !important; color: #fff !important;
  font-size: 16px !important; line-height: 1 !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  cursor: pointer !important; z-index: 10 !important; padding: 0 !important;
  opacity: 0.7 !important; transition: opacity 0.2s !important; transform: none !important;
}
.custom-social-proof .custom-close:hover { opacity: 1; }
.custom-social-proof .custom-close::before,
.custom-social-proof .custom-close::after { display: none !important; content: none !important; }
```

### JS — Replace the old timing script:

```js
/* Social Proof Timing */
(function(){
    var sp=document.querySelector('.custom-social-proof');
    if(!sp)return;
    sp.style.display='none';
    var cooldownEnd=0,hideTimer=null;
    var close=sp.querySelector('.custom-close');
    if(close)close.addEventListener('click',function(e){
        e.stopPropagation();
        if(hideTimer){clearTimeout(hideTimer);hideTimer=null;}
        if(typeof jQuery!=='undefined')jQuery(sp).slideUp(300);
        else sp.style.display='none';
        cooldownEnd=Date.now()+120000;
        scheduleNext(120000);
    });
    function showNotif(){
        if(Date.now()<cooldownEnd){scheduleNext(cooldownEnd-Date.now()+1000);return;}
        if(typeof updateSocial==='function')updateSocial();
        sp.style.display='block';
        if(typeof jQuery!=='undefined')jQuery(sp).hide().slideDown(400);
        hideTimer=setTimeout(function(){
            if(typeof jQuery!=='undefined')jQuery(sp).slideUp(400);
            else sp.style.display='none';
            hideTimer=null;
            scheduleNext(30000);
        },6000);
    }
    function scheduleNext(delay){setTimeout(showNotif,delay);}
    setTimeout(showNotif,35000);
})();
```

**Timing:**
- First appear: **35s** after page load
- Visible: **6s**
- Next after auto-hide: **30s**
- Cooldown after manual dismiss: **2 minutes**

---

## Shared Assets Required

| Asset | Path | Notes |
|-------|------|-------|
| Star SVG | `Images/star-4.5.svg` | Trustpilot-style green 4.5 stars |
| Social faces | `Images/socials.webp` | Overlapping avatar faces with green check |

> Copy these from `PowerXPro/v3/Images/` to the VigorXPro project's `Images/` folder.

---

## Implementation Order (Recommended)

1. Add all CSS blocks into `<style>` in `<head>`
2. Replace stacked images with gallery HTML (both sections)
3. Add trustpilot bar after stars/In Stock
4. Add social proof bar after checklist
5. Remove `<br>` tags from CTA button links
6. Update notification close button HTML
7. Replace notification timing JS
8. Update logo CSS
9. Test mobile responsiveness
