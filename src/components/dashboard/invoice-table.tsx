'use client'

import Link from 'next/link'
import { EyeIcon, FileXIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import type { InvoiceListItem } from '@/lib/types/invoice'
import { CopyUrlButton } from './copy-url-button'
import { InvoiceStatusBadge } from './invoice-status-badge'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface InvoiceTableProps {
  invoices: InvoiceListItem[]
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  if (invoices.length === 0) {
    return (
      <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center px-4 py-24 text-center duration-700">
        <div className="bg-muted/40 border-muted-foreground/20 flex w-full max-w-md flex-col items-center rounded-3xl border-2 border-dashed p-10">
          <div className="bg-background ring-muted/50 mb-6 rounded-2xl p-4 shadow-sm ring-1">
            <FileXIcon className="text-muted-foreground h-10 w-10 opacity-50" />
          </div>
          <p className="text-foreground/90 text-xl font-black tracking-tight">
            등록된 견적서가 없습니다
          </p>
          <p className="text-muted-foreground mt-2 max-w-[240px] text-sm leading-relaxed">
            Notion DB에 새로운 견적서를 추가하면 여기에 실시간으로 표시됩니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {invoices.map((invoice, index) => (
          <Card
            key={invoice.id}
            className="animate-in fade-in slide-in-from-bottom-2 overflow-hidden shadow-md duration-500"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both',
            }}
          >
            <CardHeader className="border-muted/30 border-b pt-5 pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-foreground/90 line-clamp-1 text-lg font-black tracking-tight">
                  {invoice.title}
                </CardTitle>
                <InvoiceStatusBadge status={invoice.status} />
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                <p className="text-muted-foreground text-sm font-semibold tracking-tight">
                  {invoice.clientName}
                </p>
              </div>
            </CardHeader>
            <CardContent className="bg-muted/10 space-y-2.5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-black tracking-widest uppercase">
                  발행일
                </span>
                <span className="text-foreground/80 text-sm font-bold">
                  {invoice.issueDate}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-foreground text-xs font-black tracking-widest uppercase">
                  총금액
                </span>
                <span className="text-primary text-lg font-black tracking-tighter">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-muted/30 flex justify-between gap-2 border-t p-3">
              <div className="flex-1">
                <CopyUrlButton
                  invoiceId={invoice.id}
                  invoiceTitle={invoice.title}
                />
              </div>
              <Button
                variant="default"
                size="sm"
                asChild
                className="shadow-primary/20 flex-1 font-bold shadow-sm"
              >
                <Link href={`/invoice/${invoice.id}`}>
                  <EyeIcon className="mr-1.5 h-3.5 w-3.5" />
                  미리보기
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="bg-card animate-in fade-in slide-in-from-bottom-3 hidden overflow-hidden rounded-xl border shadow-sm duration-700 md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] text-xs font-black tracking-widest uppercase">
                견적서 제목
              </TableHead>
              <TableHead className="text-xs font-black tracking-widest uppercase">
                클라이언트
              </TableHead>
              <TableHead className="text-xs font-black tracking-widest uppercase">
                발행일
              </TableHead>
              <TableHead className="text-right text-xs font-black tracking-widest uppercase">
                총금액
              </TableHead>
              <TableHead className="text-center text-xs font-black tracking-widest uppercase">
                상태
              </TableHead>
              <TableHead className="text-right text-xs font-black tracking-widest uppercase">
                액션
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow
                key={invoice.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <TableCell className="text-foreground/90 font-bold">
                  {invoice.title}
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">
                  {invoice.clientName}
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">
                  {invoice.issueDate}
                </TableCell>
                <TableCell className="text-primary text-right font-black tracking-tight">
                  {formatCurrency(invoice.total)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <InvoiceStatusBadge status={invoice.status} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <CopyUrlButton
                      invoiceId={invoice.id}
                      invoiceTitle={invoice.title}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:bg-primary/10 hover:text-primary h-8 px-2 font-bold"
                    >
                      <Link href={`/invoice/${invoice.id}`}>
                        <EyeIcon className="mr-1 h-3.5 w-3.5" />
                        미리보기
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
