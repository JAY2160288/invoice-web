import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/layout/container'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { InvoiceTable } from '@/components/dashboard/invoice-table'
import { InvoiceTableSkeleton } from '@/components/dashboard/invoice-table-skeleton'
import { getInvoiceList } from '@/lib/notion/queries'

export const metadata: Metadata = {
  title: '견적서 목록',
}

async function InvoiceListSection() {
  const invoices = await getInvoiceList()

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight">
            견적서 목록
          </h2>
          <p className="text-muted-foreground text-base">
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
    <div className="bg-muted/30 min-h-screen">
      <DashboardHeader />
      <main className="py-10">
        <Container size="md">
          <Suspense fallback={<InvoiceTableSkeleton />}>
            <InvoiceListSection />
          </Suspense>
        </Container>
      </main>
    </div>
  )
}
