import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if minification is requested
const shouldMinify = process.argv.includes('--minify');

const dictionaryDir = join(__dirname, '..', 'src', 'i18n', 'dictionary');

// Get all language directories
const langDirs = readdirSync(dictionaryDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

langDirs.forEach((lang) => {
  const langFile = `${lang}.json`;
  const langPath = join(dictionaryDir, lang);
  const combinedDictionary = {};

  // Read all JSON files in the language directory
  const files = readdirSync(langPath, { withFileTypes: true })
    .filter((file) => file.isFile() && extname(file.name) === '.json')
    .map((file) => file.name);

  files.forEach((file) => {
    if (file !== langFile) {
      // Skip the combined file if it exists
      const filePath = join(langPath, file);
      try {
        const content = JSON.parse(readFileSync(filePath, 'utf8'));
        // const fileName = basename(file, '.json');
        // combinedDictionary[fileName] = content;
        Object.assign(combinedDictionary, content);
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }
  });

  const outputPath = join(langPath, langFile);

  if (shouldMinify) {
    // Minify by removing whitespace
    const minifiedJson = JSON.stringify(combinedDictionary);
    writeFileSync(outputPath, minifiedJson);
    console.log(
      `🗒️ Minified combined dictionary for ${lang} created successfully.`,
    );
  } else {
    // Pretty print with 2 spaces indentation
    const prettyJson = JSON.stringify(combinedDictionary, null, 2);
    writeFileSync(outputPath, prettyJson);
    console.log(`🗒️ Combined dictionary for ${lang} created successfully.`);
  }
});

console.log('✅ All combined dictionaries created successfully.');
