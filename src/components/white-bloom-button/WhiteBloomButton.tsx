import { PillBloomButton, type PillBloomButtonProps } from '../pill-bloom-button/PillBloomButton'
import './WhiteBloomButton.css'

export type WhiteBloomButtonProps = Omit<PillBloomButtonProps, 'outlineWidth' | 'greenFringes'>

export function WhiteBloomButton({ className = '', ...props }: WhiteBloomButtonProps) {
  return <PillBloomButton {...props} outlineWidth={4} greenFringes className={`white-bloom-button ${className}`} />
}
