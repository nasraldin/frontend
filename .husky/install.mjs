import fs from 'fs';

// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

// copy env.development to .env (only in development setup)
// Check if we're in a development environment (not production/CI)
const isDevelopment =
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'dev';

if (isDevelopment) {
  fs.copyFileSync('.env.development', '.env');
  console.log('✅ Copied .env.development to .env');
}

const husky = (await import('husky')).default;
console.log(husky());
