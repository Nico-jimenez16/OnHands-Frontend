'use client'

import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { TextAreaProps } from './TextArea.types'

interface StyledTextAreaProps {
  $minHeight: number
  $maxHeight: number
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  flex: 1;
  width: 100%;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  resize: none;
  height: ${({ $minHeight }) => $minHeight}px;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  line-height: 1.5;
  overflow-y: auto;

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
StyledTextArea.displayName = 'StyledTextArea'

/**
 * Textarea que auto-crece con su contenido (entre `minHeight` y `maxHeight`).
 * Es controlado: el alto se recalcula cada vez que cambia `value`, así que al
 * vaciarlo vuelve solo a `minHeight` sin lógica externa.
 */
export function TextArea({
  value,
  minHeight = 20,
  maxHeight = 140,
  rows = 1,
  ...rest
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = `${minHeight}px`
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
  }, [value, minHeight, maxHeight])

  return (
    <StyledTextArea
      ref={ref}
      value={value}
      rows={rows}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      {...rest}
    />
  )
}
TextArea.displayName = 'TextArea'
