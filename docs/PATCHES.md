# Vinxi Build Patch

This project includes a patch for a known issue in Vinxi 0.5.8 where the build
process fails to find the `manifest.json` file in the correct location.

## Problem

Vinxi 0.5.8 has a bug where it looks for `manifest.json` directly in the `_server`
directory, but Vite actually places it in the `.vite` subdirectory, causing build
failures with:

```
Error: ENOENT: no such file or directory, open '.../server-fns/_server/manifest.json'
```

## Solution

The patch automatically modifies the Vinxi build process to:

1. First check the expected location for `manifest.json`
2. If not found, look in the `.vite` subdirectory where Vite actually places it
3. Use the correct path for reading the manifest file

## Files Modified

- `scripts/patch-vinxi-robust.js` - Automated patch script
- `package.json` - Added `postinstall` and `prepare` hooks to apply patch
  automatically

## How It Works

1. The patch script runs automatically after `pnpm install` (via `postinstall` hook)
2. It finds the Vinxi build.js file in node_modules
3. It applies the necessary code changes to fix the manifest path issue
4. The patch is idempotent - it won't apply twice if already patched

## Manual Application

If you need to apply the patch manually:

```bash
node scripts/patch-vinxi-robust.js
```

## Notes

- This patch is specific to Vinxi 0.5.8
- The patch will be automatically reapplied when dependencies are reinstalled
- If you upgrade Vinxi to a newer version, you may need to update or remove this
  patch
