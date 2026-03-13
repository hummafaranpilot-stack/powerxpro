const fs = require('fs');

const mobileFile = './mobile.html';

// Read the mobile.html file
let html = fs.readFileSync(mobileFile, 'utf8');
console.log('Processing mobile.html - Adding pricing cards, notification, and final updates...\n');

// 1. Add favicon link if not present
if (!html.includes('rel="icon"')) {
    html = html.replace('</head>', '  <link rel="icon" type="image/png" href="./mobile-assets/images/favicon.png">\n</head>');
    console.log('Added favicon link');
}

// 2. Add Pricing Cards CSS before </head>
const pricingCardsCSS = `
  <!-- Pricing Cards CSS -->
  <style>
    /* PRICING CARDS CSS - MOBILE OPTIMIZED */
    .mt-product-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      padding: 15px 5px;
      background-color: transparent;
      font-family: "Montserrat", sans-serif;
      max-width: 100%;
      margin: 0 auto;
    }
    .mt-product-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      font-family: "Montserrat", sans-serif;
      border: 2px solid #1565c0;
    }
    .mt-product-card.mt-featured {
      background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
      border: 2px solid #FFD700;
      order: -1;
    }
    .mt-product-header {
      background: linear-gradient(135deg, #1a237e 0%, #303f9f 100%);
      text-align: center;
      padding: 8px 12px;
      color: white;
      border-radius: 6px 6px 0 0;
    }
    .mt-product-card.mt-featured .mt-product-header {
      background: linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%);
    }
    .mt-product-header h3 {
      font-size: 1.1rem;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0;
      color: #fff !important;
    }
    .mt-product-header p {
      font-size: 0.7rem;
      margin: 0;
      font-weight: 500;
      color: #fff !important;
    }
    .mt-product-content {
      display: grid;
      grid-template-columns: 42% 58%;
      grid-template-rows: auto 1fr;
      padding: 0;
      background: #fff;
      position: relative;
    }
    .mt-product-image {
      grid-column: 1;
      grid-row: 2;
      min-width: 110px;
      max-width: 150px;
      padding: 5px 5px 8px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      border: none;
      background: transparent;
    }
    .mt-product-image img {
      max-height: 130px;
      max-width: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    .mt-best-badge {
      position: absolute;
      top: 5px;
      left: 10px;
      right: auto;
      background: linear-gradient(135deg, #1a237e, #303f9f);
      color: #fff;
      font-weight: bold;
      font-size: 0.5rem;
      padding: 3px 8px;
      border-radius: 10px;
      text-transform: uppercase;
      box-shadow: 0 4px 15px rgba(26, 35, 126, 0.4);
    }
    .mt-product-details {
      grid-column: 2;
      grid-row: 2;
      padding: 0 8px 8px 5px;
      border-left: none;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .mt-subscription-toggle {
      grid-column: 1 / -1;
      grid-row: 1;
      width: 100%;
      background: #1a1a2e;
      border-radius: 0;
      padding: 6px 8px;
      margin-top: 0;
      margin-bottom: 0;
      gap: 3px;
    }
    .mt-subscription-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      cursor: pointer;
      border-radius: 6px;
      transition: background 0.2s ease;
    }
    .mt-subscription-option:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .mt-subscription-option.active {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .mt-option-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mt-radio-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #666;
      position: relative;
      flex-shrink: 0;
    }
    .mt-subscription-option.active .mt-radio-dot {
      border-color: #fff;
      background: #fff;
    }
    .mt-radio-dot::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1a1a2e;
      opacity: 0;
    }
    .mt-subscription-option.active .mt-radio-dot::after {
      opacity: 1;
    }
    .mt-option-label {
      font-size: 0.6rem;
      font-weight: 600;
      color: #fff;
    }
    .mt-product-price {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.2rem;
    }
    .mt-product-price h4, .mt-display-price {
      font-size: 1.8rem;
      color: #1565c0;
      font-weight: 800;
      margin: 5px 0;
      line-height: 1;
    }
    .mt-price-info p {
      font-size: 1rem;
      color: #1565c0;
      font-weight: 600;
      margin: 0;
    }
    .mt-savings-badge {
      background: none;
      color: #000;
      padding: 0;
      font-size: 0.85rem;
      font-weight: 600;
      margin: 5px 0;
      display: block;
      text-align: center;
      line-height: 1.3;
    }
    .mt-buy-now-btn {
      display: block;
      margin: 5px auto 0;
      max-width: 130px;
    }
    .mt-buy-now-btn img {
      width: 100%;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .mt-buy-now-btn:hover img {
      transform: scale(1.05);
    }
    .mt-shipping-text {
      color: #000;
      font-size: 0.75rem;
      margin-top: 5px;
      font-weight: 500;
    }
    .mt-total-line {
      font-size: 0.8rem;
      margin-top: 5px;
      font-weight: 500;
    }
    .mt-strikethrough {
      text-decoration: line-through;
      color: #999;
      margin-right: 0.5rem;
    }
    .mt-final-price {
      font-weight: bold;
      color: #000;
    }
    .mt-payment-icons {
      margin: 8px 0;
      padding: 0;
    }
    .mt-payment-icons img {
      max-width: 150px;
      padding: 0;
    }
    .mt-subscribe-savings {
      display: none;
      text-align: center;
      margin: 5px 0;
      background: rgba(26, 26, 46, 0.08);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(26, 26, 46, 0.15);
      border-radius: 8px;
      padding: 6px 8px;
    }
    .mt-subscribe-savings.show {
      display: block;
      animation: borderFlicker 2.5s ease-in-out infinite;
    }
    @keyframes borderFlicker {
      0%, 100% { border-color: transparent; }
      50% { border-color: #000; }
    }
    .mt-subscribe-savings .line1 {
      font-size: 0.75rem;
      font-weight: 700;
      color: #1565c0;
      display: block;
      margin-bottom: 2px;
    }
    .mt-subscribe-savings .line2 {
      font-size: 0.65rem;
      font-weight: 500;
      color: #333;
      display: block;
      line-height: 1.3;
    }
    .mt-subscribe-savings .line2 .price-highlight {
      font-weight: 700;
      color: #1565c0;
    }
    .mt-cancel-notice {
      display: none;
      text-align: center;
      margin: 4px 0;
      padding: 5px 8px;
      background: #28a745;
      border-radius: 6px;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 600;
    }
    .mt-cancel-notice.show {
      display: block;
    }
    .mt-subscription-guarantee {
      text-align: center;
      padding: 15px 20px;
      margin: 15px 5px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
    }
    .mt-subscription-guarantee .guarantee-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1a237e;
      margin: 0 0 10px 0;
      text-transform: uppercase;
    }
    .mt-subscription-guarantee .guarantee-title span {
      color: #1565c0;
    }
    .mt-subscription-guarantee .guarantee-text {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
      margin: 0;
      line-height: 1.5;
    }
    .pricing-section-wrapper {
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
      padding: 20px 0;
      margin-top: 20px;
    }
    .pricing-section-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a237e;
      margin-bottom: 5px;
    }
    .pricing-section-subtitle {
      text-align: center;
      font-size: 0.9rem;
      color: #555;
      margin-bottom: 15px;
    }

    /* SOCIAL PROOF NOTIFICATION CSS */
    .custom-social-proof {
      position: fixed;
      bottom: 10px;
      left: 10px;
      z-index: 9999999999999!important;
      font-family: 'Open Sans', sans-serif;
      display: none;
    }
    .custom-notification {
      width: 280px;
      border: 0;
      text-align: left;
      z-index: 99999;
      box-sizing: border-box;
      font-weight: 400;
      border-radius: 6px;
      padding-bottom: 7px;
      box-shadow: 2px 2px 10px 2px hsla(0,4%,4%,.2);
      background-color: #fff;
      position: relative;
      cursor: pointer;
    }
    .custom-notification-container {
      display: block!important;
      align-items: center;
      max-width: 280px;
      width: 100%;
      height: 70px;
    }
    .custom-notification-image-wrapper {
      float: left;
      width: 60px;
      margin-top: 5px;
    }
    .custom-notification-image-wrapper img {
      max-height: 60px;
      width: auto;
      display: block;
      margin: 0 auto 5px;
      overflow: hidden;
      border-radius: 6px 0 0 6px;
    }
    .custom-notification-content-wrapper {
      margin: 0;
      height: 100%;
      color: gray;
      padding-left: 15px;
      padding-right: 15px;
      border-radius: 0 6px 6px 0;
      padding-bottom: 5px;
    }
    .custom-notification-content {
      font-family: inherit!important;
      padding: 0!important;
      font-size: 12px;
      line-height: 14px;
      width: calc(100% - 60px);
      float: left;
      margin-left: 8px;
      padding-bottom: 5px;
      margin-top: 8px;
    }
    .custom-notification-content small {
      margin-top: 3px!important;
      display: block!important;
      font-size: 10px!important;
      opacity: .8;
    }
    .custom-close {
      position: absolute;
      top: 8px;
      right: 8px;
      height: 12px;
      width: 12px;
      cursor: pointer;
      transition: .2s ease-in-out;
      transform: rotate(45deg);
      opacity: 0;
    }
    .custom-close:before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: gray;
      position: absolute;
      left: 0;
      top: 5px;
    }
    .custom-close:after {
      content: "";
      display: block;
      height: 100%;
      width: 2px;
      background-color: gray;
      position: absolute;
      left: 5px;
      top: 0;
    }
    .custom-social-proof .custom-notification:hover .custom-close {
      opacity: 1;
    }
  </style>
`;

