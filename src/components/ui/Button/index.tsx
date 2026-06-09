'use client'

import styled, { css, keyframes } from 'styled-components'
import { theme } from '@/styles/theme'
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types'

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${theme.colors.text.primary};
    color: #ffffff;
    border: 1px solid ${theme.colors.text.primary};

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    background-color: ${theme.colors.bg.secondary};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.light};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.bg.tertiary};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.text.secondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.bg.tertiary};
      color: ${theme.colors.text.primary};
    }
  `,
  danger: css`
    background-color: ${theme.colors.status.errorBg};
    color: ${theme.colors.status.error};
    border: 1px solid ${theme.colors.status.errorBg};

    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  `,
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 6px 12px;
    font-size: ${theme.fontSize.sm};
    border-radius: ${theme.radius.md};
  `,
  md: css`
    padding: 10px 18px;
    font-size: ${theme.fontSize.base};
    border-radius: ${theme.radius.md};
  `,
  lg: css`
    padding: 13px 24px;
    font-size: ${theme.fontSize.lg};
    border-radius: ${theme.radius.lg};
  `,
}

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth?: boolean
  $loading?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s, color 0.15s;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  ${({ $loading }) => $loading && css`
    pointer-events: none;
    opacity: 0.7;
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
StyledButton.displayName = 'StyledButton'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`
Spinner.displayName = 'Spinner'

const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`
IconSlot.displayName = 'ButtonIconSlot'

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && leftIcon && <IconSlot>{leftIcon}</IconSlot>}
      {children}
      {!loading && rightIcon && <IconSlot>{rightIcon}</IconSlot>}
    </StyledButton>
  )
}
Button.displayName = 'Button'
