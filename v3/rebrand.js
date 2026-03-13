const fs = require('fs');

let html = fs.readFileSync('upsell1.html', 'utf8');

// 1. Text Replacements
html = html.replace(/QuickBurn BHB/g, 'VigorX Pro');
html = html.replace(/lib\/img\/logo_qb_black\.png/g, 'images/logo.png');

// 2. Image Replacements (Bottles)
html = html.replace(/lib\/img\/1-bottles-qb\.webp/g, 'images/1-bottles-vigor.webp');
html = html.replace(/lib\/img\/3-bottles-qb\.webp/g, 'images/3-bottles-vigor.webp');
html = html.replace(/lib\/img\/6-bottles-qb\.webp/g, 'images/6-bottles-vigor.webp');
html = html.replace(/lib\/img\/7-bottles-qb\.webp/g, 'images/7-bottles-vigor.webp');
html = html.replace(/lib\/img\/2-bottles-qb\.webp/g, 'images/2-bottles-vigor.webp');

// 3. Theme Colors (Blue/Green -> Red/Dark/Gold to match Vigor)
html = html.replace(/background: linear-gradient\(135deg, #28a745 0%, #1e7e34 100%\);/g, 'background: linear-gradient(135deg, #8E0E00 0%, #1F1C18 100%);');
html = html.replace(/background: linear-gradient\(135deg, #021a38 0%, #043b77 100%\);/g, 'background: linear-gradient(135deg, #111111 0%, #222222 100%);');
html = html.replace(/background: linear-gradient\(135deg, #043b77 0%, #065ba8 100%\);/g, 'background: linear-gradient(135deg, #5A0000 0%, #8b0000 100%);');
html = html.replace(/background: linear-gradient\(135deg, #043b77 0%, #021a38 100%\);/g, 'background: linear-gradient(135deg, #8b0000 0%, #300000 100%);');
html = html.replace(/background: linear-gradient\(135deg, #021a38 0%, #0a2a4d 100%\);/g, 'background: linear-gradient(135deg, #111 0%, #000 100%);');
html = html.replace(/background: linear-gradient\(135deg, #1a237e 0%, #303f9f 100%\);/g, 'background: linear-gradient(135deg, #000000 0%, #333333 100%);');
html = html.replace(/background: linear-gradient\(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%\);/g, 'background: linear-gradient(135deg, #5A0000 0%, #8E0E00 50%, #b31200 100%);');
html = html.replace(/color: #1565c0;/g, 'color: #b31200;');
html = html.replace(/accent-color: #1565c0;/g, 'accent-color: #b31200;');

// 4. Copy updates (Benefits)
html = html.replace(/<h4>Burns Fat Fast<\/h4>\s*<p>Accelerates natural ketosis<\/p>/g, "<h4>Prostate Support</h4>\n                <p>Reduces frequent bathroom trips</p>");
html = html.replace(/<h4>Boosts Energy<\/h4>\s*<p>All-day sustained power<\/p>/g, "<h4>Enhanced Performance</h4>\n                <p>Revitalizes male vitality and stamina</p>");
html = html.replace(/<h4>Curbs Cravings<\/h4>\s*<p>Reduces hunger naturally<\/p>/g, "<h4>Natural Flow</h4>\n                <p>Supports healthy urinary flow</p>");
html = html.replace(/<h4>Supports Metabolism<\/h4>\s*<p>Optimizes fat burning<\/p>/g, "<h4>Boosts Confidence</h4>\n                <p>Feel like yourself again</p>");

// 5. Copy updates (Reviews)
html = html.replace(/Before QuickBurn BHB, my blood sugar was unstable and I felt low on energy\. After 6 weeks, my A1C improved and I feel more energetic than ever!/g, "Before VigorX Pro, I was waking up 4-5 times a night to use the bathroom. After a few weeks, I finally sleep through the night. Highly recommended!");
html = html.replace(/- Aisha R\./g, "- Robert M.");

html = html.replace(/I used to struggle with sugar spikes and cravings\. QuickBurn BHB stabilized my glucose levels - now I feel in control and healthier\./g, "I struggled with a weak flow and constant urgency. VigorX Pro changed everything - my flow is strong and I feel in control again.");
html = html.replace(/- David K\./g, "- David S.");

html = html.replace(/Before taking this, my energy would drop mid-day\. After a month with QuickBurn BHB, my energy is steady and I feel lighter and active\./g, "My confidence in the bedroom was fading, but VigorX Pro restored my stamina and performance. My wife and I couldn't be happier.");
html = html.replace(/- Maria L\./g, "- James T.");

fs.writeFileSync('upsell1.html', html, 'utf8');
console.log('Update complete.');
