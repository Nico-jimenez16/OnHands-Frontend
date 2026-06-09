import { redirect } from 'next/navigation'

// La pantalla de login es la entrada por defecto del proyecto.
// La app principal vive ahora en /app (ver src/app/app/page.tsx).
// TODO: cuando exista auth real, redirigir según el estado de sesión.
export default function RootPage() {
  redirect('/login')
}
