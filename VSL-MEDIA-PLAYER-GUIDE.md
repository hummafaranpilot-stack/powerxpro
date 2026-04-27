# VSL Media Player Guide

Spec for the custom HLS video player used on PowerXPro VSL landing pages (edvsl, prostatevsl).

Use this to add the same player to any new VSL page.

---

## Player Behavior

### Pre-click state
- **Looping silent thumbnail video** (HD-locked, no controls, autoplays muted)
- **Blue overlay** with pulsing animated border: "Your Video is Playing — Click to Unmute"
- **Skeleton shimmer loader** covers the player until first frame renders

### On click
- Thumbnail hides → main VSL reveals and starts playing with sound
- "Loading..." hint appears briefly if main VSL hasn't buffered yet (max 3s)

### Playback state
- **Click video** to toggle play/pause
- **Big center play icon** (YouTube-style) shows when paused
- Custom controls bar at bottom-right:
  - **Volume** — hover (desktop) or tap (mobile) → vertical slider
  - **Quality** — Auto + all available resolutions (1080p, 720p, etc.)
  - **Fullscreen / Exit**

### Controls visibility
- **Desktop:** Visible on wrapper hover, fade out otherwise
- **Mobile:** Always visible when player is active (no hover to rely on)

### Fullscreen behavior
- **Desktop:** Real Fullscreen API on the wrapper
- **Mobile:** Pseudo-fullscreen (CSS only)
  - Wrapper covers viewport via `position:fixed`
  - In portrait mode, rotates 90° so video shows landscape
  - Our custom controls stay visible
  - **No iOS native player** — no scrubber, no skip 10s, no close X, no PiP

---

## Integration

### 1. Drop-in HTML block

Replace the existing video section on your page (YouTube iframe, native `<video>`, etc.) with this entire block. The two `HLS` URLs at the top of the `<script>` point to your CF Stream videos (set separately).

