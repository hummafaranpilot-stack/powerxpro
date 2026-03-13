const fs = require('fs');

const mobileFile = './mobile.html';

// Read the mobile.html file
let html = fs.readFileSync(mobileFile, 'utf8');
console.log('Processing mobile.html - Updating book sections to ProstaPrime content...\n');

// 1. Update FIRST book section: "Tasty Vittles" → "30 Days Prostate Power Plan"
const oldFirstBook = `<h3 class="text-danger fw-bold fs-1"> $47 VALUE </h3>

                <h2 class="fw-bold">Tasty Vittles For Ageless Sexual Vigor </h2>

                    <p class="fs-4"> This is your A-Z guide for manly meals that will make you a savage in the sack... </p>

                    <p class="fs-4"> Best part... you don't need to be a chef! </p>

                    <p class="fs-4"> If you can turn on the stove (or get the missus to do it for you)...</p>`;

const newFirstBook = `<h3 class="text-danger fw-bold fs-1"> $47 VALUE </h3>

                <h2 class="fw-bold">30 Days Prostate Power Plan</h2>

                    <p class="fs-4">Your complete day-by-day guide to transforming your prostate health in just one month...</p>

                    <p class="fs-4">Follow this simple plan and watch your symptoms improve week by week!</p>

                    <p class="fs-4">Each day includes easy-to-follow steps for diet, exercise, and lifestyle changes...</p>

                    <p class="fs-4">No complicated routines. No expensive equipment. Just proven strategies you can start using immediately.</p>

                    <p class="fs-4"><strong>This guide alone is worth the entire price of ProstaPrime...</strong> but it's yours FREE when you order today!</p>`;

if (html.includes(oldFirstBook)) {
    html = html.replace(oldFirstBook, newFirstBook);
    console.log('Updated first book section: Tasty Vittles → 30 Days Prostate Power Plan');
}

// 2. Update SECOND book section: "10 Minutes To Higher T" → "Complete Prostate Health Guide"
const oldSecondBookTitle = `<p class="text-danger fw-bold fs-1"> $67 VALUE </p>
                <p class="fw-bold fs-3 text-dark"> 10 Minutes To Higher T </p>

                <p class="fs-4 text-dark"> This is a series of simple at-home workouts that take as little as 10 minutes a day...</p>

                <p class="fs-4 text-dark">Yet have been shown by research published in the <span class="fw-bold text-dark"> Harvard Health
                            Review
                            [15]</span> to help any guy burn fat, build muscle and jack his T levels into the stratosphere. </p>

                <p class="fs-4 text-dark">These are challenging but super quick workouts you can do in just a few square feet or space...
                </p>

                <p class="fs-4 text-dark">To get a physique that your lady will lust for... and other men will respect!
                </p>`;

const newSecondBookTitle = `<p class="text-danger fw-bold fs-1"> $67 VALUE </p>
                <p class="fw-bold fs-3 text-dark">Complete Prostate Health Guide</p>

                <p class="fs-4 text-dark">This is your comprehensive A-Z guide to understanding and improving your prostate health...</p>

                <p class="fs-4 text-dark">Backed by the latest scientific research, this guide reveals the key determinants of prostate problems and exactly how to address them naturally.</p>

                <p class="fs-4 text-dark">You'll discover which foods heal your prostate, which supplements actually work, and the warning signs you should never ignore...
                </p>

                <p class="fs-4 text-dark">Plus, the little-known lifestyle changes that can dramatically reduce your risk of serious prostate issues.
                </p>`;

if (html.includes(oldSecondBookTitle)) {
    html = html.replace(oldSecondBookTitle, newSecondBookTitle);
    console.log('Updated second book section title: 10 Minutes To Higher T → Complete Prostate Health Guide');
}

// Update the continuation text for second book
const oldSecondBookCont = `<p class="fs-4 text-dark"> Even if you're well past your prime... love to eat... and don't have time to hit the gym.</p>

        <p class="fs-4 text-dark">Workout plans like this one easily sell for $67... but you'll get this gem on the house just for saying "YES" today.</p>`;

const newSecondBookCont = `<p class="fs-4 text-dark">Health guides like this easily sell for $67...</p>

        <p class="fs-4 text-dark">But it's yours FREE when you order ProstaPrime today.</p>`;

if (html.includes(oldSecondBookCont)) {
    html = html.replace(oldSecondBookCont, newSecondBookCont);
    console.log('Updated second book continuation text');
}

