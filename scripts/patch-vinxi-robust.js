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

    // Check if already patched - but verify it's correctly patched
    // If it has the patch but still has the original pattern, it needs re-patching
    const hasPatchComment = buildContent.includes(
      'Fix for Vinxi 0.5.8 manifest path bug',
    );
    const hasOriginalPattern = buildContent.includes(
      'readFileSync(viteManifestPath(router), "utf-8")',
    );
    const hasPatchedPattern = buildContent.includes(
      'readFileSync(manifestPath, "utf-8")',
    );

    // If it has the patch comment but still has the original pattern, it wasn't fully patched
    // If it has the patch comment and patched pattern but no original, check indentation
    if (hasPatchComment && !hasOriginalPattern && hasPatchedPattern) {
      // Verify the indentation is correct by checking the structure
      // The "let manifestPath" should be at the same level as "const bundlerManifest"
      // and "readFileSync(manifestPath" should be indented one level more
      const manifestPathMatch = buildContent.match(
        /(\s+)let manifestPath = viteManifestPath\(router\);/,
      );
      const bundlerMatch = buildContent.match(
        /(\s+)const bundlerManifest = JSON\.parse\(/,
      );
      const readFileMatch = buildContent.match(
        /(\s+)readFileSync\(manifestPath, "utf-8"\),/,
      );

      if (
        manifestPathMatch &&
        bundlerMatch &&
        readFileMatch &&
        manifestPathMatch[1] === bundlerMatch[1] &&
        readFileMatch[1].length > bundlerMatch[1].length
      ) {
        // Indentation looks correct
        console.log('   ✅ Already patched');
        // eslint-disable-next-line no-plusplus
        alreadyPatchedCount++;
        continue;
      }
    }

    // If it was patched incorrectly before, restore the original pattern
    if (hasPatchComment && hasPatchedPattern) {
      console.log('   🔄 Re-patching (fixing incorrect previous patch)...');
      // Use a very flexible pattern that matches from the comment to the closing paren
      // This handles corrupted files with extra newlines
      const restorePattern =
        /\/\/ Fix for Vinxi 0\.5\.8 manifest path bug[\s\S]*?const bundlerManifest = JSON\.parse\([\s\S]*?readFileSync\(manifestPath, "utf-8"\),[\s\S]*?\);/g;

      buildContent = buildContent.replace(restorePattern, (match) => {
        // Extract the indentation from the const bundlerManifest line
        const constMatch = match.match(
          /(\s+)const bundlerManifest = JSON\.parse\(/,
        );
        if (!constMatch) {
          // Fallback: try to find any const bundlerManifest in the match
          const altMatch = match.match(/const bundlerManifest = JSON\.parse\(/);
          if (altMatch) {
            // Find the line before it to get context
            const beforeConst = match.substring(0, altMatch.index);
            const lastNewline = beforeConst.lastIndexOf('\n');
            const lineBefore = beforeConst.substring(lastNewline + 1);
            const indentMatch = lineBefore.match(/^(\s*)/);
            const constIndent = indentMatch ? indentMatch[1] : '\t\t\t\t\t';
            const readFileIndent = constIndent + '\t';
            return `${constIndent}const bundlerManifest = JSON.parse(\n${readFileIndent}readFileSync(viteManifestPath(router), "utf-8"),\n${constIndent});`;
          }
          return match; // Can't fix it, return as-is
        }
        const constIndent = constMatch[1];
        const readFileIndent = constIndent + '\t';

        return `${constIndent}const bundlerManifest = JSON.parse(\n${readFileIndent}readFileSync(viteManifestPath(router), "utf-8"),\n${constIndent});`;
      });
    }

    // Apply the import fix
    if (!buildContent.includes('existsSync')) {
      buildContent = buildContent.replace(
        'import { readdirSync, statSync, writeFileSync } from "node:fs";',
        'import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from "node:fs";',
      );
    }

    // Apply manifest path fixes - handle all patterns flexibly
    // Pattern to match: const bundlerManifest = JSON.parse(\n\t*readFileSync(viteManifestPath(router), "utf-8"),\n\t*);
    // This matches multi-line JSON.parse with readFileSync, capturing indentation
    // We need to capture the indentation before "const" and before "readFileSync"
    const flexiblePattern =
      /(\s+)const bundlerManifest = JSON\.parse\(\s*\n(\s+)readFileSync\(viteManifestPath\(router\),\s*"utf-8"\),\s*\n(\s+)\);/g;

    let wasPatched = false;
    buildContent = buildContent.replace(
      flexiblePattern,
      (match, constIndent, readFileIndent, closingIndent) => {
        wasPatched = true;
        // constIndent is the indentation of the "const bundlerManifest" line
        // readFileIndent is the indentation of the "readFileSync" line (usually one tab more)
        // Use constIndent for variable declarations at the same level
        const varIndent = constIndent;
        const blockIndent = constIndent + '\t';
        const innerIndent = blockIndent + '\t';

        return `${varIndent}// Fix for Vinxi 0.5.8 manifest path bug
${varIndent}let manifestPath = viteManifestPath(router);
${varIndent}if (!existsSync(manifestPath)) {
${blockIndent}// Try the .vite subdirectory
${blockIndent}const vitePath = join(router.outDir, router.base, ".vite", "manifest.json");
${blockIndent}if (existsSync(vitePath)) {
${innerIndent}manifestPath = vitePath;
${blockIndent}}
${varIndent}}
${varIndent}const bundlerManifest = JSON.parse(
${readFileIndent}readFileSync(manifestPath, "utf-8"),
${closingIndent});`;
      },
    );

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
