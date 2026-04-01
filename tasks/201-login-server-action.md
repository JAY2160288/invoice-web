# Task 201: Server Action - 패스워드 검증 및 JWT 쿠키 발급

## 상태: 진행 중

## 관련 PRD 기능

- F010: 발행자 인증

## 설명

`jose` 라이브러리를 사용한 JWT 토큰 생성/검증 유틸리티를 구현하고,
로그인 Server Action을 통해 환경변수 `ADMIN_PASSWORD`와 비교 후 httpOnly 쿠키에 JWT 저장.

## 관련 파일

- `src/lib/auth.ts` — JWT sign/verify 유틸리티 (신규)
- `src/app/login/actions.ts` — 로그인 Server Action (신규)
- `src/components/login-form.tsx` — useActionState 연동 (수정)
- `src/lib/env.ts` — JWT_SECRET, ADMIN_PASSWORD 필수값으로 강화 (수정)

## 수락 기준

- [ ] 올바른 비밀번호 입력 시 `/dashboard`로 리디렉션
- [ ] 잘못된 비밀번호 입력 시 에러 메시지 표시
- [ ] `auth_token` httpOnly 쿠키 설정 확인
- [ ] `npm run check-all` 통과
- [ ] `npm run build` 성공

## 구현 단계

### 1단계: 의존성 설치
- [x] `jose` 패키지 설치

### 2단계: 유틸리티 구현
- [ ] `src/lib/auth.ts` — signToken, verifyToken 구현
- [ ] `src/lib/env.ts` — JWT_SECRET, ADMIN_PASSWORD 필수값으로 변경

### 3단계: Server Action 구현
- [ ] `src/app/login/actions.ts` — loginAction 구현

### 4단계: 폼 연동
- [ ] `src/components/login-form.tsx` — useActionState 연동

## 테스트 체크리스트

- [ ] 올바른 비밀번호(admin1234) 입력 → /dashboard 리디렉션
- [ ] 빈 폼 제출 → 에러 메시지
- [ ] 잘못된 비밀번호 → "비밀번호가 올바르지 않습니다" 메시지
- [ ] DevTools > Application > Cookies에서 auth_token(httpOnly) 확인
