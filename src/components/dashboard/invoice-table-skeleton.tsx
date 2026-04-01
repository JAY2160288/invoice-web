import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function InvoiceTableSkeleton() {
  return (
    <>
      {/* Mobile Card Skeleton */}
      <div className="grid gap-4 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-6 w-[60px] rounded-full" />
              </div>
              <Skeleton className="mt-1 h-4 w-[100px]" />
            </CardHeader>
            <CardContent className="space-y-2 pb-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-4 w-[90px]" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-0">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 flex-1 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
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
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-[80px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-5 w-[90px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[60px] rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-[80px] rounded-md" />
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
