# Pill Bloom Button — component spec prompt

Build a reusable `PillBloomButton` in React and TypeScript with a transparent pill shape, chromatic edge separation, a prominent colored bloom, and a green takeover that follows the actual outline.

## Appearance

- Default to 272 px wide, a minimum height of 86 px, a maximum width of 100% of the available space, and fully rounded ends.
- Use 24 px vertical and 36 px horizontal padding, white medium-weight 18 px text, and a transparent interior.
- Default to a 2 px outline with a neutral white base at 55% opacity. Mix 42% red/yellow with white for stronger warm accents and 22% color for the remaining sharp edge, rendering that layer at 65% opacity.
- Create tight chromatic fringes with offset copies of the outline: red `#ff1900` at +3.5 px, yellow `#ffeb00` at +1.8 px, lime `#79ff00` at 0, cyan `#00dfff` at -1.5 px, and blue `#344bff` at -3 px. Use 1.6 px strokes at 75% opacity for the cooler channels; strengthen the red/yellow strokes to `outlineWidth * 0.3 + 1.6` px at full channel opacity. Use screen blending and rotate their separation direction with the orbit.
- Use red, yellow, lime, cyan, blue, and violet `#bd29ff` for the underlying spectral gradient. Red holds at 0–56 and 348–360 degrees, yellow at 68–124, lime at 136–172, cyan at 184–220, blue at 232–280, and violet at 292–336. Blend across the short intervals between them.
- Add a 6 px glow stroke blurred by 10 px at full opacity and a 12 px aura stroke blurred by 24 px at 85% opacity. Preserve the transparent center.

## Motion and activation

- Orbit the gradient and fringe separation continuously with linear timing. Support `speed="slow" | "18s" | "medium" | "fast"`, defaulting to slow: 24 seconds per turn for slow (the original speed), 18 seconds for `18s`, 12 seconds for medium, and 6 seconds for fast. Keep the gradient and all fringe channels synchronized.
- On click, start a feathered green trail at the top center, 12 o'clock. Travel clockwise along the pill's actual perimeter at constant path speed, completing one lap in 2.2 seconds.
- Use a measured SVG outline and a normalized path length. Reveal the green path and remove the chromatic path with complementary masks; soften the leading edge with a 7 px Gaussian blur.
- Apply the bloom after the takeover masks so its transition stays soft around the outline.
- Accept `greenTransition="sweep" | "uniform"`, defaulting to `sweep`. Sweep uses the existing 2.2-second perimeter takeover. Uniform crossfades the entire chromatic outline, fringes, and bloom into green together over 900 ms with ease-in-out timing, using complementary group opacity without directional palette masks.
- Leave the completed outline and bloom green. Use bright green `#00ff4c` and deeper green `#008526` in a seamless loop. Align the strongest green bloom and the palest edge at the same rotating peak.
- Keep the selected orbit speed running after the takeover completes. Replay the selected transition on subsequent activations. Transition durations stay independent of orbit speed.

## API, responsiveness, and accessibility

- Accept native button attributes and children, `className`, `style`, `outlineWidth?: number` defaulting to `2`, and `greenFringes?: boolean` defaulting to `false`. Default `type` to `button`.
- Derive the CSS border, SVG edge stroke, path radius, and path inset from `outlineWidth`.
- Observe the button's layout size so the path follows its actual dimensions on narrow screens and when content changes. Give each instance unique SVG mask/filter IDs.
- With `greenFringes` enabled, reveal five matching offset fringe channels in lime `#c5ff3d`, neon green `#00ff54`, mint `#baffd4`, green-teal `#00efa6`, and emerald `#00ba87` during the green takeover.
- Call the consumer's `onClick` before changing internal state and respect prevented defaults.
- Preserve native keyboard activation and disabled semantics. Use a white 2 px focus outline offset by 8 px; use 35% opacity when disabled and pause decorative motion.
- Respect reduced motion by changing the palette without animation. Hide decorations in forced-color mode and retain a system-color button outline and label. Hide decorative SVG content from assistive technology.

## Demo and acceptance

- Use a black dotted backdrop outside the component, with a separate state message and reset control.
- Reset restores the chromatic state. The reusable button owns its activation state; the demo owns its reset control.
- Keep the backdrop static in this standalone demo. Clicking changes only the pill button; dedicated wave demos own and clip their wave fields separately.
- Add accessible Slow, 18s, Medium, and Fast speed controls in the demo, displaying each duration and selection with `aria-pressed`. Switching speed preserves the green/chromatic state; resetting preserves the selected speed.
- Add keyboard-accessible Perimeter sweep / All at once controls with `aria-pressed`. Choosing a transition restores the chromatic preview for the next activation, while preserving speed. Reduced motion makes both transitions immediate.
- Verify that the green moves evenly across straight edges and rounded ends, the completed green state visibly keeps orbiting, and the geometry fits at 390 px and 320 px viewport widths.
- Deliver the component, scoped CSS, demo, and this spec. It may share base styles with BloomButton; document that dependency when reusing it.
