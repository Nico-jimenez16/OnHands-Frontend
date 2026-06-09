'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { Message } from '@/types'
import { Avatar } from '@/components/ui'
import { ServiceSummaryCard } from './ServiceSummaryCard'

const Row = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.xl};
  flex-direction: ${({ $isUser }) => ($isUser ? 'row-reverse' : 'row')};
`

// Avatar del usuario: fondo violeta sólido + texto blanco. No corresponde a una
// variante de <Avatar> (cuyo "purple" es violeta claro), así que se conserva
// custom para mantener la distinción visual frente al avatar del asistente.
const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${theme.colors.accent.purple};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.xs};
  font-weight: 700;
  flex-shrink: 0;
`

const BubbleWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 75%;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
`

const Bubble = styled.div<{ $isUser: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${({ $isUser }) => ($isUser ? theme.colors.accent.purple : theme.colors.bg.tertiary)};
  color: ${({ $isUser }) => ($isUser ? '#ffffff' : theme.colors.text.primary)};
  border-radius: ${({ $isUser }) => ($isUser ? '12px 4px 12px 12px' : '4px 12px 12px 12px')};
  font-size: ${theme.fontSize.base};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

interface MessageBubbleProps {
  message: Message
  userName?: string
}

export function MessageBubble({ message, userName = 'U' }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <Row $isUser={isUser}>
      {isUser ? (
        <UserAvatar>{getInitials(userName)}</UserAvatar>
      ) : (
        <Avatar initials="S" size="sm" color="purple" />
      )}
      <BubbleWrapper $isUser={isUser}>
        <Bubble $isUser={isUser}>{message.content}</Bubble>
        {message.serviceData && (
          <ServiceSummaryCard serviceData={message.serviceData} />
        )}
      </BubbleWrapper>
    </Row>
  )
}
