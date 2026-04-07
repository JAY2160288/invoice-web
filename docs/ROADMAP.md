# Notion 견적서 뷰어 개발 로드맵

프리랜서/솔로 개발자가 Notion DB에서 견적서를 관리하고 클라이언트에게 웹 URL로 공유하는 서비스

## 개요

Notion 견적서 뷰어는 **견적서를 노션으로 관리하는 프리랜서 및 소규모 에이전시**를 위한 웹 기반 견적서 공유 도구로 다음 기능을 제공합니다:

- **노션 데이터 연동**: Notion API를 통해 견적서 데이터를 실시간 조회
- **견적서 웹 뷰어**: 고유 URL 기반으로 견적서를 웹에서 렌더링하고 PDF 다운로드 지원
- **견적서 목록 관리**: 발행자가 견적서 목록을 확인하고 클라이언트 공유 URL을 복사
- **발행자 인증**: 패스워드 + JWT 쿠키 기반 단순 접근 제어
- **오류 처리**: 잘못된 견적서 ID 및 API 오류 시 안내 페이지

## 기술 스택

| 영역        | 기술                                        |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 15.5.3 (App Router + Turbopack)     |
| Language    | TypeScript 5, React 19.1.0                  |
| Styling     | TailwindCSS v4 + shadcn/ui (new-york style) |
| Data Source | Notion API (`@notionhq/client`)             |
| Auth        | jose (JWT) + httpOnly 쿠키                  |
| PDF         | `window.print()` + `@media print` CSS       |
| Deploy      | Vercel                                      |

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 0: 프로젝트 초기 설정 ✅

- **Task 001: Next.js 15.5.3 + shadcn/ui 초기 설정** ✅ - 완료
  - ✅ Next.js 15.5.3 프로젝트 생성 (App Router + Turbopack)
  - ✅ TailwindCSS v4 + shadcn/ui (new-york style) 설정
  - ✅ ESLint + Prettier + Husky + lint-staged 개발 도구 설정
  - ✅ 기본 레이아웃 및 글로벌 스타일 구성

- **Task 002: 페이지 스캐폴딩** ✅ - 완료
  - ✅ `/login` 로그인 페이지 껍데기 생성
  - ✅ `/dashboard` 견적서 목록 페이지 껍데기 생성
  - ✅ `/invoice/[id]` 견적서 뷰어 페이지 껍데기 생성
  - ✅ 루트 페이지(`/`) 리디렉션 설정

### Phase 1: 타입 정의 및 UI 완성 (더미 데이터 활용) ✅

- **Task 101: TypeScript 타입 정의 및 더미 데이터 구성** ✅ - 완료
  - ✅ Notion DB 스키마 기반 TypeScript 인터페이스 정의 (Invoice, InvoiceItem, InvoiceListItem 등)
  - ✅ API 응답 타입 정의
  - ✅ 더미 데이터 생성 (mock-invoices.ts)
  - ✅ 환경변수 타입 정의 (env.ts Zod 스키마)

- **Task 102: 로그인 페이지 UI 구현** ✅ - 완료
  - ✅ 패스워드 단독 입력 폼 구현 (useActionState 방식)
  - ✅ 로그인 버튼 및 에러 메시지 표시 UI
  - ✅ 로딩 상태 및 비밀번호 보기/숨김 토글

- **Task 103: 견적서 목록 페이지 UI 구현** ✅ - 완료
  - ✅ 견적서 테이블 레이아웃 구현
  - ✅ URL 복사 버튼 UI
  - ✅ 미리보기 버튼 UI
  - ✅ 로그아웃 버튼 및 페이지 헤더
  - ✅ 빈 상태(Empty State) UI

- **Task 104: 견적서 뷰어 페이지 UI 구현** ✅ - 완료
  - ✅ 견적서 헤더, 항목 테이블, 합계, 특이사항 영역
  - ✅ PDF 다운로드 버튼 (`window.print()`)
  - ✅ `@media print` CSS 스타일

- **Task 105: 오류 페이지 UI 구현** ✅ - 완료
  - ✅ not-found.tsx / error.tsx 구성
  - ✅ 견적서 전용 404 페이지

### Phase 2: 인증 시스템 구축 ✅

- **Task 201: Server Action - 패스워드 검증 및 JWT 쿠키 발급** ✅ - 완료
  - ✅ `jose` 라이브러리 JWT 토큰 생성/검증 유틸리티 (`src/lib/auth.ts`)
  - ✅ 로그인 Server Action (`src/app/login/actions.ts`)
  - ✅ httpOnly 쿠키에 JWT 저장
  - ✅ 로그인 폼과 Server Action 연동

- **Task 202: 인증 미들웨어 - 보호 라우트 설정** ✅ - 완료
  - ✅ Next.js 미들웨어 JWT 쿠키 검증 (`src/middleware.ts`)
  - ✅ `/dashboard` 미인증 시 `/login`으로 리디렉션
  - ✅ 인증 상태에서 `/login` → `/dashboard` 리디렉션
  - ✅ 로그아웃 Server Action (`src/app/dashboard/actions.ts`)

### Phase 3: Notion API 연동 및 핵심 기능 구현 ✅

- **Task 301: Notion API 클라이언트 및 데이터 조회 함수 구현** ✅ - 완료
  - ✅ `@notionhq/client@2` 클라이언트 초기화 (`src/lib/notion/client.ts`)
  - ✅ 견적서 목록 조회 함수 (`getInvoiceList`)
  - ✅ 견적서 상세 조회 함수 (`getInvoice`, 3단계 API 호출)
  - ✅ Notion 응답 파서 (`src/lib/notion/parsers.ts`) — 한/영 속성명 매핑 포함

