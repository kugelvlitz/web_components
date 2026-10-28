import { useRef, useState, type MouseEvent } from 'react'
import { DotWaveBackground, type DotWaveBackgroundHandle } from '../components/dot-wave-background/DotWaveBackground'
import { demos } from './demos'

export function Playground() {
  const backgroundRef = useRef<DotWaveBackgroundHandle>(null)
  const [selectedId, setSelectedId] = useState(demos[0].id)
  const selected = demos.find((demo) => demo.id === selectedId) ?? demos[0]
  const Demo = selected.component

  function triggerBackgroundWave(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || !(event.target instanceof Element)) return
    const button = event.target.closest<HTMLButtonElement>('button[data-wave-trigger]')
    if (!button || button.disabled) return
    const bounds = button.getBoundingClientRect()
    backgroundRef.current?.ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
  }

  return (
    <div className="playground-backdrop">
      <DotWaveBackground ref={backgroundRef} />
      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-16">
        <header className="mb-12 border-b border-white/10 pb-10">
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">The workbench</p>
          <h1 className="text-3xl font-medium tracking-tight sm:text-5xl">Component playground<span className="text-neutral-600">.</span></h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-neutral-500">A little space for interface ideas. Build something, try its variations, and keep what works.</p>
        </header>
        <div className="grid items-start gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
          <nav aria-label="Components">
            <h2 className="mb-4 font-mono text-[10px] font-medium tracking-widest text-neutral-600 uppercase">Components · {demos.length}</h2>
            <ul className="flex flex-wrap gap-2 md:flex-col">
              {demos.map((demo, index) => (
                <li key={demo.id}>
                  <button
                    type="button"
                    aria-current={demo.id === selectedId ? 'true' : undefined}
                    onClick={() => setSelectedId(demo.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${demo.id === selectedId ? 'border-white/10 bg-white/[0.06] font-medium text-white' : 'border-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-200'}`}
                  >
                    <span className="font-mono text-xs opacity-50">{String(index + 1).padStart(2, '0')}</span>
                    {demo.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main>
            <h2 className="text-2xl font-semibold tracking-tight">{selected.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">{selected.description}</p>
            <section onClick={triggerBackgroundWave} aria-label={`${selected.name} preview`} className={`mt-6 rounded-2xl border ${selected.immersive ? 'border-white/10' : 'border-stone-200 bg-white p-6 text-stone-900 sm:p-8'}`}>
              <Demo key={selected.id} />
            </section>
            <p className="mt-4 break-all font-mono text-[10px] text-neutral-600">{selected.source}</p>
          </main>
        </div>
        <footer className="mt-20 text-xs text-neutral-600">An idea doesn’t have to be finished to be worth exploring.</footer>
      </div>
    </div>
  )
}
