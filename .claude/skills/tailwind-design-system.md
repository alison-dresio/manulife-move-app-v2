# Tailwind Design System — Rules for UI Code Generation

Purpose
- Enforce consistent, semantic use of Tailwind tokens mapped to the Figma Brand Book.
- Preserve the `Rhythm` brand philosophy: calm, minimal, generous whitespace, and unobtrusive motion.

Hard Rules (must follow)
- Never use raw hex codes or arbitrary CSS values inside class names or style attributes. Examples forbidden:
  - `bg-[#123456]`, `text-[#fff]`, `border-#123` — these are disallowed.
- Always use semantic Tailwind utility tokens that map to the Figma Brand Book. Examples allowed:
  - `text-manulife-primary`
  - `text-manulife-muted`
  - `bg-surface-calm`
  - `bg-surface-elevated`
  - `border-divider-soft`
  - `shadow-elevated`
- If a required token does not exist in the project Tailwind config, reference the Figma token name and open an issue; do not invent hex or ad-hoc classes.

Spacing and Rhythm
- Use the project's spacing scale; prefer rhythm-preserving tokens such as `p-4`, `px-6`, `py-8`, `gap-6` instead of custom pixel values.
- Favor larger, generous whitespace for primary layouts: margin and padding should be calm and breathable.
- Avoid dense layouts: components should have at least one step of spacing between elements on the scale (e.g., `gap-4` -> `gap-6` for increased breathing room when needed).

Typography
- Use semantic text tokens for font sizes and weights: `text-lg`, `text-sm`, `font-semibold`, combined with brand tokens like `text-manulife-primary`.
- Headings should use consistent scale steps (e.g., `text-2xl`, `text-xl`, `text-lg`) and never inline numeric rem values.

Color & Contrast
- Always choose semantic tokens that guarantee accessible contrast according to the Brand Book mappings.
- When overlaying text on backgrounds (e.g., buttons on images or gradients), use a surface token or apply accessible glass layer tokens: `bg-surface-overlay` + `text-manulife-primary`.

Shadows & Elevation
- Use semantic shadow/elevation utilities: `shadow-elevated`, `shadow-subtle` — avoid custom `box-shadow` strings.

Motion
- Use calm, subtle motion only. Prefer Tailwind transitions (`transition`, `duration-150`, `ease-out`) or the project's motion utilities.
- Ensure `prefers-reduced-motion` is respected: provide reduced-motion fallbacks for all animations.

Examples (correct)
- `<div class="bg-surface-calm p-6 rounded-lg shadow-elevated">`
- `<button class="bg-manulife-primary text-white px-6 py-3 rounded-md transition duration-150 ease-out active:scale-95">`

Examples (incorrect)
- `<div class="bg-[#0f172a] p-[10px]">` — forbidden
- `<span style="color: #0a84ff">` — forbidden

Enforcement
- All component generation must pass an automated lint/check step that flags raw hex and arbitrary bracketed values in classes.
- When in doubt, prefer the semantic token and file an issue to add a token mapping rather than using raw values.

Philosophy reminder
- Keep interfaces calm, minimal, generous in spacing, and avoid visual shouting. Follow `Rhythm` in every layout decision.