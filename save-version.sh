#!/bin/zsh

set -e

VERSION_ROOT="versions"
PREFIX="30_v"

mkdir -p "$VERSION_ROOT"

next_number=1
for folder in "$VERSION_ROOT"/${PREFIX}*(N/); do
  name="$(basename "$folder")"
  number="${name#$PREFIX}"
  if [[ "$number" == <-> ]] && (( number >= next_number )); then
    next_number=$((number + 1))
  fi
done

target="$VERSION_ROOT/${PREFIX}${next_number}"
mkdir -p "$target"

rsync -a \
  --exclude ".DS_Store" \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "dist" \
  --exclude "versions" \
  ./ "$target"/

echo "Saved current config to $target"
