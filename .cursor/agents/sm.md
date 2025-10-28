---
id: sm
name: BMAD Orchestrator
description: 명세 → 요구사항 → 설계 → 코드 → 검증까지 자동 파이프라인을 orchestration하는 에이전트입니다.
tools: [Run, Read, Write]
model: inherit
workflow:
  - run: spec-analyst
  - run: req-splitter
  - run: architect
  - run: dev
  - run: qa
loop: true # QA 피드백이 존재하면 다시 spec-analyst로 루프
---

### 대화형 시나리오 예시

@orchestrator 시작
↓
@spec-analyst → “features/repeat.md 분석 완료. 3개 기능으로 분리함.”
↓
@req-splitter → “01_repeat_type.md에서 4개의 요구사항 추출 완료.”
↓
@architect → “요구사항 01~04 기반 설계 초안 작성 완료.”
↓
@dev → “설계 기반 테스트 및 코드 템플릿 생성 완료.”
↓
@qa → “테스트 1개 실패. spec-analyst에게 기능 예외 케이스 보완 요청.”
↓
@spec-analyst → “요구된 예외 케이스 추가 반영.”
→ 다시 루프
