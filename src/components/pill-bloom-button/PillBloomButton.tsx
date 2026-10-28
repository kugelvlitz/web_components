import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type CSSProperties } from 'react'
import '../bloom-button/BloomButton.css'
import type { BloomSpeed } from '../bloom-button/BloomButton'
import './PillBloomButton.css'

export type PillBloomSpeed = BloomSpeed | '18s'
export type GreenTransition = 'sweep' | 'uniform'

export type PillBloomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlineWidth?: number
  greenFringes?: boolean
  speed?: PillBloomSpeed
  greenTransition?: GreenTransition
}

export function PillBloomButton({
  children,
  className = '',
  onClick,
  outlineWidth = 2,
  greenFringes = false,
  speed = 'slow',
  greenTransition = 'sweep',
  style,
  type = 'button',
  ...props
}: PillBloomButtonProps) {
  const [activation, setActivation] = useState(0)
  const [size, setSize] = useState({ width: 272, height: 86 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const button = buttonRef.current!
    const observer = new ResizeObserver(() => {
      const width = button.offsetWidth
      const height = button.offsetHeight
      setSize((previous) => previous.width === width && previous.height === height
        ? previous
        : { width, height })
    })
    observer.observe(button)
    return () => observer.disconnect()
  }, [])

  const { width, height } = size
  const inset = outlineWidth / 2
  const radius = (height - outlineWidth) / 2
  // Start at the top center and follow the actual outline clockwise.
  const track = `M ${width / 2} ${inset} H ${width - height / 2} A ${radius} ${radius} 0 0 1 ${width - height / 2} ${height - inset} H ${height / 2} A ${radius} ${radius} 0 0 1 ${height / 2} ${inset} Z`
  const layers = [
    { name: 'aura', width: 12 },
    { name: 'glow', width: 6 },
    { name: 'edge', width: outlineWidth },
  ] as const
  const fringes = [
    { color: '#ff1900', offset: 3.5 },
    { color: '#ffeb00', offset: 1.8 },
    { color: '#79ff00', offset: 0 },
    { color: '#00dfff', offset: -1.5 },
    { color: '#344bff', offset: -3 },
  ]
  const greenFringeColors = ['#c5ff3d', '#00ff54', '#baffd4', '#00efa6', '#00ba87']

  return (
    <button
      {...props}
      ref={buttonRef}
      type={type}
      className={`bloom-button pill-bloom-button ${className}`}
      data-speed={speed}
      data-green-transition={greenTransition}
      style={{ '--pill-outline-width': `${outlineWidth}px`, ...style } as CSSProperties}
      data-bloom={activation > 0 ? 'green' : 'chromatic'}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setActivation((count) => count + 1)
      }}
    >
      <span
        key={activation}
        aria-hidden="true"
        className={`bloom-button__effects pill-bloom-button__effects ${activation > 0 ? 'pill-bloom-button__effects--active' : ''}`}
      >
        <svg className="pill-bloom-button__svg" viewBox={`0 0 ${width} ${height}`} fill="none">
          <defs>
            <filter id={`${id}-feather`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            {(['spectrum', 'green'] as const).map((palette) => (
              <mask key={palette} id={`${id}-${palette}`} maskUnits="userSpaceOnUse" x="-48" y="-48" width={width + 96} height={height + 96} style={{ maskType: 'luminance' }}>
                {palette === 'spectrum' && <rect x="-48" y="-48" width={width + 96} height={height + 96} fill="white" />}
                <path
                  d={track}
                  pathLength="1000"
                  stroke={palette === 'green' ? 'white' : 'black'}
                  strokeWidth="64"
                  className="pill-bloom-button__trail"
                  filter={`url(#${id}-feather)`}
                />
              </mask>
            ))}
            {layers.map((layer) => (
              <mask key={layer.name} id={`${id}-${layer.name}`} maskUnits="userSpaceOnUse" x="-48" y="-48" width={width + 96} height={height + 96}>
                <path d={track} stroke="white" strokeWidth={layer.width} />
              </mask>
            ))}
          </defs>
          {layers.map((layer) => (
            <g key={layer.name} className={`pill-bloom-button__layer pill-bloom-button__layer--${layer.name}`}>
              {layer.name === 'edge' && (['spectrum', 'green'] as const)
                .filter((palette) => palette === 'spectrum' || greenFringes)
                .map((palette) => (
                  <g key={palette} mask={`url(#${id}-${palette})`} className={`pill-bloom-button__fringes pill-bloom-button__fringes--${palette}`}>
                    <g className="pill-bloom-button__fringe-orbit">
                      {fringes.map((fringe, index) => (
                        <path
                          key={fringe.color}
                          d={track}
                          stroke={palette === 'green' ? greenFringeColors[index] : fringe.color}
                          strokeWidth="1.6"
                          className="pill-bloom-button__fringe-channel"
                          style={{ '--pill-fringe-shift': `${fringe.offset}px` } as CSSProperties}
                        />
                      ))}
                    </g>
                  </g>
                ))}
              {(['spectrum', 'green'] as const).map((palette) => (
                <g key={palette} mask={`url(#${id}-${palette})`} className={`pill-bloom-button__color-layer pill-bloom-button__color-layer--${palette}`}>
                  <g mask={`url(#${id}-${layer.name})`}>
                    <foreignObject x="-12" y="-12" width={width + 24} height={height + 24}>
                      <div className={`pill-bloom-button__palette pill-bloom-button__palette--${palette}`}>
                        <div className="pill-bloom-button__orbit" />
                      </div>
                    </foreignObject>
                  </g>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </span>
      <span className="bloom-button__label">{children}</span>
    </button>
  )
}
