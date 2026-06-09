'use client'

import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MessageCircle } from 'lucide-react'
import { theme } from '@/styles/theme'
import { Badge, Icon, Text } from '@/components/ui'
import { useChat } from '@/hooks/useChat'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { ChatInput } from './ChatInput'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.light};
  flex-shrink: 0;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

// Título de sección: 13px/500, sin equivalente exacto en las variantes de <Text>.
const Title = styled.h2`
  margin: 0;
  font-size: ${theme.fontSize.base};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`

const RequestId = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.fonts.mono};
`

const EmptyIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.bg.tertiary};
  border-radius: ${theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.xs};
`

const EmptySub = styled.div`
  max-width: 220px;
`

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  min-height: 0;
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  height: 100%;
`

interface ChatPanelProps {
  userName?: string
}

export function ChatPanel({ userName }: ChatPanelProps) {
  const { messages, isTyping, sendMessage, activeRequest } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <Panel>
      <Header>
        <HeaderLeft>
          <Title>Asistente OnHands</Title>
          {activeRequest?.id && <RequestId>{activeRequest.id}</RequestId>}
        </HeaderLeft>
        <Badge variant="success" size="md" rounded dot>
          activo
        </Badge>
      </Header>
      <MessagesArea>
        {messages.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Icon icon={<MessageCircle size={18} />} />
            </EmptyIcon>
            <Text variant="body" color="secondary" as="div">
              ¿En qué te puedo ayudar hoy?
            </Text>
            <EmptySub>
              <Text variant="hint" align="center" as="div">
                Describí el servicio que necesitás y encontramos al profesional ideal
              </Text>
            </EmptySub>
          </EmptyState>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} userName={userName} />
          ))
        )}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </MessagesArea>
      <ChatInput onSend={sendMessage} isTyping={isTyping} />
    </Panel>
  )
}
