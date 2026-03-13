const fs = require('fs');
let html = fs.readFileSync('afftools.html', 'utf8');

// Fix mojibake: these are UTF-8 bytes misinterpreted
// ™ trademark
html = html.replace(/\u00e2\u0084\u00a2/g, '\u2122');  // â„¢ -> ™
html = html.replace(/â„¢/g, '\u2122');

// † dagger  
html = html.replace(/\u00e2\u0080\u00a0/g, '\u2020');  // â€  -> †
html = html.replace(/â€ /g, '\u2020');

// … ellipsis
html = html.replace(/\u00e2\u0080\u00a6/g, '\u2026');  // â€¦ -> …
html = html.replace(/â€¦/g, '\u2026');

// " left double quote
html = html.replace(/\u00e2\u0080\u009c/g, '\u201c');  // â€œ -> "
html = html.replace(/â€œ/g, '\u201c');

// " right double quote
html = html.replace(/\u00e2\u0080\u009d/g, '\u201d');  // â€ -> "
html = html.replace(/â€\u009d/g, '\u201d');

// ' right single quote
html = html.replace(/\u00e2\u0080\u0099/g, '\u2019');  // â€™ -> '
html = html.replace(/â€™/g, '\u2019');

// — em dash
html = html.replace(/\u00e2\u0080\u0094/g, '\u2014');  // â€" -> —
html = html.replace(/â€"/g, '\u2014');

// Now let's also just do simple HTML entity replacements to be safe
// Replace any remaining special chars with HTML entities
html = html.replace(/\u2122/g, '&#8482;');   // ™
html = html.replace(/\u2020/g, '&dagger;');  // †
html = html.replace(/\u2026/g, '&hellip;');  // …
html = html.replace(/\u201c/g, '&ldquo;');   // "
html = html.replace(/\u201d/g, '&rdquo;');   // "
html = html.replace(/\u2019/g, '&rsquo;');   // '
html = html.replace(/\u2018/g, '&lsquo;');   // '
html = html.replace(/\u2014/g, '&mdash;');   // —

// Also fix the specific broken patterns visible in the screenshot
// "â€™" pattern (the ™ showing as mojibake in sup tags)
html = html.replace(/VigorX Pro\s*(?:<sup[^>]*>)?\s*â\u0080\u009e\u00a2/g, 'VigorX Pro&#8482;');

// Remove BOM if present
html = html.replace(/^\uFEFF/, '');

fs.writeFileSync('afftools.html', html, 'utf8');
console.log('Encoding fixed!');

// Verify no broken chars remain
const remaining = html.match(/[â€™""…†—]/g);
if (remaining) {
  console.log('Remaining special chars:', [...new Set(remaining)]);
} else {
  console.log('No broken characters found.');
}
