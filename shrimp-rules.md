# Development Guidelines — Notion Invoice Viewer

## 1. Project Overview

- **목적**: 프리랜서가 Notion DB에 작성한 견적서를 클라이언트가 웹 URL로 확인하고 PDF로 저장
- **스택**: Next.js 15.5.3 (App Router + Turbopack) · React 19 · TypeScript 5 · TailwindCSS v4 · shadcn/ui (new-york) · React Hook Form + Zod · jose (JWT) · @notionhq/client · Vercel
- **현재 단계**: Phase 0 완료(초기 설정), Phase 1 진행 예정(UI 구현)

---

## 2. Route Architecture

| 경로            | 파일                            | 인증     | 설명                   |
| --------------- | ------------------------------- | -------- | ---------------------- |
| `/`             | `src/app/page.tsx`              | 불필요   | `/login`으로 리디렉션  |
| `/login`        | `src/app/login/page.tsx`        | 불필요   | 발행자 로그인          |
| `/dashboard`    | `src/app/dashboard/page.tsx`    | **필요** | 견적서 목록 관리       |
| `/invoice/[id]` | `src/app/invoice/[id]/page.tsx` | 불필요   | 클라이언트 견적서 뷰어 |

- 새 페이지 추가 시 `src/app/[route]/page.tsx` 생성
- 보호 라우트는 반드시 Next.js middleware에서 JWT 쿠키 검증으로 처리
- 동적 라우트 params는 Next.js 15에서 **async**로 받아야 함: `{ params }: { params: Promise<{ id: string }> }` 후 `const { id } = await params`

---

## 3. Component Structure

```
src/components/
├── ui/           # shadcn/ui 컴포넌트만 (비즈니스 로직 금지)
├── layout/       # 레이아웃 컴포넌트 (container.tsx 등)
├── providers/    # React Context 프로바이더
└── [feature].tsx # 기능별 컴포넌트 (login-form.tsx 등)
```

- `src/components/ui/` 에는 `npx shadcn@latest add` 명령으로만 추가
- 커스텀 비즈니스 컴포넌트는 `src/components/` 직접 하위에 kebab-case로 생성
- 파일명: kebab-case (`invoice-table.tsx`) / 컴포넌트명: PascalCase (`InvoiceTable`)
- 모든 import는 `@/` 경로 별칭 사용 (상대경로 금지)
- 파일 300줄 초과 시 분할

---

## 4. Server vs Client Components

- **데이터 페칭** (Notion API 호출): Server Component 필수
- **인터랙션** (폼, 버튼 onClick, useState): `'use client'` 선언 필수
- Server Component에서 Client Component로 데이터를 props로 전달하는 패턴 사용
- Notion API 키는 **절대 클라이언트 컴포넌트에서 호출 금지**

---

## 5. Notion API Integration

**환경변수**:

```
NOTION_API_KEY          # Notion Integration API 키
NOTION_DATABASE_ID      # 견적서 데이터베이스 ID
ADMIN_PASSWORD          # 발행자 로그인 패스워드
```

**호출 패턴** (`src/lib/notion.ts` 또는 `src/lib/api/` 하위에 구현):

```
견적서 목록: databases.query(NOTION_DATABASE_ID)
견적서 상세:
  1. pages.retrieve(pageId)               → 속성 (제목, 클라이언트명, 발행일 등)
  2. blocks.children.list(pageId)         → 본문 블록 (table 블록 ID 획득)
  3. blocks.children.list(tableBlockId)   → table_row 블록 (견적 항목)
```

- 금액 계산: `amount = quantity × unit_price` (프론트엔드 계산, Notion 수식 미사용)
- Notion API 응답 → 앱 도메인 타입 변환 파서 반드시 분리 구현
- `src/lib/env.ts`에 `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `ADMIN_PASSWORD` 추가 필요

---

## 6. Authentication Pattern

- **방식**: 환경변수 `ADMIN_PASSWORD`와 단순 비교 (이메일 없음, 패스워드 단독)
- **토큰**: `jose` 라이브러리로 JWT 서명 → httpOnly 쿠키 저장
- **구현 위치**:
  - 로그인 Server Action: `src/app/login/actions.ts` (또는 `src/lib/auth.ts`)
  - 미들웨어 검증: `src/middleware.ts`
  - 로그아웃 Server Action: 쿠키 삭제

**주의**: 현재 `src/components/login-form.tsx`는 이메일+패스워드 폼 — PRD에 맞게 **패스워드 전용 폼**으로 교체 필요 (Task 102)

---

## 7. PDF Export

- **방법**: `window.print()` + `@media print` CSS
- **금지**: `html2canvas` 사용 금지 (한글 폰트 이슈, 미업데이트)
- PDF 전용 스타일은 `globals.css` 또는 컴포넌트 내 `@media print` 블록에 작성
- 인쇄 시 버튼/헤더 등 UI 요소 숨김 처리: `print:hidden` Tailwind 클래스 사용

---

## 8. TypeScript Types

- 도메인 타입 정의 위치: `src/lib/types/` 하위 (예: `invoice.ts`, `auth.ts`)
- Notion API raw 응답 타입과 앱 도메인 타입을 분리
- 환경변수 타입: `src/lib/env.ts`에 Zod 스키마로 검증

**핵심 타입** (Task 101에서 정의):

```typescript
;(Invoice, InvoiceItem, InvoiceListItem) // 도메인 타입
NotionInvoiceRaw // API 응답 원본
```

---

## 9. Task Workflow

1. `/tasks/` 디렉토리에 `XXX-description.md` 형식 작업 파일 생성
2. 작업 파일 포함 항목: 명세, 관련 파일, 수락 기준, 구현 단계
3. API/비즈니스 로직 작업 시 `## 테스트 체크리스트` 섹션 필수 (Playwright MCP 시나리오)
4. 구현 완료 후 `docs/ROADMAP.md`에서 해당 Task를 체크(완료) 표시
5. 각 단계 완료 후 중단하고 추가 지시 대기

---

## 10. Testing with Playwright MCP

**필수 테스트 시점**:

- API 연동 및 비즈니스 로직 구현 완료 후
- 인증 플로우 (로그인/로그아웃/보호 라우트) 구현 후
- Notion 데이터 연동 페이지 구현 후

**테스트 전 개발 서버 실행**: `npm run dev` (포트 3000)

---

## 11. Code Quality

```bash
npm run check-all   # typecheck + lint + format 통합 검사 (커밋 전 필수)
npm run build       # 빌드 성공 확인
```

- Husky pre-commit hook: lint-staged 자동 실행
- 커밋 메시지: Conventional Commits (영어) + 이모지

---

## 12. Prohibited Actions

- 클라이언트 컴포넌트에서 Notion API 직접 호출
- `html2canvas` 사용
- 로그인 폼에 이메일 필드 추가 (패스워드만 사용)
- `@notionhq/client`, `jose` 미설치 상태에서 관련 코드 작성
- 상대 경로 import (`../../../components/...`)
- `src/components/ui/` 에 직접 커스텀 컴포넌트 생성 (shadcn/ui 전용 폴더)
- `window.print()` 없이 PDF 기능 구현
- `docs/ROADMAP.md` 업데이트 없이 작업 완료 처리
