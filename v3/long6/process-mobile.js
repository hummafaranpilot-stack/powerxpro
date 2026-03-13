const fs = require('fs');
const path = require('path');

const mobileFile = './mobile.html';
const imagesDir = './mobile-assets/images';

// Read the mobile.html file
let html = fs.readFileSync(mobileFile, 'utf8');
console.log('Original file size:', (html.length / 1024 / 1024).toFixed(2), 'MB');

// Extract and replace base64 images
let imageCount = 0;
const base64Regex = /data:image\/(png|jpeg|jpg|gif|webp);base64,([A-Za-z0-9+/=]+)/g;

html = html.replace(base64Regex, (match, type, data) => {
    imageCount++;
    const ext = type === 'jpeg' ? 'jpg' : type;
    const filename = `mobile-img-${imageCount}.${ext}`;
    const filepath = path.join(imagesDir, filename);

    // Save the image
    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(filepath, buffer);
    console.log(`Extracted: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);

    return `./mobile-assets/images/${filename}`;
});

console.log(`\nExtracted ${imageCount} images`);

// Text replacements for branding
const replacements = [
    // Branding
    ['Manhood Miracle', 'ProstaPrime'],
    ['MANHOOD MIRACLE', 'PROSTAPRIME'],
    ['ManHood Miracle', 'ProstaPrime'],
    ['Tim Masterson', 'Trusted Nutra Products'],
    ['TIM MASTERSON', 'TRUSTED NUTRA PRODUCTS'],

    // ClickBank to Digistore
    ['ClickBank', 'Digistore24'],
    ['CLICKBANK', 'DIGISTORE24'],
    ['clickbank', 'digistore24'],
    ['Click Sales, Inc., a Delaware corporation located at 1444 S. Entertainment Ave., Suite 410 Boise, ID 83709, USA', 'Digistore24 GmbH, located in Germany'],

    // External URLs to local (manhoodmagic.com resources)
    ['https://manhoodmagic.com/mobile/stylesheets/', './mobile-assets/css/'],
    ['https://manhoodmagic.com/mobile/javascripts/', './mobile-assets/js/'],
    ['https://manhoodmagic.com/mobile/images/', './mobile-assets/images/'],
    ['//manhoodmagic.com/mobile/stylesheets/', './mobile-assets/css/'],
    ['//manhoodmagic.com/mobile/javascripts/', './mobile-assets/js/'],
    ['//manhoodmagic.com/mobile/images/', './mobile-assets/images/'],

    // Remove ClickBank tracking script
    ["<script src='//cbtb.clickbank.net/?vendor=mhmiracle'></script>", '<!-- Digistore tracking will be added here -->'],

    // Update dosage if mentioned
    ['2 capsules', '1 capsule'],
    ['two capsules', '1 capsule'],
];

replacements.forEach(([find, replace]) => {
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const count = (html.match(regex) || []).length;
    if (count > 0) {
        html = html.replace(regex, replace);
        console.log(`Replaced "${find}" -> "${replace}" (${count} times)`);
    }
});

// Update page title
html = html.replace(/<title>.*?<\/title>/i, '<title>ProstaPrime™ - Natural Prostate Support Supplement</title>');

// Add favicon if not present
if (!html.includes('rel="icon"') && !html.includes("rel='icon'")) {
    html = html.replace('</head>', '  <link rel="icon" type="image/png" href="./mobile-assets/images/favicon.png">\n</head>');
}

// Save the processed file
fs.writeFileSync(mobileFile, html, 'utf8');
console.log('\nNew file size:', (html.length / 1024 / 1024).toFixed(2), 'MB');
console.log('Mobile.html processing complete!');
