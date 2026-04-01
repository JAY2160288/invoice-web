import { Container } from '@/components/layout/container'

interface ErrorDisplayProps {
  code?: string
  title: string
  description: string
  action?: React.ReactNode
}

export function ErrorDisplay({
  code,
  title,
  description,
  action,
}: ErrorDisplayProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container size="sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          {code && (
            <p className="text-muted-foreground text-8xl font-bold">{code}</p>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          {action && <div className="pt-2">{action}</div>}
        </div>
      </Container>
    </div>
  )
}
