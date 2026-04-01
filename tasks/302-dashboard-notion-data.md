# Task 302: 견적서 목록 페이지 - 실제 데이터 연동

## 상태: 대기

## 관련 PRD 기능

- F001, F004: Notion 데이터 연동 + 견적서 목록 관리

## 설명

대시보드 페이지의 더미 데이터를 Notion API 호출로 교체하고
URL 복사, 미리보기, 로그아웃 기능이 실제로 동작하도록 연동한다.

## 관련 파일

- `src/app/dashboard/page.tsx` — Notion API 호출로 교체 (수정)

## 수락 기준

- [ ] 실제 Notion DB 데이터로 견적서 목록 표시
- [ ] 로딩/빈 상태 처리
- [ ] URL 복사 버튼 동작 확인
- [ ] 미리보기 버튼 → /invoice/[notionPageId] 이동

## 테스트 체크리스트

- [ ] /dashboard 접속 후 Notion DB 목록 렌더링 확인
- [ ] URL 복사 버튼 클릭 → 클립보드에 올바른 URL 복사
- [ ] 미리보기 버튼 → 실제 Notion 페이지 ID로 이동
