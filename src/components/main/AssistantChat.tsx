'use client'

import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import { Hand, Paperclip, Mic, ArrowUp } from 'lucide-react'
import { Text, IconButton, TextArea } from '@/components/ui'
import { useChat } from '@/hooks/useChat'
import { CategoryGrid } from './CategoryGrid'
import { ChatMessageLight, TypingIndicatorLight } from './ChatMessageLight'
import {
  Column,
  Inner,
  LabelRow,
  Messages,
  EmptyCenter,
  EmptyLogo,
  EmptySubText,
  InputWrap,
  Actions,
} from './AssistantChat.styles'

export function AssistantChat() {
  const { messages, isTyping, sendMessage } = useChat()
  const [value, setValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    sendMessage(trimmed)
  }

  const handleSend = () => {
    submit(value)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const hasContent = value.trim().length > 0
  const isEmpty = messages.length === 0

  return (
    <Column>
      <Inner>
        <LabelRow>
          <Text variant="eyebrow" color="tertiary" align="center">
            Asistente OnHands
          </Text>
        </LabelRow>

        <Messages>
          {isEmpty ? (
            <EmptyCenter>
              <EmptyLogo>
                <Hand size={22} />
              </EmptyLogo>
              <Text variant="heading4" color="primary" align="center">
                ¿En qué te puedo ayudar hoy?
              </Text>
              <EmptySubText variant="bodySmall" align="center">
                Describí el servicio que necesitás o elegí una categoría
              </EmptySubText>
              <CategoryGrid onPick={submit} disabled={isTyping} />
            </EmptyCenter>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessageLight key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicatorLight />}
              <div ref={bottomRef} />
            </>
          )}
        </Messages>

        <InputWrap>
          <IconButton variant="ghost" size="sm" aria-label="Adjuntar">
            <Paperclip size={14} />
          </IconButton>
          <TextArea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Describí el servicio que necesitás en lenguaje natural..."
            disabled={isTyping}
          />
          <Actions>
            <IconButton variant="ghost" size="sm" aria-label="Dictar">
              <Mic size={14} />
            </IconButton>
            <IconButton
              variant="primary"
              size="md"
              aria-label="Enviar"
              disabled={!hasContent || isTyping}
              onClick={handleSend}
            >
              <ArrowUp size={15} />
            </IconButton>
          </Actions>
        </InputWrap>
      </Inner>
    </Column>
  )
}
