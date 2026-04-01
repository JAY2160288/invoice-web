'use client'

import { Button } from '@/components/ui/button'
import { ErrorDisplay } from '@/components/error/error-display'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <ErrorDisplay
      code="500"
      title="오류가 발생했습니다"
      description="서버에서 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      action={
        <Button onClick={reset} variant="outline">
          다시 시도
        </Button>
      }
    />
  )
}
