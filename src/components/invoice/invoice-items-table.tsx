import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import type { InvoiceItem } from '@/lib/types/invoice'

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
}

export function InvoiceItemsTable({ items }: InvoiceItemsTableProps) {
  return (
    <div className="border-muted/60 overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="border-muted/60 hover:bg-transparent">
            <TableHead className="text-muted-foreground py-4 text-[10px] font-black tracking-[0.2em] uppercase">
              품목명
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-[10px] font-black tracking-[0.2em] uppercase">
              수량
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-[10px] font-black tracking-[0.2em] uppercase">
              단가
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-[10px] font-black tracking-[0.2em] uppercase">
              금액
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={`${item.name}-${index}`}
              className="group hover:bg-muted/20 border-muted/60 transition-colors"
            >
              <TableCell className="py-5">
                <p className="text-foreground text-base leading-none font-bold">
                  {item.name}
                </p>
                {item.description && (
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-foreground/80 py-5 text-right font-bold">
                {item.quantity}
              </TableCell>
              <TableCell className="text-foreground/80 py-5 text-right font-bold">
                {formatCurrency(item.unitPrice)}
              </TableCell>
              <TableCell className="text-primary py-5 text-right text-lg font-black tracking-tight">
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
