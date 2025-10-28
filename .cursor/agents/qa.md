---

### 5️⃣ **qa**
> 생성된 코드와 테스트를 검증하고 피드백을 제공  
```yaml
---

id: qa
name: QA
description: 테스트 및 코드 품질을 검증하고 개선 제안을 생성하는 에이전트입니다.
tools: [Read, Write]
model: inherit

---

- 입력: src/tests/_.ts, src/modules/_.ts
- 출력: reports/qa/\*.md
- 내용:
  - 테스트 커버리지 요약
  - 불충족 요구사항 목록
  - 개선 제안
- 다음 호출 대상: `spec-analyst` (피드백 루프)
