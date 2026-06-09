import { NextRequest, NextResponse } from 'next/server'
import type { MatchResponse, Provider } from '@/types'
import { fetchBackend } from '@/lib/backendClient'

export const dynamic = 'force-dynamic'

const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Carlos Méndez',
    initials: 'CM',
    specialty: 'Plomería',
    yearsExp: 8,
    rating: 4.8,
    distanceKm: 1.2,
    acceptanceRate: 92,
    matchScore: 94,
    rank: 1,
    status: 'notified',
    avatarColor: 'purple',
  },
  {
    id: 'p2',
    name: 'Ana Torres',
    initials: 'AT',
    specialty: 'Plomería',
    yearsExp: 5,
    rating: 4.5,
    distanceKm: 2.1,
    acceptanceRate: 85,
    matchScore: 81,
    rank: 2,
    status: 'queue',
    avatarColor: 'green',
  },
  {
    id: 'p3',
    name: 'Roberto Silva',
    initials: 'RS',
    specialty: 'Plomería',
    yearsExp: 12,
    rating: 4.3,
    distanceKm: 3.5,
    acceptanceRate: 78,
    matchScore: 67,
    rank: 3,
    status: 'queue',
    avatarColor: 'orange',
  },
]

export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('requestId')

  if (!requestId) {
    return NextResponse.json({ error: 'requestId requerido' }, { status: 400 })
  }

  if (!process.env.BACKEND_URL) {
    const mock: MatchResponse = {
      requestId,
      providers: MOCK_PROVIDERS,
      searchStatus: 'notified',
    }
    return NextResponse.json(mock)
  }

  try {
    const res = await fetchBackend(`/match/${requestId}`)
    if (!res.ok) throw new Error(`Backend respondió ${res.status}`)
    const data: MatchResponse = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error al obtener match' }, { status: 502 })
  }
}
