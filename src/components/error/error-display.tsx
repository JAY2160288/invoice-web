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
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative background elements */}
      <div className="bg-primary/5 pointer-events-none absolute inset-0 z-0" />
      <div className="bg-primary/10 pointer-events-none absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full blur-[100px]" />
      <div className="bg-primary/5 pointer-events-none absolute -right-48 -bottom-48 h-[500px] w-[500px] rounded-full blur-[100px]" />

      <Container size="sm" className="relative z-10">
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center space-y-8 text-center duration-700">
          {code && (
            <div className="relative">
              <span className="bg-primary absolute inset-0 rounded-full opacity-20 blur-2xl" />
              <p className="text-primary relative text-[10rem] leading-none font-black tracking-tighter opacity-20 select-none">
                {code}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h1 className="text-foreground text-4xl font-black tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed sm:text-xl">
              {description}
            </p>
          </div>

          {action && (
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both pt-4 delay-300 duration-1000">
              {action}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