if (!html.includes('.mt-product-grid')) {
    html = html.replace('</head>', pricingCardsCSS + '\n</head>');
    console.log('Added pricing cards CSS');
}

// 3. Add Pricing Cards HTML before </body>
const pricingCardsHTML = `
  <!-- PRICING CARDS SECTION -->
  <div class="pricing-section-wrapper">
    <h2 class="pricing-section-title">Choose Your Package</h2>
    <p class="pricing-section-subtitle">Select the best option for your prostate health journey</p>

    <div id="buynow" class="mt-product-grid">
      <!-- 2 Bottles -->
      <div class="mt-product-card" data-card="2bottle">
        <div class="mt-product-header">
          <h3>2 BOTTLES</h3>
          <p>60 DAY SUPPLY</p>
        </div>
        <div class="mt-product-content">
          <div class="mt-subscription-toggle">
            <div class="mt-subscription-option" data-type="subscribe" data-price="71" data-total="142" data-save="218" data-url="#subscribe-2bottle">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">Subscribe & save up to 30%</span>
              </div>
            </div>
            <div class="mt-subscription-option active" data-type="onetime" data-price="79" data-total="158" data-save="200" data-url="#">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">One-time purchase</span>
              </div>
            </div>
          </div>
          <div class="mt-product-image">
            <img src="./mobile-assets/images/2-bottle.png" alt="ProstaPrime 2 Bottles">
          </div>
          <div class="mt-product-details">
            <div class="mt-product-price">
              <h4 class="mt-display-price">$79</h4>
              <div class="mt-price-info"><p>/Bottle</p></div>
            </div>
            <div class="mt-savings-badge">YOU SAVE $200!</div>
            <div class="mt-subscribe-savings">
              <span class="line1">Congrats!</span>
              <span class="line2">You will get <span class="price-highlight">30% OFF</span> on the Subscription Order! After <span class="price-highlight">60 Days</span>, 1 Bottle for Just <span class="price-highlight">$55+Shipping</span> will start delivering every Month.</span>
            </div>
            <div class="mt-cancel-notice">Cancel subscription anytime!</div>
            <a href="#" class="mt-buy-now-btn">
              <img src="./mobile-assets/images/buy-now.webp" alt="Buy Now" data-original-src="./mobile-assets/images/buy-now.webp">
            </a>
            <p class="mt-shipping-text">+ $19.99 Shipping</p>
            <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$260</span> <span class="mt-final-price">$158</span></p>
            <div class="mt-payment-icons"><img src="./mobile-assets/images/cards.webp" alt="Payment Methods"></div>
          </div>
        </div>
      </div>

      <!-- 6+1 Bottles - BEST VALUE -->
      <div class="mt-product-card mt-featured" data-card="6bottle">
        <div class="mt-product-header">
          <h3>6 + 1 BOTTLES</h3>
          <p>+ 1 FREE BOTTLE + 2 PREMIUM EBOOKS • 210 DAY SUPPLY</p>
        </div>
        <div class="mt-product-content">
          <div class="mt-subscription-toggle">
            <div class="mt-subscription-option" data-type="subscribe" data-price="44" data-total="264" data-save="810" data-url="#subscribe-6bottle">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">Subscribe & save up to 30%</span>
              </div>
            </div>
            <div class="mt-subscription-option active" data-type="onetime" data-price="49" data-total="294" data-save="780" data-url="#">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">One-time purchase</span>
              </div>
            </div>
          </div>
          <div class="mt-product-image">
            <img src="./mobile-assets/images/6-bottles.png" alt="ProstaPrime 7 Bottles - Best Value">
            <div class="mt-best-badge">BEST VALUE</div>
          </div>
          <div class="mt-product-details">
            <div class="mt-product-price">
              <h4 class="mt-display-price">$49</h4>
              <div class="mt-price-info"><p>/Bottle</p></div>
            </div>
            <div class="mt-savings-badge">YOU SAVE $780!</div>
            <div class="mt-subscribe-savings">
              <span class="line1">Congrats!</span>
              <span class="line2">You will get <span class="price-highlight">30% OFF</span> on the Subscription Order! After <span class="price-highlight">210 Days</span>, 1 Bottle for Just <span class="price-highlight">$34</span> will start delivering every Month.</span>
            </div>
            <div class="mt-cancel-notice">Cancel subscription anytime!</div>
            <a href="#" class="mt-buy-now-btn">
              <img src="./mobile-assets/images/buy-now2.webp" alt="Buy Now" data-original-src="./mobile-assets/images/buy-now2.webp">
            </a>
            <p class="mt-shipping-text">FREE Shipping</p>
            <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$1,074</span> <span class="mt-final-price">$294</span></p>
            <div class="mt-payment-icons"><img src="./mobile-assets/images/cards.webp" alt="Payment Methods"></div>
          </div>
        </div>
      </div>

      <!-- 4 Bottles -->
      <div class="mt-product-card" data-card="4bottle">
        <div class="mt-product-header">
          <h3>4 BOTTLES</h3>
          <p>FREE SHIPPING • 120 DAY SUPPLY</p>
        </div>
        <div class="mt-product-content">
          <div class="mt-subscription-toggle">
            <div class="mt-subscription-option" data-type="subscribe" data-price="58" data-total="232" data-save="475" data-url="#subscribe-4bottle">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">Subscribe & save up to 30%</span>
              </div>
            </div>
            <div class="mt-subscription-option active" data-type="onetime" data-price="64" data-total="256" data-save="450" data-url="#">
              <div class="mt-option-left">
                <div class="mt-radio-dot"></div>
                <span class="mt-option-label">One-time purchase</span>
              </div>
            </div>
          </div>
          <div class="mt-product-image">
            <img src="./mobile-assets/images/3-bottle-buy-btn.png" alt="ProstaPrime 4 Bottles">
          </div>
          <div class="mt-product-details">
            <div class="mt-product-price">
              <h4 class="mt-display-price">$64</h4>
              <div class="mt-price-info"><p>/Bottle</p></div>
            </div>
            <div class="mt-savings-badge">YOU SAVE $450!</div>
            <div class="mt-subscribe-savings">
              <span class="line1">Congrats!</span>
              <span class="line2">You will get <span class="price-highlight">30% OFF</span> on the Subscription Order! After <span class="price-highlight">120 Days</span>, 1 Bottle for Just <span class="price-highlight">$49</span> will start delivering every Month.</span>
            </div>
            <div class="mt-cancel-notice">Cancel subscription anytime!</div>
            <a href="#" class="mt-buy-now-btn">
              <img src="./mobile-assets/images/buy-now.webp" alt="Buy Now" data-original-src="./mobile-assets/images/buy-now.webp">
            </a>
            <p class="mt-shipping-text">FREE Shipping</p>
            <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$706</span> <span class="mt-final-price">$256</span></p>
            <div class="mt-payment-icons"><img src="./mobile-assets/images/cards.webp" alt="Payment Methods"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-subscription-guarantee">
      <p class="guarantee-title"><span>No Hassle</span> Guarantee</p>
      <p class="guarantee-text">For Subscription Orders, you are always notified before each shipment and you can cancel anytime.</p>
    </div>
  </div>

  <!-- Pricing Cards JavaScript -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Store original buy button images
      document.querySelectorAll('.mt-buy-now-btn img').forEach(img => {
        img.dataset.originalSrc = img.src;
      });

      const subscriptionOptions = document.querySelectorAll('.mt-subscription-option');

      subscriptionOptions.forEach(option => {
        option.addEventListener('click', function() {
          const card = this.closest('.mt-product-card');
          const toggle = this.closest('.mt-subscription-toggle');
          const savingsText = card.querySelector('.mt-subscribe-savings');
          const buyButton = card.querySelector('.mt-buy-now-btn');

          // Remove active from all options in this toggle
          toggle.querySelectorAll('.mt-subscription-option').forEach(opt => opt.classList.remove('active'));

          // Add active to clicked option
          this.classList.add('active');

          // Update price display
          const price = this.dataset.price;
          const total = this.dataset.total;
          const save = this.dataset.save;
          const type = this.dataset.type;
          const url = this.dataset.url;

          card.querySelector('.mt-display-price').textContent = '$' + price;
          card.querySelector('.mt-final-price').textContent = '$' + total;

          // Update savings badge text based on type
          if (type === 'subscribe') {
            card.querySelector('.mt-savings-badge').innerHTML = 'YOU SAVE 10% EXTRA ON THIS ORDER<br>($' + save + ' Saved)!';
          } else {
            card.querySelector('.mt-savings-badge').textContent = 'YOU SAVE $' + save + '!';
          }

          // Update Buy button URL based on selected option
          if (buyButton && url) {
            buyButton.href = url;
          }

          // Swap buy button image based on selection type
          const btnImg = buyButton ? buyButton.querySelector('img') : null;
          if (btnImg) {
            if (type === 'subscribe') {
              btnImg.src = './mobile-assets/images/subscribe.webp';
              btnImg.alt = 'Subscribe Now';
            } else {
              btnImg.src = btnImg.dataset.originalSrc;
              btnImg.alt = 'Buy Now';
            }
          }

          // Show/hide savings text and cancel notice
          const cancelNotice = card.querySelector('.mt-cancel-notice');
          if (type === 'subscribe') {
            if (savingsText) savingsText.classList.add('show');
            if (cancelNotice) cancelNotice.classList.add('show');
          } else {
            if (savingsText) savingsText.classList.remove('show');
            if (cancelNotice) cancelNotice.classList.remove('show');
          }
        });
      });
    });
  </script>

  <!-- SOCIAL PROOF NOTIFICATION HTML -->
  <section class="custom-social-proof">
    <div class="custom-notification">
      <div class="custom-notification-container">
        <div class="custom-notification-image-wrapper">
          <img src="./mobile-assets/images/1bottle.png" alt="ProstaPrime">
        </div>
        <div class="custom-notification-content-wrapper">
          <p class="custom-notification-content">
            <span id="notify-customer">Eli H</span> - <span id="notify-state">TX</span><br> Purchased <strong><span id="notify-quantity">7</span></strong> Bottle(s) of <b>ProstaPrime Support</b> <small><span id="notify-ago">9 minutes ago</span></small>
          </p>
        </div>
      </div>
      <div class="custom-close"></div>
    </div>
  </section>

  <!-- SOCIAL PROOF NOTIFICATION JAVASCRIPT -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    var customerFirst = ['Liam', 'Emma', 'Noah', 'Olivia', 'William', 'Ava', 'James', 'Isabella',
      'Logan', 'Sophia', 'Benjamin', 'Mia', 'Mason', 'Charlotte', 'Elijah', 'Amelia', 'Oliver',
      'Evelyn', 'Jacob', 'Abigail', 'Lucas', 'Harper', 'Michael', 'Emily', 'Alexander',
      'Elizabeth', 'Ethan', 'Avery', 'Daniel', 'Sofia', 'Matthew', 'Ella', 'Aiden', 'Madison',
      'Henry', 'Scarlett', 'Joseph', 'Victoria', 'Jackson', 'Aria', 'Samuel', 'Grace',
      'Sebastian', 'Chloe', 'David', 'Camila', 'Carter', 'Penelope', 'Wyatt', 'Riley', 'Jayden',
      'Layla', 'John', 'Lillian', 'Owen', 'Nora', 'Dylan', 'Zoey', 'Luke', 'Mila', 'Gabriel',
      'Aubrey', 'Anthony', 'Hannah', 'Isaac', 'Lily', 'Grayson', 'Addison', 'Jack', 'Eleanor',
      'Julian', 'Natalie', 'Levi', 'Luna', 'Christopher', 'Savannah', 'Joshua', 'Brooklyn',
      'Andrew', 'Leah', 'Lincoln', 'Zoe', 'Mateo', 'Stella', 'Ryan', 'Hazel', 'Jaxon', 'Ellie',
      'Nathan', 'Paisley', 'Aaron', 'Audrey', 'Isaiah', 'Skylar', 'Thomas', 'Violet', 'Charles',
      'Claire', 'Caleb', 'Bella', 'Josiah', 'Aurora', 'Christian', 'Lucy', 'Hunter', 'Anna',
      'Eli', 'Samantha', 'Jonathan', 'Caroline', 'Connor', 'Genesis', 'Landon', 'Aaliyah',
      'Adrian', 'Kennedy', 'Asher', 'Kinsley', 'Cameron', 'Allison', 'Leo', 'Maya', 'Theodore',
      'Sarah', 'Jeremiah', 'Madelyn', 'Hudson', 'Adeline', 'Robert', 'Alexa', 'Easton', 'Ariana',
      'Nolan', 'Elena', 'Nicholas', 'Gabriella', 'Ezra', 'Naomi', 'Colton', 'Alice', 'Angel',
      'Sadie', 'Brayden', 'Hailey', 'Jordan', 'Eva', 'Dominic', 'Emilia', 'Austin', 'Autumn',
      'Ian', 'Quinn', 'Adam', 'Nevaeh', 'Elias', 'Piper', 'Jaxson', 'Ruby', 'Greyson', 'Serenity',
      'Jose', 'Willow', 'Ezekiel', 'Everly', 'Carson', 'Cora', 'Evan', 'Kaylee', 'Maverick',
      'Lydia', 'Bryson', 'Aubree', 'Jace', 'Arianna', 'Cooper', 'Eliana', 'Xavier', 'Peyton',
      'Parker', 'Melanie', 'Roman', 'Gianna', 'Jason', 'Isabelle', 'Santiago', 'Julia', 'Chase',
      'Valentina', 'Sawyer', 'Nova', 'Gavin', 'Clara', 'Leonardo', 'Vivian', 'Kayden', 'Reagan',
      'Ayden', 'Mackenzie', 'Jameson', 'Madeline'
    ];

    var customerLast = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    var customerStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
      'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
      'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    var customerQuantities = ['2', '4', '7'];

    function updateSocial() {
      var rCustomerFirst = customerFirst[Math.floor(Math.random() * customerFirst.length)];
      var rCustomerLast = customerLast[Math.floor(Math.random() * customerLast.length)];
      var rStates = customerStates[Math.floor(Math.random() * customerStates.length)];
      var rQuantities = customerQuantities[Math.floor(Math.random() * customerQuantities.length)];
      var rAgo = Math.floor(Math.random() * 21) + 1;

      $('#notify-customer').html(rCustomerFirst + ' ' + rCustomerLast);
      $('#notify-state').html(rStates);
      $('#notify-quantity').html(rQuantities);
      $('#notify-ago').html(rAgo + ' minutes ago');
    }

    setInterval(function() {
      var divID = $('.custom-social-proof');
      if (divID.is(':hidden')) {
        $('.custom-social-proof').stop().slideToggle('slow');
        updateSocial();
      } else {
        $(divID).stop().slideToggle('slow');
      }
    }, 7000);

    $('.custom-close').click(function() {
      $('.custom-social-proof').stop().slideToggle('slow');
    });
  </script>
`;

if (!html.includes('id="buynow"')) {
    html = html.replace('</body>', pricingCardsHTML + '\n</body>');
    console.log('Added pricing cards HTML and social proof notification');
}

// 4. Update all remaining buy button links to #buynow
const buyButtonPatterns = [
    /href="https?:\/\/[^"]*clickbank[^"]*"/gi,
    /href="https?:\/\/[^"]*digistore[^"]*"/gi,
    /href="https?:\/\/[^"]*mhmiracle[^"]*"/gi,
];

buyButtonPatterns.forEach(pattern => {
    const count = (html.match(pattern) || []).length;
    if (count > 0) {
        html = html.replace(pattern, 'href="#buynow"');
        console.log(`Replaced buy button URLs matching pattern (${count} times)`);
    }
});

// 5. Remove target="_blank" from #buynow links
html = html.replace(/href="#buynow" target="_blank"/g, 'href="#buynow"');

// Save the processed file
fs.writeFileSync(mobileFile, html, 'utf8');
console.log('\nMobile.html customization complete!');
console.log('Added: Pricing cards section, Social proof notification, Favicon');