```html
<!-- VSL Video -->
<div style="width:100%; padding:0; position:relative; background:#000;">
	<style>
		@keyframes borderPulse {
			0%   { box-shadow: 0 0 0 0px rgba(255,255,255,0.8), 0 8px 40px rgba(0,0,0,0.55); }
			50%  { box-shadow: 0 0 0 14px rgba(255,255,255,0), 0 8px 40px rgba(0,0,0,0.55); }
			100% { box-shadow: 0 0 0 0px rgba(255,255,255,0.8), 0 8px 40px rgba(0,0,0,0.55); }
		}
		@keyframes cfSkShimmer {
			0%   { background-position: -200% 0; }
			100% { background-position: 200% 0; }
		}
		#cf-player-wrapper { position:relative; padding-top:56.25%; background:#000; }
		#cf-skeleton { position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; transition:opacity 0.4s ease; background:linear-gradient(90deg,#0a0a0a 25%,#1f1f1f 50%,#0a0a0a 75%); background-size:200% 100%; animation:cfSkShimmer 1.5s infinite; }
		#cf-skeleton.hidden { opacity:0; pointer-events:none; }
		#cf-thumb-video, #cf-vsl-video { width:100%; height:100%; object-fit:contain; display:block; background:#000; }

		/* Custom controls */
		#cf-vsl-controls { position:absolute; bottom:0; left:0; right:0; z-index:6; padding:24px 14px 10px; background:linear-gradient(transparent,rgba(0,0,0,0.75)); display:flex; align-items:center; justify-content:flex-end; gap:6px; opacity:0; transition:opacity 0.25s ease; pointer-events:none; box-sizing:border-box; }
		#cf-vsl.active:hover #cf-vsl-controls, #cf-vsl.active.show-ctrl #cf-vsl-controls { opacity:1; pointer-events:auto; }
		/* Mobile/touch: always show controls when player is active (no hover available) */
		@media (hover: none), (pointer: coarse) {
			#cf-vsl.active #cf-vsl-controls { opacity:1 !important; pointer-events:auto !important; }
		}
		.cf-ctrl-btn { background:rgba(0,0,0,0.5); border:none; color:#fff; cursor:pointer; padding:7px 9px; border-radius:6px; display:flex; align-items:center; justify-content:center; transition:background 0.15s; font:600 12px sans-serif; }
		.cf-ctrl-btn:hover { background:rgba(0,0,0,0.75); }
		.cf-ctrl-btn svg { width:18px; height:18px; fill:#fff; }
		#cf-vol-wrap { position:relative; }
		#cf-vol-slider { position:absolute; bottom:100%; left:50%; transform:translateX(-50%); margin-bottom:8px; background:rgba(0,0,0,0.85); border-radius:8px; padding:10px 6px; display:none; }
		#cf-vol-wrap:hover #cf-vol-slider { display:block; }
		#cf-vol-range { -webkit-appearance:none; appearance:none; width:6px; height:80px; writing-mode:bt-lr; -webkit-writing-mode:bt-lr; transform:rotate(270deg); transform-origin:center; background:transparent; outline:none; }
		#cf-vol-range::-webkit-slider-runnable-track { width:80px; height:4px; background:rgba(255,255,255,0.3); border-radius:2px; }
		#cf-vol-range::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:#fff; cursor:pointer; margin-top:-4px; }
		#cf-quality-menu { position:absolute; bottom:100%; right:0; margin-bottom:8px; background:rgba(0,0,0,0.9); border-radius:6px; padding:4px 0; display:none; min-width:90px; }
		#cf-quality-wrap.open #cf-quality-menu { display:block; }
		.cf-quality-item { padding:7px 14px; color:#fff; cursor:pointer; font:600 12px sans-serif; white-space:nowrap; text-align:left; }
		.cf-quality-item:hover { background:rgba(255,255,255,0.15); }
		.cf-quality-item.active { color:#4fc3f7; }
		.cf-quality-item.active::before { content:"✓ "; }

		/* Big center play icon when paused */
		#cf-vsl-bigplay { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:7; opacity:0; pointer-events:none; transition:opacity 0.2s; }
		#cf-vsl.paused #cf-vsl-bigplay { opacity:1; }
		#cf-vsl-bigplay svg { width:68px; height:68px; fill:rgba(255,255,255,0.9); filter:drop-shadow(0 4px 12px rgba(0,0,0,0.6)); }

		/* Desktop fullscreen (real Fullscreen API) */
		#cf-player-wrapper:fullscreen, #cf-player-wrapper:-webkit-full-screen { padding-top:0 !important; height:100vh !important; }

		/* Mobile pseudo-fullscreen (avoids iOS native player) */
		#cf-player-wrapper.pseudo-fullscreen {
			position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
			width: 100% !important; height: 100% !important; max-width: none !important;
			padding: 0 !important; padding-top: 0 !important; margin: 0 !important;
			z-index: 99999 !important; background: #000 !important; aspect-ratio: auto !important;
		}
		/* In portrait, rotate 90° for landscape view (no OS rotation needed) */
		@media (orientation: portrait) {
			#cf-player-wrapper.pseudo-fullscreen {
				width: 100vh !important; height: 100vw !important;
				top: 50% !important; left: 50% !important; right: auto !important; bottom: auto !important;
				transform: translate(-50%, -50%) rotate(90deg);
				transform-origin: center center;
			}
		}
	</style>
	<div id="cf-player-wrapper">

		<!-- Skeleton loader shown until thumbnail's first frame renders -->
		<div id="cf-skeleton"></div>

		<!-- Looping silent HD-locked thumbnail (no controls) -->
		<div id="cf-thumbnail" style="position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;overflow:hidden;z-index:3;">
			<video id="cf-thumb-video" autoplay muted loop playsinline preload="auto"></video>
			<div style="position:absolute;top:32%;bottom:32%;left:32%;right:32%;background:rgba(20,45,200,0.7);border:3px solid #fff;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;animation:borderPulse 2s ease-in-out infinite;">
				<img src="https://cdn-icons-png.flaticon.com/512/2058/2058599.png" style="display:block;margin:0 auto 6%;filter:brightness(0) invert(1);width:clamp(24px,5vw,56px);height:auto;">
				<div style="color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:clamp(11px,2vw,22px);font-weight:800;line-height:1.3;padding:0 6%;">Your Video is Playing<br>Click to Unmute</div>
			</div>
		</div>

		<!-- Main VSL (buffering in bg, revealed on click) -->
		<div id="cf-vsl" style="position:absolute;top:0;left:0;width:100%;height:100%;visibility:hidden;z-index:1;">
			<video id="cf-vsl-video" playsinline preload="auto"></video>
			<div id="cf-vsl-bigplay" aria-hidden="true">
				<svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" opacity="0.75" fill="#000"/><path d="M 45,24 27,14 27,34" fill="#fff"/></svg>
			</div>
			<div id="cf-vsl-controls">
				<!-- Volume -->
				<div id="cf-vol-wrap">
					<button id="cf-vol-btn" class="cf-ctrl-btn" aria-label="Mute">
						<svg id="cf-vol-icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
					</button>
					<div id="cf-vol-slider"><input id="cf-vol-range" type="range" min="0" max="100" value="100"></div>
				</div>
				<!-- Quality -->
				<div id="cf-quality-wrap" style="position:relative;">
					<button id="cf-quality-btn" class="cf-ctrl-btn" aria-label="Quality"><span id="cf-quality-label">Auto</span></button>
					<div id="cf-quality-menu"></div>
				</div>
				<!-- Fullscreen -->
				<button id="cf-fs-btn" class="cf-ctrl-btn" aria-label="Fullscreen">
					<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
				</button>
			</div>
		</div>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js"></script>
	<script>
		(function() {
			var THUMB_HLS = 'https://customer-8ocoyclfhfvlpft9.cloudflarestream.com/THUMBNAIL_UID/manifest/video.m3u8';
			var VSL_HLS   = 'https://customer-8ocoyclfhfvlpft9.cloudflarestream.com/MAIN_VSL_UID/manifest/video.m3u8';

			var thumbVideo = document.getElementById('cf-thumb-video');
			var vslVideo   = document.getElementById('cf-vsl-video');
			var skeleton   = document.getElementById('cf-skeleton');
			var vslWrap    = document.getElementById('cf-vsl');

			function hideSkeleton() {
				skeleton.classList.add('hidden');
				setTimeout(function() { skeleton.style.display = 'none'; }, 500);
			}
			// Hide only after first frame is actually rendered
			function onFirstFrame() {
				if (typeof thumbVideo.requestVideoFrameCallback === 'function') {
					thumbVideo.requestVideoFrameCallback(function() { hideSkeleton(); });
				} else {
					setTimeout(hideSkeleton, 200);
				}
			}
			thumbVideo.addEventListener('loadeddata', onFirstFrame, { once: true });
			setTimeout(hideSkeleton, 8000); // hard fallback

			// THUMBNAIL: HD-locked, no controls
			if (window.Hls && Hls.isSupported()) {
				var thumbHls = new Hls({
					capLevelToPlayerSize: false, maxBufferLength: 30,
					startLevel: -1, autoStartLoad: true
				});
				thumbHls.loadSource(THUMB_HLS);
				thumbHls.attachMedia(thumbVideo);
				thumbHls.on(Hls.Events.MANIFEST_PARSED, function() {
					var top = thumbHls.levels.length - 1;
					thumbHls.currentLevel = top; thumbHls.nextLevel = top; thumbHls.loadLevel = top;
				});
				thumbVideo.addEventListener('canplay', function onCP() {
					thumbVideo.removeEventListener('canplay', onCP);
					thumbVideo.play().catch(function(){});
				});
			} else if (thumbVideo.canPlayType('application/vnd.apple.mpegurl')) {
				thumbVideo.src = THUMB_HLS;
				thumbVideo.addEventListener('canplay', function onCP() {
					thumbVideo.removeEventListener('canplay', onCP);
					thumbVideo.play().catch(function(){});
				});
			}

			// VSL: hls.js preload + custom controls
			var vslHls = null;
			function setupVsl() {
				if (window.Hls && Hls.isSupported()) {
					vslHls = new Hls({ capLevelToPlayerSize:false, maxBufferLength:30, autoStartLoad:true });
					vslHls.loadSource(VSL_HLS);
					vslHls.attachMedia(vslVideo);
					vslHls.on(Hls.Events.MANIFEST_PARSED, buildQualityMenu);
				} else if (vslVideo.canPlayType('application/vnd.apple.mpegurl')) {
					vslVideo.src = VSL_HLS;
				}
			}
			setupVsl();

			// Quality menu (Auto + all levels, high to low)
			function buildQualityMenu() {
				var menu = document.getElementById('cf-quality-menu');
				var label = document.getElementById('cf-quality-label');
				menu.innerHTML = '';
				var levels = vslHls ? vslHls.levels : [];
				function pick(i, name) {
					if (vslHls) { vslHls.currentLevel = i; vslHls.nextLevel = i; }
					label.textContent = name;
					Array.prototype.forEach.call(menu.children, function(c,idx){
						c.classList.toggle('active', idx === 0 ? i===-1 : levels[idx-1]===levels[i]);
					});
					document.getElementById('cf-quality-wrap').classList.remove('open');
				}
				var auto = document.createElement('div');
				auto.className = 'cf-quality-item active';
				auto.textContent = 'Auto';
				auto.onclick = function() { pick(-1, 'Auto'); };
				menu.appendChild(auto);
				var sorted = levels.map(function(l,i){ return {l:l, i:i}; }).sort(function(a,b){ return b.l.height - a.l.height; });
				sorted.forEach(function(item) {
					var div = document.createElement('div');
					div.className = 'cf-quality-item';
					div.textContent = item.l.height + 'p';
					div.onclick = (function(idx, name){ return function(){ pick(idx, name); }; })(item.i, item.l.height+'p');
					menu.appendChild(div);
				});
			}
			document.getElementById('cf-quality-btn').addEventListener('click', function(e) {
				e.stopPropagation();
				document.getElementById('cf-quality-wrap').classList.toggle('open');
			});
			document.addEventListener('click', function() {
				document.getElementById('cf-quality-wrap').classList.remove('open');
			});

			// Volume / mute
			var volBtn = document.getElementById('cf-vol-btn');
			var volRange = document.getElementById('cf-vol-range');
			var volIcon = document.getElementById('cf-vol-icon');
			var mutedIconPath = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
			var onIconPath = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
			volBtn.onclick = function() {
				vslVideo.muted = !vslVideo.muted;
				volIcon.innerHTML = vslVideo.muted ? mutedIconPath : onIconPath;
				volRange.value = vslVideo.muted ? 0 : vslVideo.volume * 100;
			};
			volRange.oninput = function() {
				var v = parseInt(this.value);
				vslVideo.volume = v / 100;
				vslVideo.muted = v === 0;
				volIcon.innerHTML = vslVideo.muted ? mutedIconPath : onIconPath;
			};

			// Fullscreen: desktop uses real Fullscreen API, mobile uses pseudo-fullscreen (CSS rotation).
			// Pseudo-fullscreen avoids iOS native player (scrubber, skip 10s, etc.) and keeps our custom controls.
			function isMobileDevice() {
				return window.matchMedia && window.matchMedia('(max-width: 991px), (pointer: coarse)').matches;
			}
			function tryLockLandscape() {
				try {
					if (screen.orientation && screen.orientation.lock) {
						var p = screen.orientation.lock('landscape');
						if (p && p.catch) p.catch(function(){});
					}
				} catch (e) {}
			}
			function tryUnlockOrientation() {
				try {
					if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
				} catch (e) {}
			}
			var wrapperEl = document.getElementById('cf-player-wrapper');
			function inPseudoFullscreen() { return wrapperEl.classList.contains('pseudo-fullscreen'); }
			function inRealFullscreen() {
				return document.fullscreenElement || document.webkitFullscreenElement ||
				       document.mozFullScreenElement || document.msFullscreenElement;
			}
			function enterFullscreen() {
				if (isMobileDevice()) {
					// Pseudo-fullscreen: CSS takeover + rotate — no iOS native controls
					wrapperEl.classList.add('pseudo-fullscreen');
					document.body.style.overflow = 'hidden';
					tryLockLandscape();
				} else {
					var req = wrapperEl.requestFullscreen || wrapperEl.webkitRequestFullscreen;
					if (req) try { req.call(wrapperEl); } catch (e) {}
				}
			}
			function exitFullscreen() {
				if (inPseudoFullscreen()) {
					wrapperEl.classList.remove('pseudo-fullscreen');
					document.body.style.overflow = '';
					tryUnlockOrientation();
				} else if (inRealFullscreen()) {
					if (document.exitFullscreen) document.exitFullscreen();
					else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
				}
			}
			document.getElementById('cf-fs-btn').onclick = function() {
				if (inPseudoFullscreen() || inRealFullscreen()) exitFullscreen();
				else enterFullscreen();
			};
			['fullscreenchange', 'webkitfullscreenchange'].forEach(function(ev) {
				document.addEventListener(ev, function() { if (!inRealFullscreen()) tryUnlockOrientation(); });
			});

			// Click video to toggle play/pause
			vslVideo.addEventListener('click', function() {
				if (vslVideo.paused) vslVideo.play(); else vslVideo.pause();
			});
			vslVideo.addEventListener('play',  function(){ vslWrap.classList.remove('paused'); });
			vslVideo.addEventListener('pause', function(){ vslWrap.classList.add('paused'); });

			// Show controls briefly on play start
			function flashControls(ms) {
				vslWrap.classList.add('show-ctrl');
				clearTimeout(vslWrap._t);
				vslWrap._t = setTimeout(function(){ vslWrap.classList.remove('show-ctrl'); }, ms || 2500);
			}
			vslVideo.addEventListener('play', function(){ flashControls(1800); });

			// THUMBNAIL CLICK → reveal main VSL with "loading..." hint if not buffered yet
			document.getElementById('cf-thumbnail').addEventListener('click', function () {
				var self = this;
				function startVsl() {
					self.style.display = 'none';
					vslWrap.style.visibility = 'visible';
					vslWrap.style.zIndex = '5';
					vslWrap.classList.add('active');
					vslVideo.muted = false;
					volRange.value = 100;
					vslVideo.play().catch(function() {
						vslVideo.muted = true;
						volIcon.innerHTML = mutedIconPath;
						volRange.value = 0;
						vslVideo.play();
					});
				}
				if (vslVideo.readyState >= 3) {
					startVsl();
				} else {
					var loadingHint = document.createElement('div');
					loadingHint.textContent = 'Loading video...';
					loadingHint.style.cssText = 'position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:8px 16px;border-radius:6px;font:600 13px sans-serif;z-index:9;';
					self.appendChild(loadingHint);
					vslVideo.addEventListener('canplay', function onVslCP() {
						vslVideo.removeEventListener('canplay', onVslCP);
						if (loadingHint.parentNode) loadingHint.parentNode.removeChild(loadingHint);
						startVsl();
					});
					setTimeout(function() {
						if (self.style.display !== 'none') {
							if (loadingHint.parentNode) loadingHint.parentNode.removeChild(loadingHint);
							startVsl();
						}
					}, 3000);
				}
			});
		})();
	</script>
</div>
```

