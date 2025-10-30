# Story: 반복 일정 - 매월 생성(31일 규칙)

## 목표(Objective)

사용자가 일정 생성 시 “매월” 반복 규칙을 지정하면, 매월 동일한 일자에 인스턴스가 생성되며 31일 규칙을 따른다.

## 세부 요구사항(Requirements)

- 사용자가 반복 유형으로 "매월"을 선택한다.
- 시작일의 일자를 기준으로 매월 인스턴스를 생성한다.
- 31일에 시작한 경우, 31일이 있는 달에만 생성한다(30일/28일/29일에는 생성하지 않음).
- 일정 겹침은 고려하지 않는다.

## 수용 기준(Acceptance Criteria)

- [ ] 31일 시작 시, 31일이 있는 달에서만 인스턴스가 생성된다.
- [ ] 30일/28일/29일에는 생성되지 않는다.
- [ ] 월/주/일 뷰에 정상 표시된다.

## 테스트 케이스(Test Cases)

1. start=2025-01-31, end=2025-05-31 → 1/31, 3/31, 5/31 생성 (2월/4월은 건너뜀)
2. start=2025-03-31, end=2025-04-30 → 3/31만 생성

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: RepeatRuleGenerator, DateUtils
- Test Units: generateMonthlyInstances, isMonthHas31st

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
