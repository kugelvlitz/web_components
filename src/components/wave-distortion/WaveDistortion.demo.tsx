import { useCallback, useRef, useState } from 'react'
import { DotWaveBackground, type DotWaveBackgroundHandle, type DotWaveFrame } from '../dot-wave-background/DotWaveBackground'
import { WhiteBloomButton } from '../white-bloom-button/WhiteBloomButton'
import { WaveDistortion, type WaveDistortionHandle } from './WaveDistortion'
import { chromaticWaveBands } from '../dot-wave-background/waveColors'

export function WaveDistortionDemo() {
  const backgroundRef = useRef<DotWaveBackgroundHandle>(null)
  const distortionRef = useRef<WaveDistortionHandle>(null)
  const [enabled, setEnabled] = useState(true)
  const [colorEnabled, setColorEnabled] = useState(true)
  const [strength, setStrength] = useState(18)
  const [speed, setSpeed] = useState(360)
  const [decay, setDecay] = useState(3)
  const [reset, setReset] = useState(0)
  const updateDistortion = useCallback((frame: DotWaveFrame) => distortionRef.current?.update(frame), [])

  return (
    <div className="overflow-hidden rounded-2xl bg-[#050505]">
      <div className="relative h-[560px] overflow-hidden" data-distortion-stage>
        <DotWaveBackground ref={backgroundRef} colorMode="chromatic" strength={strength} speed={speed} decay={decay} onFrame={updateDistortion} />
        <WaveDistortion ref={distortionRef} enabled={enabled} colorEnabled={colorEnabled} style={{ position: 'absolute', inset: 0 }}>
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 800 560" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 32 168 H 768 M 32 392 H 768 M 80 24 V 536 M 720 24 V 536" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
          </svg>
          <div className="relative flex h-full flex-col justify-between px-8 py-10 sm:px-12">
            <div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">A reactive surface</p>
              <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">Let the page<br />bend a little.</h3>
            </div>
            <div className="max-w-sm">
              <p className="mb-3 text-lg font-medium text-neutral-200">A ripple through everything.</p>
              <p className="text-sm leading-6 text-neutral-500">The words and rules bend and catch the wave’s colors, then find their way back.</p>
            </div>
          </div>
        </WaveDistortion>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <WhiteBloomButton
            key={reset}
            speed="18s"
            className="pointer-events-auto"
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              backgroundRef.current?.ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, {
                outline: { width: bounds.width, height: bounds.height },
                colorBands: chromaticWaveBands,
              })
            }}
          >
            Send a ripple
          </WhiteBloomButton>
        </div>
      </div>
      <div className="space-y-6 border-t border-white/10 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <label className="flex cursor-pointer items-center gap-3 text-xs text-neutral-300">
              <input type="checkbox" className="size-4 accent-white" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
              Distort text and lines
            </label>
            <label className="flex cursor-pointer items-center gap-3 text-xs text-neutral-300">
              <input type="checkbox" className="size-4 accent-white" checked={colorEnabled} onChange={(event) => setColorEnabled(event.target.checked)} />
              Color text and lines
            </label>
          </div>
          <button type="button" className="rounded px-2 py-1 font-mono text-[10px] text-neutral-400 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" onClick={() => {
            backgroundRef.current?.clear()
            distortionRef.current?.clear()
            setReset((value) => value + 1)
          }}>Reset scene ↺</button>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <label className="flex flex-col gap-3 text-xs text-neutral-400">
            <span>Strength <span className="float-right font-mono text-neutral-600">{strength} px</span></span>
            <input aria-label="Wave strength" className="w-full accent-white" type="range" min="4" max="24" value={strength} onChange={(event) => setStrength(Number(event.target.value))} />
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
    </div>
  )
}
