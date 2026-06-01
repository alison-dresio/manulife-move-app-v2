# WebView Native Feel — Rules for UI Code Generation

Purpose
- Ensure the app feels native when embedded in a mobile WebView and does not behave like a generic browser page.

Hard Rules (must follow)
- All main layout containers must include these utilities (or their equivalents):
  - `select-none` — prevent accidental text selection in interactive areas.
  - `overscroll-none` — prevent rubber-band overscroll behavior that exposes the browser chrome.
  - `touch-action-manipulation` — optimize touch handling for native-like gestures.
- Safe areas: always account for iOS/Android display cutouts and soft bars. Use environment-safe padding on main app scaffolds:
  - `pt-[env(safe-area-inset-top)]`
  - `pb-[env(safe-area-inset-bottom)]`
  - `pl-[env(safe-area-inset-left)]` and `pr-[env(safe-area-inset-right)]` where needed for edge-aligned controls.
- Do not rely solely on CSS reset in the WebView; enforce safe-area padding on primary container components.

Navigation & Input
- Keep the top chrome minimal — avoid visible browser-like address bars in layouts.
- For input fields inside the WebView, use `-webkit-text-size-adjust: 100%` and appropriate viewport meta settings (handled by app shell), plus `autocomplete` and mobile-specific input types when appropriate.

Gestures & Scrolling
- If implementing custom gestures, ensure they do not conflict with system gestures (back swipe on iOS). Prefer edge-swallowing only for dedicated full-screen experiences and always provide a fallback.
- Use `touch-action` and `pointer-events` carefully to avoid accidental drag or zoom behavior.

Examples
- Main scaffold:
  `<main class="min-h-screen select-none overscroll-none touch-action-manipulation pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">`

Accessibility & Edge Cases
- Respect `prefers-reduced-motion` and system text-size adjustments.
- Test inside native WebView containers (iOS WKWebView, Android WebView) to validate safe-area behavior.

Failure handling
- If safe-area env variables are unavailable (older WebView), fall back to tokenized spacing like `pt-4 pb-4` to avoid layout breakage.

Philosophy reminder
- Make the app feel like a native mobile experience: quiet, unobtrusive, and touch-first.