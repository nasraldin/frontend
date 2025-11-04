# Changelog

All notable changes to the Ajrly Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.10] - 2025-11-04

**Author:** Nasr Aldin

### chore

chore: fix vinxi build

### File Changed

- package.json
- scripts/patch-vinxi-robust.js

---

## [0.3.9] - 2025-11-04

**Author:** Nasr Aldin

### chore

chore: sync gitlab

### File Changed

- .github/workflows/sync-to-gitlab.yml
- package.json
- pnpm-lock.yaml

---

## [0.3.8] - 2025-10-21

**Author:** Nasr Aldin

### chore

chore: update pkgs

### File Changed

- bun.lock
- package.json
- pnpm-lock.yaml
- pnpm-workspace.yaml

---

## [0.3.7] - 2025-10-16

**Author:** Nasr Aldin

### chore

chore: update pkgs and added ErrorBoundary

### File Changed

- bun.lock
- package.json
- pnpm-lock.yaml
- src/app.tsx

---

## [0.3.6] - 2025-10-14

**Author:** Nasr Aldin

### fix

fix: ssr runtime issue and build

### File Changed

- src/app.tsx
- src/components/ServerHead.tsx
- src/entry-server.tsx
- src/utils/helpers/checks.ts
- src/utils/helpers/converts.ts
- src/utils/helpers/locale/userLocale.ts

---

## [0.3.5] - 2025-10-14

**Author:** Nasr Aldin

### fix

fix: patch vinxi

### File Changed

- package.json
- scripts/patch-vinxi-robust.js

---

## [0.3.4] - 2025-10-14

**Author:** Nasr Aldin

### chore

chore: upgrade pkgs

### File Changed

- bun.lock
- package.json
- pnpm-lock.yaml
- pnpm-workspace.yaml

---

## [0.3.3] - 2025-10-14

**Author:** Nasr Aldin

### chore

chore: added more regex, validators, upgrade pkgs and auto-version

### File Changed

- .husky/post-commit
- .husky/pre-commit
- bun.lock
- docs/auto-version.md
- package.json
- pnpm-lock.yaml
- scripts/auto-version.sh
- src/app.tsx
- src/constants/global.ts
- src/constants/regex.ts
- src/env/schema.ts
- src/global.d.ts
- src/lib/sanitizer.ts
- src/lib/validators.ts
- src/utils/helpers/index.ts
- src/utils/helpers/sanitizer.ts
- tsconfig.json

---

## [Unreleased]

### Added

- Initial project setup with monorepo structure
- TypeScript configuration for all packages
- ESLint and Prettier configuration
- Husky for Git hooks
- Commitlint for conventional commits
- Tailwind CSS configuration
- Jest testing setup
- Stylelint for CSS linting

### Changed

- Updated development dependencies to latest versions
- Improved build configuration
- Enhanced code quality tools

### Fixed

- Resolved TypeScript compilation issues
- Fixed ESLint configuration conflicts
- Corrected Prettier formatting rules

## [1.0.0] - 2024-12-XX

### Added

- **Core Platform Infrastructure**
  - Monorepo setup with pnpm workspaces
  - TypeScript configuration across all packages
  - Comprehensive development tooling

- **Frontend Application (`apps/frontend`)**
  - Next.js 15 application setup
  - React 19 with latest features
  - Tailwind CSS 4.1 for styling
  - TypeScript strict mode configuration
  - ESLint and Prettier integration
  - Jest testing framework
  - Component library structure

- **Backend Application (`apps/backend`)**
  - NestJS application foundation
  - TypeScript backend configuration
  - Database integration setup
  - API documentation structure
  - Authentication system foundation
  - Testing framework setup

- **CMS Application (`apps/cms`)**
  - Strapi headless CMS setup
  - Content management interface
  - API endpoints for content delivery
  - Media management system
  - User role management

- **Shared Packages (`packages/`)**
  - `@ajrly/core`: Core utilities and types
  - `@ajrly/ui`: UI component library
  - `@ajrly/utils`: Utility functions
  - `@ajrly/types`: TypeScript type definitions
  - `@ajrly/eslint`: ESLint configuration
  - `@ajrly/loghorn`: Logging utilities
  - `@ajrly/i18n`: Internationalization
  - `@ajrly/assets`: Shared assets

