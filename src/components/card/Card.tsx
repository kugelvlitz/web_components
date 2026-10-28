import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLElement> & {
  heading: string
  description?: string
}

export function Card({ heading, description, children, className = '', ...props }: CardProps) {
  return (
    <article className={`rounded-2xl border border-stone-200 bg-white p-6 ${className}`} {...props}>
      <h3 className="text-lg font-semibold tracking-tight">{heading}</h3>
      {description && <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </article>
  )
}
