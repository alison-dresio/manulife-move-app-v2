# Gate and Reward Visuals — Rules for UI Code Generation

Purpose
- Define strict visual rules for progression gates and reward affordances so game progression reads as physical and meaningful while staying within the `Rhythm` brand.

Hard Rules (must follow)
- Soft Gate (every 5 levels): visually a glowing checkpoint. Should look approachable and lightly animated.
- Hard Gate (every 10 levels): visually a locked vault requiring 25 stars. Must feel heavier, tactile, and clearly blocking.
- Locked levels: must appear greyscale and slightly transparent (e.g., 60% opacity) to signal inaccessibility.
- Current level: must pulse subtly and stand out from both locked and unlocked nodes.

Visual specifics
- Soft Gate design:
  - Shape: rounded rectangle or arch with a small glowing ring.
  - Effects: `backdrop-blur-md`, `bg-manulife-accent/12`, `ring-2 ring-manulife-accent/30`, `shadow-glow`.
  - Motion: calm pulse (scale 1 → 1.03 → 1) over 500–700ms or a short soft glow fade.
- Hard Gate design:
  - Shape: vault-like circular door or lockbox with reinforced rim.
  - Effects: `bg-surface-elevated` with metallic sheen (`rhythm-sheen` gradient), stronger `shadow-elevated` and a subtle inner rim glow if unlocked.
  - Locked state: overlay a semi-opaque greyscale layer and show a lock icon + `25` stars required badge. Use `filter: grayscale(1) opacity(.6)` on the locked level content.
- Current level:
  - Must have a calm pulse and slightly larger scale: `animate rhythm-pulse` (600ms) plus `scale-105` during the pulse peak.
  - Add `aria-current="true"` and an accessible label announcing "Current level".

UX behavior & thresholds
- Soft Gate: unlocks based on completion or small tasks — visual cue only, no hard star threshold.
- Hard Gate: explicit star requirement. When a user does not meet required stars, show the vault locked (no pointer events) and an affordance to "Earn 25 stars".

Accessibility
- Always provide text alternatives for gates and locked requirements. For example: `aria-label="Hard gate locked — 25 stars required"`.
- Respect `prefers-reduced-motion`: replace pulsing with a static highlight ring and skip non-essential glow animations.

Implementation notes
- Implement gates as composable components:
  - `<SoftGate position=... status="locked|unlocked" />` renders the glowing checkpoint and handles small pulse animations.
  - `<HardGate position=... starsNeeded={25} starsHave={n} />` renders locked vault or open vault when threshold met.
- For locked visuals apply a utility class `locked-level` that sets `filter: grayscale(1) opacity(0.6); pointer-events: none;` and an overlay badge showing the requirement.
- Ensure z-index ordering: gates and badges above the connecting path but below primary HUD elements.

Micro-interactions
- On unlocking a Soft Gate: subtle ripple outward and a small point award animation (tweened number roll-up) aligned with `gamified-micro-interactions.md`.
- On meeting the Hard Gate requirement: brief celebration (200–400ms), soft glow from vault rim, and gently reveal the next node.

Philosophy reminder
- Gates should feel like gentle checkpoints in the user’s Rhythm — they should be inviting, not punitive. The visuals must be clear, tactile, and supportive of progression.