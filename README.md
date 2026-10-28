# Component Playground

A local playground for reusable React components, built with TypeScript, Vite, and Tailwind CSS. Includes White Bloom, Chromatic Waves, Pill Bloom, Bloom Button, Dot Waves, Button, and Card examples.

## Component spec prompts

Each reusable component has a self-contained prompt describing its current appearance, behavior, motion, API, accessibility, and demo. Copy the prompt to recreate or adapt the component in another project.

| Component | Spec prompt |
| --- | --- |
| White Bloom Button | [WhiteBloomButton.spec.md](src/components/white-bloom-button/WhiteBloomButton.spec.md) |
| Pill Bloom Button | [PillBloomButton.spec.md](src/components/pill-bloom-button/PillBloomButton.spec.md) |
| Bloom Button | [BloomButton.spec.md](src/components/bloom-button/BloomButton.spec.md) |
| Button | [Button.spec.md](src/components/button/Button.spec.md) |
| Card | [Card.spec.md](src/components/card/Card.spec.md) |
| Dot Wave Background | [DotWaveBackground.spec.md](src/components/dot-wave-background/DotWaveBackground.spec.md) |
| Chromatic Wave Button | [ChromaticWaveButton.spec.md](src/components/chromatic-wave-button/ChromaticWaveButton.spec.md) |

New components use the [spec prompt template](docs/component-spec-template.md). [AGENTS.md](AGENTS.md) records the requirement to create and maintain these prompts alongside future component work.

## Animation speeds

All three animated buttons accept `speed="slow" | "medium" | "fast"`. Pill Bloom and White Bloom also accept `speed="18s"`. Slow is the default and preserves the existing speed. Each demo has speed controls so you can try the variants before and after clicking.

| Component | Slow | 18s | Medium | Fast |
| --- | --- | --- | --- | --- |
| Bloom Button | 7 s | — | 3.5 s | 1.75 s |
| Pill Bloom / White Bloom | 24 s | 18 s | 12 s | 6 s |

Times are per full orbit. Click-transition timing stays the same, and White Bloom's white halo stays stationary.

```tsx
<WhiteBloomButton speed="18s">Give it a spin</WhiteBloomButton>
```

## Green transition modes

Pill Bloom, White Bloom, and Chromatic Waves accept `greenTransition="sweep" | "uniform"`. Their demos include a **Perimeter sweep / All at once** toggle.

- **Perimeter sweep** (default): the green trail follows the outline over 2.2 seconds.
- **All at once**: the full outline and its fringes crossfade to green together over 900 ms.

Choosing a mode restores the chromatic preview while preserving the other settings. Both respect reduced motion, and the white halo stays white.

```tsx
<ChromaticWaveButton speed="18s" greenTransition="uniform" />
```

## Dot wave background

`DotWaveBackground` is an independent Canvas 2D dot grid. Main demo button clicks send waves through the playground's dots: they shift, brighten, grow, and settle back. Multiple clicks layer waves. Orbit-speed controls, reset controls, and navigation do not trigger the effect.

The **Dot waves** gallery entry has a separate wave field with strength, wave-speed, and decay controls. The reusable component defaults to 24 px spacing, 12 px strength, 480 px/second speed, and 3-second decay. It renders only while waves are active or the layout changes and shows a static grid under reduced motion.

```tsx
import { useRef } from 'react'
import { DotWaveBackground, type DotWaveBackgroundHandle } from './components/dot-wave-background/DotWaveBackground'

function WaveStage() {
  const background = useRef<DotWaveBackgroundHandle>(null)

  return (
    <div className="relative min-h-96 bg-black">
      <DotWaveBackground ref={background} strength={12} speed={480} decay={3} />
      <button className="relative text-white" onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        background.current?.ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
      }}>
        Send a wave
      </button>
    </div>
  )
}
```

The canvas fills its positioned parent and ignores pointer input. The ref accepts viewport coordinates and also exposes `clear()`. Set `colorMode="chromatic"` to tint active dots with spectral colors; the default `white` mode preserves the original appearance. Optionally provide `colorSource={() => ({ angle, sample })}` in chromatic mode to draw split-color dots using another component's live outline colors and separation angle. Both modes settle back into a white grid. Copy its component and CSS to reuse it; no animation library is needed.

## Chromatic waves

The separate **Chromatic waves** gallery entry combines a centered White Bloom button and its own dot field. Clicking sends a pill-shaped wave outward from the entire outline, with the dots inside the button left still. Color travels with the wave: red `#ff1900` at the moving crest, yellow `#ffeb00` ahead, and blue `#344bff` trailing behind. Each dot changes yellow → red → blue as the wave passes, then settles back to white. Repeated clicks layer waves, independently of the button's green transition.

```tsx
import { ChromaticWaveButton } from './components/chromatic-wave-button/ChromaticWaveButton'

<ChromaticWaveButton speed="18s" waveStrength={12} waveSpeed={480} waveDecay={3} />
```

`className` styles the stage; `buttonClassName` styles the button. Native button props and children are supported. The demo includes orbit-speed and green-transition controls plus sliders for wave strength, wave speed, and decay. Controls and Reset scene sit outside the field and do not emit waves; reset preserves their settings. This scene does not trigger the playground's ambient white waves. For other compositions, `ripple(x, y, { outline: { width, height }, colorBands: { crest, ahead, trailing } })` supports perimeter emission with traveling RGB color bands. The existing directional `colors` sampler remains available for other effects. Reuse this scene together with the Dot Wave Background, White Bloom, Pill Bloom, and Bloom Button component/style dependencies.

