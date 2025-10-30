# Story: 반복 종료 - 특정 날짜까지

## 목표(Objective)

사용자가 반복 종료 조건을 특정 날짜로 지정할 수 있어야 한다.

## 세부 요구사항(Requirements)

- 종료일 입력을 제공한다(날짜 피커).
- 종료일 포함(inclusive)으로 인스턴스를 생성한다.
- 시스템 최대 일자 2025-12-31 제한을 적용한다.

## 수용 기준(Acceptance Criteria)

- [ ] 종료일을 지정하면 해당 날짜까지만 인스턴스가 생성된다.
- [ ] 최대 일자 제한을 초과하는 입력은 차단된다.
- [ ] 잘못된 종료일(시작일 이전)은 검증에서 차단된다.

## 테스트 케이스(Test Cases)

1. start=2025-10-01, end=2025-10-05 → 10/1~10/5 생성
2. end=2026-01-10 → 입력 거부(최대 일자 초과)
3. end=2025-09-30 → 입력 거부(시작일 이전)

## 모듈/테스트 매핑(Module & Test Mapping)

- Module: EndConditionService, DateValidation
- Test Units: validateEndDate, applyEndLimit

## DoD (Definition of Done)

- 단위 테스트 및 통합 테스트 100% 통과
- QA 확인 및 코드 리뷰 완료
