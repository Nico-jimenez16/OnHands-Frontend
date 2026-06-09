import type { ServiceRequestStatus } from '@/types'

export function formatDate(date: Date): string {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const formatted = `${day}/${month}`

  if (date.toDateString() === today.toDateString()) return `Hoy, ${formatted}`
  if (date.toDateString() === tomorrow.toDateString()) return `Mañana, ${formatted}`
  return formatted
}

export function generateRequestId(): string {
  return `SR-${Math.floor(1000 + Math.random() * 9000)}`
}

export function getUrgencyLabel(urgency: string): string {
  const labels: Record<string, string> = {
    baja: 'Baja',
    media: 'Media',
    alta: 'Alta',
  }
  return labels[urgency] ?? urgency
}

export function getStatusLabel(status: ServiceRequestStatus): string {
  const labels: Record<ServiceRequestStatus, string> = {
    draft: 'Borrador',
    pending: 'Pendiente',
    searching: 'Buscando...',
    sent: 'Enviada',
    accepted: 'Aceptada',
    in_progress: 'En progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
  }
  return labels[status] ?? status
}
