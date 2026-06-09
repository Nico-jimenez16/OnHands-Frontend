'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Text } from '../Text'
import type { DividerProps } from './Divider.types'

const spacingMap: Record<NonNullable<DividerProps['spacing']>, string> = {
  sm: '8px',
  md: '16px',
  lg: '24px',
}

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.border.light};
`
Line.displayName = 'DividerLine'

const HorizontalRoot = styled.div<{ $spacing: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: ${({ $spacing }) => $spacing} 0;
`
HorizontalRoot.displayName = 'DividerHorizontalRoot'

const PlainLine = styled.div<{ $spacing: string }>`
  height: 1px;
  background-color: ${theme.colors.border.light};
  margin: ${({ $spacing }) => $spacing} 0;
`
PlainLine.displayName = 'DividerPlainLine'

const VerticalLine = styled.div<{ $spacing: string }>`
  width: 1px;
  height: 100%;
  background-color: ${theme.colors.border.light};
  margin: 0 ${({ $spacing }) => $spacing};
`
VerticalLine.displayName = 'DividerVerticalLine'

export function Divider({ label, orientation = 'horizontal', spacing = 'md' }: DividerProps) {
  const space = spacingMap[spacing]

  if (orientation === 'vertical') {
    return <VerticalLine $spacing={space} />
  }

  if (label) {
    return (
      <HorizontalRoot $spacing={space}>
        <Line />
        <Text variant="caption" color="tertiary" as="span">
          {label}
        </Text>
        <Line />
      </HorizontalRoot>
    )
  }

  return <PlainLine $spacing={space} />
}
Divider.displayName = 'Divider'
