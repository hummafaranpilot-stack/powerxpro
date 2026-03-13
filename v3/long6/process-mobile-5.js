const fs = require('fs');

const mobileFile = './mobile.html';

// Read the mobile.html file
let html = fs.readFileSync(mobileFile, 'utf8');
console.log('Processing mobile.html - Moving pricing cards & fixing issues...\n');

// 1. Fix the JS syntax errors in pricing cards script
html = html.replace(
    "card.querySelector('.mt-display-price').textContent = ' + price;",
    "card.querySelector('.mt-display-price').textContent = '$' + price;"
);
html = html.replace(
    "card.querySelector('.mt-final-price').textContent = ' + total;",
    "card.querySelector('.mt-final-price').textContent = '$' + total;"
);
html = html.replace(
    "card.querySelector('.mt-savings-badge').innerHTML = 'YOU SAVE 10% EXTRA ON THIS ORDER<br>( + save + ' Saved)!';",
    "card.querySelector('.mt-savings-badge').innerHTML = 'YOU SAVE 10% EXTRA ON THIS ORDER<br>($' + save + ' Saved)!';"
);
html = html.replace(
    "card.querySelector('.mt-savings-badge').textContent = 'YOU SAVE  + save + '!';",
    "card.querySelector('.mt-savings-badge').textContent = 'YOU SAVE $' + save + '!';"
);
console.log('Fixed JS syntax errors in pricing cards script');

// 2. Extract the pricing cards section (from <!-- PRICING CARDS SECTION --> to <!-- SOCIAL PROOF NOTIFICATION HTML -->)
const pricingStartMarker = '  <!-- PRICING CARDS SECTION -->';
const pricingEndMarker = '  <!-- SOCIAL PROOF NOTIFICATION HTML -->';

const pricingStartIndex = html.indexOf(pricingStartMarker);
const pricingEndIndex = html.indexOf(pricingEndMarker);

if (pricingStartIndex !== -1 && pricingEndIndex !== -1) {
    const pricingSection = html.substring(pricingStartIndex, pricingEndIndex);

    // Remove the pricing section from its current location
    html = html.substring(0, pricingStartIndex) + html.substring(pricingEndIndex);

    // Find the Scientific References section
    const sciRefMarker = '<div class=" rounded-3 mt-3 p-3 row text-dark" style="background-color: #FAFAFA;">\n            <h2 class="fw-bold text-center h2-headline-bottom">Scientific References:</h2>';

    const sciRefIndex = html.indexOf(sciRefMarker);

    if (sciRefIndex !== -1) {
        // Insert pricing section before Scientific References
        html = html.substring(0, sciRefIndex) + pricingSection + '\n\n        ' + html.substring(sciRefIndex);
        console.log('Moved pricing cards section above Scientific References');
    } else {
        console.log('Could not find Scientific References section');
    }
} else {
    console.log('Could not find pricing section markers');
}

// 3. Update all buy button images throughout the page to link to #buynow
// Find all MM_BuyButton_BIG.png images and ensure they link to #buynow
const buyButtonPattern = /<a[^>]*href="[^"]*"[^>]*>\s*<img[^>]*MM_BuyButton_BIG\.png[^>]*>\s*<\/a>/gi;
const matches = html.match(buyButtonPattern);
if (matches) {
    console.log(`Found ${matches.length} buy button instances`);
}

// Replace any buy buttons not pointing to #buynow
html = html.replace(/<a href="(?!#buynow)[^"]*"([^>]*)>\s*(<img[^>]*MM_BuyButton_BIG\.png[^>]*>)\s*<\/a>/gi,
    '<a href="#buynow"$1>$2</a>');

// Also handle the mobile-img-49.png buy button
html = html.replace(/<a href="(?!#buynow)[^"]*"([^>]*)>\s*(<img[^>]*mobile-img-49\.png[^>]*>)\s*<\/a>/gi,
    '<a href="#buynow"$1>$2</a>');

console.log('Updated all buy buttons to link to #buynow');

// Save the processed file
fs.writeFileSync(mobileFile, html, 'utf8');
console.log('\nMobile.html updates complete!');
