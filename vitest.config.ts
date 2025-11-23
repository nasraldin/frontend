import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    conditions: ['development', 'browser'],
  },
  test: {
    // Generate SonarQube-compatible test execution report
    reporters: [
      'default',
      [
        'vitest-sonar-reporter',
        {
          outputFile: 'test-results/sonar-report.xml',
        },
      ],
    ],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '.vinxi/',
        '.output/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
        '**/*.d.ts',
      ],
    },
  },
});
