# Story: 반복 일정 아이콘 표시

## 목표(Objective)

반복 일정은 캘린더 뷰에서 아이콘으로 명확히 구분되어야 한다.

## 세부 요구사항(Requirements)

- 반복 일정에 반복 아이콘을 표시한다.
- 월/주/일 뷰에서 일관된 표기 규칙을 적용한다.
- 접근성 라벨을 제공한다.

## 수용 기준(Acceptance Criteria)

- [ ] 반복 일정에만 아이콘이 표시된다.
- [ ] 스크린리더에서 반복 일정임을 인식 가능하다.
- [ ] 대량 렌더링 시 성능에 문제가 없다.

## 테스트 케이스(Test Cases)

1. 반복/일반 일정 혼합 목록 렌더링 → 반복 일정에만 아이콘 표시 확인
2. 탭/키보드 포커스 시 aria-label이 읽히는지 확인

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: CalendarView, AccessibilityUtils
- Test Units: renderEventIcon, assertAriaLabel

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
