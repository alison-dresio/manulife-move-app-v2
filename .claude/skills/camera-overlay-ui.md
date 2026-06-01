# Camera Overlay UI — Rules for UI Code Generation (DRESIO Pose Detection)

Purpose
- Provide strict guidance for UI elements that overlay a live camera feed so that the feed remains the primary visual while UI is legible and unobtrusive.

Hard Rules (must follow)
- Overlay containers must float above the video layer using absolute positioning and a high stacking context. Example:
  - `absolute inset-0 z-[999] pointer-events-none` for non-interactive overlays
  - Interactive controls may use `z-[1000]` and `pointer-events-auto` only for touchable buttons.
- Visual style: use glassmorphism to ensure legibility while keeping the feed visible:
  - `backdrop-blur-md` plus a semi-transparent surface color: `bg-black/40` or `bg-white/20` (choose based on camera feed brightness).
- Keep overlays minimal and unobtrusive:
  - Only show essential controls and status information.
  - Avoid large, static frames or dense panels that obscure the camera.

Positioning & Interaction
- Position controls at screen edges or corners with safe padding: avoid centering large blocks over the feed.
- Buttons must be large enough for easy tapping (`h-12 w-12` or similar) and must respect safe-area insets.
- Use `pointer-events-none` on overlay containers that are purely informational and only enable `pointer-events-auto` on true interactive elements.

Animation & Feedback
- Use subtle transitions (`transition`, `duration-150`) and avoid strong motion that distracts from the camera task.
- For attention cues (e.g., alignment success), prefer short pulses or color-glow rather than full-screen flashes.

Contrast & Readability
- Prefer `text-white` on darker glass (`bg-black/40`) and `text-manulife-primary` or `text-black` on lighter glass (`bg-white/20`). Ensure WCAG contrast for critical status text.

Examples
- Minimal status bar overlay:
  `<div class="absolute top-4 left-4 z-[999] backdrop-blur-md bg-black/40 rounded-full px-3 py-2 text-white">Align your body</div>`
- Camera action button (interactive):
  `<button class="absolute bottom-6 inset-x-0 mx-auto z-[1000] pointer-events-auto h-14 w-14 rounded-full bg-manulife-primary text-white shadow-elevated">`…`</button>`

Testing
- Validate overlays on varied camera content (bright vs dark) and on both iOS and Android devices.
- Test with different aspect ratios and orientations to ensure overlays don’t block important camera regions.

Philosophy reminder
- Keep the camera feed central. UI exists to support, not compete with, the live feed. Maintain calm, uncluttered visuals consistent with `Rhythm`.