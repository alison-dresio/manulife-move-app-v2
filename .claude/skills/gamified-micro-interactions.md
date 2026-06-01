# Gamified Micro-Interactions — Rules for UI Code Generation

Purpose
- Replace blunt, instant changes with delightful, calm, game-like feedback that supports the `Rhythm` philosophy.

Hard Rules (must follow)
- No instant numeric snaps for score/points changes. Use a calm roll-up or tween animation when numbers change.
  - Acceptable approaches: Framer Motion value animation, CSS-driven countup with `requestAnimationFrame`, or a small library for number tweening.
- Provide subtle physical feedback for interactive affordances: scale, glow, or micro-bounce. Examples:
  - `active:scale-95` for tactile press feedback
  - `shadow-glow` or `ring-2 ring-manulife-accent/30` for earned rewards
- Respect `prefers-reduced-motion`: if the user requests reduced motion, fallback to an accessible, instantaneous state change with ARIA live updates.

Animation guidance
- Use Framer Motion when complex choreography is needed (stagger, shared layout, exit/enter animations). Keep motion calm and short (150–300ms typical).
- For simple effects, use Tailwind transitions: `transition transform duration-150 ease-out` and `active:scale-95`.
- For numeric rollups, prefer easing and a gentle duration (400–800ms) with an ease-out curve.

Examples
- Points increment (Framer Motion pseudo):
  - Animate a `motion.span` from old value to new with a tweened number and `aria-live="polite"` for screen readers.
- Star earned effect:
  - Small `scale-110` pop + soft glow (`shadow-glow`) for 200ms → settle back to normal.

Accessibility
- Keep ARIA live regions for score/point updates: `aria-live="polite"` to announce changes without interrupting.
- Provide reduced-motion fallbacks: detect `prefers-reduced-motion` and skip non-essential animations.

Performance
- Keep animations GPU-accelerated (transform, opacity) and avoid layout-thrashing properties.
- Batch DOM updates for value rollups to avoid jank.

Philosophy reminder
- Make interactions feel rewarding but not forceful. Animations should invite continued engagement without demanding attention — calm, subtle, and rhythmic.