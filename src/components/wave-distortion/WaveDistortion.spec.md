# Wave Distortion — component spec prompt

Build a reusable `WaveDistortion` wrapper with React, TypeScript, and local SVG filters. A passing wave should bend and color the pixels of real HTML text, SVG lines, and other content inside the wrapper, then restore their original appearance. Add a separate **Wave distortion** playground demo.

## Rendering and API

- Render children once as ordinary DOM content in a wrapper that fills its positioned parent. Keep text semantics and selection intact.
- Accept `children`, `enabled` (distortion, default true), `colorEnabled` (coloring, default true), `resolution` (default 144, bounded to 32–256), `className`, `style`, and a React ref. Distortion and coloring work independently, including color without deformation and deformation without color.
- Expose `update(frame: DotWaveFrame)` and `clear()` through the ref. Frames contain CSS-pixel dimensions, dot spacing, strength, and active waves with their origins, radii, fades, optional capsule outlines, and optional traveling color bands.
- Generate a low-resolution displacement map whose longest edge is the requested resolution. Match the source field's aspect ratio.
- For each map pixel, sum the same sinusoidal, Gaussian-enveloped displacement vectors used by DotWaveBackground, including capsule distance and outward normals. Reuse shared geometry code.
- Encode horizontal and vertical displacement in the map's red and green channels. Use an SVG `feImage` and `feDisplacementMap` to apply the map locally to the children's source graphic. Correct the neutral byte value to exactly zero displacement and use sRGB filter interpolation.
- The effect must bend individual glyphs and line segments, not just translate an entire text block.
- Generate a matching color map from signed distance to the moving front. Reuse DotWaveBackground's `waveBandColor` helper and the band's crest/ahead/trailing RGB tuples from each frame. Fall back to red `#ff1900` at the crest, yellow `#ffeb00` ahead, and blue `#344bff` trailing. Hold the crest within 0.18 envelope widths, transitioning to ahead/trailing hues at 0.6 widths. Weight overlapping colors by the same Gaussian envelope and fade; opacity is capped at twice the summed envelope.
- Composite the color map atop the displaced source graphic. Color individual glyph strokes, rules, and other visible shapes without painting a colored rectangle over transparent areas. Preserve source alpha, including faint lines and antialiased edges. Keep coloring synchronized with the dots and allow it even when distortion strength is zero.
- Update imperatively from DotWaveBackground's `onFrame` callback so dots and content follow the same wave timing without React renders or a second animation loop.
- When both effects are disabled, reduced motion is requested, or no waves remain, remove the filter entirely, reset its scale, and release both active image references. Restore sharp text and original colors. Disabling only distortion sets displacement to zero; disabling only coloring removes its filter stages while retaining deformation.
- Use unique SVG filter IDs per instance. Hide definitions from assistive technology and pointer input. Disable the filter in forced colors and clean up preference listeners on unmount.

## Demo scene

- Use a black, rounded, overflow-clipped stage, 560 px tall, inside the gallery preview. The rest of the playground keeps a static dotted backdrop.
- Put a local DotWaveBackground behind the text. Use 24 px dots with red `#ff1900` at the wave crest, yellow `#ffeb00` ahead, and blue `#344bff` trailing.
- Put a large two-line heading, smaller descriptive text near the bottom, and horizontal/vertical ruled lines inside WaveDistortion. These are real HTML and SVG elements.
- Center a White Bloom button outside the filtered layer so the trigger remains stable and easy to activate. Use its 18-second orbit.
- Clicking the button emits a capsule wave from its outline and supplies the wave frames to the distortion wrapper. Repeated clicks layer waves.
- Include checked-by-default “Distort text and lines” and “Color text and lines” checkboxes. The first restores straight geometry; the second restores original colors. Both leave moving dots active, work independently, and preserve wave timing when changed mid-wave.
- Include wave strength (4–24 px, default 18), speed (200–800 px/second, default 360), and decay (1–5 seconds, default 3) controls.
- Include Reset scene to clear the wave, remove distortion, and restore the button's chromatic state while preserving controls.
- Keep all controls outside the filtered content, with native keyboard behavior, labels, and visible focus states.

## Scope and acceptance

- Only explicit wave demos may emit waves. Bloom Button, Pill Bloom, and White Bloom previews have no animated wave field or global trigger.
- Clip canvas pixels and filtered content to the demo stage. Gallery navigation, headings, and other previews must remain undistorted.
- Verify actual changed text/line pixels and yellow → red → blue coloring during a wave, all four checkbox combinations, original appearance after settling, overlapping waves, keyboard activation, reset, reduced motion, mobile/high-DPI rendering, and clean teardown after switching demos.
- Deliver the wrapper, scoped CSS, demo, and this spec. Reuse DotWaveBackground's shared frame types, `waveGeometry.ts`, and `waveColors.ts`; no additional runtime dependencies are required.
