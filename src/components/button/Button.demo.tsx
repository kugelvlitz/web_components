import { useState } from 'react'
import { Button } from './Button'

export function ButtonDemo() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-sm font-medium text-stone-500">Variants</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button data-wave-trigger>Primary</Button>
          <Button data-wave-trigger variant="secondary">Secondary</Button>
          <Button data-wave-trigger variant="ghost">Ghost</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-stone-500">Sizes & states</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button data-wave-trigger size="sm">Small</Button>
          <Button data-wave-trigger>Default</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 border-t border-stone-100 pt-6">
        <Button data-wave-trigger variant="secondary" onClick={() => setClicks((count) => count + 1)}>
          Try clicking me
        </Button>
        <p role="status" className="text-sm text-stone-500">
          Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
        </p>
        {clicks > 0 && <Button variant="ghost" size="sm" onClick={() => setClicks(0)}>Reset</Button>}
      </div>
    </div>
  )
}
