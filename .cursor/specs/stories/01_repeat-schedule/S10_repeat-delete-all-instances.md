# Story: 반복 일정 삭제 - 전체 인스턴스

## 목표(Objective)

사용자가 반복 일정 전체를 한 번에 삭제할 수 있어야 한다.

## 세부 요구사항(Requirements)

- 확인 문구: “해당 일정만 삭제하시겠어요?”
- "아니오" 선택 시 반복 일정의 모든 인스턴스를 삭제한다.

## 수용 기준(Acceptance Criteria)

- [ ] 전체 삭제 후 어떤 인스턴스도 남지 않는다.
- [ ] 삭제 확인 UX가 접근성 기준을 충족한다.

## 테스트 케이스(Test Cases)

1. 반복 일정 전체 삭제 선택 → 모든 인스턴스 제거 확인

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: SeriesDeleteService, CalendarView
- Test Units: deleteSeriesInstances

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
