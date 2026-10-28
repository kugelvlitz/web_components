import { useState } from 'react'
import { WhiteBloomButton } from './WhiteBloomButton'
import type { GreenTransition, PillBloomSpeed } from '../pill-bloom-button/PillBloomButton'

export function WhiteBloomButtonDemo() {
  const [reset, setReset] = useState(0)
  const [activated, setActivated] = useState(false)
  const [speed, setSpeed] = useState<PillBloomSpeed>('slow')
  const [greenTransition, setGreenTransition] = useState<GreenTransition>('sweep')

  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center gap-16 px-6 py-16 text-center sm:min-h-[520px]">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">A quiet white glow</p>

      <WhiteBloomButton data-wave-trigger key={reset} speed={speed} greenTransition={greenTransition} onClick={() => setActivated(true)}>
        Give it a spin
      </WhiteBloomButton>

      <div className="flex flex-col items-center gap-4">
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
        <p role="status" className="text-xs leading-5 text-neutral-500">
          {activated ? 'Green-accented fringes. White in the glow.' : 'A 4 px chromatic edge with a soft white bloom.'}
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
          Reset bloom ↺
        </button>
      </div>
    </div>
  )
}
