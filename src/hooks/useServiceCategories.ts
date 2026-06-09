export interface ServiceCategory {
  icon: string
  label: string
}

const CATEGORIES: ServiceCategory[] = [
  { icon: 'droplet', label: 'Plomería' },
  { icon: 'zap', label: 'Electricidad' },
  { icon: 'hammer', label: 'Albañilería' },
  { icon: 'wind', label: 'Aire acond.' },
  { icon: 'paintbrush', label: 'Pintura' },
  { icon: 'sparkles', label: 'Limpieza' },
  { icon: 'truck', label: 'Mudanzas' },
  { icon: 'tree', label: 'Jardín' },
]

export function useServiceCategories(): ServiceCategory[] {
  return CATEGORIES
}
