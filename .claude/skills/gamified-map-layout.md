# Gamified Map Layout — Rules for UI Code Generation

Purpose
- Provide a consistent approach for level-progression maps that feel organic, playful, and aligned with the `Rhythm` philosophy. This layout is intended for gamified progress screens (levels, checkpoints, courses) and must avoid boring straight-line lists.

Hard Rules (must follow)
- Standard single-column or grid flex lists are forbidden for level progression displays. Do NOT use simple `flex-col` lists for the map.
- The map must be a vertically scrolling container with an S-curve path. Nodes (levels) should be visually arranged using an algorithmic horizontal offset that alternates (left, center, right) or follows a sine-wave calculation to create an organic winding path.
- Nodes must be absolutely-positioned relative to a vertical flow container or rendered using an SVG group. Use CSS transforms for GPU-accelerated position tweaks (translateX/translateY).
- Connect nodes visually with absolute-positioned SVG curves or paths (cubic Bezier). Do not use many separate DOM lines; prefer a single SVG overlay that draws the connecting path for performance and crispness.

Layout & positioning guidance
- Container: vertical scroll area with padding and safe-area insets.
  - Example wrapper: `relative overflow-auto py-8 select-none overscroll-none`.
- Node placement: compute a horizontal offset based on index:
  - Simple alternating pattern: index % 3 → [-40%, 0, 40%] (use responsive tokens not raw percents in classnames; compute inline style from constants or via CSS variables)
  - Sine wave approach: x = amplitude * sin(index * frequency + phase)
- Size & scale: nodes should be visually comfortable and tappable (min 56px diameter for touch nodes). Use `rounded-full` for circular nodes or `rounded-lg` for card-like nodes based on context.

Connection visuals
- Use an absolute SVG covering the container. Render a smooth path connecting node centers using cubic Bezier or smooth spline.
- Path style: `stroke: var(--manulife-green); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; fill: none;` for primary path, and a fainter shadow path underneath (lower opacity) to suggest depth.
- Where the path crosses important UI, ensure it remains beneath node elements (z-index), and nodes receive a subtle glass layer or elevated shadow so they remain legible.

Interaction & accessibility
- Nodes must be keyboard and screen-reader accessible. Each node should be a focusable control with `aria-label` describing level number and status (locked/unlocked/current).
- Use `aria-current="true"` for the current node.
- Provide alternative representation (list view) if a user prefers reduced-motion or low-contrast modes.

Animation & micro-interaction
- Entrance: nodes fade/slide into place with a short spring (stiffness 120, damping 20). Use Framer Motion or CSS transitions based on complexity.
- Hover/press: small scale (active:scale-95) + soft glow (`shadow-glow`) for reward-available nodes.
- When connecting lines update (new node unlocked), animate the path stroke using stroke-dashoffset with a calm ease-out timing so the path appears to grow organically.

Examples (implementation notes)
- Build a `VerticalMap` component that:
  - maps level indices to Y positions (e.g., index * rowHeight)
  - calculates X offsets via an `offsetForIndex(i)` helper (returns pixel or CSS variable values)
  - renders nodes as absolutely positioned buttons at (left: calc(50% + offset), top: y)
  - draws a single SVG path that interpolates between node centers

Performance & testing
- Batch layout calculations outside render loops where possible.
- Test on low-end devices and ensure the SVG path rendering is performant. Avoid adding a large number of DOM nodes—cap the initial visible nodes and progressively render more on scroll if necessary.

Philosophy reminder
- The map must feel organic, rhythmic, and calm — not mechanically aligned. Avoid perfect straight lines and embrace gentle undulation that supports exploration without overwhelming the user.