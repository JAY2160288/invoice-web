'use client'

import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground text-lg font-medium">
          등록된 견적서가 없습니다
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Notion DB에 견적서를 추가하면 여기에 표시됩니다.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {invoices.map(invoice => (
          <Card key={invoice.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="line-clamp-1 text-base font-bold">
                  {invoice.title}
                </CardTitle>
                <InvoiceStatusBadge status={invoice.status} />
              </div>
              <p className="text-muted-foreground text-sm">
                {invoice.clientName}
              </p>
            </CardHeader>
            <CardContent className="pb-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">발행일</span>
                <span>{invoice.issueDate}</span>
              </div>
              <div className="mt-1 flex justify-between font-bold">
                <span>총금액</span>
                <span className="text-primary">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-0">
              <CopyUrlButton invoiceId={invoice.id} />
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href={`/invoice/${invoice.id}`}>
                  <EyeIcon className="mr-1 h-4 w-4" />
                  미리보기
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>견적서 제목</TableHead>
              <TableHead>클라이언트</TableHead>
              <TableHead>발행일</TableHead>
              <TableHead className="text-right">총금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(invoice.total)}
                </TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <CopyUrlButton invoiceId={invoice.id} />
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/invoice/${invoice.id}`}>
                        <EyeIcon className="mr-1 h-4 w-4" />
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
