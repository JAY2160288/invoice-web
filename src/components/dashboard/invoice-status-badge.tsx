import { Badge } from '@/components/ui/badge'
import type { InvoiceStatus } from '@/lib/types/invoice'

const statusConfig: Record<
  InvoiceStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
> = {
  draft: { label: '초안', variant: 'secondary' },
  sent: { label: '발송됨', variant: 'default' },
  accepted: {
    label: '승인됨',
    variant: 'outline',
    className: 'border-green-500 text-green-600',
  },
  rejected: { label: '거절됨', variant: 'destructive' },
}

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const { label, variant, className } = statusConfig[status]
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
