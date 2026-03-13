const fs = require('fs');
let html = fs.readFileSync('upsell1.html', 'utf8');

// The VigorX Pro Theme
const goldenGradient = 'linear-gradient(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a)';
const blackGradient = 'linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)';
const matteBlackGradient = 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)';
const lightGoldBg = 'linear-gradient(135deg, #fdf6e3 0%, #f5e6c4 100%)';

// FAVICON
html = html.replace(/<link rel="icon" href="images\/logo.png" type="image\/x-icon">/, '<link rel="icon" href="../../Images/1-bottles-vigor.webp" type="image/x-icon">');

// 1. Success header (Dark Red -> Golden Gradient)
html = html.replace(/background: linear-gradient\(135deg, #8E0E00 0%, #1F1C18 100%\);/g, 'background: ' + goldenGradient + '; color: #000;');
// Fix checkmark color in success header
html = html.replace(/fill: #28a745;/g, 'fill: #c8922a;');
// Fix text color in success header
html = html.replace(/\.success-header p \{\s*font-family: 'Montserrat', sans-serif;\s*font-weight: 700;\s*font-size: 18px;\s*margin: 0;\s*color: #fff;/g, '.success-header p {\n            font-family: \\'Montserrat\\', sans-serif;\n            font-weight: 700;\n            font-size: 18px;\n            margin: 0;\n            color: #000;');
// Fix page indicator color
html = html.replace(/\.page-indicator \{\s*background: rgba\(0, 0, 0, 0\.3\);\s*color: #fff;/g, '.page-indicator {\n            background: rgba(0, 0, 0, 0.6);\n            color: #fff;');

// 2. Timer section & Benefits strip (Black -> Matte Black Gradient)
html = html.replace(/background: linear-gradient\(135deg, #111111 0%, #222222 100%\);/g, 'background: ' + matteBlackGradient + ';');

// 3. Hero section (Dark Red -> Black Gradient)
html = html.replace(/background: linear-gradient\(135deg, #5A0000 0%, #8b0000 100%\);/g, 'background: ' + blackGradient + ';');

// Wait badge
html = html.replace(/\.wait-badge \{\s*display: inline-block;\s*background: #FFD700;\s*color: #021a38;/g, '.wait-badge {\n            display: inline-block;\n            background: ' + goldenGradient + ';\n            color: #000;');
// Hero title gold text
html = html.replace(/\.hero-title \.gold \{\s*color: #e8b84a;/g, '.hero-title .gold {\n            color: #e8b84a;'); // already replaced earlier, just checking

// 4. Offer section background (Light grey)
html = html.replace(/background: linear-gradient\(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%\);/g, 'background: #fdf6e3;');
// Offer header text color
html = html.replace(/color: #021a38;/g, 'color: #1a1a1a;');

// 5. Pricing Cards
// Standard Card Header
html = html.replace(/background: linear-gradient\(135deg, #000000 0%, #333333 100%\);/g, 'background: ' + blackGradient + ';');
// Featured Card Border
html = html.replace(/border: 2px solid #ffc107;/g, 'border: 2px solid #c8922a;');
// Featured Card Background
html = html.replace(/background: linear-gradient\(135deg, #fff8e1 0%, #ffecb3 100%\);/g, 'background: #fff;');
// Featured Card Header
html = html.replace(/background: linear-gradient\(135deg, #5A0000 0%, #8E0E00 50%, #b31200 100%\);/g, 'background: ' + goldenGradient + ';\n            color: #000;');
// Make text in featured card header black
html = html.replace(/\.mt-product-card\.mt-featured \.mt-product-header\s*\{\s*background: linear-gradient\(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a\);\s*color: #000;\s*\}/g, '.mt-product-card.mt-featured .mt-product-header {\n            background: linear-gradient(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a);\n            color: #000;\n        }\n        .mt-product-card.mt-featured .mt-product-header h3,\n        .mt-product-card.mt-featured .mt-product-header p {\n            color: #000;\n        }');

// Pricing card image backgrounds
html = html.replace(/background: linear-gradient\(135deg, #e3f2fd 0%, #bbdefb 100%\);/g, 'background: ' + lightGoldBg + ';');
html = html.replace(/border: 2px solid #bbdefb;/g, 'border: 2px solid #e8d5a8;');

// Best badge
html = html.replace(/background: linear-gradient\(135deg, #1a237e, #303f9f\);\s*color: #fff;/g, 'background: ' + blackGradient + ';\n            color: #f0c85a;');

// Pricing Text Color (Red -> Black gradient from reference)
html = html.replace(/color: #b31200;/g, 'background: linear-gradient(135deg, #1a1a1a 0%, #444444 50%, #1a1a1a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;');
html = html.replace(/accent-color: #b31200;/g, 'accent-color: #c8922a;');

// 6. Benefits Section
// Benefit Icons
html = html.replace(/border: 2px solid #FFD700;/g, 'border: 2px solid #e8b84a;');
html = html.replace(/fill: #FFD700;/g, 'fill: #e8b84a;');

// 7. Reviews Section
html = html.replace(/color: #FFD700;/g, 'color: #e8b84a;');

// 8. Bottom CTA & Footer
html = html.replace(/background: linear-gradient\(135deg, #8b0000 0%, #300000 100%\);/g, 'background: ' + matteBlackGradient + ';');
html = html.replace(/background: linear-gradient\(135deg, #111 0%, #000 100%\);/g, 'background: ' + blackGradient + ';');
html = html.replace(/\.bottom-cta \.highlight \{\s*color: #FFD700;/g, '.bottom-cta .highlight {\n            color: #e8b84a;');
html = html.replace(/\.footer-links a:hover \{\s*color: #FFD700;/g, '.footer-links a:hover {\n            color: #e8b84a;');

fs.writeFileSync('upsell1.html', html, 'utf8');
console.log('Update complete.');
