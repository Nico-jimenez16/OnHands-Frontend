'use client'

import type { Message } from '@/types'
import { Text } from '@/components/ui'
import {
  Row,
  Bubble,
  SummaryCard,
  Field,
  FieldLabel,
  FieldValue,
  TypingBubble,
  Dot,
} from './ChatMessageLight.styles'

// Versión clara de MessageBubble / TypingIndicator para la nueva vista /app.
// Los componentes originales (src/components/chat/*) están atados al theme oscuro;
// acá se replica la estructura con la paleta clara, sin tocar la lógica ni los tipos.

export function ChatMessageLight({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const data = message.serviceData

  return (
    <Row $isUser={isUser}>
      <Bubble $isUser={isUser}>{message.content}</Bubble>
      {data && (data.address || data.scheduledDate || data.timePreference || data.urgency) && (
        <SummaryCard>
          <Text variant="eyebrow" color="faint">
            Resumen del servicio
          </Text>
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
