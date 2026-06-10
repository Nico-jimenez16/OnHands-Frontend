import styled, { keyframes } from 'styled-components'
import { light } from './palette'

export const Row = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  max-width: 100%;
`

export const Bubble = styled.div<{ $isUser: boolean }>`
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

export const SummaryCard = styled.div`
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

// Fila etiqueta/valor de ancho fijo: layout, se mantiene como styled.
export const Field = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
`

export const FieldLabel = styled.span`
  width: 62px;
  flex-shrink: 0;
  color: ${light.textSoft};
`

export const FieldValue = styled.span`
  color: ${light.text};
  font-weight: 500;
  text-transform: capitalize;
`

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
`

export const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 11px 14px;
  background: ${light.surface};
  border: 1px solid ${light.border};
  border-radius: 14px 14px 14px 4px;
`

export const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${light.textFaint};
  animation: ${bounce} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}ms;
`