### 2. Required `<head>` preconnects

```html
<link rel="preconnect" href="https://customer-8ocoyclfhfvlpft9.cloudflarestream.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
```

---

## Customization

### Overlay text
Inside `#cf-thumbnail`, this line:
```html
<div style="color:#fff;...">Your Video is Playing<br>Click to Unmute</div>
```

### Overlay color
Change `rgba(20,45,200,0.7)` inside the overlay div. First 3 values = RGB, last = opacity.

### Overlay size
`top:32%;bottom:32%;left:32%;right:32%;` — smaller % = bigger overlay.

### Video object-fit
Default is `object-fit:contain` (adds black bars to preserve aspect ratio). Change to `cover` for full-bleed (crops edges).

---

## Testing Checklist

### Desktop
- [ ] Thumbnail plays silent on page load
- [ ] Blue overlay has pulsing border animation
- [ ] Click overlay → main VSL starts with sound
- [ ] Volume slider appears on hover and works
- [ ] Quality menu opens, selection applies
- [ ] Fullscreen button enters/exits real fullscreen
- [ ] Custom controls remain visible in fullscreen
- [ ] Click video toggles play/pause
- [ ] Big center play icon appears when paused

### Mobile (iOS Safari + Chrome Android)
- [ ] Thumbnail autoplays silent
- [ ] Tap overlay starts main VSL with sound
- [ ] Controls always visible when playing (no hover required)
- [ ] Fullscreen button enters pseudo-fullscreen
- [ ] In portrait, video rotates 90° to landscape view
- [ ] No iOS native player UI (no scrubber, skip 10s, close X)
- [ ] Fullscreen button exits back to normal
- [ ] Quality menu works on tap

