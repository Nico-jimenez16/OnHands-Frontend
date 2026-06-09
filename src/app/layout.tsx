import type { Metadata } from 'next'
import { Providers } from '@/components/layout/Providers'

export const metadata: Metadata = {
  title: 'OnHand',
  description: 'Plataforma de servicios del hogar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
