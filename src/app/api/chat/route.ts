import { NextRequest } from 'next/server'
import type { ChatRequest } from '@/types'
import { fetchBackend } from '@/lib/backendClient'

export const dynamic = 'force-dynamic'

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
}

function encodeEvent(data: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`)
}

function mockStream(): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encodeEvent({
          type: 'message',
          payload: {
            reply:
              'Para ayudarte necesito algunos datos. ¿Para qué dirección necesitás el servicio?',
          },
        })
      )

      const timer = setTimeout(() => {
        controller.enqueue(
          encodeEvent({
            type: 'message',
            payload: {
              reply: '',
              isComplete: true,
              requestId: 'SR-MOCK-001',
              extractedData: {
                category: 'electrician',
                description: 'No funciona el termotanque',
                address: '',
                scheduledDate: 'mañana',
                timePreference: 'cualquier horario',
                urgency: 'media',
                status: 'searching',
              },
            },
          })
        )
        controller.close()
      }, 500)

      return () => clearTimeout(timer)
    },
  })
}

function errorStream(message: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encodeEvent({ type: 'error', payload: { message } }))
      controller.close()
    },
  })
}

export async function POST(req: NextRequest) {
  const body: ChatRequest = await req.json()

  if (!process.env.BACKEND_URL) {
    return new Response(mockStream(), { headers: SSE_HEADERS })
  }

  try {
    const backendRes = await fetchBackend('/chat', {
      method: 'POST',
      body: JSON.stringify({ ...body, user_id: 'anonymous' }),
    })

    if (!backendRes.ok || !backendRes.body) {
      throw new Error(`Backend respondió ${backendRes.status}`)
    }

    return new Response(backendRes.body, { headers: SSE_HEADERS })
  } catch {
    return new Response(
      errorStream('Error al conectar con el backend'),
      { headers: SSE_HEADERS }
    )
  }
}
