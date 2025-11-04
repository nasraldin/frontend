#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 Applying Vinxi manifest path fix...');

try {
  // Find all Vinxi build.js files in node_modules
  const findAllVinxiBuildPaths = () => {
    const nodeModulesPath = 'node_modules';
    const buildPaths = [];

    // Search for any vinxi package in .pnpm
    const pnpmPath = join(nodeModulesPath, '.pnpm');
    if (existsSync(pnpmPath)) {
      const pnpmDirs = readdirSync(pnpmPath);
      for (const dir of pnpmDirs) {
        if (dir.startsWith('vinxi@')) {
          const buildPath = join(pnpmPath, dir, 'node_modules/vinxi/lib/build.js');
          if (existsSync(buildPath)) {
            buildPaths.push(buildPath);
          }
        }
      }
    }

    // Fallback to regular node_modules
    const regularPath = join(nodeModulesPath, 'vinxi/lib/build.js');
    if (existsSync(regularPath)) {
      buildPaths.push(regularPath);
    }

    return buildPaths;
  };

  const buildPaths = findAllVinxiBuildPaths();

  if (buildPaths.length === 0) {
    console.log(
      '❌ No Vinxi build.js files found. Make sure dependencies are installed.',
    );
    process.exit(1);
  }

  console.log(`📁 Found ${buildPaths.length} Vinxi build.js file(s):`);
  buildPaths.forEach((path, index) => {
    console.log(`   ${index + 1}. ${path}`);
  });

  let patchedCount = 0;
  let alreadyPatchedCount = 0;

  // Process each Vinxi build.js file
  for (const buildPath of buildPaths) {
    console.log(`\n🔧 Processing: ${buildPath}`);

    let buildContent = readFileSync(buildPath, 'utf-8');

    // Check if already patched
    if (buildContent.includes('Fix for Vinxi 0.5.8 manifest path bug')) {
      console.log('   ✅ Already patched');
      // eslint-disable-next-line no-plusplus
      alreadyPatchedCount++;
      continue;
    }

    // Apply the import fix
    if (!buildContent.includes('existsSync')) {
      buildContent = buildContent.replace(
        'import { readdirSync, statSync, writeFileSync } from "node:fs";',
        'import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from "node:fs";',
      );
    }

    // Apply manifest path fixes - handle multi-line patterns
    // Pattern to match: const bundlerManifest = JSON.parse(\n\t\t\treadFileSync(...)\n\t\t\t);
    // This pattern matches multi-line JSON.parse with readFileSync
    const manifestPattern =
      /const bundlerManifest = JSON\.parse\(\s*\n\s*readFileSync\(viteManifestPath\(router\), "utf-8"\),\s*\n\s*\);/g;

    // Replace all occurrences - we'll detect the indentation level from context
    let matchCount = 0;
    let wasPatched = false;
    buildContent = buildContent.replace(manifestPattern, () => {
      // eslint-disable-next-line no-plusplus
      matchCount++;
      wasPatched = true;

      // Determine replacement based on which occurrence this is
      // First occurrence is typically around line 161, second around line 256
      if (matchCount === 1) {
        // First occurrence - use 5 tabs
        return `// Fix for Vinxi 0.5.8 manifest path bug
\t\t\t\t\tlet manifestPath = viteManifestPath(router);
\t\t\t\t\tif (!existsSync(manifestPath)) {
\t\t\t\t\t\t// Try the .vite subdirectory
\t\t\t\t\t\tconst vitePath = join(router.outDir, router.base, ".vite", "manifest.json");
\t\t\t\t\t\tif (existsSync(vitePath)) {
\t\t\t\t\t\t\tmanifestPath = vitePath;
\t\t\t\t\t\t}
\t\t\t\t\t}
\t\t\t\t\tconst bundlerManifest = JSON.parse(
\t\t\t\t\t\treadFileSync(manifestPath, "utf-8"),
\t\t\t\t\t);`;
      }
      // Second occurrence - use 6 tabs
      return `// Fix for Vinxi 0.5.8 manifest path bug
\t\t\t\t\t\tlet manifestPath = viteManifestPath(router);
\t\t\t\t\t\tif (!existsSync(manifestPath)) {
\t\t\t\t\t\t\t// Try the .vite subdirectory
\t\t\t\t\t\t\tconst vitePath = join(router.outDir, router.base, ".vite", "manifest.json");
\t\t\t\t\t\t\tif (existsSync(vitePath)) {
\t\t\t\t\t\t\t\tmanifestPath = vitePath;
\t\t\t\t\t\t\t}
\t\t\t\t\t\t}
\t\t\t\t\t\tconst bundlerManifest = JSON.parse(
\t\t\t\t\t\t\treadFileSync(manifestPath, "utf-8"),
\t\t\t\t\t\t);`;
    });

    // Only write if we actually made replacements
    if (!wasPatched) {
      console.log('   ⚠️  No manifest patterns found to patch');
      // eslint-disable-next-line no-plusplus
      alreadyPatchedCount++;
      continue;
    }

    writeFileSync(buildPath, buildContent);
    console.log('   ✅ Patched successfully');
    // eslint-disable-next-line no-plusplus
    patchedCount++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   • Patched: ${patchedCount} file(s)`);
  console.log(`   • Already patched: ${alreadyPatchedCount} file(s)`);
  console.log(`   • Total processed: ${buildPaths.length} file(s)`);

  if (patchedCount > 0) {
    console.log('✅ Vinxi patching completed successfully');
  } else {
    console.log('✅ All Vinxi installations are already patched');
  }
} catch (error) {
  console.error('❌ Failed to patch Vinxi:', error.message);
  process.exit(1);
}
