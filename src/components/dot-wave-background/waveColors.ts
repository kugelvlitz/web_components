export type DotWaveColor = readonly [number, number, number]
export type WaveColorBands = { crest: DotWaveColor; ahead: DotWaveColor; trailing: DotWaveColor }

export const chromaticWaveBands: WaveColorBands = {
  crest: [255, 25, 0],
  ahead: [255, 235, 0],
  trailing: [52, 75, 255],
}

export function waveBandColor(position: number, bands: WaveColorBands): DotWaveColor {
  const target = position >= 0 ? bands.ahead : bands.trailing
  const mix = Math.max(0, Math.min(1, (Math.abs(position) - 0.18) / 0.42))
  return bands.crest.map((channel, index) => Math.round(channel + (target[index] - channel) * mix)) as [number, number, number]
}
