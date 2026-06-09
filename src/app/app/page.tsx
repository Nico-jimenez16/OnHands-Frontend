import { AppShell } from '@/components/layout/AppShell'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ChatPanel } from '@/components/chat/ChatPanel'
import { ContextPanel } from '@/components/context/ContextPanel'

export default function AppHome() {
  return (
    <AppShell
      topbar={<TopBar userName="Nicolas Jimenez" />}
      sidebar={<Sidebar />}
      contextPanel={<ContextPanel />}
    >
      <ChatPanel userName="Nicolas Jimenez" />
    </AppShell>
  )
}
