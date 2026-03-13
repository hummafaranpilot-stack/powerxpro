const fs = require('fs');
let html = fs.readFileSync('afftools.html', 'utf8');

// Title, Description, Favicon
html = html.replace(/<title>.*?<\/title>/g, '<title>Trusted Nutra Products&#8482; - VigorX Pro Affiliate Tools</title>');
html = html.replace(/<meta name="description" content=".*?">/g, '<meta name="description" content="VigorX Pro Affiliate Tools">');
html = html.replace(/<link rel="icon" type="image\/png" href="\.\.\/\.\.\/\.\.\/lib\/img\/1bottle\.png">/g, '<link rel="icon" type="image/webp" href="../../../Images/1-bottles-vigor.webp">');

// The landing pages replacement
const newLandingPages = 			<!-- Landing Pages Section -->
			<section class="container-md py-4" id="landing-pages">
				<h3 class="section-header text-center mb-4">Landing Pages</h3>

				<!-- Short TSLs -->
				<h4 class="text-blue text-center mb-4" style="font-weight: 700; font-size: 1.6rem;">Short TSLs</h4>
				<div class="row justify-content-center mb-4">
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Short TSL #1</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Go (Recommended)</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/short/go/" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Short TSL #1</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Short TSL #2</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Alternate Option</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/short2" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Short TSL #2</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Short TSL #3</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Alternate Option</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/short3" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Short TSL #3</a>
						</div>
					</div>
				</div>

				<!-- Long TSLs -->
				<h4 class="text-blue text-center mb-4" style="font-weight: 700; font-size: 1.6rem;">Long TSLs</h4>
				<div class="row justify-content-center mb-4">
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #1 (Best)</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Go (Top Performer)</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/best/go/go.html" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #1</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #2</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Long 3</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/long3" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #2</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #3</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Long 4 / Go</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/long4/go" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #3</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #4</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Long 6</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/long6/" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #4</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #5</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Long 8</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/long8/" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #5</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Long TSL #6</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Long 9</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/long9/" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Long TSL #6</a>
						</div>
					</div>
				</div>

				<!-- Upsell Pages -->
				<h4 class="text-blue text-center mt-4 mb-4" style="font-weight: 700; font-size: 1.6rem;">Upsell Pages</h4>
				<div class="row justify-content-center">
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Upsell 1</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">First Upsell Offer</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/upsell1.html" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Upsell 1</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Upsell 2</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Second Upsell Offer</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/upsell2.html" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Upsell 2</a>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 mb-3">
						<div class="card-dashed d-flex flex-column justify-content-between align-items-center" style="min-height: 220px;">
							<div class="text-center">
								<h4 style="font-size: 1.5rem; font-weight: 700; color: #1a4b8c;">Upsell 3</h4>
								<p class="mb-2" style="font-size: 15px; color: #555; font-weight: 500;">Third Upsell Offer</p>
							</div>
							<a href="https://vigorxpro.trustednutraproduct.com/v2/upsell3.html" class="btn btn-danger fw-bold w-100" style="font-size: 15px; padding: 10px 20px;" target="_blank">Preview Upsell 3</a>
						</div>
					</div>
				</div>
			</section>;

html = html.replace(/<!-- Landing Pages Section -->[\s\S]*?<!-- Google Ads Traffic Guide Section -->/, newLandingPages + '\n\n\t\t\t<!-- Google Ads Traffic Guide Section -->');

fs.writeFileSync('afftools.html', html, 'utf8');
console.log('Done');
