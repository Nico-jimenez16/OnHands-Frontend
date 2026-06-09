import { NextRequest } from 'next/server'
import { fetchBackend } from '@/lib/backendClient'
import type { MatchResponse } from '@/types'

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
      const timer = setTimeout(() => {
        controller.enqueue(
          encodeEvent({
            type: 'provider_status',
            payload: { providerId: 'p1', status: 'accepted' },
          })
        )
        controller.close()
      }, 5000)

      return () => clearTimeout(timer)
    },
  })
}

function pollingStream(requestId: string): ReadableStream {
  const providerStatuses = new Map<string, string>()
  let intervalId: ReturnType<typeof setInterval>

  return new ReadableStream({
    start(controller) {
      const poll = async () => {
        try {
          const res = await fetchBackend(`/match/${requestId}`)
          if (!res.ok) return
          const data: MatchResponse = await res.json()

          for (const provider of data.providers) {
            const prev = providerStatuses.get(provider.id)
            if (prev !== provider.status) {
              providerStatuses.set(provider.id, provider.status)
              controller.enqueue(
                encodeEvent({
                  type: 'provider_status',
                  payload: { providerId: provider.id, status: provider.status },
                })
              )
            }
          }

          if (data.searchStatus === 'notified') {
            clearInterval(intervalId)
            controller.close()
          }
        } catch {
          // continue polling on transient errors
        }
      }

      poll()
      intervalId = setInterval(poll, 3000)
    },
    cancel() {
      clearInterval(intervalId)
    },
  })
}

export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('requestId')

  if (!requestId) {
    const body = `data: ${JSON.stringify({ type: 'error', payload: { message: 'requestId requerido' } })}\n\n`
    return new Response(body, { headers: SSE_HEADERS, status: 400 })
  }

  const stream = process.env.BACKEND_URL
    ? pollingStream(requestId)
    : mockStream()

  return new Response(stream, { headers: SSE_HEADERS })
}
