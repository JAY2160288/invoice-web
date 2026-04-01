import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/layout/container'
import { InvoiceView } from '@/components/invoice/invoice-view'
import { InvoiceViewSkeleton } from '@/components/invoice/invoice-view-skeleton'
import { getInvoice } from '@/lib/notion/queries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const invoice = await getInvoice(id)

  if (!invoice) {
    return {
      title: '견적서를 찾을 수 없음',
    }
  }

  return {
    title: `${invoice.title} | ${invoice.clientName}`,
    description: `${invoice.clientName} 귀하 - ${invoice.title} 견적서입니다.`,
  }
}

async function InvoiceContent({ id }: { id: string }) {
  const invoice = await getInvoice(id)

  if (!invoice) notFound()

  return <InvoiceView invoice={invoice} />
}

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="bg-background min-h-screen py-8 print:py-0">
      <Container size="sm">
        <Suspense fallback={<InvoiceViewSkeleton />}>
          <InvoiceContent id={id} />
        </Suspense>
      </Container>
    </div>
  )
}
