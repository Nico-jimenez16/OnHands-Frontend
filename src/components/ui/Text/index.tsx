'use client'

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import type { TextProps, TextVariant, TextColor } from './Text.types'

const variantStyles: Record<TextVariant, ReturnType<typeof css>> = {
  heading1: css`
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -0.8px;
    line-height: 1.12;
  `,
  heading2: css`
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 1.2;
  `,
  heading3: css`
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.4px;
    line-height: 1.25;
  `,
  heading4: css`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
  `,
  body: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  `,
  bodySmall: css`
    font-size: 13px;
    font-weight: 400;
    line-height: 1.55;
  `,
  caption: css`
    font-size: 12px;
    font-weight: 400;
  `,
  eyebrow: css`
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  `,
  error: css`
    font-size: 12px;
    font-weight: 400;
    color: ${theme.colors.status.error};
  `,
  hint: css`
    font-size: 11px;
    font-weight: 400;
    color: ${theme.colors.text.tertiary};
  `,
}

const colorMap: Record<Exclude<TextColor, 'inherit'>, string> = {
  primary: theme.colors.text.primary,
  secondary: theme.colors.text.secondary,
  tertiary: theme.colors.text.tertiary,
  accent: theme.colors.accent.purple,
  error: theme.colors.status.error,
  success: theme.colors.status.success,
}

interface StyledTextProps {
  $variant: TextVariant
  $color?: TextColor
  $truncate?: boolean
  $align?: 'left' | 'center' | 'right'
  $clickable?: boolean
}

const StyledText = styled.p<StyledTextProps>`
  margin: 0;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $color }) => $color && $color !== 'inherit' && css`
    color: ${colorMap[$color]};
  `}
  ${({ $color }) => $color === 'inherit' && css`
    color: inherit;
  `}
  ${({ $align }) => $align && css`
    text-align: ${$align};
  `}
  ${({ $truncate }) => $truncate && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
  `}
`
StyledText.displayName = 'StyledText'

export function Text({
  variant = 'body',
  color,
  as = 'p',
  children,
  className,
  onClick,
  truncate,
  align,
}: TextProps) {
  return (
    <StyledText
      as={as}
      className={className}
      onClick={onClick}
      $variant={variant}
      $color={color}
      $truncate={truncate}
      $align={align}
      $clickable={!!onClick}
    >
      {children}
    </StyledText>
  )
}
Text.displayName = 'Text'
