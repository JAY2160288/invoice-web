import type { Invoice, InvoiceListItem } from '@/lib/types/invoice'

// 견적서 뷰어 페이지(Task 104)용 단일 견적서 더미 데이터
export const mockInvoice: Invoice = {
  id: 'mock-invoice-001',
  title: '웹사이트 개발 견적서',
  clientName: '(주)테크스타트',
  issueDate: '2026-03-15',
  dueDate: '2026-04-15',
  status: 'sent',
  items: [
    {
      name: '기획 및 설계',
      description: '요구사항 분석, 와이어프레임 작성',
      quantity: 1,
      unitPrice: 800000,
      amount: 800000,
    },
    {
      name: '프론트엔드 개발',
      description: 'Next.js 기반 반응형 UI 구현',
      quantity: 10,
      unitPrice: 500000,
      amount: 5000000,
    },
    {
      name: '백엔드 API 개발',
      description: 'REST API 설계 및 구현',
      quantity: 8,
      unitPrice: 600000,
      amount: 4800000,
    },
    {
      name: '배포 및 운영 설정',
      quantity: 1,
      unitPrice: 400000,
      amount: 400000,
    },
  ],
  taxRate: 0.1,
  subtotal: 11000000,
  taxAmount: 1100000,
  total: 12100000,
  notes:
    '계약금 50% 선불, 잔금은 납품 후 7일 이내\n수정사항은 계약 범위 내 1회 무상 처리',
  senderName: '홍길동 / 프리랜서 개발자',
  senderContact: 'gildong@example.com | 010-1234-5678',
}

// 견적서 목록 페이지(Task 103)용 더미 데이터 — 모든 상태 포함
export const mockInvoiceList: InvoiceListItem[] = [
  {
    id: 'mock-invoice-001',
    title: '웹사이트 개발 견적서',
    clientName: '(주)테크스타트',
    issueDate: '2026-03-15',
    status: 'sent',
    total: 12100000,
  },
  {
    id: 'mock-invoice-002',
    title: '모바일 앱 UI/UX 디자인',
    clientName: '스타트업ABC',
    issueDate: '2026-03-20',
    status: 'accepted',
    total: 5500000,
  },
  {
    id: 'mock-invoice-003',
    title: '데이터 분석 대시보드',
    clientName: '데이터코프',
    issueDate: '2026-03-25',
    status: 'draft',
    total: 8800000,
  },
  {
    id: 'mock-invoice-004',
    title: 'API 연동 작업',
    clientName: '커머스X',
    issueDate: '2026-02-10',
    status: 'rejected',
    total: 3300000,
  },
]
