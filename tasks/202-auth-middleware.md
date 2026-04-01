# Task 202: 인증 미들웨어 - 보호 라우트 설정

## 상태: 대기

## 관련 PRD 기능

- F010: 발행자 인증

## 설명

Next.js 미들웨어에서 JWT 쿠키를 검증하여 `/dashboard` 접근을 보호하고,
로그아웃 Server Action을 구현한다.

## 관련 파일

- `src/middleware.ts` — JWT 검증 미들웨어 (신규)
- `src/app/dashboard/actions.ts` — 로그아웃 Server Action (신규)
- `src/components/dashboard/dashboard-header.tsx` — 로그아웃 연동 (수정)

## 수락 기준

- [ ] 비인증 상태에서 `/dashboard` 접근 시 `/login`으로 리디렉션
- [ ] 인증 상태에서 `/login` 접근 시 `/dashboard`로 리디렉션
- [ ] 로그아웃 클릭 시 쿠키 삭제 후 `/login`으로 이동
- [ ] `npm run check-all` 통과

## 구현 단계

### 1단계: 미들웨어
- [ ] `src/middleware.ts` — JWT 쿠키 검증 로직 구현

### 2단계: 로그아웃
- [ ] `src/app/dashboard/actions.ts` — logoutAction 구현
- [ ] `src/components/dashboard/dashboard-header.tsx` — logoutAction 연동

## 테스트 체크리스트

- [ ] 브라우저에서 직접 /dashboard 접근 → /login 리디렉션
- [ ] 로그인 후 /login 재접근 → /dashboard 리디렉션
- [ ] 로그아웃 버튼 클릭 → /login으로 이동 + 쿠키 삭제 확인
