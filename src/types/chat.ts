export type MessageRole = 'user' | 'assistant'
export type MessageStatus = 'sending' | 'sent' | 'error'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  status?: MessageStatus
  serviceData?: Partial<ServiceRequest>
}

export interface ServiceRequest {
  id: string
  category: string
  description: string
  address: string
  scheduledDate: string
  timePreference: string
  urgency: 'baja' | 'media' | 'alta'
  status: ServiceRequestStatus
  createdAt: Date
}

export type ServiceRequestStatus =
  | 'draft'
  | 'pending'
  | 'searching'
  | 'sent'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
