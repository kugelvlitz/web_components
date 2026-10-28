import { useRef } from 'react'
import { DotWaveBackground, type DotWaveBackgroundHandle } from '../dot-wave-background/DotWaveBackground'
import { WhiteBloomButton, type WhiteBloomButtonProps } from '../white-bloom-button/WhiteBloomButton'

export type ChromaticWaveButtonProps = Omit<WhiteBloomButtonProps, 'className'> & {
  className?: string
  buttonClassName?: string
  waveStrength?: number
  waveSpeed?: number
  waveDecay?: number
}

export function ChromaticWaveButton({
  children = 'Give it a spin',
  className = '',
  buttonClassName = '',
  onClick,
  waveStrength = 12,
  waveSpeed = 480,
  waveDecay = 3,
  ...buttonProps
}: ChromaticWaveButtonProps) {
  const backgroundRef = useRef<DotWaveBackgroundHandle>(null)

  return (
    <div className={`relative flex min-h-[480px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#050505] px-6 py-24 ${className}`}>
      <DotWaveBackground ref={backgroundRef} colorMode="chromatic" strength={waveStrength} speed={waveSpeed} decay={waveDecay} />
      <WhiteBloomButton
        {...buttonProps}
        className={buttonClassName}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          const button = event.currentTarget
          const bounds = button.getBoundingClientRect()
          backgroundRef.current?.ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, {
            outline: { width: bounds.width, height: bounds.height },
            colorBands: { crest: [255, 25, 0], ahead: [255, 235, 0], trailing: [52, 75, 255] },
          })
        }}
      >
        {children}
      </WhiteBloomButton>
    </div>
  )
}
