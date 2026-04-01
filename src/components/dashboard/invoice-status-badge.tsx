import { Badge } from '@/components/ui/badge'
import type { InvoiceStatus } from '@/lib/types/invoice'

const statusConfig: Record<
  InvoiceStatus,
  {
    label: string
    className: string
  }
> = {
  draft: {
    label: '초안',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  sent: {
    label: '발송됨',
    className: 'bg-blue-50 text-blue-600 border-blue-200/50',
  },
  accepted: {
    label: '승인됨',
    className: 'bg-green-50 text-green-600 border-green-200/50',
  },
  rejected: {
    label: '거절됨',
    className: 'bg-red-50 text-red-600 border-red-200/50',
  },
}

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const { label, className } = statusConfig[status]
  return (
    <Badge
      variant="outline"
      className={`rounded-md px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase ${className}`}
    >
      {label}
    </Badge>
  )
}
