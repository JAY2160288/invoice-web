import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ErrorDisplay } from '@/components/error/error-display'

export default function InvoiceNotFound() {
  return (
    <ErrorDisplay
      code="404"
      title="견적서를 찾을 수 없습니다"
      description="요청하신 견적서가 존재하지 않거나 URL이 올바르지 않습니다. 공유받은 링크를 다시 확인해 주세요."
      action={
        <Button asChild variant="outline">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      }
    />
  )
}
