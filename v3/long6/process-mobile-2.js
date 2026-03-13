const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const mobileFile = './mobile.html';
const imagesDir = './mobile-assets/images';

// Read the mobile.html file
let html = fs.readFileSync(mobileFile, 'utf8');
console.log('Processing mobile.html...\n');

// URL replacements
const urlReplacements = [
    // Footer links
    ['https://manhoodmagic.com/privacy', './privacy.html'],
    ['https://manhoodmagic.com/terms', './terms.html'],
    ['https://manhoodmagic.com/disclaimer', './disclaimer.html'],
    ['https://manhoodmagic.com/contact', './contact.html'],

    // Internal links
    ['https://manhoodmagic.com/us1', '#buynow'],

    // Buy buttons - update to #buynow
    ['https://mhmiracle.pay.digistore24.net/', '#buynow'],
    ['https://mhmiracle.pay.digistore24.net', '#buynow'],

    // External images to local (these need to be downloaded separately)
    ['https://manhoodmagic.com/images/mobile/', './mobile-assets/images/'],
];

urlReplacements.forEach(([find, replace]) => {
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const count = (html.match(regex) || []).length;
    if (count > 0) {
        html = html.replace(regex, replace);
        console.log(`Replaced "${find}" -> "${replace}" (${count} times)`);
    }
});

// Remove target="_blank" from internal links
html = html.replace(/href="#buynow" target="_blank"/g, 'href="#buynow"');

// Save the processed file
fs.writeFileSync(mobileFile, html, 'utf8');
console.log('\nMobile.html URLs updated!');
console.log('\nNote: External images from manhoodmagic.com need to be downloaded manually.');

// List the external images that need downloading
const externalImages = html.match(/\.\/mobile-assets\/images\/[^"'\s]+/g);
if (externalImages) {
    const uniqueImages = [...new Set(externalImages)];
    console.log('\nImages referenced (should be downloaded):');
    uniqueImages.forEach(img => console.log('  ' + img));
}
