import { unstable_cache } from 'next/cache'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import type { Invoice, InvoiceItem, InvoiceListItem } from '@/lib/types/invoice'
import { env } from '@/lib/env'
import { notion } from './client'
import {
  getNumber,
  parseInvoiceListItem,
  parseInvoicePage,
  parseRelationItems,
  pick,
} from './parsers'

export const getInvoiceList = unstable_cache(
  async (): Promise<InvoiceListItem[]> => {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    })

    const pages = response.results as PageObjectResponse[]
    if (pages.length === 0) return []

    const pageIds = pages.map(p => p.id)

    const itemsResponse = await notion.databases.query({
      database_id: env.NOTION_ITEMS_DB_ID,
      filter: {
        or: pageIds.map(id => ({
          property: 'invoice',
          relation: { contains: id },
        })),
      },
    })

    const allItems = parseRelationItems(
      itemsResponse.results as PageObjectResponse[]
    )

    const subtotalMap: Record<string, number> = {}
    allItems.forEach(item => {
      if (item.invoiceId) {
        subtotalMap[item.invoiceId] =
          (subtotalMap[item.invoiceId] || 0) + item.amount
      }
    })

    return pages.map(page => {
      const item = parseInvoiceListItem({
        id: page.id,
        properties: page.properties as Record<string, unknown>,
      })

      const subtotal = subtotalMap[page.id]
      if (subtotal !== undefined) {
        const p = page.properties as Record<string, unknown>
        const taxRate = getNumber(pick(p, '부가세율', 'tax_rate')) || 0.1
        item.total = Math.round(subtotal * (1 + taxRate))
      }

      return item
    })
  },
  ['invoice-list'],
  { revalidate: 60, tags: ['invoices'] }
)

export const getInvoice = unstable_cache(
  async (pageId: string): Promise<Invoice | null> => {
    // URL에서 전달된 하이픈 없는 ID → Notion 형식(하이픈 포함)으로 변환
    const notionPageId = pageId.replace(
      /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/,
      '$1-$2-$3-$4-$5'
    )

    try {
      const [page, itemsResponse] = await Promise.all([
        notion.pages.retrieve({
          page_id: notionPageId,
        }) as Promise<PageObjectResponse>,
        notion.databases.query({
          database_id: env.NOTION_ITEMS_DB_ID,
          filter: {
            property: 'invoice',
            relation: { contains: notionPageId },
          },
        }),
      ])

      const items: InvoiceItem[] = parseRelationItems(
        itemsResponse.results as PageObjectResponse[]
      )

      return parseInvoicePage(
        {
          id: page.id,
          properties: page.properties as Record<string, unknown>,
        },
        items
      )
    } catch (error) {
      const notionError = error as { code?: string }
      if (
        notionError?.code === 'object_not_found' ||
        notionError?.code === 'validation_error'
      ) {
        return null
      }
      throw error
    }
  },
  ['invoice-detail'],
  { revalidate: 30, tags: ['invoices'] }
)
