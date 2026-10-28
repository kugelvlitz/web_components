import { useState, type ButtonHTMLAttributes } from 'react'
import './BloomButton.css'

export type BloomSpeed = 'slow' | 'medium' | 'fast'

export type BloomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  speed?: BloomSpeed
}

export function BloomButton({
  children,
  className = '',
  onClick,
  speed = 'slow',
  type = 'button',
  ...props
}: BloomButtonProps) {
  const [activation, setActivation] = useState(0)

  return (
    <button
      {...props}
      type={type}
      className={`bloom-button ${className}`}
      data-speed={speed}
      data-bloom={activation > 0 ? 'green' : 'chromatic'}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setActivation((count) => count + 1)
      }}
    >
      <span
        key={activation}
        aria-hidden="true"
        className={`bloom-button__effects ${activation > 0 ? 'bloom-button__effects--burst' : ''}`}
      >
        <span className="bloom-button__layer bloom-button__layer--aura"><span className="bloom-button__ring" /></span>
        <span className="bloom-button__layer bloom-button__layer--glow"><span className="bloom-button__ring" /></span>
        <span className="bloom-button__layer bloom-button__layer--edge"><span className="bloom-button__ring" /></span>
      </span>
      <span className="bloom-button__label">{children}</span>
    </button>
  )
}
