'use client'

import { useEffect } from 'react'
import { useChatStore } from '@/store/chatStore'
import type { SSEEvent, MatchResponse, ProviderStatus } from '@/types'

export function useMatchStream(requestId: string | null) {
  const { providers, matchStatus, setProviders, updateProviderStatus, setMatchStatus } =
    useChatStore()

  useEffect(() => {
    if (!requestId) return

    const es = new EventSource(
      `/api/match/stream?requestId=${encodeURIComponent(requestId)}`
    )

    es.onmessage = (e: MessageEvent<string>) => {
      try {
        const event: SSEEvent = JSON.parse(e.data)

        if (event.type === 'match_update') {
          const payload = event.payload as MatchResponse
          setProviders(payload.providers)
          setMatchStatus(payload.searchStatus as 'searching' | 'found' | 'notified')
        } else if (event.type === 'provider_status') {
          const { providerId, status } = event.payload as {
            providerId: string
            status: ProviderStatus
          }
          updateProviderStatus(providerId, status)
        }
      } catch {
        // skip malformed events
      }
    }

    es.onerror = () => es.close()

    return () => es.close()
  }, [requestId, setProviders, updateProviderStatus, setMatchStatus])

  return { providers, matchStatus }
}
