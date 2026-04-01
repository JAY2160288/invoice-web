'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { signToken } from '@/lib/auth'
import { env } from '@/lib/env'

export interface LoginState {
  success: boolean
  message: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get('password') as string

  if (!password) {
    return { success: false, message: '비밀번호를 입력해 주세요.' }
  }

  if (password !== env.ADMIN_PASSWORD) {
    return { success: false, message: '비밀번호가 올바르지 않습니다.' }
  }

  const token = await signToken()
  const cookieStore = await cookies()

  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })

  redirect('/dashboard')
}
