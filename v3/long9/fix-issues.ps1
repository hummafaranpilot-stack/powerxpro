# fix-issues.ps1
# Fix: logo BG, hero CTA, duplicate footer CTAs, broken image paths

$file = "d:\TrustedNutraProducts\VigorXPro\v2\long9\index.html"
$content = [System.IO.File]::ReadAllText($file)

# 1. Fix logo wrapper background - make transparent (remove black BG)
# The logo-wrapper currently has background-color: transparent already, but let's ensure it
$content = $content -replace 'background-color:\s*#111;', 'background-color: transparent;'

# 2. Fix broken bonus image paths (../../eBooks/ -> ../lib/img/)
$content = $content -replace '../../eBooks/ebook1\.png', '../lib/img/ebook1.png'
$content = $content -replace '../../eBooks/powerplan\.png\.png', '../lib/img/powerplan.png'

# 3. Remove duplicate CTA BUTTON #3 before footer (lines 3453-3462 area)
# We keep the CTA after bonuses (#2) but remove the one right before footer (#3)
$content = $content -replace '(?s)<!-- CTA BUTTON #3 - Before Footer -->.*?</div>\s*\n\s*\n(\s*<footer)', '$1'

# 4. Add Hero section CTA button after the main headline closing </div> block
# Insert after the closing of the headline section (after line ~900, before section K8nw6k9U)
$heroCtaBlock = @'
<!-- HERO CTA BUTTON -->
<div class="cta-btn-wrap" style="margin-top:10px; margin-bottom:20px;">
  <div class="button-center riskfree text-center text-uppercase">
    <a class="action" style="color:#000;" href="#buynow">TRY NOW &mdash; <br class="d-block d-md-none">GET UP TO 61% OFF <i class="fas fa-arrow-right"></i></a>
  </div>
  <p class="text-center secure-text my-2"><i class="fas fa-lock"></i> 100% Secure Encrypted Transactions</p>
</div>
'@

# Insert the hero CTA before the second main section (K8nw6k9U)
$content = $content -replace '(<div id="op3-element-K8nw6k9U")', "$heroCtaBlock`r`n`$1"

# Write back
[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "All fixes applied:"
Write-Host "  1. Logo wrapper BG set to transparent"
Write-Host "  2. Bonus image paths fixed (eBooks -> lib/img)"
Write-Host "  3. Duplicate CTA #3 before footer removed"
Write-Host "  4. Hero section CTA button added"
