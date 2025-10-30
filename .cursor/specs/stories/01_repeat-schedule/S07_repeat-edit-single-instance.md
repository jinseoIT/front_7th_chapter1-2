# Story: 반복 일정 수정 - 단일 인스턴스

## 목표(Objective)

사용자가 반복 일정에서 특정 인스턴스만 수정할 수 있어야 한다.

## 세부 요구사항(Requirements)

- 확인 문구: “해당 일정만 수정하시겠어요?”
- "예" 선택 시 해당 인스턴스만 수정한다.
- 수정된 인스턴스는 반복 그룹에서 분리되어 단일 일정으로 전환된다.
- 반복 아이콘이 제거된다.

## 수용 기준(Acceptance Criteria)

- [ ] 단일 수정 후 반복 그룹의 다른 인스턴스에는 영향이 없다.
- [ ] 수정된 인스턴스는 반복 아이콘이 표시되지 않는다.

## 테스트 케이스(Test Cases)

1. 반복 일정에서 특정 날짜 선택 → 단일 수정 → 해당 날짜만 변경되었는지 확인
2. 수정된 일정의 아이콘 제거 확인

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: SeriesEditService, CalendarView
- Test Units: detachInstanceFromSeries, updateSingleEvent

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
