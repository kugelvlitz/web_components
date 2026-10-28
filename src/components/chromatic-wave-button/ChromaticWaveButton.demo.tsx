import { useState } from 'react'
import { ChromaticWaveButton } from './ChromaticWaveButton'
import type { GreenTransition, PillBloomSpeed } from '../pill-bloom-button/PillBloomButton'

export function ChromaticWaveButtonDemo() {
  const [reset, setReset] = useState(0)
  const [activated, setActivated] = useState(false)
  const [speed, setSpeed] = useState<PillBloomSpeed>('18s')
  const [strength, setStrength] = useState(12)
  const [waveSpeed, setWaveSpeed] = useState(480)
  const [decay, setDecay] = useState(3)
  const [greenTransition, setGreenTransition] = useState<GreenTransition>('sweep')

  return (
    <div className="overflow-hidden rounded-2xl bg-[#050505]">
      <ChromaticWaveButton key={reset} speed={speed} greenTransition={greenTransition} waveStrength={strength} waveSpeed={waveSpeed} waveDecay={decay} onClick={() => setActivated(true)} />
      <div className="flex flex-col items-center gap-4 border-t border-white/10 px-6 py-6 text-center">
        <div role="group" aria-label="Orbit speed" className="flex flex-wrap justify-center gap-2">
          {(['slow', '18s', 'medium', 'fast'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={speed === option}
              onClick={() => setSpeed(option)}
              className={`rounded-lg border px-3 py-2 text-xs capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${speed === option ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 text-neutral-500 hover:text-white'}`}
            >
              {option} {option !== '18s' && <span className="ml-1 font-mono text-[10px] opacity-60">{{ slow: '24s', medium: '12s', fast: '6s' }[option]}</span>}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Green transition" className="flex flex-wrap justify-center gap-2">
          {(['sweep', 'uniform'] as const).map((option) => (
            <button key={option} type="button" aria-pressed={greenTransition === option} onClick={() => {
              setGreenTransition(option)
              setReset((value) => value + 1)
              setActivated(false)
            }} className={`rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${greenTransition === option ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 text-neutral-500 hover:text-white'}`}>
              {option === 'sweep' ? 'Perimeter sweep' : 'All at once'}
            </button>
          ))}
        </div>
        <div className="grid w-full gap-6 border-y border-white/10 py-5 text-left sm:grid-cols-3">
          <label className="flex flex-col gap-3 text-xs text-neutral-400">
            <span>Strength <span className="float-right font-mono text-neutral-600">{strength} px</span></span>
            <input aria-label="Wave strength" className="w-full accent-white" type="range" min="4" max="20" value={strength} onChange={(event) => setStrength(Number(event.target.value))} />
          </label>
          <label className="flex flex-col gap-3 text-xs text-neutral-400">
            <span>Wave speed <span className="float-right font-mono text-neutral-600">{waveSpeed} px/s</span></span>
            <input aria-label="Wave speed" className="w-full accent-white" type="range" min="200" max="800" step="20" value={waveSpeed} onChange={(event) => setWaveSpeed(Number(event.target.value))} />
          </label>
          <label className="flex flex-col gap-3 text-xs text-neutral-400">
            <span>Decay <span className="float-right font-mono text-neutral-600">{decay} s</span></span>
            <input aria-label="Wave decay" className="w-full accent-white" type="range" min="1" max="5" step="0.5" value={decay} onChange={(event) => setDecay(Number(event.target.value))} />
          </label>
        </div>
        <p role="status" className="max-w-sm text-xs leading-6 text-neutral-500">
          {activated ? 'Red at the crest, yellow ahead, blue trailing. Click again to layer waves.' : 'Click to send bands of color outward from the outline.'}
        </p>
        <button
          type="button"
          disabled={!activated}
          onClick={() => {
            setReset((value) => value + 1)
            setActivated(false)
          }}
          className="rounded px-2 py-1 font-mono text-[10px] tracking-wider text-neutral-400 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:invisible"
        >
          Reset scene ↺
        </button>
      </div>
    </div>
  )
}
