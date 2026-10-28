import { BloomButtonDemo } from '../components/bloom-button/BloomButton.demo'
import { PillBloomButtonDemo } from '../components/pill-bloom-button/PillBloomButton.demo'
import { WhiteBloomButtonDemo } from '../components/white-bloom-button/WhiteBloomButton.demo'
import { DotWaveBackgroundDemo } from '../components/dot-wave-background/DotWaveBackground.demo'
import { ChromaticWaveButtonDemo } from '../components/chromatic-wave-button/ChromaticWaveButton.demo'
import { WaveDistortionDemo } from '../components/wave-distortion/WaveDistortion.demo'

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
    id: 'wave-distortion',
    name: 'Wave distortion',
    description: 'A passing wave bends and colors text and lines in sync with the dots. Toggle distortion and color independently.',
    source: 'src/components/wave-distortion/WaveDistortion.tsx',
    component: WaveDistortionDemo,
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
]
