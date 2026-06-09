'use client'

import styled, { keyframes } from 'styled-components'
import type { Message } from '@/types'
import { light } from './palette'

// Versión clara de MessageBubble / TypingIndicator para la nueva vista /app.
// Los componentes originales (src/components/chat/*) están atados al theme oscuro;
// acá se replica la estructura con la paleta clara, sin tocar la lógica ni los tipos.

const Row = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  max-width: 100%;
`

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 78%;
  padding: 9px 13px;
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  background: ${({ $isUser }) => ($isUser ? light.navy : light.surface)};
  color: ${({ $isUser }) => ($isUser ? '#ffffff' : light.text)};
  border: 1px solid ${({ $isUser }) => ($isUser ? light.navy : light.border)};
  border-radius: ${({ $isUser }) => ($isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px')};
`

const SummaryCard = styled.div`
  margin-top: 8px;
  max-width: 78%;
  align-self: flex-start;
  background: ${light.surface};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const SummaryTitle = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${light.textFaint};
`

const Field = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
`

const FieldLabel = styled.span`
  width: 62px;
  flex-shrink: 0;
  color: ${light.textSoft};
`

const FieldValue = styled.span`
  color: ${light.text};
  font-weight: 500;
  text-transform: capitalize;
`

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
`

const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 11px 14px;
  background: ${light.surface};
  border: 1px solid ${light.border};
  border-radius: 14px 14px 14px 4px;
`

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${light.textFaint};
  animation: ${bounce} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}ms;
`

export function ChatMessageLight({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const data = message.serviceData

  return (
    <Row $isUser={isUser}>
      <Bubble $isUser={isUser}>{message.content}</Bubble>
      {data && (data.address || data.scheduledDate || data.timePreference || data.urgency) && (
        <SummaryCard>
          <SummaryTitle>Resumen del servicio</SummaryTitle>
          {data.address && (
            <Field>
              <FieldLabel>Dirección</FieldLabel>
              <FieldValue>{data.address}</FieldValue>
            </Field>
          )}
          {data.scheduledDate && (
            <Field>
              <FieldLabel>Día</FieldLabel>
              <FieldValue>{data.scheduledDate}</FieldValue>
            </Field>
          )}
          {data.timePreference && (
            <Field>
              <FieldLabel>Horario</FieldLabel>
              <FieldValue>{data.timePreference}</FieldValue>
            </Field>
          )}
          {data.urgency && (
            <Field>
              <FieldLabel>Urgencia</FieldLabel>
              <FieldValue>{data.urgency}</FieldValue>
            </Field>
          )}
        </SummaryCard>
      )}
    </Row>
  )
}

export function TypingIndicatorLight() {
  return (
    <Row $isUser={false}>
      <TypingBubble>
        <Dot $delay={0} />
        <Dot $delay={200} />
        <Dot $delay={400} />
      </TypingBubble>
    </Row>
  )
}
