import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import type {
  Invoice,
  InvoiceItem,
  InvoiceListItem,
  InvoiceStatus,
} from '@/lib/types/invoice'

// Notion 속성 타입 헬퍼
function getRichText(prop: unknown): string {
  const p = prop as { rich_text?: Array<{ plain_text: string }> } | null
  return p?.rich_text?.map(t => t.plain_text).join('') ?? ''
}

function getTitle(prop: unknown): string {
  const p = prop as { title?: Array<{ plain_text: string }> } | null
  return p?.title?.map(t => t.plain_text).join('') || '(제목 없음)'
}

function getDate(prop: unknown): string {
  const p = prop as { date?: { start: string } | null } | null
  return p?.date?.start ?? ''
}

function getSelect(prop: unknown): InvoiceStatus {
  const p = prop as { select?: { name: string } | null } | null
  const value = p?.select?.name?.toLowerCase() as InvoiceStatus
  const valid: InvoiceStatus[] = ['draft', 'sent', 'accepted', 'rejected']
  return valid.includes(value) ? value : 'draft'
}

export function getNumber(prop: unknown): number {
  const p = prop as { number?: number | null } | null
  return p?.number ?? 0
}

function getRelationId(prop: unknown): string {
  const p = prop as { relation?: Array<{ id: string }> } | null
  return p?.relation?.[0]?.id ?? ''
}

// 한/영 양쪽 property 이름 모두 지원
export function pick(
  props: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const key of keys) {
    if (props[key] !== undefined) return props[key]
  }
  return undefined
}

export function parseInvoiceListItem(page: {
  id: string
  properties: Record<string, unknown>
}): InvoiceListItem {
  const p = page.properties
  return {
    id: page.id.replaceAll('-', ''), // URL에서 사용하기 편한 형태로
    title: getTitle(pick(p, 'title', '제목', 'Name', '견적서번호')),
    clientName: getRichText(
      pick(p, 'client_name', '클라이언트명', '클라이언트', 'Client Name')
    ),
    issueDate: getDate(pick(p, 'issue_date', '발행일', 'Invoice Date')),
    status: getSelect(pick(p, 'status', '상태', 'Payment Status')),
    // 목록에서 total은 Notion DB에 number 속성으로 존재할 경우 사용, 없으면 0
    total: getNumber(
      pick(p, 'total', '합계', '총금액', 'total_amount', 'Invoice Amount')
    ),
  }
}

export function parseInvoicePage(
  page: { id: string; properties: Record<string, unknown> },
  items: InvoiceItem[]
): Invoice {
  const p = page.properties
  const taxRate = getNumber(pick(p, 'tax_rate', '부가세율')) || 0.1
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = Math.round(subtotal * taxRate)

  return {
    id: page.id.replaceAll('-', ''),
    title: getTitle(pick(p, 'title', '제목', 'Name', '견적서번호')),
    clientName: getRichText(
      pick(p, 'client_name', '클라이언트명', '클라이언트', 'Client Name')
    ),
    issueDate: getDate(pick(p, 'issue_date', '발행일', 'Invoice Date')),
    dueDate: getDate(pick(p, 'due_date', '유효기간', '만료일')),
    status: getSelect(pick(p, 'status', '상태', 'Payment Status')),
    items,
    taxRate,
    subtotal,
    taxAmount,
    total: subtotal + taxAmount,
    notes: getRichText(pick(p, 'notes', '특이사항', '메모', '비고')),
    senderName: getRichText(pick(p, 'sender_name', '발행자', '발행자명')),
    senderContact: getRichText(
      pick(p, 'sender_contact', '발행자연락처', '연락처')
    ),
  }
}

// items DB relation 쿼리 결과 파싱
export function parseRelationItems(
  pages: PageObjectResponse[]
): (InvoiceItem & { invoiceId?: string })[] {
  return pages
    .map(page => {
      const p = page.properties as Record<string, unknown>
      const name = getTitle(p['항목명'] || p['Name'])
      const quantity = getNumber(p['수량'] || p['Quantity']) || 1
      const unitPrice = getNumber(p['단가'] || p['Unit Price'])
      const description = getRichText(
        pick(p, '설명', 'description', 'Description')
      )
      const invoiceId = getRelationId(pick(p, 'invoice', '견적서'))

      return {
        name,
        description: description || undefined,
        quantity,
        unitPrice,
        amount: Math.round(quantity * unitPrice),
        invoiceId,
      }
    })
    .filter(item => item.name.trim() !== '')
}
