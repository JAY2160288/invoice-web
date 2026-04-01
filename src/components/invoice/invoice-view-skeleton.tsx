import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function InvoiceViewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Skeleton className="h-9 w-[100px]" />
      </div>

      <div className="space-y-6 rounded-lg border p-8">
        {/* Header Skeleton */}
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[60px] rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[40px]" />
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[60px]" />
              <Skeleton className="h-5 w-[100px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[40px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-[50px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Items Table Skeleton */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>품목명</TableHead>
                <TableHead className="text-right">수량</TableHead>
                <TableHead className="text-right">단가</TableHead>
                <TableHead className="text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-[120px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-5 w-[30px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-5 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-5 w-[80px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Skeleton */}
        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[70px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Separator />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-[40px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