- **Task 302: 견적서 목록 페이지 - 실제 데이터 연동** ✅ - 완료
  - ✅ 더미 데이터 → Notion API 호출로 교체
  - ✅ URL 복사 기능 (Clipboard API)

- **Task 303: 견적서 뷰어 페이지 - 실제 데이터 연동** ✅ - 완료
  - ✅ 더미 데이터 → Notion API 호출로 교체
  - ✅ 금액 계산 (quantity × unit_price, 소계, 부가세, 합계)
  - ✅ 잘못된 ID 접근 시 404 처리

- **Task 304: 핵심 기능 통합 테스트** ✅ - 완료
  - ✅ Notion DB 실제 데이터 4건 생성 (INV-2024-001~004)
  - ✅ 빌드 성공 확인 (`npm run build`)
  - ✅ check-all 통과 (typecheck + lint + format)

### Phase 4: 최적화 및 배포 ✅

- **Task 401: 빌드 최적화 및 배포 설정** ✅ - 완료
  - ✅ Next.js 빌드 최적화 (unstable_cache 기반 API 캐싱 적용)
  - ✅ Vercel 배포 설정 (vercel.json 보안 헤더) 및 환경변수 구성 (.env.example)
  - ✅ 메타데이터 및 SEO 설정 (기본 레이아웃 및 견적서 동적 메타데이터)
  - ✅ 데이터 로딩 최적화 (Suspense 및 Skeleton UI 적용)

- **Task 402: 최종 품질 검증 및 배포** ✅ - 완료
  - ✅ 크로스 브라우저 및 빌드 무결성 검증 (npm run build 성공)
  - ✅ 모바일 반응형 고도화 (대시보드 카드 레이아웃 적용)
  - ✅ 인쇄(PDF) 출력 품질 및 디자인 고도화
  - ✅ 데이터 정확도 개선 (아이템 기반 합계 재계산 및 상세 설명 추가)

### Phase 5: 관리자 기능 구축 등 고도화 ✅

- **Task 501: 관리자 레이아웃 고도화** ✅ - 완료
  - ✅ `DashboardHeader` 컴포넌트 UI 개선 (로고 영역 리디자인, 네비게이션 구조 정비)
  - ✅ 관리자 전용 레이아웃 컴포넌트 분리 (`src/app/dashboard/layout.tsx` 도입)
  - ✅ 헤더에 견적서 총 건수, 최근 발행일 등 요약 정보 표시
  - ✅ 대시보드 페이지 상단 통계 카드 영역 추가 (총 견적서 수, 상태별 건수)
  - ✅ 반응형 사이드바/헤더 전환 구조 검토 및 모바일 햄버거 메뉴 개선

- **Task 502: 다크 모드 기능 완성** ✅ - 완료
  - ✅ `ThemeToggle` 컴포넌트를 `DashboardHeader`에 연결 (로그아웃 버튼 좌측 배치)
  - ✅ 견적서 뷰어 페이지(`/invoice/[id]`) 다크 모드 색상 대응 완성 (배경, 텍스트, 테이블 border)
  - ✅ 인보이스 뷰어 각 섹션별 다크 모드 스타일 검증 (`invoice-header`, `invoice-items-table`, `invoice-summary`, `invoice-notes`)
  - ✅ `@media print` 스타일에서 다크 모드 무시 처리 (인쇄 시 항상 라이트 모드 출력)
  - ✅ 로그인 페이지 다크 모드 대응 확인 및 미세 조정
  - ✅ Playwright MCP로 테마 전환 E2E 테스트 수행 (라이트/다크/시스템 모드 전환 검증)

- **Task 503: 견적서 목록 링크 복사 UX 개선** ✅ - 완료
  - ✅ `CopyUrlButton`에 shadcn/ui `Sonner` (toast) 연동하여 복사 완료 알림 표시
  - ✅ 복사 성공/실패 시 toast 메시지 분기 처리 (Clipboard API 미지원 브라우저 대응)
  - ✅ 복사 버튼 hover 시 URL 미리보기 툴팁 추가 (`Tooltip` 컴포넌트 활용)
  - ✅ 복사된 URL에 견적서 제목을 포함한 공유 텍스트 포맷 적용 (예: `[견적서명] - URL`)
  - ✅ Playwright MCP로 복사 기능 E2E 테스트 수행 (복사 동작, toast 표시, 버튼 상태 전환 검증)

### Phase 6: 이메일 공유 기능 추가

- **Task 601: 이메일로 견적서 공유 기능**
  - ⬜ `ShareEmailButton` Client Component 신규 생성 (`src/components/dashboard/share-email-button.tsx`)
  - ⬜ `mailto:` 링크 방식 구현 (별도 서버/API 불필요)
    - 클릭 시 기본 이메일 앱 열기
    - 제목: `[견적서명] 견적서 공유`
    - 본문 기본 템플릿: 정중한 안내 문구 포함

      ```
      안녕하세요.

      요청하신 견적서를 보내드립니다.

      [견적서명]
      [URL]

      감사합니다.
      ```

  - ⬜ UI 일관성 유지 — 기존 `CopyUrlButton`과 동일한 스타일 기준 적용
    - 동일한 shadcn/ui Button `variant`, `size`
    - 아이콘 크기 및 여백 통일
    - Tooltip 사용 방식 동일 (`TooltipProvider > Tooltip > TooltipTrigger > TooltipContent`)
  - ⬜ `InvoiceTable` 컴포넌트(`src/components/dashboard/invoice-table.tsx`)에 URL 복사 버튼 옆 배치
  - ⬜ 모바일 반응형 레이아웃 유지 (버튼 2개 나란히 배치)