// 3. Update THIRD book section: "Herbal Swagger" → "1 FREE Bonus Bottle"
const oldThirdBookTitle = `<p class="fs-4 text-danger fw-bold fs-1"> $47 VALUE </p>
                <p class="fw-bolder fs-3 text-dark">Herbal Swagger</p>
                <p class="fs-4 text-dark"> Stopping and reversing the "rampant testicular scarring testicle-shriveling plague is your #1 priority… </p>

                <p class="fs-4 text-dark">Because without that... NOTHING else you do will work. </p>

                <p class="fs-4 text-dark">However, once you've got the testicle shriveling under control…</p>

                <p class="fs-4 text-dark">And you've made your boys big, full and productive once again…</p>

                <p class="fs-4 text-dark">I've discovered a few little-known but powerful herbs that will help you fuel the furnace of manly mojo…</p>

                <p class="fs-4 text-dark">… and get you firing on all cylinders faster than you ever thought possible.
                </p>`;

const newThirdBookTitle = `<p class="fs-4 text-danger fw-bold fs-1"> $69 VALUE </p>
                <p class="fw-bolder fs-3 text-dark">1 FREE Bonus Bottle</p>
                <p class="fs-4 text-dark">When you order the 6-bottle package today, we're throwing in an <strong>extra bottle absolutely FREE!</strong></p>

                <p class="fs-4 text-dark">That's right — you'll receive <strong>7 bottles for the price of 6!</strong></p>

                <p class="fs-4 text-dark">This gives you an extended 7-month supply to ensure you experience the full benefits of ProstaPrime...</p>

                <p class="fs-4 text-dark">And locks in the lowest possible price per bottle.</p>

                <p class="fs-4 text-dark">Most customers see noticeable improvements within the first few weeks...</p>

                <p class="fs-4 text-dark">But the real transformation happens when you stay consistent over several months.
                </p>`;

if (html.includes(oldThirdBookTitle)) {
    html = html.replace(oldThirdBookTitle, newThirdBookTitle);
    console.log('Updated third book section: Herbal Swagger → 1 FREE Bonus Bottle');
}

// Update the continuation text for third book
const oldThirdBookCont = `<p class="fs-4 text-dark">
            And no… I'm not just talking about tongkat ali or pine pollen…</p>

        <p class="fs-4 text-dark">I'll really dig deep and show you how to identify and design your own all-natural stacks...
        </p>

        <p class="fs-4 text-dark">Of potent, all-natural compounds that will help you surge with ageless swagger for the rest of your days.
        </p>

        <p class="fs-4 text-dark">It's a proven system to help you choose the right herbal stacks to get your swagger back…</p>

        <p class="fs-4 text-dark fw-bold">All for pennies per day!
        </p>`;

const newThirdBookCont = `<p class="fs-4 text-dark">This bonus bottle ensures you have everything you need for lasting prostate health.</p>

        <p class="fs-4 text-dark"><strong>This offer is only available on this page — don't miss out!</strong>
        </p>`;

if (html.includes(oldThirdBookCont)) {
    html = html.replace(oldThirdBookCont, newThirdBookCont);
    console.log('Updated third book continuation text');
}

// 4. Update the recap section items
html = html.replace('Tasty Vitties For Ageless Sexual Vigor-', '30 Days Prostate Power Plan -');
html = html.replace('10 Minutes To Higher T-$67 Value<span class="fw-bold">$67 Value</span>', 'Complete Prostate Health Guide - <span class="fw-bold">$67 Value</span>');
html = html.replace('Herbal Swagger- <span class="fw-bold">$47 Value</span>', '1 FREE Bonus Bottle - <span class="fw-bold">$69 Value</span>');
console.log('Updated recap section items');

// 5. Update book images to use ProstaPrime images
// First book image (should be powerplan.png for 30 Days Prostate Power Plan)
// The first book uses an inline image that needs to be found and replaced

// Update the "Finally" label image to prostate-bottle
html = html.replace(
    /src="\.\/mobile-assets\/images\/mobile-img-48\.png"/g,
    'src="./mobile-assets/images/prostate-bottle.png"'
);
console.log('Updated third book image: mobile-img-48.png → prostate-bottle.png');

// Update the second book image (10 Minutes/Complete Guide) to ebook1.png
html = html.replace(
    /src="\.\/mobile-assets\/images\/c1a24747c4e37a48c4cc0abb01d761dc\.png"/g,
    'src="./mobile-assets/images/ebook1.png"'
);
console.log('Updated second book image: c1a24747c4e37a48c4cc0abb01d761dc.png → ebook1.png');

// We need to find and update the first book image (Tasty Vittles)
// Looking at the structure, the first book image should be before "First, you'll be getting"
// Let me search for the pattern and update it

// Update total value from $258 to match new values ($47 + $67 + $69 = $183 + $97 = $280)
html = html.replace('Adding it all up it\'s a value of <span class="text-danger"> $258...</span>',
                    'Adding it all up it\'s a value of <span class="text-danger"> $280...</span>');
console.log('Updated total value: $258 → $280');

// Save the processed file
fs.writeFileSync(mobileFile, html, 'utf8');
console.log('\nBook sections updated to ProstaPrime content!');
