import type { ChangeEvent, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  size?: InputSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
  hint?: string
  disabled?: boolean
  fullWidth?: boolean
  id?: string
  name?: string
  autoComplete?: string
  required?: boolean
}
