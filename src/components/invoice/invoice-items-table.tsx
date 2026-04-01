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
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground py-4 text-xs font-black tracking-wider uppercase">
              품목명
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-xs font-black tracking-wider uppercase">
              수량
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-xs font-black tracking-wider uppercase">
              단가
            </TableHead>
            <TableHead className="text-muted-foreground py-4 text-right text-xs font-black tracking-wider uppercase">
              금액
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={`${item.name}-${index}`}
              className="group hover:bg-muted/30 transition-colors"
            >
              <TableCell className="py-5">
                <p className="text-base leading-none font-bold">{item.name}</p>
                {item.description && (
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="py-5 text-right font-medium">
                {item.quantity}
              </TableCell>
              <TableCell className="py-5 text-right font-medium">
                {formatCurrency(item.unitPrice)}
              </TableCell>
              <TableCell className="text-primary py-5 text-right font-bold">
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
