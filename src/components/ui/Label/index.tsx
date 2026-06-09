'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { LabelProps } from './Label.types'

const StyledLabel = styled.label<{ $disabled?: boolean }>`
  display: block;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: ${theme.colors.text.secondary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`
StyledLabel.displayName = 'StyledLabel'

const RequiredMark = styled.span`
  color: ${theme.colors.status.error};
`
RequiredMark.displayName = 'RequiredMark'

export function Label({ children, htmlFor, required, disabled }: LabelProps) {
  return (
    <StyledLabel htmlFor={htmlFor} $disabled={disabled}>
      {children}
      {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
    </StyledLabel>
  )
}
Label.displayName = 'Label'
