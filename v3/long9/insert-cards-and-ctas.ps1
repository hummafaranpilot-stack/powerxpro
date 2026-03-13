# insert-cards-and-ctas.ps1
# Insert pricing cards and CTA buttons into the long9 sales page

$file = "d:\TrustedNutraProducts\VigorXPro\v2\long9\index.html"
$lines = [System.IO.File]::ReadAllLines($file)

# Define the pricing cards HTML block
$pricingCards = @'
<!-- VIGORX PRO PRICING CARDS - INSERTED AT ~30% -->
<div style="max-width:1100px; margin:30px auto; padding:0 15px;">
<div id="buynow" class="mt-product-grid">
  <!-- 2 Bottles -->
  <div class="mt-product-card" data-card="2bottle">
    <div class="mt-product-header">
      <h3>2 BOTTLES</h3>
      <p>60 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../Images/2-bottles-vigor.webp" alt="VigorX Pro 2 Bottles">
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$79</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../pills/save200.png" alt="You Save $200" class="badge-img">
          <img src="../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../lib/img/buy-now.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">+ $19.99 Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$260</span> <span class="mt-final-price">$158</span></p>
        <div class="mt-payment-icons"><img src="../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>

  <!-- 6+1 Bottles - BEST VALUE -->
  <div class="mt-product-card mt-featured" data-card="6bottle">
    <div class="mt-product-header">
      <h3>6 + 1 BOTTLES</h3>
      <p>+ 1 FREE BOTTLE + 2 PREMIUM EBOOKS &bull; 210 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../Images/7-bottles-vigor.webp" alt="VigorX Pro 7 Bottles - Best Value">
        <div class="mt-best-badge">BEST VALUE</div>
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$49</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../pills/780.png" alt="You Save $780" class="badge-img">
          <img src="../pills/discount.png" alt="Biggest Discount" class="badge-img">
          <img src="../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
          <img src="../pills/ebooks.png" alt="2 Free Ebooks" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../lib/img/buy-now2.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">FREE Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$1,074</span> <span class="mt-final-price">$294</span></p>
        <div class="mt-payment-icons"><img src="../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>

  <!-- 3 Bottles -->
  <div class="mt-product-card" data-card="3bottle">
    <div class="mt-product-header">
      <h3>3 BOTTLES</h3>
      <p>FREE SHIPPING &bull; 90 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../Images/3-bottles-vigor.webp" alt="VigorX Pro 3 Bottles">
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$64</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../pills/450.webp" alt="You Save $450" class="badge-img">
          <img src="../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../lib/img/buy-now.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">FREE Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$642</span> <span class="mt-final-price">$192</span></p>
        <div class="mt-payment-icons"><img src="../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- END PRICING CARDS -->
'@

# Define the CTA button HTML block
$ctaButton = @'
<!-- CTA BUTTON -->
<div class="cta-btn-wrap">
  <div class="button-center riskfree text-center text-uppercase">
    <a class="action" style="color:#000;" href="#buynow">TRY NOW &mdash; <br class="d-block d-md-none">GET UP TO 61% OFF <i class="fas fa-arrow-right"></i></a>
  </div>
  <p class="text-center secure-text my-2"><i class="fas fa-lock"></i> 100% Secure Encrypted Transactions</p>
</div>
'@

# Build new file content using ArrayList for efficient insertions
$newLines = [System.Collections.ArrayList]::new()

# Define after which LINE NUMBERS to insert CTA buttons (0-indexed)
# These correspond to after key story sections
$ctaInsertAfterLines = @(
    1398,   # After "Three Rules" section (~30% mark) - pricing cards go here
    1557,   # After "It's also hurtful and embarrassing for HER" section
    1860,   # After "Soggy Spaghetti" section
    1984,   # After the Genghis Khan section intro  
    2240,   # After "Final adjustment" dark section
    2519,   # After "No More Embarrassing Limpness" section
    2654,   # After testimonials dark section
    2837,   # After "costs involved" text section
    2996    # After "would you place on a system" section
)

# The pricing cards location (after line 1398, which is after Three Rules)
$pricingInsertAfterLine = 1398

# Replace the old flicker-buy-btn on line 3106
$flickerBtnLine = 3106  # 1-indexed

for ($i = 0; $i -lt $lines.Count; $i++) {
    $lineNum = $i + 1  # 1-indexed

    # Replace the old flicker-buy-btn with a proper CTA
    if ($lineNum -eq $flickerBtnLine) {
        # Skip the old flicker button line, replace with CTA
        [void]$newLines.Add($ctaButton)
        continue
    }

    # Add the current line
    [void]$newLines.Add($lines[$i])

    # Insert pricing cards at the ~30% mark
    if ($lineNum -eq $pricingInsertAfterLine) {
        [void]$newLines.Add("")
        [void]$newLines.Add($ctaButton)
        [void]$newLines.Add("")
        [void]$newLines.Add($pricingCards)
        [void]$newLines.Add("")
    }
    # Insert CTA buttons at other positions (skip line 1398 since it already gets pricing+CTA)
    elseif ($ctaInsertAfterLines -contains $lineNum -and $lineNum -ne $pricingInsertAfterLine) {
        [void]$newLines.Add("")
        [void]$newLines.Add($ctaButton)
        [void]$newLines.Add("")
    }
}

# Write the final content
$content = $newLines -join "`r`n"
[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "Done! Inserted pricing cards after line $pricingInsertAfterLine and CTA buttons at $($ctaInsertAfterLines.Count) locations."
Write-Host "Total lines before: $($lines.Count)"
Write-Host "Total lines after: $($newLines.Count)"
