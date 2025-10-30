# Story: 반복 일정 - 매주 생성

## 목표(Objective)

사용자가 일정 생성 시 “매주” 반복 규칙을 지정하면, 동일한 요일에 주 단위 인스턴스가 자동 생성된다.

## 세부 요구사항(Requirements)

- 사용자가 반복 유형으로 "매주"를 선택한다.
- 시작일과 동일한 요일 기준으로 종료 조건까지 주 단위 인스턴스를 생성한다.
- 일정 겹침은 고려하지 않는다.

## 수용 기준(Acceptance Criteria)

- [ ] "매주" 선택 시, 시작일과 같은 요일로 인스턴스가 생성된다.
- [ ] 월/주/일 캘린더 뷰에서 모두 정상 표시된다.

## 테스트 케이스(Test Cases)

1. start=2025-10-01(수), end=2025-10-29 → 10/1, 10/8, 10/15, 10/22, 10/29 생성
2. end 미지정, 시스템 최대=2025-12-31 → 그 전까지 매주 생성

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: RepeatRuleGenerator, ScheduleService
- Test Units: generateWeeklyInstances, renderCalendarInstances

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
