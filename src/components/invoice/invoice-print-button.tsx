'use client'

import { PrinterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function InvoicePrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      variant="default"
      size="sm"
      className="shadow-primary/20 hover:shadow-primary/30 font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
    >
      <PrinterIcon className="mr-2 h-4 w-4" />
      PDF 다운로드
    </Button>
  )
}
