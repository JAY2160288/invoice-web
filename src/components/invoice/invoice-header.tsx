import { Building2Icon, UserIcon, CalendarIcon, MailIcon } from 'lucide-react'
import { InvoiceStatusBadge } from '@/components/dashboard/invoice-status-badge'
import type { Invoice } from '@/lib/types/invoice'

interface InvoiceHeaderProps {
  invoice: Pick<
    Invoice,
    | 'title'
    | 'clientName'
    | 'issueDate'
    | 'dueDate'
    | 'status'
    | 'senderName'
    | 'senderContact'
  >
}

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div className="space-y-2">
          <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
            Invoice
          </div>
          <h1 className="text-foreground text-4xl leading-none font-black tracking-tight">
            {invoice.title}
          </h1>
        </div>
        <div className="pt-2">
          <InvoiceStatusBadge status={invoice.status} />
        </div>
      </div>

      <div className="border-muted/60 grid grid-cols-1 gap-10 border-y py-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-primary flex items-center gap-2">
            <Building2Icon className="h-5 w-5" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">
              발행자
            </span>
          </div>
          <div className="space-y-1.5 pl-7">
            <p className="text-foreground text-xl leading-none font-bold">
              {invoice.senderName}
            </p>
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <MailIcon className="h-4 w-4" />
              <span>{invoice.senderContact}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-primary flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">
              클라이언트
            </span>
          </div>
          <div className="space-y-1.5 pl-7">
            <p className="text-foreground text-xl leading-none font-bold">
              {invoice.clientName}
            </p>
            <p className="text-muted-foreground text-sm font-medium">귀하</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-2">
        <div className="flex items-start gap-3">
          <div className="bg-muted/80 mt-0.5 rounded-lg p-2">
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              발행일
            </p>
            <p className="text-foreground text-sm font-bold">
              {invoice.issueDate}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-muted/80 mt-0.5 rounded-lg p-2">
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              유효기간
            </p>
            <p className="text-foreground text-sm font-bold">
              {invoice.dueDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
