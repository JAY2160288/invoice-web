import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ErrorDisplay } from '@/components/error/error-display'

export default function NotFound() {
  return (
    <ErrorDisplay
      code="404"
      title="페이지를 찾을 수 없습니다"
      description="요청하신 페이지가 존재하지 않거나 이동되었습니다."
      action={
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      }
    />
  )
}
