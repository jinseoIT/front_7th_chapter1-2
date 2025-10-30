#!/bin/bash
# .cursor/scripts/auto-commit.sh
# Usage: bash .cursor/scripts/auto-commit.sh [STAGE] [FEATURE]

STAGE=$1
FEATURE=$2

case $STAGE in
  RED)
    MSG="chore(${FEATURE}): add failing test cases (RED stage)"
    ;;
  GREEN)
    MSG="feat(${FEATURE}): implement minimal code to pass tests (GREEN stage)"
    ;;
  REFACTOR)
    MSG="refactor(${FEATURE}): optimize structure and remove duplication (REFACTOR stage)"
    ;;
  *)
    MSG="chore(${FEATURE}): update files"
    ;;
esac

git add .
git commit -m "$MSG" --allow-empty