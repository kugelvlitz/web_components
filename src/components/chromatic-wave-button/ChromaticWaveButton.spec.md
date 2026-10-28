# Chromatic Wave Button — component spec prompt

Build a reusable React and TypeScript scene called `ChromaticWaveButton`, composing a White Bloom button at the exact center of a chromatic dot-wave field. Give it a separate playground demo named **Chromatic waves**.

## Appearance

- Create a black `#050505` stage with a 480 px minimum height, rounded 16 px corners, clipped overflow, 24 px horizontal padding, and centered content.
- Cover the stage with a transparent Canvas 2D grid of white dots: default 24 px spacing, 0.8 px radius, and 13% opacity when idle.
- Center a transparent, fully rounded White Bloom button, normally 272 × 86 px, with a 4 px outline and white medium-weight 18 px text.
- Preserve the button's separated red, yellow, lime, cyan, and blue outline fringes and static white halo. Its close white halo uses a 6 px ring, 7 px blur, and 60% opacity; its wider halo uses a 10 px ring, 18 px blur, and 30% opacity.
- Keep all controls outside the wave field so the button remains centered in the stage.

## Activation and color

- On pointer or keyboard activation, emit a wave simultaneously from the button's entire outer pill outline and start the button's existing green perimeter takeover. Measure distance from the capsule perimeter, not its center. Expand the pill-shaped front outward along the straight edges and rounded ends, and leave dots inside the button still.
- Wave dots shift radially, brighten, and grow. Use 12 px default strength, 480 px/second wave speed, and a 3-second exponential decay time.
- Color dots by their signed distance from the moving wave front: red `#ff1900` at the crest, yellow `#ffeb00` just ahead of the wave, and blue `#344bff` trailing behind. These bands follow the entire expanding pill-shaped front together.
- Keep a red center band within 0.18 envelope widths of the crest. Blend smoothly toward yellow on the leading side and blue on the trailing side, reaching those colors by 0.6 envelope widths. Fade all three back toward the idle white grid outside the packet.
- A fixed dot changes from yellow to red to blue as the wave passes it. Color depends on the dot's position relative to the current wave front, independent of screen direction or the button gradient's rotation.
- Keep wave colors independent of the button's green takeover, in both transition modes and on repeated clicks.
- Overlapping waves add motion and brightness and mix their current band colors weighted by local wave intensity.
- Dots outside the wave remain subdued white. Dots return to the original white grid after the wave passes. Support up to eight overlapping waves and stop requesting animation frames when idle.
- The button's green trail starts at 12 o'clock and follows the actual outline clockwise at a constant speed over 2.2 seconds, with a feathered leading edge. Preserve its vivid lime, neon green, mint, and emerald fringe accents after completion.
- Offer `greenTransition="sweep" | "uniform"`, defaulting to sweep. Uniform changes the entire outline and fringes to green together over a 900 ms ease-in-out crossfade. Both modes preserve the traveling red/yellow/blue wave bands and stationary white halo.
- Keep the button's white halo stationary. Its colored edge keeps orbiting after the green takeover. Every new click emits another independent chromatic outline wave.

## API and composition

- Compose `WhiteBloomButton` and `DotWaveBackground` with `colorMode="chromatic"`; keep each independently reusable. Pass the button's measured outline dimensions and `colorBands` containing crest, ahead, and trailing RGB colors as emission options to `ripple`.
- Accept native White Bloom button props, children (default “Give it a spin”), and the orbit `speed` values `slow` (24 s), `18s`, `medium` (12 s), and `fast` (6 s). The reusable scene inherits White Bloom's slow default.
- Accept `waveStrength`, `waveSpeed`, and `waveDecay`, with defaults of 12 px, 480 px/second, and 3 seconds.
- Apply `className` to the scene container and `buttonClassName` to the button. Native button styles and attributes apply to the button.
- Call the consumer's click handler first. Respect `preventDefault()` by skipping both the wave and the internal green takeover.
- Use the button's current bounding rectangle to pass its viewport center and outline dimensions to the wave field. The center locates the capsule; the actual emission boundary is its perimeter. Keep this correct after scrolling and resizing.
- Keep the canvas and wave pixels confined to the stage with clipped overflow. The page backdrop is static; clicks and controls must not emit waves outside this demo.

## Accessibility and responsiveness

- Preserve the native button's Enter/Space activation, visible white keyboard focus outline, and disabled semantics.
- Keep the decorative canvas hidden from assistive technology and unable to intercept pointer input.
- Under reduced motion, retain the static white grid, suppress waves and continuous rotation, and switch the button to green without an animated takeover.
- Hide decorative effects in forced colors and retain system-color button semantics.
- Resize the canvas with the stage, cap rendering pixel ratio at 2, and keep the button within narrow stages without horizontal overflow.
- Clean up animation frames, observers, and listeners when unmounted.

## Demo and acceptance criteria

- The separate demo initially selects the 18-second orbit and includes accessible orbit-speed controls, a live state message, and a Reset scene control below the stage.
- Include labeled wave controls below the stage: strength from 4–20 px (default 12), speed from 200–800 px/second in 20 px/second steps (default 480), and decay from 1–5 seconds in 0.5-second steps (default 3). Apply changes to the composed wave field.
- Orbit and wave controls preserve button activation and do not emit waves. Reset clears waves and restores the chromatic button while preserving all selected settings.
- Add accessible Perimeter sweep / All at once transition controls. Mode changes restore the chromatic preview and clear waves while preserving orbit speed and wave settings. Reset preserves the selected transition too.
- Verify visible emission around all sides of the pill immediately after clicking, an undisturbed interior, red around the moving crest, yellow ahead, blue behind, the yellow-to-red-to-blue sequence at a fixed dot, both green transition modes, working wave controls, overlapping waves, return to a white idle grid, keyboard input, reduced motion, mobile layout, and confinement to the demo stage.
- Deliver the scene component, its demo, this spec, and documentation for the shared component/style dependencies. No additional runtime libraries are required.
