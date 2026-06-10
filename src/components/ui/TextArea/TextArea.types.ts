import type { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  value: string
  /** Alto mínimo en px (también el alto de reposo). Default 20. */
  minHeight?: number
  /** Alto máximo en px antes de hacer scroll interno. Default 140. */
  maxHeight?: number
}
