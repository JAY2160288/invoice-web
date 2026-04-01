'use client'

import { useRef, useState } from 'react'
import { CheckIcon, LinkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface CopyUrlButtonProps {
  invoiceId: string
}

export function CopyUrlButton({ invoiceId }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    const url = `${window.location.origin}/invoice/${invoiceId}`
    await navigator.clipboard.writeText(url)

    if (timerRef.current) clearTimeout(timerRef.current)
    setCopied(true)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      aria-label={copied ? 'URL 복사됨' : 'URL 복사'}
    >
      {copied ? (
        <>
          <CheckIcon className="mr-1 h-4 w-4 text-green-500" />
          복사됨
        </>
      ) : (
        <>
          <LinkIcon className="mr-1 h-4 w-4" />
          URL 복사
        </>
      )}
    </Button>
  )
}
