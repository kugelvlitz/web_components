export type WaveOutline = { width: number; height: number }

export function waveGeometry(dx: number, dy: number, outline?: WaveOutline) {
  const halfSegment = outline ? Math.max(0, (outline.width - outline.height) / 2) : 0
  const normalX = outline ? dx - Math.max(-halfSegment, Math.min(halfSegment, dx)) : dx
  const normalY = dy
  const normalLength = Math.hypot(normalX, normalY)
  return { normalX, normalY, normalLength, distance: normalLength - (outline ? outline.height / 2 : 0) }
}
