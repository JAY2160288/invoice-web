import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-muted/30 min-h-screen">
      <DashboardHeader />
      {children}
    </div>
  )
}
