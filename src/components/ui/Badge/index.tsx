'use client'

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types'

interface VariantColors {
  bg: string
  text: string
}

const variantColors: Record<BadgeVariant, VariantColors> = {
  default: { bg: theme.colors.bg.tertiary, text: theme.colors.text.secondary },
  success: { bg: theme.colors.status.successBg, text: theme.colors.status.successText },
  warning: { bg: theme.colors.status.warningBg, text: theme.colors.status.warningText },
  error: { bg: theme.colors.status.errorBg, text: theme.colors.status.error },
  info: { bg: theme.colors.status.infoBg, text: theme.colors.status.infoText },
  accent: { bg: theme.colors.accent.purpleLight, text: theme.colors.accent.purple },
  accentSolid: { bg: theme.colors.accent.purple, text: '#ffffff' },
}

const sizeStyles: Record<BadgeSize, ReturnType<typeof css>> = {
  sm: css`
    font-size: 10px;
    padding: 2px 8px;
  `,
  md: css`
    font-size: 11px;
    padding: 3px 10px;
  `,
}

interface StyledBadgeProps {
  $variant: BadgeVariant
  $size: BadgeSize
  $rounded?: boolean
}

const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  line-height: 1;
  background-color: ${({ $variant }) => variantColors[$variant].bg};
  color: ${({ $variant }) => variantColors[$variant].text};
  border: 1px solid ${({ $variant }) => variantColors[$variant].bg};
  border-radius: ${({ $rounded }) => ($rounded ? theme.radius.full : theme.radius.sm)};
  ${({ $size }) => sizeStyles[$size]}
`
StyledBadge.displayName = 'StyledBadge'

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  flex-shrink: 0;
`
Dot.displayName = 'BadgeDot'

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot,
  rounded,
  className,
}: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $size={size} $rounded={rounded} className={className}>
      {dot && <Dot />}
      {children}
    </StyledBadge>
  )
}
Badge.displayName = 'Badge'
