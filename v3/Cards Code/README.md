# Pricing Cards & Social Proof Components

This folder contains reusable code snippets for embedding pricing cards and social proof notifications into any landing page.

## Folder Structure

```
Cards Code/
├── README.md                 # This file (instructions for Claude)
├── test-cards.html           # Standalone test file (all-in-one)
├── images-list.txt           # List of all images used
│
├── PRICING CARDS SNIPPETS:
│   ├── desktop-cards.css     # Desktop CSS styles
│   ├── mobile-cards.css      # Mobile responsive CSS (tablet + mobile)
│   ├── cards.html            # HTML structure for 3 pricing cards
│   └── cards.js              # JavaScript for subscription toggle
│
├── BONUSES SECTION SNIPPETS:
│   └── bonuses.html          # Complete HTML + CSS for 3 FREE bonuses section
│
├── SOCIAL PROOF SNIPPETS:
│   ├── notification.html     # HTML for popup notification
│   ├── notification.css      # CSS for notification styling
│   └── notification.js       # JavaScript for random customer display
│
└── images/                   # All required images
    ├── prostate bottle.png   # Single bottle (2 bottles card + Bonus #1)
    ├── 6-bottles.png         # 6+1 bottles (best value card)
    ├── 3-bottle-buy-btn.png  # 4 bottles card
    ├── buy-now.webp          # Standard buy button
    ├── buy-now2.webp         # Featured card buy button
    ├── subscribe.webp        # Subscribe button (when subscription selected)
    ├── cards.webp            # Payment method icons
    ├── 1bottle.png           # Notification popup image
    ├── ebook1.png            # Bonus #2 - Prostate Health Guide eBook
    └── powerplan.png         # Bonus #3 - 30-Day Wellness Plan
```

---

## How to Embed Pricing Cards

### Step 1: Add CSS to `<head>`

Include both desktop and mobile CSS. You can either:

**Option A - Link external files:**
```html
<link href="path/to/Cards Code/desktop-cards.css" rel="stylesheet">
<link href="path/to/Cards Code/mobile-cards.css" rel="stylesheet">
```

**Option B - Copy CSS inline:**
Copy contents of `desktop-cards.css` and `mobile-cards.css` into a `<style>` tag.

### Step 2: Add HTML where cards should appear

Copy the contents of `cards.html` to the desired location in the body.

**Important:** Update image paths based on your folder structure:
```html
<!-- Update these paths -->
<img src="path/to/images/prostate bottle.png" ...>
<img src="path/to/images/6-bottles.png" ...>
<img src="path/to/images/3-bottle-buy-btn.png" ...>
<img src="path/to/images/buy-now.webp" ...>
<img src="path/to/images/buy-now2.webp" ...>
<img src="path/to/images/cards.webp" ...>
```

### Step 3: Add JavaScript before `</body>`

Copy the contents of `cards.js` into a `<script>` tag.

**Important:** Update the subscribe button image path in the JS:
```javascript
btnImg.src = 'path/to/images/subscribe.webp';
```

### Step 4: Update Checkout URLs

Find all `data-url` attributes and `href` attributes on buy buttons, and replace with actual Digistore24 checkout URLs:
```html
data-url="https://www.digistore24.com/product/YOUR_PRODUCT_ID?..."
```

---

## How to Embed Social Proof Notification

### Step 1: Add jQuery (required)

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

### Step 2: Add CSS

Copy contents of `notification.css` into a `<style>` tag or link as external file.

### Step 3: Add HTML before `</body>`

Copy contents of `notification.html` into the body.

**Important:** Update image path and product name:
```html
<img src="path/to/images/1bottle.png">
...
<b>YOUR PRODUCT NAME</b>
```

### Step 4: Add JavaScript before `</body>`

Copy contents of `notification.js` into a `<script>` tag.

---

## Customization Options

### Pricing Cards

| What to Change | Where to Find It |
|----------------|------------------|
| Prices | `data-price`, `data-total`, `data-save` attributes |
| Bottle counts | `.mt-product-header h3` and `p` elements |
| Savings text | `.mt-savings-badge` and `.mt-subscribe-savings` |
| Shipping text | `.mt-shipping-text` |
| Total display | `.mt-strikethrough` and `.mt-final-price` |
| Checkout URLs | `data-url` and `href` attributes |

### Social Proof Notification

| What to Change | Where to Find It |
|----------------|------------------|
| Product name | `<b>` tag in notification HTML |
| Quantities shown | `customerQuantities` array in JS |
| Display interval | `setInterval(..., 7000)` - change 7000 (ms) |
| Customer names | `customerFirst` array in JS |
| US States | `customerStates` array in JS |

---

## Quick Copy-Paste Checklist

When embedding into a new landing page:

- [ ] Copy `desktop-cards.css` content to `<head>`
- [ ] Copy `mobile-cards.css` content to `<head>`
- [ ] Copy `notification.css` content to `<head>` (if using)
- [ ] Add Google Fonts: `Montserrat` and `Open Sans`
- [ ] Copy `cards.html` to body where cards should appear
- [ ] Copy `bonuses.html` after pricing cards (if using)
- [ ] Copy `notification.html` before `</body>` (if using)
- [ ] Copy `cards.js` before `</body>`
- [ ] Copy `notification.js` before `</body>` (if using)
- [ ] Update all image paths
- [ ] Update checkout URLs
- [ ] Update product name in notification
- [ ] Copy images folder or update paths to existing images

---

## Required External Resources

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">

<!-- jQuery (for social proof notification) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

---

## Testing

Open `test-cards.html` in a browser to see the complete working example with pricing cards, bonuses section, and social proof notification.

---

## FREE Bonuses Section

A reusable "Order 6 Bottles and Get 3 FREE Bonuses" section with 3 bonus cards featuring:
- FREE Extra Bottle of ProstaPrime
- Prostate Health Guide eBook
- 30-Day Wellness Plan

### Files

| File | Description |
|------|-------------|
| `bonuses.html` | Complete HTML + CSS snippet (self-contained) |
| `images/prostate bottle.png` | Bonus #1 image (already included) |
| `images/ebook1.png` | Bonus #2 eBook cover image |
| `images/powerplan.png` | Bonus #3 wellness plan image |

### How to Embed Bonuses Section

#### Step 1: Copy HTML

Copy the contents of `bonuses.html` to the desired location (typically after pricing cards and before social proof).

#### Step 2: Update Image Paths

```html
<img src="path/to/images/prostate bottle.png" alt="Free Extra Bottle">
<img src="path/to/images/ebook1.png" alt="Prostate Health Guide eBook">
<img src="path/to/images/powerplan.png" alt="30-Day Wellness Plan">
```

### Customization Options

| What to Change | Where to Find It |
|----------------|------------------|
| Section header | `.bonuses-header` content |
| Bonus titles | `.bonus-title` elements |
| Bonus descriptions | `.bonus-description` elements |
| Retail prices | `.retail-price` spans |
| Background colors | `.bonuses-section` gradient |
| Badge colors | `.bonus-badge` gradient |

### Layout Notes

- **Desktop:** Cards display horizontally with alternating image positions (left/right)
- **Mobile (768px and below):** Cards stack vertically with images on top
- The section has rounded corners and a dark blue gradient background
- Responsive breakpoint at 768px
