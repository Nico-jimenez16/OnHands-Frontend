'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { AvatarProps, AvatarSize, AvatarColor } from './Avatar.types'

const sizeMap: Record<AvatarSize, { box: string; font: string }> = {
  xs: { box: '24px', font: '10px' },
  sm: { box: '28px', font: '11px' },
  md: { box: '36px', font: '13px' },
  lg: { box: '48px', font: '16px' },
}

interface ColorPair {
  bg: string
  text: string
}

const colorMap: Record<AvatarColor, ColorPair> = {
  purple: { bg: theme.colors.accent.purpleLight, text: theme.colors.accent.purple },
  green: { bg: theme.colors.status.successBg, text: theme.colors.status.successText },
  orange: { bg: theme.colors.status.warningBg, text: theme.colors.status.warningText },
  default: { bg: theme.colors.bg.tertiary, text: theme.colors.text.secondary },
}

const Root = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
`
Root.displayName = 'AvatarRoot'

interface CircleProps {
  $size: AvatarSize
  $color: AvatarColor
}

const Circle = styled.div<CircleProps>`
  width: ${({ $size }) => sizeMap[$size].box};
  height: ${({ $size }) => sizeMap[$size].box};
  border-radius: 50%;
  background-color: ${({ $color }) => colorMap[$color].bg};
  color: ${({ $color }) => colorMap[$color].text};
  font-size: ${({ $size }) => sizeMap[$size].font};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`
Circle.displayName = 'AvatarCircle'

const OnlineDot = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${theme.colors.status.success};
  border: 2px solid #ffffff;
`
OnlineDot.displayName = 'AvatarOnlineDot'

export function Avatar({ initials, size = 'md', color = 'default', online }: AvatarProps) {
  return (
    <Root>
      <Circle $size={size} $color={color}>
        {initials}
      </Circle>
      {online && <OnlineDot />}
    </Root>
  )
}
Avatar.displayName = 'Avatar'
