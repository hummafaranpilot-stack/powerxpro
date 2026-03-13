/* Subscription Toggle JavaScript */
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
          btnImg.src = '../../lib/img/subscribe.webp';
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
