import { formatCurrency } from '@/lib/utils'

interface InvoiceSummaryProps {
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
}

export function InvoiceSummary({
  subtotal,
  taxRate,
  taxAmount,
  total,
}: InvoiceSummaryProps) {
  const taxPercent = Math.round(taxRate * 100)

  return (
    <div className="flex justify-end">
      <div className="border-muted-foreground/10 bg-muted/20 w-full overflow-hidden rounded-xl border shadow-sm sm:w-80">
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              소계
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              부가세 ({taxPercent}%)
            </span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
        </div>
        <div className="bg-primary flex items-center justify-between px-5 py-4">
          <span className="text-primary-foreground text-xs font-black tracking-widest uppercase">
            최종 합계
          </span>
          <span className="text-primary-foreground text-2xl font-black tracking-tighter">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
