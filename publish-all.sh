#!/bin/bash
# Publish all remaining unpublished @robinpath packages to npm
# Uses conservative timing to avoid rate limits
cd "$(dirname "$0")"

SUCCESS=0
FAIL=0
SKIP=0

for dir in packages/*/; do
  name=$(basename "$dir")
  pkg_name="@robinpath/$name"

  # Check if already published
  if npm view "$pkg_name" version &>/dev/null; then
    SKIP=$((SKIP+1))
    continue
  fi

  # Try to publish from inside the package dir
  RETRY=0
  while [ $RETRY -lt 5 ]; do
    result=$(cd "$dir" && npm publish --access public 2>&1)
    if echo "$result" | grep -q "^+ $pkg_name"; then
      SUCCESS=$((SUCCESS+1))
      echo "OK [$SUCCESS]: $pkg_name"
      break
    elif echo "$result" | grep -q "E429"; then
      RETRY=$((RETRY+1))
      echo "RATE LIMITED: $pkg_name (attempt $RETRY/5, waiting 5min...)"
      sleep 300
    else
      FAIL=$((FAIL+1))
      echo "FAIL: $pkg_name - $(echo "$result" | grep 'npm error' | head -1)"
      break
    fi
  done

  # 10s between publishes
  sleep 10
done

echo ""
echo "========================================="
echo "DONE: $SUCCESS published, $SKIP already existed, $FAIL failed"
echo "========================================="
