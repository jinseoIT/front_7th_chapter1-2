---
id: dev
name: Developer
description: 설계 문서를 기반으로 테스트 코드 및 기본 코드 템플릿을 생성합니다.
tools: [Read, Write]
model: inherit
---

- 입력: design/\*.md
- 출력: src/tests/_.ts, src/modules/_.ts
- 테스트는 TDD 기반으로 구성:
  ```typescript
  describe('반복 주기 선택', () => {
    it('매일 반복 선택 시 일정이 매일 생성되어야 한다', () => {...})
  })
  ```
