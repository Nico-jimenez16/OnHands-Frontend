import { MainLayout } from '@/components/main/MainLayout'
import { AppHeader } from '@/components/main/AppHeader'
import { NavSidebar } from '@/components/main/NavSidebar'
import { AssistantChat } from '@/components/main/AssistantChat'
import { RequestPanel } from '@/components/main/RequestPanel'

export default function AppHome() {
  return (
    <MainLayout
      header={<AppHeader />}
      sidebar={<NavSidebar />}
      chat={<AssistantChat />}
      panel={<RequestPanel />}
    />
  )
}
