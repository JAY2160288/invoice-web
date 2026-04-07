'use client'

import { MailIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ShareEmailButtonProps {
  invoiceId: string
  invoiceTitle: string
}

export function ShareEmailButton({
  invoiceId,
  invoiceTitle,
}: ShareEmailButtonProps) {
  const handleEmailShare = () => {
    const url = `${window.location.origin}/invoice/${invoiceId}`
    const subject = encodeURIComponent(`[${invoiceTitle}] 견적서 공유`)
    const body = encodeURIComponent(
      `안녕하세요.\n\n요청하신 견적서를 보내드립니다.\n\n${invoiceTitle}\n${url}\n\n감사합니다.`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmailShare}
          aria-label="이메일로 공유"
          className="bg-background hover:bg-muted text-muted-foreground font-bold"
        >
          <MailIcon className="mr-1.5 h-3.5 w-3.5" />
          <span>이메일 공유</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">이메일로 공유</p>
      </TooltipContent>
    </Tooltip>
  )
}
