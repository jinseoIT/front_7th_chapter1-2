# Story: 반복 일정 수정 - 전체 인스턴스

## 목표(Objective)

사용자가 반복 일정 전체를 한 번에 수정할 수 있어야 한다.

## 세부 요구사항(Requirements)

- 확인 문구: “해당 일정만 수정하시겠어요?”
- "아니오" 선택 시 반복 일정의 모든 인스턴스에 변경을 적용한다.
- 반복 아이콘은 유지된다.

## 수용 기준(Acceptance Criteria)

- [ ] 전체 수정 후 모든 인스턴스에 변경이 일관되게 반영된다.
- [ ] 반복 아이콘이 유지된다.

## 테스트 케이스(Test Cases)

1. 반복 일정 제목/시간 변경 → 전체 수정 → 모든 인스턴스에 동일하게 반영
2. 시각적 표기(아이콘) 유지 확인

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: SeriesEditService, CalendarView
- Test Units: updateSeriesEvents, renderSeriesIcon

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