---

## Common Problems & Fixes

### "Controls not clickable on mobile"
The `@media (hover: none), (pointer: coarse)` block is missing or was removed. It forces controls to always show on touch devices.

### "iOS native player with scrubber appears on fullscreen"
Something is calling `video.webkitEnterFullscreen()`. The player uses **only** pseudo-fullscreen on mobile (the `.pseudo-fullscreen` CSS class). Never call native video fullscreen APIs on mobile.

### "Thumbnail plays but shows black screen briefly"
`requestVideoFrameCallback` fallback is `setTimeout(hideSkeleton, 200)`. If still black, check `hls.js` loaded correctly (network tab).

### "Main VSL takes long to start after click"
Normal when user clicks before hls.js has buffered enough of the main VSL. The "Loading video..." hint appears, with max 3s fallback.

### "Landscape rotation doesn't happen on iOS"
iOS Safari doesn't allow programmatic orientation lock. The **CSS `rotate(90deg)`** simulates landscape — phone stays in portrait but video shows landscape. This is intentional and expected behavior.

### "Video stretched / wrong aspect ratio"
`object-fit` on `#cf-thumb-video, #cf-vsl-video` should be `contain` (letterbox) or `cover` (crop). Check no other CSS is overriding with `fill`.

---

## Reference pages

Pages currently using this player (use as copy/paste reference):
- `v3/edvsl/index.html`
- `v3/prostatevsl/index.html`
