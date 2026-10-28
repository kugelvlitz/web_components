import { useState } from 'react'
import { BloomButton, type BloomSpeed } from './BloomButton'

export function BloomButtonDemo() {
  const [reset, setReset] = useState(0)
  const [activated, setActivated] = useState(false)
  const [speed, setSpeed] = useState<BloomSpeed>('slow')

  return (
    <div className="flex min-h-[440px] flex-col items-center justify-center gap-16 px-6 py-16 text-center sm:min-h-[500px]">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">A little light in the dark</p>

      <BloomButton data-wave-trigger key={reset} speed={speed} onClick={() => setActivated(true)}>
        Give it a spin
      </BloomButton>

      <div className="flex flex-col items-center gap-4">
        <div role="group" aria-label="Orbit speed" className="flex flex-wrap justify-center gap-2">
          {(['slow', 'medium', 'fast'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={speed === option}
              onClick={() => setSpeed(option)}
              className={`rounded-lg border px-3 py-2 text-xs capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${speed === option ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 text-neutral-500 hover:text-white'}`}
            >
              {option} <span className="ml-1 font-mono text-[10px] opacity-60">{{ slow: '7s', medium: '3.5s', fast: '1.75s' }[option]}</span>
            </button>
          ))}
        </div>
        <p role="status" className="flex items-center gap-2.5 text-xs text-neutral-500">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${activated ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-cyan-300 shadow-[0_0_8px_#67e8f9]'}`} />
          {activated ? 'Green bloom. Click again for another spin.' : 'Chromatic bloom. Click to go green.'}
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
