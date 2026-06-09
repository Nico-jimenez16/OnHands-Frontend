'use client'

import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import type { ChatRequest, ChatResponse, SSEEvent, ServiceRequest } from '@/types'
import type { Message } from '@/types'

export function useChat() {
  const {
    messages: storeMessages,
    isTyping,
    activeRequest,
    requestId,
    addMessage,
    setTyping,
    setActiveRequest,
  } = useChatStore()

  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null)

  const messages = streamingMessage
    ? [...storeMessages, streamingMessage]
    : storeMessages

  const sendMessage = async (text: string) => {
    const history = storeMessages.map((m) => ({ role: m.role, content: m.content }))

    addMessage({ role: 'user', content: text, status: 'sent' })
    setTyping(true)

    let accumulatedContent = ''
    let finalServiceData: Partial<ServiceRequest> | undefined
    setStreamingMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    })

    try {
      const body: ChatRequest = {
        message: text,
        requestId: requestId ?? undefined,
        conversationHistory: history,
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.body) throw new Error('Sin cuerpo en la respuesta')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) continue

          try {
            const event: SSEEvent = JSON.parse(line.slice(6))

            if (event.type === 'message') {
              const payload = event.payload as ChatResponse
              accumulatedContent += payload.reply
              setStreamingMessage((prev) =>
                prev ? { ...prev, content: accumulatedContent } : null
              )

              if (payload.isComplete && payload.extractedData) {
                finalServiceData = payload.extractedData as Partial<ServiceRequest>
                setActiveRequest({
                  id: payload.requestId ?? `SR-${Date.now()}`,
                  category: '',
                  description: '',
                  address: '',
                  scheduledDate: '',
                  timePreference: '',
                  urgency: 'media',
                  status: 'pending',
                  createdAt: new Date(),
                  ...finalServiceData,
                })
              }
            } else if (event.type === 'error') {
              throw new Error('Error del backend')
            }
          } catch {
            // skip malformed events
          }
        }
      }

      addMessage({
        role: 'assistant',
        content: accumulatedContent,
        status: 'sent',
        ...(finalServiceData ? { serviceData: finalServiceData } : {}),
      })
    } catch {
      addMessage({
        role: 'assistant',
        content: 'Hubo un error al procesar tu solicitud. Intentá de nuevo.',
        status: 'error',
      })
    } finally {
      setStreamingMessage(null)
      setTyping(false)
    }
  }

  return { messages, isTyping, sendMessage, activeRequest }
}
