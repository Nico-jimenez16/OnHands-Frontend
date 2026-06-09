import type { ServiceRequest } from './chat'
import type { Provider } from './provider'

export interface ChatRequest {
  message: string
  requestId?: string
  conversationHistory: Array<{ role: string; content: string }>
}

export interface ChatResponse {
  reply: string
  extractedData?: Partial<ServiceRequest>
  isComplete?: boolean
  requestId?: string
}

export interface MatchResponse {
  requestId: string
  providers: Provider[]
  searchStatus: 'searching' | 'found' | 'notified'
}

export interface SSEEvent {
  type: 'message' | 'match_update' | 'provider_status' | 'error'
  payload: unknown
}
