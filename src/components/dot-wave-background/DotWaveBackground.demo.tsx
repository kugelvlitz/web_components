import { useRef, useState } from 'react'
import { DotWaveBackground, type DotWaveBackgroundHandle } from './DotWaveBackground'

export function DotWaveBackgroundDemo() {
  const backgroundRef = useRef<DotWaveBackgroundHandle>(null)
  const [strength, setStrength] = useState(12)
  const [speed, setSpeed] = useState(480)
  const [decay, setDecay] = useState(3)

  return (
    <div className="overflow-hidden rounded-2xl bg-[#050505]">
      <div className="relative flex min-h-[380px] flex-col items-center justify-center gap-7 px-6 py-16 text-center">
        <DotWaveBackground ref={backgroundRef} strength={strength} speed={speed} decay={decay} />
        <p className="relative font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">A ripple through the grid</p>
        <button
          type="button"
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            backgroundRef.current?.ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
          }}
          className="relative rounded-full border border-white/60 bg-black/40 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Send a wave
        </button>
        <p className="relative max-w-xs text-xs leading-6 text-neutral-500">Click again to layer waves. The dots find their way back.</p>
      </div>
      <div className="grid gap-6 border-t border-white/10 px-6 py-6 sm:grid-cols-3">
        <label className="flex flex-col gap-3 text-xs text-neutral-400">
          <span>Strength <span className="float-right font-mono text-neutral-600">{strength} px</span></span>
          <input aria-label="Wave strength" className="w-full accent-white" type="range" min="4" max="20" value={strength} onChange={(event) => setStrength(Number(event.target.value))} />
        </label>
        <label className="flex flex-col gap-3 text-xs text-neutral-400">
          <span>Wave speed <span className="float-right font-mono text-neutral-600">{speed} px/s</span></span>
          <input aria-label="Wave speed" className="w-full accent-white" type="range" min="200" max="800" step="20" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
        </label>
        <label className="flex flex-col gap-3 text-xs text-neutral-400">
          <span>Decay <span className="float-right font-mono text-neutral-600">{decay} s</span></span>
          <input aria-label="Wave decay" className="w-full accent-white" type="range" min="1" max="5" step="0.5" value={decay} onChange={(event) => setDecay(Number(event.target.value))} />
        </label>
      </div>
    </div>
  )
}
