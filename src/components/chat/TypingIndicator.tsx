'use client'

import styled, { keyframes } from 'styled-components'
import { theme } from '@/styles/theme'
import { Avatar } from '@/components/ui'

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
`

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.xl};
`

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.bg.tertiary};
  border-radius: 4px 12px 12px 12px;
`

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${theme.colors.text.tertiary};
  animation: ${bounce} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}ms;
`

export function TypingIndicator() {
  return (
    <Row>
      <Avatar initials="S" size="sm" color="purple" />
      <Bubble>
        <Dot $delay={0} />
        <Dot $delay={200} />
        <Dot $delay={400} />
      </Bubble>
    </Row>
  )
}