## White bloom button

`src/components/white-bloom-button/WhiteBloomButton.tsx` is a separate version with a 4 px outline, pronounced chromatic fringes, and a soft static white bloom. Clicking sends a saturated green trail around the outline, replacing the rainbow fringe channels with lime, neon green, mint, and emerald accents. The split-color outline keeps orbiting in its green palette, while the bloom stays white. The original Pill Bloom remains available separately.

```tsx
import { WhiteBloomButton } from './components/white-bloom-button/WhiteBloomButton'

<WhiteBloomButton>Give it a spin</WhiteBloomButton>
```

It composes `PillBloomButton`, setting `outlineWidth={4}` so the CSS border, SVG edge, and path geometry agree, and enables `greenFringes` for the clicked state. Copy the White Bloom, Pill Bloom, and Bloom Button folders when reusing it. The white bloom's intensity and green outline saturation are controlled in `WhiteBloomButton.css`.

## Pill bloom button

`src/components/pill-bloom-button/PillBloomButton.tsx` is a separate pill-shaped version of the bloom button, with a 272 × 86 px default shape and fully rounded ends. Closely offset red, yellow, lime, cyan, and blue edge copies create chromatic fringes above a prominent spectral bloom, with one orbit every 24 seconds. A soft, desaturated 2 px core outline and 18 px text remain readable.

Clicking starts a 2.2-second green trail that follows the actual outline clockwise from 12 o’clock at a constant speed. Its feathered leading edge smoothly replaces the chromatic colors, with the bloom applied after the transition so there are no radial cuts through the glow. Once green, the bloom’s strongest green and the outline’s palest highlight share the same rotating peak and seamless start/end point. Further clicks replay the trail; reset in the demo restores the chromatic colors. The outline path adapts to the button’s size.

```tsx
import { PillBloomButton } from './components/pill-bloom-button/PillBloomButton'

<PillBloomButton>Give it a spin</PillBloomButton>
```

It shares the base `BloomButton.css` styles and adds its own click animation. Copy both component folders when reusing it. It accepts native button props and supports keyboard activation, disabled states, and reduced motion (which changes the color without animation). Its styles and animations are scoped to the pill variant; the original Bloom Button remains available separately.

Set `outlineWidth` on `PillBloomButton` to change its outline thickness in one place (default: `2`). The border, SVG stroke, and path inset update together.

## Bloom button

`src/components/bloom-button/BloomButton.tsx` renders a transparent, white outlined button with a rotating cyan, blue, magenta, and red bloom. Clicking it turns the bloom green and adds an extra rotation. Further clicks replay the rotation. The demo has a reset control to restore the chromatic glow.

```tsx
import { BloomButton } from './components/bloom-button/BloomButton'

<BloomButton onClick={() => console.log('Clicked')}>Give it a spin</BloomButton>
```

The component imports its own animation CSS; copy `BloomButton.css` alongside it when reusing it. It accepts native button props, defaults to `type="button"`, supports keyboard focus and disabled states, and respects reduced motion. The black dotted backdrop is defined in the playground styles, independently of the button. The effect uses CSS conic gradients, masks, and animated custom properties in modern browsers.

## Getting started

Use Node 22.12 or newer (the project pins the Node 22 major with `.nvmrc`) and npm.

```bash
nvm use
npm install
npm run dev
```

Open the local URL printed by Vite. Edits update the browser automatically. If you do not use nvm, select a compatible Node version with your preferred version manager.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally after building |

## Adding a component

1. Create a folder under `src/components/`, such as `src/components/toggle/`.
2. Put the reusable component in `Toggle.tsx`. Keep gallery-specific state and example content in `Toggle.demo.tsx`.
3. Import the demo and add an entry to `src/playground/demos.ts`. It appears in the gallery automatically.
4. Show relevant variants and states in the demo, including keyboard focus and disabled states for controls.
5. Add `Toggle.spec.md` beside the component using the [spec prompt template](docs/component-spec-template.md), link it above, and update it whenever the component changes.

```text
src/
  components/
    chromatic-wave-button/
      ChromaticWaveButton.tsx
      ChromaticWaveButton.demo.tsx
      ChromaticWaveButton.spec.md
    dot-wave-background/
      DotWaveBackground.tsx
      DotWaveBackground.css
      DotWaveBackground.demo.tsx
      DotWaveBackground.spec.md
    white-bloom-button/
      WhiteBloomButton.tsx
      WhiteBloomButton.css
      WhiteBloomButton.demo.tsx
    pill-bloom-button/
      PillBloomButton.tsx
      PillBloomButton.css
      PillBloomButton.demo.tsx
    bloom-button/
      BloomButton.tsx
      BloomButton.css
      BloomButton.demo.tsx
    button/
      Button.tsx
      Button.demo.tsx
    card/
      Card.tsx
      Card.demo.tsx
  playground/
    demos.ts
    Playground.tsx
  styles/
    index.css
  main.tsx
```

Tailwind is integrated through `@tailwindcss/vite`. Shared styles and theme tokens live in `src/styles/index.css`; component styles normally use utility classes. Use complete class names in variant maps so Tailwind can detect them.

## Reusing components

Copy the component and any dependencies it imports into another React project. The destination needs Tailwind configured and any shared theme tokens the component uses. Demo files and the gallery are independent of the reusable components.

These are React components. They can be packaged as a library later if copying them between projects becomes inconvenient. There is no backend or deployment configuration.
