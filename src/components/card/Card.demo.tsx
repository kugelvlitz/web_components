import { useState } from 'react'
import { Button } from '../button/Button'
import { Card } from './Card'

export function CardDemo() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card heading="A place to start" description="A simple container for related content. Try different text, spacing, and actions to make it your own.">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">Content card</span>
      </Card>
      <Card heading="Make it interactive" description="Compose components together and keep their behavior close to the content.">
        <Button data-wave-trigger variant={saved ? 'secondary' : 'primary'} aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
          {saved ? 'Saved — click to undo' : 'Save this idea'}
        </Button>
      </Card>
    </div>
  )
}
