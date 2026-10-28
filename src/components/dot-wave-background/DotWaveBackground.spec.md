# Dot Wave Background — component spec prompt

Build a reusable `DotWaveBackground` with React, TypeScript, and Canvas 2D. It renders a quiet white dot grid that responds to explicit triggers with overlapping, outward-moving waves. Keep it independent of any particular button or gallery.

## Appearance

- Fill a positioned parent with a transparent, absolutely positioned canvas. The caller supplies the black backdrop.
- Default to 24 px grid spacing, centered in the available area, with white dots of 0.8 px radius at 13% opacity.
- As a wave passes, displace dots radially, brighten them up to 90% opacity, and enlarge them up to a 2.5 px radius. Leave the grid quiet elsewhere.
- Let dots settle back into the exact original grid after each wave passes. Keep the presentation flat and two-dimensional.
- Support `colorMode="white" | "chromatic"`, defaulting to white. Chromatic mode tints active dots with red `#ff1900`, yellow `#ffeb00`, lime `#79ff00`, cyan `#00dfff`, blue `#344bff`, and violet `#bd29ff`. Distribute colors by angle around the wave and position within its band, holding each color with short blends. Weight overlapping wave colors by local wave intensity. Idle and settled dots remain white in both modes.
- In chromatic mode, optionally accept `colorSource`, a callback read once per active frame returning `{ angle, sample }`. `angle` is the separation direction in degrees; `sample(direction)` accepts radians clockwise from 12 o'clock and returns RGB fringe colors. With this source, draw small offset color copies of each active dot around a faint white core, aligned with the source's separation direction. Use the strongest local wave's direction when waves overlap. This lets a composed scene mirror a live outline without adding its own hue cycle. White mode ignores the callback, and idle dots remain unchanged.
- A source can additionally provide `core(direction)`, returning the dominant RGB color at the emitting outline point. Draw this as the dot's colored core, fading toward white as local wave intensity falls. For capsule emission, project to the nearest point on the perimeter before sampling its direction. This preserves the source's actual spatial color regions instead of giving every dot the same blended channel stack.

## Motion and API

- Expose a React ref handle with `ripple(clientX, clientY)` and `clear()` methods. Trigger coordinates are viewport coordinates; convert them using the canvas's current bounding rectangle.
- Accept optional emission settings as the third `ripple` argument: `outline: { width, height }` emits from a capsule perimeter centered at the trigger location, and `colors: { angle, sample }` assigns that wave a captured fringe source. Capsule waves use distance and outward normals from the nearest point on the center segment minus the cap radius, leave interior dots still, and start all around the outline. Point-origin waves remain the default. Per-wave colors take priority over the optional live `colorSource` callback; callers can capture colors in a closure so later source changes do not alter existing waves.
- Alternatively pass `colorBands: { crest, ahead, trailing }` with RGB tuples. In chromatic mode this colors each dot by signed distance from the moving front, taking priority over directional sampling for that wave. Hold the crest color within 0.18 Gaussian-envelope widths and blend toward the ahead/trailing colors out to 0.6 widths. Mix overlapping band colors by local wave intensity, and fade to white beyond the wave. The combined Chromatic waves demo uses red `#ff1900` at the crest, yellow `#ffeb00` ahead, and blue `#344bff` behind.
- Accept `spacing` (default 24 px), `strength` (default 12 px displacement), `speed` (default 480 px/second), `decay` (default 3 seconds for exponential amplitude decay), `className`, and `style`.
- Each trigger creates an expanding circular wave packet with a sinusoidal displacement and a Gaussian envelope, with a brief 100 ms fade-in.
- Sum overlapping wave contributions. Keep up to eight recent waves, bound displacement, and remove each wave once its trailing envelope has passed the farthest canvas corner.
- Use an imperative Canvas rendering loop so animation does not cause React renders on every frame. Draw once when idle and stop requesting frames after all waves expire.
- Accept optional `onFrame(frame)` to share the rendered field with effects such as WaveDistortion. Publish CSS-pixel width/height, spacing, strength, and active waves with x/y, radius, fade, optional outline dimensions, and optional per-wave `colorBands`. Publish an empty wave list on the final idle draw so consumers can remove their effects. Share capsule geometry and the traveling-band color sampler (`waveGeometry.ts` and `waveColors.ts`) with companion effects so they match the dots, and read the latest callback without restarting the wave field.
- Resize with the parent and adapt to device pixel ratio, capped at 2. Keep trigger coordinates in CSS pixels.
- Pause frame requests while the document is hidden and discard expired waves when rendering resumes. Clean up observers, media listeners, visibility listeners, resize listeners, and animation frames on unmount.

## Accessibility and layering

- The canvas is decorative: set `aria-hidden="true"`, do not give it focus, and use `pointer-events: none`.
- Preserve the functionality, focus behavior, and accessible names of controls above it.
- With reduced motion enabled, show the static grid and ignore wave triggers. Clear active waves if reduced motion is enabled during animation.
- Hide the decorative canvas under forced colors.

## Demo and integration

- Provide a self-contained demo on a black stage with a “Send a wave” native button. Trigger from the button's center for pointer and keyboard activation.
- Keep the original Dot waves demo white. Demonstrate chromatic mode separately by composing the background with a centered White Bloom button in the Chromatic waves demo.
- Add labeled range controls for strength (4–20 px), speed (200–800 px/second), and decay (1–5 seconds). Changes affect this demo's wave field.
- Keep all controls, the backdrop color, and explanatory text outside the reusable background component.
- Mount canvases only inside explicit Dot waves, Chromatic waves, and Wave distortion demo stages. Clip effects within their preview boundaries. The playground-wide dotted backdrop remains a static CSS background.
- Each wave demo wires its own trigger directly to its own ref. Ordinary component buttons, gallery navigation, speed selectors, and sliders do not trigger any background waves. Switching away from a wave demo unmounts its field and cancels pending frames.

## Acceptance criteria

- Confirm an initially static grid, visible displacement/brightness/size changes, overlapping waves, and a return to the idle grid.
- Verify correct trigger origins after scrolling and resizing, crisp high-DPI rendering, and no pointer interception.
- Confirm keyboard activation, reduced-motion suppression, responsive demo controls, and clean teardown.
- Deliver `DotWaveBackground.tsx`, its CSS, its demo, and this spec. No new runtime dependencies or Three.js are required.
