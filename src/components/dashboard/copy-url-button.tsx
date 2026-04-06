'use client'

import { useRef, useState } from 'react'
import { CheckIcon, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CopyUrlButtonProps {
  invoiceId: string
  invoiceTitle: string
}

export function CopyUrlButton({ invoiceId, invoiceTitle }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    const url = `${window.location.origin}/invoice/${invoiceId}`
    try {
      await navigator.clipboard.writeText(`${invoiceTitle} - ${url}`)
      if (timerRef.current) clearTimeout(timerRef.current)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
      toast.success('URL이 복사되었습니다.')
    } catch {
      toast.error('복사에 실패했습니다.')
    }
  }

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/invoice/${invoiceId}`
      : `/invoice/${invoiceId}`

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label={copied ? 'URL 복사됨' : 'URL 복사'}
          className={`relative overflow-hidden font-bold transition-all duration-300 ease-in-out ${
            copied
              ? 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100'
              : 'bg-background hover:bg-muted text-muted-foreground'
          }`}
        >
          <div
            className={`flex items-center justify-center transition-transform duration-300 ${
              copied ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <LinkIcon className="mr-1.5 h-3.5 w-3.5" />
            <span>URL 복사</span>
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              copied ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <CheckIcon className="mr-1.5 h-3.5 w-3.5" />
            <span>복사됨</span>
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs truncate text-xs">{url}</p>
      </TooltipContent>
    </Tooltip>
  )
}
