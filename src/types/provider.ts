export interface Provider {
  id: string
  name: string
  initials: string
  specialty: string
  yearsExp: number
  rating: number
  distanceKm: number
  acceptanceRate: number
  matchScore: number
  rank: 1 | 2 | 3
  status: ProviderStatus
  avatarColor: 'purple' | 'green' | 'orange'
}

export type ProviderStatus =
  | 'notified'
  | 'accepted'
  | 'rejected'
  | 'queue'
