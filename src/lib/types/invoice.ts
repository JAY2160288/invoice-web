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
