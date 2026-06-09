'use client'

import { useState, useRef } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ArrowUp, Mic } from 'lucide-react'
import { theme } from '@/styles/theme'
import { Icon } from '@/components/ui'

const MAX_TEXTAREA_HEIGHT = 200
const FOCUSED_MIN_HEIGHT = 100

const Wrapper = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border.light};
  background-color: ${theme.colors.bg.primary};
  flex-shrink: 0;
`

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.radius.md};
  background-color: ${theme.colors.bg.tertiary};
  transition: border-color 0.15s;

  &:focus-within {
    border-color: ${theme.colors.accent.purpleMid};
  }
`

const MicIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.tertiary};
  flex-shrink: 0;
  padding-bottom: 2px;
`

const TextArea = styled.textarea<{ $expanded: boolean }>`
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  background-color: transparent;
  line-height: 1.5;
  min-height: ${({ $expanded }) => ($expanded ? FOCUSED_MIN_HEIGHT : 0)}px;
  max-height: ${MAX_TEXTAREA_HEIGHT}px;
  overflow-y: auto;
  transition: min-height 0.15s ease;

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const SendButton = styled.button<{ $active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: none;
  background-color: ${({ $active }) =>
    $active ? theme.colors.accent.purple : theme.colors.bg.tertiary};
  color: ${({ $active }) => ($active ? '#ffffff' : theme.colors.text.tertiary)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  flex-shrink: 0;
  transition: background-color 0.15s;

  &:disabled {
    cursor: not-allowed;
  }
`

interface ChatInputProps {
  onSend: (text: string) => void
  isTyping: boolean
}

export function ChatInput({ onSend, isTyping }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const text = value.trim()
    if (!text || isTyping) return
    onSend(text)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
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
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }

  const hasContent = value.trim().length > 0

  return (
    <Wrapper>
      <InputRow>
        <MicIcon>
          <Icon icon={<Mic size={16} />} />
        </MicIcon>
        <TextArea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          $expanded={isFocused || value.length > 0}
          placeholder="Escribí tu mensaje..."
          rows={1}
          disabled={isTyping}
        />
        <SendButton
          $active={hasContent && !isTyping}
          disabled={!hasContent || isTyping}
          onClick={handleSend}
        >
          <Icon icon={<ArrowUp size={16} />} />
        </SendButton>
      </InputRow>
    </Wrapper>
  )
}
