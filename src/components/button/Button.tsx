import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'border-emerald-800 bg-emerald-800 text-white hover:border-emerald-900 hover:bg-emerald-900',
  secondary: 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100',
  ghost: 'border-transparent bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900',
}

const sizes = {
  sm: 'min-h-9 px-3 py-1.5 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
