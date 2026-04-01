'use client'

import { LogOutIcon, EyeIcon } from 'lucide-react'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { logoutAction } from '@/app/dashboard/actions'

export function DashboardHeader() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(() => {
      logoutAction()
    })
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur">
      <Container size="md">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <EyeIcon className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight">견적서 매니저</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-medium transition-all active:scale-95"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            {isPending ? '로그아웃 중...' : '로그아웃'}
          </Button>
        </div>
      </Container>
    </header>
  )
}
