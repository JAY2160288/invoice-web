export type InvoiceStatus = 'draft' | 'sent' | 'accepted' | 'rejected'

export interface InvoiceItem {
  name: string
  description?: string
  quantity: number
  unitPrice: number
  amount: number // quantity × unitPrice
}

export interface Invoice {
  id: string
  title: string
  clientName: string
  issueDate: string // YYYY-MM-DD
  dueDate: string // YYYY-MM-DD
  status: InvoiceStatus
  items: InvoiceItem[]
  taxRate: number // 기본 0.1 (10%)
  subtotal: number // Σ(item.amount)
  taxAmount: number // subtotal × taxRate
  total: number // subtotal + taxAmount
  notes?: string
  senderName: string
  senderContact: string
}

export interface InvoiceListItem {
  id: string
  title: string
  clientName: string
  issueDate: string
  status: InvoiceStatus
  total: number
}

// Notion API raw 응답 타입 (Phase 3에서 실제 사용)
export interface NotionInvoicePageProperties {
  title: { title: Array<{ plain_text: string }> }
  client_name: { rich_text: Array<{ plain_text: string }> }
  issue_date: { date: { start: string } | null }
  due_date: { date: { start: string } | null }
  status: { select: { name: InvoiceStatus } | null }
  tax_rate: { number: number | null }
  notes: { rich_text: Array<{ plain_text: string }> }
  sender_name: { rich_text: Array<{ plain_text: string }> }
  sender_contact: { rich_text: Array<{ plain_text: string }> }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
