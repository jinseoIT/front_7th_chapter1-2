# Story: 반복 일정 - 매년 생성(윤년 2/29 규칙)

## 목표(Objective)

사용자가 일정 생성 시 “매년” 반복 규칙을 지정하면, 매년 같은 월/일에 인스턴스가 생성되며 윤년 2/29 규칙을 따른다.

## 세부 요구사항(Requirements)

- 사용자가 반복 유형으로 "매년"을 선택한다.
- 시작일의 월/일 기준으로 매년 인스턴스를 생성한다.
- 2월 29일 시작 시 윤년에만 생성하며, 평년에는 생성하지 않는다.
- 일정 겹침은 고려하지 않는다.

## 수용 기준(Acceptance Criteria)

- [ ] 2월 29일 시작 시 윤년에만 생성된다.
- [ ] 평년에는 생성되지 않는다.
- [ ] 월/주/일 뷰에 정상 표시된다.

## 테스트 케이스(Test Cases)

1. start=2024-02-29, end=2028-12-31 → 2024/02/29, 2028/02/29 생성
2. start=2025-06-10, end=2027-06-10 → 2026/06/10, 2027/06/10 생성

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: RepeatRuleGenerator, DateUtils
- Test Units: generateYearlyInstances, isLeapYear

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
