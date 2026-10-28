import { useEffect, useImperativeHandle, useRef, type CSSProperties, type Ref } from 'react'
import './DotWaveBackground.css'

export type DotWaveBackgroundHandle = {
  /** Trigger a wave using viewport coordinates, such as a button's center. */
  ripple: (clientX: number, clientY: number, emission?: DotWaveEmission) => void
  clear: () => void
}

export type DotWaveColor = readonly [number, number, number]
export type DotWaveColorSource = {
  /** Color-separation direction in degrees. */
  angle: number
  /** Return fringe colors for a direction, in radians clockwise from 12 o'clock. */
  sample: (direction: number) => readonly DotWaveColor[]
  /** Optional dominant color sampled from the source edge at this direction. */
  core?: (direction: number) => DotWaveColor
}

export type DotWaveEmission = {
  /** Emit from this capsule's outer perimeter, centered at the trigger coordinates. */
  outline?: { width: number; height: number }
  /** Optional color snapshot belonging to this wave, independent of later source changes. */
  colors?: DotWaveColorSource
  /** Colors travel with the wave front rather than depending on screen direction. */
  colorBands?: { crest: DotWaveColor; ahead: DotWaveColor; trailing: DotWaveColor }
}

export type DotWaveBackgroundProps = {
  ref?: Ref<DotWaveBackgroundHandle>
  spacing?: number
  strength?: number
  speed?: number
  decay?: number
  colorMode?: 'white' | 'chromatic'
  colorSource?: () => DotWaveColorSource | null
  className?: string
  style?: CSSProperties
}

type Wave = { x: number; y: number; started: number; emission?: DotWaveEmission }

const spectrum = [
  [255, 25, 0], [255, 235, 0], [121, 255, 0],
  [0, 223, 255], [52, 75, 255], [189, 41, 255],
]

function spectralColor(phase: number) {
  const position = ((phase % 1 + 1) % 1) * spectrum.length
  const index = Math.floor(position)
  const mix = Math.max(0, (position - index - 0.7) / 0.3)
  const current = spectrum[index]
  const next = spectrum[(index + 1) % spectrum.length]
  return current.map((channel, channelIndex) => channel + (next[channelIndex] - channel) * mix)
}

function waveBandColor(position: number, bands: NonNullable<DotWaveEmission['colorBands']>): DotWaveColor {
  const target = position >= 0 ? bands.ahead : bands.trailing
  const mix = Math.max(0, Math.min(1, (Math.abs(position) - 0.18) / 0.42))
  return bands.crest.map((channel, index) => Math.round(channel + (target[index] - channel) * mix)) as [number, number, number]
}

