const fs = require('fs');
let html = fs.readFileSync('afftools.html', 'utf8');

// Fix remaining broken dagger † symbol: â€  (3 bytes: C3 A2, E2 82 AC, C2 A0 or similar)
// The pattern in the file is: â€  inside <sup> tags
html = html.replace(/â€[\s\u00a0]/g, '&dagger;');

// Also catch any remaining â€ followed by other chars
html = html.replace(/â€[^\w\s<>&;]/g, '&dagger;');

// Fix any remaining standalone â or €
// Only if they appear in text content (not in URLs or attributes)
html = html.replace(/<sup>â€\s*<\/sup>/g, '<sup>&dagger;</sup>');

fs.writeFileSync('afftools.html', html, 'utf8');
console.log('Fixed remaining broken characters');

// Verify
const remaining = (html.match(/â/g) || []).length;
console.log('Remaining â count:', remaining);
