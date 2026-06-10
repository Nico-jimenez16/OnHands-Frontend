import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonVariant = 'primary' | 'ghost'
export type IconButtonSize = 'sm' | 'md'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ícono a renderizar (típicamente de `lucide-react`). */
  children: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  /** Obligatorio: botón solo-ícono sin texto, necesita etiqueta accesible. */
  'aria-label': string
}