- **Development Tools**
  - Husky for Git hooks
  - Commitlint for conventional commits
  - Lint-staged for pre-commit checks
  - Stylelint for CSS quality
  - Knip for unused code detection
  - Security audit tools

- **Documentation**
  - Professional README with project overview
  - Comprehensive CONTRIBUTING guidelines
  - Code of Conduct for community standards
  - Security policy for vulnerability reporting
  - Development setup instructions

### Changed

- **Project Structure**
  - Organized monorepo with clear separation of concerns
  - Standardized package naming conventions
  - Consistent TypeScript configuration
  - Unified development workflow

- **Code Quality**
  - Implemented strict TypeScript rules
  - Added comprehensive ESLint rules
  - Configured Prettier for consistent formatting
  - Set up automated code quality checks

- **Development Experience**
  - Streamlined development scripts
  - Enhanced debugging capabilities
  - Improved build performance
  - Better error reporting

### Fixed

- **Build System**
  - Resolved dependency conflicts
  - Fixed TypeScript compilation issues
  - Corrected ESLint configuration
  - Resolved Prettier formatting conflicts

- **Development Tools**
  - Fixed Husky installation issues
  - Corrected Commitlint configuration
  - Resolved Lint-staged setup
  - Fixed Stylelint rules

### Security

- **Dependencies**
  - Updated all dependencies to latest secure versions
  - Implemented security audit workflows
  - Added vulnerability scanning
  - Configured automated security checks

- **Code Quality**
  - Added ESLint security plugin
  - Implemented secure coding practices
  - Added input validation patterns
  - Configured secure development guidelines

### Documentation

- **Project Documentation**
  - Comprehensive README with setup instructions
  - Detailed contributing guidelines
  - Professional code of conduct
  - Security policy and reporting procedures
  - Development workflow documentation

- **API Documentation**
  - Backend API documentation structure
  - Frontend component documentation
  - Package documentation templates
  - Code examples and usage guides

## [0.9.0] - 2024-XX-XX

### Added

- Initial project scaffolding
- Basic monorepo structure
- Development environment setup

### Changed

- Project initialization
- Repository structure planning

### Fixed

- Initial setup issues
- Configuration conflicts

## [0.8.0] - 2024-XX-XX

### Added

- Project planning and architecture design
- Technology stack selection
- Development workflow planning

### Changed

- Project requirements analysis
- Architecture decisions

## [0.7.0] - 2024-XX-XX

### Added

- Initial project concept
- Requirements gathering
- Market research

### Changed

- Project scope definition
- Feature planning

---

## Version History

| Version | Release Date | Status       | Description                               |
| ------- | ------------ | ------------ | ----------------------------------------- |
| 1.0.0   | 2024-12-XX   | 🚀 Released  | Initial stable release with full platform |
| 0.9.0   | 2024-XX-XX   | ✅ Completed | Development setup and tooling             |
| 0.8.0   | 2024-XX-XX   | ✅ Completed | Architecture and planning                 |
| 0.7.0   | 2024-XX-XX   | ✅ Completed | Project initialization                    |

## Release Types

- **Major Release (X.0.0)**: Breaking changes, new major features
- **Minor Release (X.Y.0)**: New features, backwards compatible
- **Patch Release (X.Y.Z)**: Bug fixes, security updates

## Change Categories

- **Added**: New features, components, or functionality
- **Changed**: Updates to existing features or behavior
- **Deprecated**: Features that will be removed in future versions
- **Removed**: Features that have been removed
- **Fixed**: Bug fixes and issue resolutions
- **Security**: Security-related changes and updates

## Contributing to Changelog

When contributing to the changelog, please:

1. **Follow the format** above for consistency
2. **Use clear, concise language** to describe changes
3. **Categorize changes** appropriately (Added, Changed, Fixed, etc.)
4. **Include relevant details** such as breaking changes or migration notes
5. **Update the version** and release date when appropriate

## Links

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Note:** This changelog is maintained manually. For automated changelog generation,
we use conventional commits and semantic versioning to track changes across
releases.
