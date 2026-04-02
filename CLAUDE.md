# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 앱 개요

**Notion 견적서 뷰어** — 프리랜서/솔로 개발자가 Notion 데이터베이스로 관리하는 견적서를 클라이언트에게 웹 URL로 공유하고 PDF 다운로드할 수 있게 하는 서비스.

- 관리자: 로그인 후 대시보드에서 견적서 목록 확인 및 URL 공유
- 클라이언트: 인증 없이 `/invoice/[id]` URL로 견적서 열람 및 PDF 저장

## 명령어

```bash
npm run dev          # Turbopack 개발 서버
npm run build        # 프로덕션 빌드
npm run typecheck    # TypeScript 타입 검사
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npm run check-all    # typecheck + lint + format:check 통합 (커밋 전 필수)

npx shadcn@latest add <component>  # shadcn/ui 컴포넌트 추가
```

## 라우팅 구조

| 경로            | 파일                        | 인증     | 설명                                           |
| --------------- | --------------------------- | -------- | ---------------------------------------------- |
| `/`             | `app/page.tsx`              | -        | `/login` 리디렉션                              |
| `/login`        | `app/login/page.tsx`        | 공개     | 관리자 로그인 (인증된 사용자는 `/dashboard`로) |
| `/dashboard`    | `app/dashboard/page.tsx`    | JWT 필수 | 견적서 목록 + URL 복사                         |
| `/invoice/[id]` | `app/invoice/[id]/page.tsx` | 공개     | 견적서 뷰어 (Notion 페이지 ID)                 |

`src/proxy.ts` (Edge Runtime 미들웨어): `/dashboard` 접근 시 JWT 검증, 미인증 시 `/login` 리디렉션.

## 인증 흐름

```
loginAction (app/login/actions.ts)
  → ADMIN_PASSWORD 비교 → signToken() → httpOnly JWT 쿠키 (7일)
  → /dashboard 리디렉션

logoutAction (app/dashboard/actions.ts)
  → 쿠키 삭제 → /login 리디렉션
```

JWT 유틸: `src/lib/auth.ts` (jose, HS256). 환경변수 `JWT_SECRET`은 32자 이상 필수.

## Notion 데이터 연동

**2개 데이터베이스 구조:**

- `NOTION_DATABASE_ID`: 견적서 메타데이터 (제목, 고객명, 발행일, 상태 등)
- `NOTION_ITEMS_DB_ID`: 견적 항목 (relation으로 견적서 DB에 연결)

**핵심 파일:**

- `src/lib/notion/queries.ts`: `getInvoiceList()`, `getInvoice(id)` — `unstable_cache` 적용 (각각 60초, 30초)
- `src/lib/notion/parsers.ts`: Notion 응답 → TypeScript 타입 변환. 한/영 속성명 양쪽 지원 (예: `'client_name'` & `'클라이언트명'`)
- `src/lib/notion/client.ts`: Notion API 클라이언트 초기화

## 도메인 모델

`src/lib/types/invoice.ts`:

- `InvoiceStatus`: `'draft' | 'sent' | 'accepted' | 'rejected'`
- `InvoiceItem`: `{ name, description?, quantity, unitPrice, amount }`
- `Invoice`: 전체 견적서 (items 배열, subtotal/taxAmount/total 계산 포함)
- `InvoiceListItem`: 목록용 축약 타입

## 핵심 패턴

**Server / Client Component 경계**

- 기본은 Server Component (데이터 페칭, 인증 검증)
- `'use client'` 선언 필요한 경우: 폼 입력, 이벤트 핸들링, 상태 관리

**폼 처리 — `useActionState` + Server Action**

```tsx
// 'use client'
const [state, formAction, isPending] = useActionState(loginAction, initialState)
<form action={formAction}>...</form>
```

`LoginForm` (`src/components/login-form.tsx`)이 이 패턴의 유일한 예시.

**PDF 다운로드**
`window.print()` + `globals.css`의 `@media print` 스타일. html2canvas 미사용 (한글 폰트 이슈).

**경로 별칭**
항상 `@/` 별칭 사용 (`@/*` → `src/*`). 상대 경로 금지.

**Notion ID**
URL 파라미터 `[id]`는 하이픈 없는 형태. 내부에서 Notion API 형식으로 변환.

## 환경변수 (필수)

```bash
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=...         # 견적서 메타 DB
NOTION_ITEMS_DB_ID=...         # 견적 항목 DB
ADMIN_PASSWORD=...
JWT_SECRET=...                 # 32자 이상
```

`src/lib/env.ts`에서 Zod로 시작 시 검증. `.env.example` 참고.

## 개발 가이드 문서

- `docs/PRD.md` — 제품 요구사항
- `docs/ROADMAP.md` — 개발 로드맵 (Phase 0~4 완료)
- `docs/guides/` — 스타일링, 컴포넌트 패턴, 폼 처리, Next.js 15 가이드
