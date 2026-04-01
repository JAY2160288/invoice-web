'use client'

import { LogOutIcon, FileTextIcon } from 'lucide-react'
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
          <div className="flex items-center gap-3">
            <div className="from-primary to-primary/80 shadow-primary/20 rounded-xl bg-gradient-to-br p-2 shadow-sm">
              <FileTextIcon className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-foreground/90 text-xl font-black tracking-tighter">
              견적서 매니저
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-semibold transition-all active:scale-95"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            {isPending ? '로그아웃 중...' : '로그아웃'}
          </Button>
        </div>
      </Container>
    </header>
  )
}