export function DotWaveBackground({
  ref,
  spacing = 24,
  strength = 12,
  speed = 480,
  decay = 3,
  colorMode = 'white',
  colorSource,
  className = '',
  style,
}: DotWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wavesRef = useRef<Wave[]>([])
  const reducedMotionRef = useRef(false)
  const scheduleRef = useRef<() => void>(() => {})

  useImperativeHandle(ref, () => ({
    ripple(clientX, clientY, emission) {
      const canvas = canvasRef.current
      if (!canvas || reducedMotionRef.current) return
      const bounds = canvas.getBoundingClientRect()
      wavesRef.current = [...wavesRef.current.slice(-7), {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
        started: performance.now(),
        emission,
      }]
      scheduleRef.current()
    },
    clear() {
      wavesRef.current = []
      scheduleRef.current()
    },
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')
    if (!context) return

    const gap = Math.max(12, spacing)
    const amplitude = Math.max(0, strength)
    const velocity = Math.max(40, speed)
    const fadeTime = Math.max(0.1, decay)
    const band = gap * 2.8
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame: number | null = null

    function draw(now: number) {
      frame = null
      if (!context) return

      wavesRef.current = wavesRef.current.filter((wave) => {
        const shape = wave.emission?.outline
        const halfSegment = shape ? Math.max(0, (shape.width - shape.height) / 2) : 0
        const reach = Math.max(...[[0, 0], [width, 0], [0, height], [width, height]].map(([x, y]) => {
          const dx = x - wave.x
          const dy = y - wave.y
          return shape
            ? Math.hypot(Math.max(0, Math.abs(dx) - halfSegment), dy) - shape.height / 2
            : Math.hypot(dx, dy)
        }))
        return (now - wave.started) / 1000 < (reach + band * 3) / velocity
      })

      context.clearRect(0, 0, width, height)
      const waves = wavesRef.current.map((wave) => {
        const age = Math.max(0, (now - wave.started) / 1000)
        return {
          ...wave,
          radius: age * velocity,
          fade: Math.min(1, age / 0.1) * Math.exp(-age / fadeTime),
        }
      })
      const defaultColors = waves.length && colorMode === 'chromatic' ? colorSource?.() : null

      const offsetX = (width / 2) % gap
      const offsetY = (height / 2) % gap
      for (let y = offsetY - gap; y < height + gap; y += gap) {
        for (let x = offsetX - gap; x < width + gap; x += gap) {
          let shiftX = 0
          let shiftY = 0
          let light = 0
          let motion = 0
          let red = 0
          let green = 0
          let blue = 0
          let colorWeight = 0
          let strongest = 0
          let direction = 0
          let outline = defaultColors

          for (const wave of waves) {
            const dx = x - wave.x
            const dy = y - wave.y
            const shape = wave.emission?.outline
            const halfSegment = shape ? Math.max(0, (shape.width - shape.height) / 2) : 0
            const normalX = shape ? dx - Math.max(-halfSegment, Math.min(halfSegment, dx)) : dx
            const normalY = dy
            const normalLength = Math.hypot(normalX, normalY)
            const distance = normalLength - (shape ? shape.height / 2 : 0)
            // The capsule's interior stays quiet; the wave travels away from its edge.
            if (shape && distance < 0) continue
            const delta = distance - wave.radius
            const envelope = Math.exp(-((delta / band) ** 2)) * wave.fade
            const signal = Math.sin(delta / (gap * 0.85)) * envelope
            const divisor = Math.max(1, normalLength)
            shiftX += (normalX / divisor) * signal * amplitude
            shiftY += (normalY / divisor) * signal * amplitude
            light += envelope
            motion += Math.abs(signal)
            if (envelope > strongest) {
              strongest = envelope
              direction = shape
                ? Math.atan2(dx - normalX + normalX / divisor * shape.height / 2, -normalY / divisor * shape.height / 2)
                : Math.atan2(dx, -dy)
              outline = colorMode === 'chromatic' && !wave.emission?.colorBands ? wave.emission?.colors ?? defaultColors : null
            }

            if (colorMode === 'chromatic' && envelope > 0.002) {
              const color = wave.emission?.colorBands
                ? waveBandColor(delta / band, wave.emission.colorBands)
                : !wave.emission?.colors && !defaultColors
                  ? spectralColor(Math.atan2(dy, dx) / (Math.PI * 2) + delta / (gap * 8))
                  : null
              if (color) {
                red += color[0] * envelope
                green += color[1] * envelope
                blue += color[2] * envelope
                colorWeight += envelope
              }
            }
          }

          const radius = 0.8 + Math.min(1.7, motion * 1.2 + light * 0.4)
          const dotX = x + Math.max(-gap * 0.75, Math.min(gap * 0.75, shiftX))
          const dotY = y + Math.max(-gap * 0.75, Math.min(gap * 0.75, shiftY))
          const colorMix = Math.min(1, light * 2)
          if (outline && light > 0.01) {
            const colors = outline.sample(direction)
            const fringeX = Math.cos(outline.angle * Math.PI / 180)
            const fringeY = Math.sin(outline.angle * Math.PI / 180)
            context.globalCompositeOperation = 'screen'
            colors.forEach((color, index) => {
              const separation = ((colors.length - 1) / 2 - index) * 0.65 * colorMix
              context.beginPath()
              context.arc(dotX + fringeX * separation, dotY + fringeY * separation, radius * 0.68, 0, Math.PI * 2)
              context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.min(0.85, light * 0.8)})`
              context.fill()
            })
            context.globalCompositeOperation = 'source-over'
          }
          context.beginPath()
          const sampledCore = outline?.core?.(direction)
          const core = sampledCore?.map((channel) => Math.round(255 + (channel - 255) * colorMix))
          context.arc(
            dotX, dotY, outline && !core ? 0.8 : radius, 0, Math.PI * 2,
          )
          const channels = core ?? (colorWeight > 0
            ? [red, green, blue].map((channel) => Math.round(255 + (channel / colorWeight - 255) * colorMix))
            : [255, 255, 255])
          context.fillStyle = `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${Math.min(0.9, 0.13 + light * (outline && !core ? 0.25 : 0.65))})`
          context.fill()
        }
      }

      if (waves.length && !document.hidden) frame = requestAnimationFrame(draw)
    }

    function schedule() {
      if (frame === null && !document.hidden) frame = requestAnimationFrame(draw)
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context!.setTransform(ratio, 0, 0, ratio, 0, 0)
      schedule()
    }

    function updateMotion() {
      reducedMotionRef.current = motionQuery.matches
      if (motionQuery.matches) wavesRef.current = []
      schedule()
    }

    function updateVisibility() {
      if (document.hidden && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      } else if (!document.hidden) {
        schedule()
      }
    }

    scheduleRef.current = schedule
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    motionQuery.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    updateMotion()
    resize()

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      motionQuery.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      scheduleRef.current = () => {}
    }
  }, [spacing, strength, speed, decay, colorMode, colorSource])

  return <canvas ref={canvasRef} aria-hidden="true" className={`dot-wave-background ${className}`} style={style} />
}
