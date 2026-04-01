'use client'

import { useActionState, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '@/app/login/actions'

const initialState = { success: false, message: '' }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  )
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="border-muted/50 mx-auto w-full max-w-md shadow-xl">
      <CardHeader className="space-y-4 pt-10 pb-8">
        <div className="flex justify-center">
          <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl">
            <EyeIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            로그인
          </CardTitle>
          <CardDescription className="text-base">
            관리자 계정으로 접속하여 견적서를 관리하세요
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <form action={formAction} className="space-y-6">
          {state.message && !state.success && (
            <Alert
              variant="destructive"
              className="animate-in fade-in zoom-in duration-300"
            >
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold tracking-wide"
            >
              비밀번호
            </Label>
            <div className="group relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="관리자 비밀번호"
                className="border-muted-foreground/20 focus-visible:ring-primary h-12 pr-12 text-lg transition-all"
                required
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary absolute top-0 right-0 h-full w-12 transition-colors hover:bg-transparent"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="shadow-primary/20 hover:shadow-primary/30 h-12 w-full text-lg font-bold shadow-lg transition-all active:scale-[0.98]"
            disabled={isPending}
          >
            {isPending ? '로그인 처리 중...' : '로그인'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
