#!/bin/sh

set -e

# Remove root-only directories
echo "Removing root-only directories..."
for dir in .history .husky/_; do
  if [ -d "$dir" ]; then
    echo "Removing $dir directory..."
    rm -rf "$dir"
  fi
done

# Remove all matching directories recursively (root and nested)
for dir in .cache .vinxi .output .million build dist coverage out node_modules temp; do
  echo "Removing all '$dir' directories recursively..."
  find . -type d -name "$dir" -prune -exec rm -rf '{}' +
done

# Remove all *.log, .log.*, *-lock*, .lock.*, *.tgz, and files recursively
echo "Removing all *.log, .log.*, *-lock*, .lock.*, *.tgz, and files recursively..."
find . -type f \( -name "*.log" -o -name ".log.*" -o -name "*-lock*" -o -name ".lock.*" -o -name "*.tgz" \) -print -delete

echo "Cleanup complete."
