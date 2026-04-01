interface InvoiceNotesProps {
  notes: string
}

export function InvoiceNotes({ notes }: InvoiceNotesProps) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        특이사항 / 지불 조건
      </p>
      <p className="text-sm whitespace-pre-wrap">{notes}</p>
    </div>
  )
}
