import { Metadata } from 'next'

import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: '로그인',
  description: '계정에 로그인하여 서비스를 이용하세요',
}

export default function LoginPage() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="bg-primary/5 pointer-events-none absolute inset-0 z-0" />
      <div className="bg-primary/10 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        <LoginForm />
      </div>
    </div>
  )
}
