import type { ReactNode } from 'react'

export type TextVariant =
  | 'heading1' // 38px, weight 500, letter-spacing -0.8px
  | 'heading2' // 28px, weight 500, letter-spacing -0.5px
  | 'heading3' // 22px, weight 500, letter-spacing -0.4px
  | 'heading4' // 18px, weight 500
  | 'body' // 14px, weight 400, line-height 1.6 (default)
  | 'bodySmall' // 13px, weight 400, line-height 1.55
  | 'caption' // 12px, weight 400
  | 'eyebrow' // 11px, uppercase, letter-spacing 1.2px, weight 500
  | 'error' // 12px, color error del theme
  | 'hint' // 11px, color terciario del theme

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'error'
  | 'success'
  | 'inherit'

export type TextAs = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'div'

export interface TextProps {
  variant?: TextVariant
  color?: TextColor
  as?: TextAs
  children: ReactNode
  className?: string
  onClick?: () => void
  truncate?: boolean
  align?: 'left' | 'center' | 'right'
}
