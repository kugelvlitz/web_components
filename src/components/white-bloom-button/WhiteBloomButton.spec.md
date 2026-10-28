# White Bloom Button — component spec prompt

Build a reusable `WhiteBloomButton` using React and TypeScript. It is a transparent pill button with a pronounced chromatic outline, a stationary white bloom, and a vivid green-accented version of the same split-color outline after clicking.

## Shape and outline

- Use a 272 px default width, a minimum height of 86 px, a maximum width of 100%, and fully rounded ends.
- Keep the interior transparent, use white medium-weight 18 px text, and apply 24 px vertical and 36 px horizontal padding.
- Make the outline 4 px thick. Use that same value for the CSS border, SVG edge, and path geometry so the layers line up.
- Start with a neutral white base at 55% opacity and a pale spectral edge above it.
- Create clearly visible chromatic aberration with five offset outline copies: red `#ff1900`, yellow `#ffeb00`, lime `#79ff00`, cyan `#00dfff`, and blue `#344bff`.
- Use 2.8 px strokes for the original red/yellow fringe channels and 2.2 px strokes for the others, at full channel opacity. Place them at +5.6, +2.88, 0, -2.4, and -4.8 px along a rotating separation direction. Let them visibly protrude beyond the 4 px core outline. Keep all green fringe strokes at 2.2 px.
- Make the red and yellow more visible in the pale core with 42% color mixed with white, compared with 22% for the remaining spectral colors, and give them wider holds in the rotating gradient.
- Keep the fringe styling crisp and the underlying spectral core softer. Use screen blending for the separated colors.

## White bloom

- Surround the outline with white light that remains stationary and white in every state.
- Use a close halo with a 6 px white ring, 7 px blur, and 60% opacity. Add a wider halo with a 10 px white ring, 18 px blur, and 30% opacity.
- Center these halos around the outline; they should be clearly visible against black while preserving a transparent interior and readable label.
- Disable the colored glow and aura layers. Keep color separation on the outline itself.

## Green-accented state and motion

- Support `speed="slow" | "18s" | "medium" | "fast"`, defaulting to slow. Continuously orbit the edge colors and fringe separation clockwise with linear timing: 24 seconds per turn for slow (the original speed), 18 seconds for `18s`, 12 seconds for medium, and 6 seconds for fast. Keep their speeds synchronized.
- Clicking starts a green trail at 12 o'clock. It follows the actual pill perimeter clockwise at constant path speed over 2.2 seconds, with a feathered leading edge.
- Reveal green and remove the chromatic colors with complementary SVG path masks. Apply no radial wipe through the surrounding halo.
- Also support `greenTransition="uniform"`: crossfade the entire chromatic outline and fringes to green simultaneously over 900 ms with ease-in-out timing. Use `greenTransition="sweep"` for the default 2.2-second perimeter trail. The white halo remains stationary and white in both modes.
- Make the green state visibly saturated: use `#00ff4c` and `#008d35` at full color strength for the core edge.
- Preserve the chromatic aberration structure in the green state. Replace the five rainbow fringe colors with lime `#c5ff3d`, neon green `#00ff54`, mint `#baffd4`, green-teal `#00efa6`, and emerald `#00ba87`, keeping their stroke widths and separation distances.
- Continue orbiting the green edge and its fringes after the takeover completes. The white bloom remains stationary.
- Preserve the selected orbit speed in the green state. Keep each transition's duration independent of the orbit speed, with the white bloom stationary across all variants.
- Subsequent clicks replay the trail. The demo's separate reset control restores the original chromatic state.

## API, accessibility, and dependencies

- Render a native button, default `type` to `button`, and accept native button attributes, children, event handlers, `className`, and `style`.
- Keep the component's outline width fixed at 4 px and its green fringes enabled.
- Call the consumer's click handler before changing internal state and respect prevented defaults.
- Preserve Enter/Space activation and disabled semantics. Use a white 2 px keyboard focus outline offset by 8 px. Disabled buttons use 35% opacity and pause decorative motion.
- Under reduced motion, stop continuous movement and change to the green state without animating the takeover. Under forced colors, hide decorative fringes and halos and keep a system-color outline and text.
- Keep decorative SVG and pseudo-elements out of the accessibility tree and unable to intercept pointer input.
- Adapt the outline geometry to the button's measured size and use unique SVG IDs per instance.
- In this repo, compose `PillBloomButton` with `outlineWidth={4}` and `greenFringes`; use a dedicated stylesheet for the white halos and stronger fringe styling. Shared base styles come from BloomButton.

## Demo and acceptance

- Show the component on a black dotted backdrop owned by the playground, not by the button. Include example text, an external state message, and an external reset control.
- Mark the main demo button with `data-wave-trigger`. The gallery triggers its independent dot-wave background from the button's center on pointer or keyboard activation. Speed/reset controls do not trigger waves, and the reusable button has no background dependency.
- Add accessible Slow, 18s, Medium, and Fast demo controls, displaying seconds per turn and selection with `aria-pressed`. Changing speed preserves activation state; reset preserves speed.
- Add an accessible Perimeter sweep / All at once mode control. Changing the mode restores the chromatic preview while preserving speed. Both modes complete immediately under reduced motion.
- Confirm the initial rainbow fringes extend beyond the core, the white bloom is visible, and the completed state is unmistakably green with distinct fringe accents.
- Verify a smooth perimeter takeover, repeated clicks, continued green orbit, keyboard behavior, reduced motion, and narrow layouts at 390 px and 320 px viewport widths.
- Deliver the component, its stylesheet, demo, and this spec. Document shared component/style dependencies for copying it to another React project.
