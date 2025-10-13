# Auto Version & Changelog Script

This directory contains a single script for automatically updating the version in
`package.json` and generating changelog entries in `CHANGELOG.md` based on commit
information.

## Script Overview

### `auto-version.sh`

Single script that handles all versioning functionality:

- **Version Updates**: Updates package.json version using semantic versioning
- **Changelog Generation**: Updates CHANGELOG.md with commit information
- **File Detection**: Lists all staged files in "File Changed" section
- **Lock Mechanism**: Prevents concurrent execution
- **Infinite Loop Prevention**: Detects versioning commits and skips processing

#### Version Bump Rules:

- **feat/feature**: Minor version bump (X.Y.0)
- **fix/bugfix**: Patch version bump (X.Y.Z)
- **chore**: Patch version bump (X.Y.Z)
- **docs**: Patch version bump (X.Y.Z)
- **style**: Patch version bump (X.Y.Z)
- **refactor**: Patch version bump (X.Y.Z)
- **perf**: Patch version bump (X.Y.Z)
- **test**: Patch version bump (X.Y.Z)
- **breaking/major**: Major version bump (X.0.0)
- **Minor patch max**: 100

#### Changelog Format:

```markdown
## [0.1.2] - 2025-10-13

**Author:** Nasr Aldin

### fix

fix: resolve login validation issue

### File Changed

- src/components/LoginForm.tsx
- package.json
- src/utils/validation.ts

---
```

## Usage

### Automatic Usage (Recommended)

The script runs automatically via git hooks:

```bash
# Just commit normally - versioning happens automatically
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "chore: update dependencies"
```

### Manual Usage

```bash
# Run full versioning process
bash scripts/auto-version.sh

# Run in pre-commit mode
bash scripts/auto-version.sh --pre-commit

# Show help
bash scripts/auto-version.sh --help
```

## Git Hooks

### Pre-commit Hook (`.husky/pre-commit`)

Runs before every commit:

1. Lints and formats files with `lint-staged`
2. Updates version and changelog with `auto-version.sh`

### Post-commit Hook (`.husky/post-commit`)

Runs after every commit:

1. Additional versioning checks
2. Fallback mechanism

## Troubleshooting

### Common Issues

1. **Script not running automatically**
   - Check if git hooks are installed: `ls -la .husky/`
   - Verify husky is configured: `npm run prepare`
   - Use manual triggers: `bash scripts/auto-version.sh`

2. **Infinite loop prevention**
   - Script automatically detects versioning commits
   - Skips processing to prevent loops
   - Uses lock mechanism for safety

3. **Concurrent execution**
   - Lock mechanism prevents conflicts
   - Only one instance runs at a time
   - Automatic cleanup on exit

### Warning Messages

**"Another versioning process is running (PID: XXXX), skipping..."**: This is normal
and prevents infinite loops. The system uses a lock mechanism to ensure only one
versioning process runs at a time.

**Commitlint warnings**: The system automatically uses proper commit message format
with blank lines to avoid commitlint warnings.

## File Structure

```
scripts/
├── auto-version.sh              # Single versioning script
├── build-dictionary.mjs         # Dictionary builder (used by package.json)
├── clean.sh                     # Cleanup script (used by package.json)
├── no-direct-process.mjs        # ESLint rule (used by eslint config)
├── patch-vinxi-robust.js        # Vinxi patcher (used by package.json)
└── README.md                    # This documentation

.husky/
├── pre-commit                   # Pre-commit hook
└── post-commit                   # Post-commit hook
```

## Best Practices

1. **Use conventional commits** for consistent versioning
2. **Test changes** before committing
3. **Check changelog** after commits
4. **Use manual triggers** if automatic versioning fails

## Support

For issues or questions:

1. Check this documentation
2. Review script output for errors
3. Verify git hooks are working
4. Use manual triggers if needed
