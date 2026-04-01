'use client'

import { PrinterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function InvoicePrintButton() {
  return (
    <Button onClick={() => window.print()} variant="outline" size="sm">
      <PrinterIcon className="mr-2 h-4 w-4" />
      PDF 다운로드
    </Button>
  )
}
