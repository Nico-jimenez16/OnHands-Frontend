'use client'

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import type { IconButtonProps, IconButtonVariant, IconButtonSize } from './IconButton.types'

const variantStyles: Record<IconButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${theme.colors.text.primary};
    color: #ffffff;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.text.tertiary};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.bg.primary};
      color: ${theme.colors.text.secondary};
    }
  `,
}

const sizeStyles: Record<IconButtonSize, ReturnType<typeof css>> = {
  sm: css`
    width: 26px;
    height: 26px;
    border-radius: ${theme.radius.sm};
  `,
  md: css`
    width: 32px;
    height: 32px;
    border-radius: ${theme.radius.md};
  `,
}

interface StyledIconButtonProps {
  $variant: IconButtonVariant
  $size: IconButtonSize
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s, color 0.15s;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`
StyledIconButton.displayName = 'StyledIconButton'

export function IconButton({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <StyledIconButton $variant={variant} $size={size} type={type} {...rest}>
      {children}
    </StyledIconButton>
  )
}
IconButton.displayName = 'IconButton'
