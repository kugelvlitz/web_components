import { ButtonDemo } from '../components/button/Button.demo'
import { CardDemo } from '../components/card/Card.demo'
import { BloomButtonDemo } from '../components/bloom-button/BloomButton.demo'
import { PillBloomButtonDemo } from '../components/pill-bloom-button/PillBloomButton.demo'
import { WhiteBloomButtonDemo } from '../components/white-bloom-button/WhiteBloomButton.demo'
import { DotWaveBackgroundDemo } from '../components/dot-wave-background/DotWaveBackground.demo'
import { ChromaticWaveButtonDemo } from '../components/chromatic-wave-button/ChromaticWaveButton.demo'

// Register new demos here to add them to the gallery.
export const demos = [
  {
    id: 'white-bloom-button',
    name: 'White bloom',
    description: 'A 4 px chromatic outline with a quiet, static white bloom. Click to send green around the edge.',
    source: 'src/components/white-bloom-button/WhiteBloomButton.tsx',
    component: WhiteBloomButtonDemo,
    immersive: true,
  },
  {
    id: 'chromatic-wave-button',
    name: 'Chromatic waves',
    description: 'A red wave crest travels outward from White Bloom, with yellow ahead and blue trailing through the dots.',
    source: 'src/components/chromatic-wave-button/ChromaticWaveButton.tsx',
    component: ChromaticWaveButtonDemo,
    immersive: true,
  },
  {
    id: 'pill-bloom-button',
    name: 'Pill bloom',
    description: 'A soft, continuous spectrum around a pill-shaped outline. Click to send a smooth green trail clockwise along its edge.',
    source: 'src/components/pill-bloom-button/PillBloomButton.tsx',
    component: PillBloomButtonDemo,
    immersive: true,
  },
  {
    id: 'bloom-button',
    name: 'Bloom button',
    description: 'An outlined button with an orbiting chromatic bloom. Click to send a green glow around its edge.',
    source: 'src/components/bloom-button/BloomButton.tsx',
    component: BloomButtonDemo,
    immersive: true,
  },
  {
    id: 'dot-wave-background',
    name: 'Dot waves',
    description: 'White dots move, brighten, and settle as waves travel through the grid. Try overlapping ripples and tune their motion.',
    source: 'src/components/dot-wave-background/DotWaveBackground.tsx',
    component: DotWaveBackgroundDemo,
    immersive: true,
  },
  {
    id: 'button',
    name: 'Button',
    description: 'A small starting point for actions. Explore variants, sizes, and interaction states.',
    source: 'src/components/button/Button.tsx',
    component: ButtonDemo,
    immersive: false,
  },
  {
    id: 'card',
    name: 'Card',
    description: 'A flexible container for content, with room for a description and custom actions.',
    source: 'src/components/card/Card.tsx',
    component: CardDemo,
    immersive: false,
  },
]
