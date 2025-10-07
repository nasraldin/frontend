#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 Applying Vinxi manifest path fix...');

try {
  // Find the Vinxi build.js file in node_modules
  const findVinxiBuildPath = () => {
    const nodeModulesPath = 'node_modules';

    // Try the direct path first (current structure)
    const directPath = join(
      nodeModulesPath,
      '.pnpm/vinxi@0.5.8_@types+node@18.19.129_db0@0.3.4_ioredis@5.8.1_jiti@2.6.1_lightningcss@1.30.1_terser@5.44.0_yaml@2.8.1/node_modules/vinxi/lib/build.js',
    );
    if (existsSync(directPath)) {
      return directPath;
    }

    // Search for any vinxi package in .pnpm
    const pnpmPath = join(nodeModulesPath, '.pnpm');
    if (existsSync(pnpmPath)) {
      const pnpmDirs = readdirSync(pnpmPath);
      for (const dir of pnpmDirs) {
        if (dir.startsWith('vinxi@')) {
          const buildPath = join(pnpmPath, dir, 'node_modules/vinxi/lib/build.js');
          if (existsSync(buildPath)) {
            return buildPath;
          }
        }
      }
    }

    // Fallback to regular node_modules
    const regularPath = join(nodeModulesPath, 'vinxi/lib/build.js');
    if (existsSync(regularPath)) {
      return regularPath;
    }

    return null;
  };

  const buildPath = findVinxiBuildPath();

  if (!buildPath) {
    console.log(
      '❌ Vinxi build.js not found. Make sure dependencies are installed.',
    );
    process.exit(1);
  }

  console.log(`📁 Found Vinxi build.js at: ${buildPath}`);

  let buildContent = readFileSync(buildPath, 'utf-8');

  // Check if already patched
  if (buildContent.includes('Fix for Vinxi 0.5.8 manifest path bug')) {
    console.log('✅ Vinxi is already patched');
    process.exit(0);
  }

  // Apply the import fix
  if (!buildContent.includes('existsSync')) {
    buildContent = buildContent.replace(
      'import { readdirSync, statSync, writeFileSync } from "node:fs";',
      'import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from "node:fs";',
    );
  }

  // Apply the first manifest path fix
  const firstPattern =
    /const bundlerManifest = JSON\.parse\(\s*readFileSync\(viteManifestPath\(router\), "utf-8"\),\s*\);/;
  if (firstPattern.test(buildContent)) {
    buildContent = buildContent.replace(
      firstPattern,
      `// Fix for Vinxi 0.5.8 manifest path bug
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
\t\t\t\t\t);`,
    );
  }

  // Apply the second manifest path fix
  const secondPattern =
    /const bundlerManifest = JSON\.parse\(\s*readFileSync\(viteManifestPath\(router\), "utf-8"\),\s*\);/;
  if (secondPattern.test(buildContent)) {
    buildContent = buildContent.replace(
      secondPattern,
      `// Fix for Vinxi 0.5.8 manifest path bug
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
\t\t\t\t\t\t);`,
    );
  }

  writeFileSync(buildPath, buildContent);
  console.log('✅ Vinxi patched successfully');
} catch (error) {
  console.error('❌ Failed to patch Vinxi:', error.message);
  process.exit(1);
}
