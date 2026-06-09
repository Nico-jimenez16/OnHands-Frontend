'use client'

import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Hand, Paperclip, Mic, ArrowUp } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { light } from './palette'
import { CategoryGrid } from './CategoryGrid'
import { ChatMessageLight, TypingIndicatorLight } from './ChatMessageLight'

const MAX_TEXTAREA_HEIGHT = 140

const Column = styled.section`
  background: ${light.bg};
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  min-height: 0;
`

const ChatLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #9090a8;
  padding: 16px 0 12px;
  text-align: center;
`

const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  overflow-y: auto;
  min-height: 0;
`

const EmptyCenter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 0;
`

const EmptyLogo = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${light.surface};
  border: 1px solid #e8e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;

  svg {
    color: ${light.textFaint};
  }
`

const EmptyTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #0f0f1a;
  text-align: center;
  letter-spacing: -0.2px;
`

const EmptySub = styled.div`
  font-size: 13px;
  color: #5a5a72;
  font-weight: 400;
  text-align: center;
  line-height: 1.65;
  max-width: 280px;
`

const InputWrap = styled.div`
  background: ${light.surface};
  border: 1px solid ${light.borderSoft};
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 14px;
`

const IconAction = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${light.textFaint};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${light.bg};
    color: ${light.textSoft};
  }
`

const Actions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const TextArea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: ${light.text};
  resize: none;
  height: 20px;
  max-height: ${MAX_TEXTAREA_HEIGHT}px;
  line-height: 1.5;
  overflow-y: auto;

  &::placeholder {
    color: #9090a8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const SendButton = styled.button`
  width: 32px;
  height: 32px;
  background: ${light.navy};
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`

export function AssistantChat() {
  const { messages, isTyping, sendMessage } = useChat()
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const resetTextareaHeight = () => {
    if (textareaRef.current) textareaRef.current.style.height = '20px'
  }

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    sendMessage(trimmed)
  }

  const handleSend = () => {
    submit(value)
    setValue('')
    resetTextareaHeight()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = '20px'
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }

  const hasContent = value.trim().length > 0
  const isEmpty = messages.length === 0

  return (
    <Column>
      <Inner>
        <ChatLabel>Asistente OnHands</ChatLabel>

        <Messages>
          {isEmpty ? (
            <EmptyCenter>
              <EmptyLogo>
                <Hand size={22} />
              </EmptyLogo>
              <EmptyTitle>¿En qué te puedo ayudar hoy?</EmptyTitle>
              <EmptySub>
                Describí el servicio que necesitás o elegí una categoría
              </EmptySub>
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
          <IconAction type="button" aria-label="Adjuntar">
            <Paperclip size={14} />
          </IconAction>
          <TextArea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Describí el servicio que necesitás en lenguaje natural..."
            rows={1}
            disabled={isTyping}
          />
          <Actions>
            <IconAction type="button" aria-label="Dictar">
              <Mic size={14} />
            </IconAction>
            <SendButton
              type="button"
              aria-label="Enviar"
              disabled={!hasContent || isTyping}
              onClick={handleSend}
            >
              <ArrowUp size={15} />
            </SendButton>
          </Actions>
        </InputWrap>
      </Inner>
    </Column>
  )
}
