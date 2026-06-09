import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type {
  Message,
  ServiceRequest,
  ServiceRequestStatus,
  Provider,
  ProviderStatus,
} from '@/types'

interface ChatState {
  messages: Message[]
  isTyping: boolean

  activeRequest: ServiceRequest | null
  requestId: string | null

  providers: Provider[]
  matchStatus: 'idle' | 'searching' | 'found' | 'notified'

  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (v: boolean) => void
  setActiveRequest: (req: ServiceRequest) => void
  updateRequestStatus: (status: ServiceRequestStatus) => void
  setProviders: (providers: Provider[]) => void
  updateProviderStatus: (providerId: string, status: ProviderStatus) => void
  setMatchStatus: (status: ChatState['matchStatus']) => void
  reset: () => void
}

const initialState = {
  messages: [],
  isTyping: false,
  activeRequest: null,
  requestId: null,
  providers: [],
  matchStatus: 'idle' as const,
}

export const useChatStore = create<ChatState>()(
  immer((set) => ({
    ...initialState,

    addMessage: (msg) =>
      set((state) => {
        state.messages.push({
          ...msg,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        })
      }),

    setTyping: (v) =>
      set((state) => {
        state.isTyping = v
      }),

    setActiveRequest: (req) =>
      set((state) => {
        state.activeRequest = req
        state.requestId = req.id
      }),

    updateRequestStatus: (status) =>
      set((state) => {
        if (state.activeRequest) {
          state.activeRequest.status = status
        }
      }),

    setProviders: (providers) =>
      set((state) => {
        state.providers = providers
      }),

    updateProviderStatus: (providerId, status) =>
      set((state) => {
        const provider = state.providers.find((p) => p.id === providerId)
        if (provider) {
          provider.status = status
        }
      }),

    setMatchStatus: (status) =>
      set((state) => {
        state.matchStatus = status
      }),

    reset: () => set(() => ({ ...initialState })),
  }))
)
