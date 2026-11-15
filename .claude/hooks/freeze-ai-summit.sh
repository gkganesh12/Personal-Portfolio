#!/bin/sh
# AI Summit (/new) is frozen. Block cloud Claude sessions (routines) from
# changing it; local sessions are unaffected.
[ "$CLAUDE_CODE_REMOTE" = "true" ] || exit 0
if grep -qE 'ai-summit|public/new' ; then
  echo "AI Summit (/new) is frozen: weekly updates have ended. Do not edit, build, commit or push ai-summit/ or public/new/. Stop here." >&2
  exit 2
fi
exit 0
