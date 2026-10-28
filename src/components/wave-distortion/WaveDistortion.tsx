import { useCallback, useEffect, useId, useImperativeHandle, useRef, type CSSProperties, type ReactNode, type Ref } from 'react'
import type { DotWaveFrame } from '../dot-wave-background/DotWaveBackground'
import { waveGeometry } from '../dot-wave-background/waveGeometry'
import { chromaticWaveBands, waveBandColor } from '../dot-wave-background/waveColors'
import './WaveDistortion.css'

export type WaveDistortionHandle = {
  update: (frame: DotWaveFrame) => void
  clear: () => void
}

export type WaveDistortionProps = {
  ref?: Ref<WaveDistortionHandle>
  children: ReactNode
  enabled?: boolean
  colorEnabled?: boolean
  resolution?: number
  className?: string
  style?: CSSProperties
}

export function WaveDistortion({ ref, children, enabled = true, colorEnabled = true, resolution = 144, className = '', style }: WaveDistortionProps) {
  const id = `wave-distortion-${useId().replace(/:/g, '')}`
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<SVGFEImageElement>(null)
  const colorImageRef = useRef<SVGFEImageElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const mapRef = useRef<HTMLCanvasElement | null>(null)
  const colorMapRef = useRef<HTMLCanvasElement | null>(null)
  const reducedMotionRef = useRef(false)

  const clear = useCallback(() => {
    contentRef.current?.style.removeProperty('filter')
    displacementRef.current?.setAttribute('scale', '0')
    imageRef.current?.removeAttribute('href')
    colorImageRef.current?.removeAttribute('href')
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reducedMotionRef.current = query.matches
      clear()
    }
    update()
    query.addEventListener('change', update)
    return () => { query.removeEventListener('change', update); clear() }
  }, [enabled, colorEnabled, clear])

  useImperativeHandle(ref, () => ({
    clear,
    update(frame) {
      if ((!enabled && !colorEnabled) || reducedMotionRef.current || !frame.waves.length || frame.width <= 0 || frame.height <= 0) {
        clear()
        return
      }
      const map = mapRef.current ??= document.createElement('canvas')
      const samples = Math.max(32, Math.min(256, resolution))
      const longest = Math.max(frame.width, frame.height)
      const width = Math.max(8, Math.round(frame.width / longest * samples))
      const height = Math.max(8, Math.round(frame.height / longest * samples))
      if (map.width !== width || map.height !== height) { map.width = width; map.height = height }
      const context = map.getContext('2d')
      if (!context) { clear(); return }
      const image = context.createImageData(width, height)
      const colorMap = colorMapRef.current ??= document.createElement('canvas')
      if (colorMap.width !== width || colorMap.height !== height) { colorMap.width = width; colorMap.height = height }
      const colorContext = colorEnabled ? colorMap.getContext('2d') : null
      const colorImage = colorContext?.createImageData(width, height)
      const scale = enabled ? frame.strength * 4 : 0
      const band = frame.spacing * 2.8

      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const pointX = (x + 0.5) / width * frame.width
        const pointY = (y + 0.5) / height * frame.height
        let shiftX = 0
        let shiftY = 0
        let light = 0
        let red = 0
        let green = 0
        let blue = 0
        for (const wave of frame.waves) {
          const geometry = waveGeometry(pointX - wave.x, pointY - wave.y, wave.outline)
          if (wave.outline && geometry.distance < 0) continue
          const delta = geometry.distance - wave.radius
          const envelope = Math.exp(-((delta / band) ** 2)) * wave.fade
          const signal = Math.sin(delta / (frame.spacing * 0.85)) * envelope * frame.strength
          const divisor = Math.max(1, geometry.normalLength)
          shiftX += geometry.normalX / divisor * signal
          shiftY += geometry.normalY / divisor * signal
          if (colorImage && envelope > 0.002) {
            const color = waveBandColor(delta / band, wave.colorBands ?? chromaticWaveBands)
            light += envelope
            red += color[0] * envelope
            green += color[1] * envelope
            blue += color[2] * envelope
          }
        }
        const index = (y * width + x) * 4
        image.data[index] = Math.round(128 - Math.max(-0.5, Math.min(0.5, shiftX / Math.max(1, scale))) * 255)
        image.data[index + 1] = Math.round(128 - Math.max(-0.5, Math.min(0.5, shiftY / Math.max(1, scale))) * 255)
        image.data[index + 2] = 128
        image.data[index + 3] = 255
        if (colorImage && light > 0) {
          colorImage.data[index] = Math.round(red / light)
          colorImage.data[index + 1] = Math.round(green / light)
          colorImage.data[index + 2] = Math.round(blue / light)
          colorImage.data[index + 3] = Math.round(Math.min(1, light * 2) * 255)
        }
      }
      context.putImageData(image, 0, 0)
      imageRef.current?.setAttribute('href', map.toDataURL('image/png'))
      displacementRef.current?.setAttribute('scale', String(scale))
      if (colorImage && colorContext) {
        colorContext.putImageData(colorImage, 0, 0)
        colorImageRef.current?.setAttribute('href', colorMap.toDataURL('image/png'))
      } else {
        colorImageRef.current?.removeAttribute('href')
      }
      if (contentRef.current) contentRef.current.style.filter = `url("#${id}")`
    },
  }), [enabled, colorEnabled, resolution, clear, id])

  return (
    <div className={`wave-distortion ${className}`} style={style}>
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="wave-distortion__definitions">
        <defs>
          <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage ref={imageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="wave-map" />
            <feComponentTransfer in="wave-map" result="centered-wave-map">
              <feFuncR type="linear" slope="1" intercept={-0.5 / 255} />
              <feFuncG type="linear" slope="1" intercept={-0.5 / 255} />
            </feComponentTransfer>
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="centered-wave-map" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped-content" />
            {colorEnabled && <>
              <feImage ref={colorImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="wave-color" />
              {/* Tint only the source shapes, preserving their alpha and the surrounding transparency. */}
              <feComposite in="wave-color" in2="warped-content" operator="atop" />
            </>}
          </filter>
        </defs>
      </svg>
      <div ref={contentRef} className="wave-distortion__content">{children}</div>
    </div>
  )
}
