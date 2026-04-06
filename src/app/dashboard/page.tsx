import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/layout/container'
import { InvoiceTable } from '@/components/dashboard/invoice-table'
import { InvoiceTableSkeleton } from '@/components/dashboard/invoice-table-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInvoiceList } from '@/lib/notion/queries'
import type { InvoiceListItem } from '@/lib/types/invoice'

export const metadata: Metadata = {
  title: '견적서 목록',
}

function StatsCards({ invoices }: { invoices: InvoiceListItem[] }) {
  const total = invoices.length
  const draft = invoices.filter(inv => inv.status === 'draft').length
  const sent = invoices.filter(inv => inv.status === 'sent').length
  const accepted = invoices.filter(inv => inv.status === 'accepted').length
  const rejected = invoices.filter(inv => inv.status === 'rejected').length

  const stats = [
    { label: '전체', value: total },
    { label: '초안', value: draft },
    { label: '발송', value: sent },
    { label: '수락', value: accepted },
    { label: '거절', value: rejected },
  ]

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
      {stats.map(stat => (
        <Card key={stat.label} className="shadow-sm">
          <CardHeader className="pt-4 pb-1">
            <CardTitle className="text-muted-foreground text-xs font-black tracking-widest uppercase">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-foreground text-2xl font-black tracking-tighter">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function InvoiceListSection() {
  const invoices = await getInvoiceList()

  return (
    <>
      <StatsCards invoices={invoices} />

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <h2 className="text-foreground text-3xl font-black tracking-tighter">
            견적서 목록
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            최근 발행된{' '}
            <span className="text-primary font-bold">{invoices.length}개</span>
            의 견적서를 관리하세요
          </p>
        </div>
      </div>
      <div className="bg-card rounded-xl border p-1 shadow-sm sm:p-2">
        <InvoiceTable invoices={invoices} />
      </div>
    </>
  )
}

export default function DashboardPage() {
  return (
    <main className="py-10">
      <Container size="md">
        <Suspense fallback={<InvoiceTableSkeleton />}>
          <InvoiceListSection />
        </Suspense>
      </Container>
    </main>
  )
}
