# Task 301: Notion API 클라이언트 및 데이터 조회 함수 구현

## 상태: 대기

## 관련 PRD 기능

- F001: 노션 데이터 연동

## 설명

`@notionhq/client` 패키지를 설치하고 견적서 목록/상세 조회 함수와
Notion 응답을 앱 도메인 타입으로 변환하는 파서를 구현한다.

## 관련 파일

- `src/lib/notion/client.ts` — Notion 클라이언트 초기화 (신규)
- `src/lib/notion/queries.ts` — 데이터 조회 함수 (신규)
- `src/lib/notion/parsers.ts` — 응답 파서 (신규)
- `src/lib/env.ts` — NOTION_API_KEY, NOTION_DATABASE_ID 필수값으로 강화 (수정)

## Notion API 호출 패턴

```
견적서 목록: databases.query(NOTION_DATABASE_ID)
견적서 상세:
  1. pages.retrieve(pageId)             → 속성 조회
  2. blocks.children.list(pageId)       → 본문 블록 (table 블록 ID)
  3. blocks.children.list(tableBlockId) → table_row 블록 (견적 항목)
```

## 수락 기준

- [ ] 견적서 목록 조회 함수 정상 동작
- [ ] 견적서 상세 조회 함수 정상 동작 (3단계)
- [ ] 파서가 Notion raw 응답을 Invoice 타입으로 변환
- [ ] API 오류 시 적절한 에러 핸들링

## 구현 단계

### 1단계: 의존성
- [ ] `@notionhq/client` 설치

### 2단계: 클라이언트
- [ ] `src/lib/notion/client.ts` — NotionClient 초기화

### 3단계: 조회 함수
- [ ] `src/lib/notion/queries.ts` — getInvoiceList, getInvoice

### 4단계: 파서
- [ ] `src/lib/notion/parsers.ts` — parseInvoiceList, parseInvoice, parseInvoiceItems

## 테스트 체크리스트

- [ ] Notion API 연결 확인 (실제 DB 조회)
- [ ] 견적서 목록 파싱 정확도 확인
- [ ] 견적서 상세(3단계) 파싱 정확도 확인
- [ ] 없는 페이지 ID 조회 시 null/에러 반환 확인
