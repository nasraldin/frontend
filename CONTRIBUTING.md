# Contributing to Ajrly

Thank you for your interest in contributing to Ajrly! This document provides
guidelines and information to help you get started with contributing to our project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Support and Questions](#support-and-questions)

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating,
you are expected to uphold this code. Please report unacceptable behavior to the
project maintainers.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22 or higher)
- **pnpm** (v10 or higher) - [Installation Guide](https://pnpm.io/installation)
- **Git** (latest version)
- **TypeScript** knowledge (recommended)

### Project Structure

```
ajrly-workspaces/
├── apps/                  # Applications
│   ├── frontend/          # Next.js frontend application
│   ├── backend/           # NestJS backend application
│   └── cms/               # Strapi headless content management system
├── packages/              # Shared packages
│   ├── core/              # Core utilities and types
│   ├── ui/                # UI components library
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── eslint/            # ESLint configuration
└── docs/                  # Documentation
```

## Development Setup

### 1. Clone

Clone [ajrly-workspaces](https://github.com/nasraldin/ajrly-workspaces) locally:

```bash
git clone https://github.com/nasraldin/ajrly-workspaces.git
cd ajrly-workspaces
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm i

# Verify installation
pnpm build
```

### 3. Development Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `pnpm dev`        | Start development servers for all apps |
| `pnpm build`      | Build all packages and applications    |
| `pnpm test`       | Run all tests                          |
| `pnpm lint`       | Fix linting and formatting issues      |
| `pnpm lint:check` | Run linting and formatting checks      |
| `pnpm type-check` | Run TypeScript type checking           |
| `pnpm clean`      | Clean all build artifacts              |

### 4. Environment Setup

Create environment files for the applications you're working on:

```bash
# Frontend
cp apps/frontend/.env.development apps/frontend/.env.local

# Backend
cp apps/backend/.env.development apps/backend/.env
```

## Contribution Workflow

### 1. Create a Feature Branch

**Always work on a new branch:**

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Follow the [Code Standards](#code-standards) below
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass locally

### 3. Commit Your Changes

Follow our [Conventional Commits](#conventional-commits) specification:

```bash
# Example commit messages
git commit -m "feat(ui): add new Button component"
git commit -m "fix(core): resolve authentication token validation"
git commit -m "docs(readme): update installation instructions"
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with a clear description of your changes.

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types unless absolutely necessary
- Use strict TypeScript configuration

### Code Style

- **Formatting:** [Prettier](https://prettier.io/) handles code formatting
- **Linting:** [ESLint](https://eslint.org/) with custom rules
- **Imports:** Use absolute imports when possible
- **Naming:** Use descriptive names for variables, functions, and files

### File Organization

```
src/
├── components/    # React components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── constants/     # Application constants
└── styles/        # Styling files
```

### Component Guidelines

- Use functional components with hooks
- Implement proper prop validation
- Follow the single responsibility principle
- Add JSDoc comments for complex components

## Testing Guidelines

### Test Structure

```
__tests__/
├── unit/          # Unit tests
├── integration/   # Integration tests
└── e2e/          # End-to-end tests
```

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies appropriately

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test path/to/test-file.test.ts

# Generate coverage report
pnpm test:coverage
```

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/)
specification for commit messages.

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type       | Description              | Example                                           |
| ---------- | ------------------------ | ------------------------------------------------- |
| `feat`     | New feature              | `feat(auth): add OAuth2 authentication`           |
| `fix`      | Bug fix                  | `fix(ui): resolve button alignment issue`         |
| `docs`     | Documentation changes    | `docs(readme): update installation guide`         |
| `style`    | Code style changes       | `style(components): format code with prettier`    |
| `refactor` | Code refactoring         | `refactor(core): simplify authentication logic`   |
| `test`     | Test changes             | `test(utils): add unit tests for date formatting` |
| `chore`    | Maintenance tasks        | `chore(deps): update dependencies`                |
| `ci`       | CI/CD changes            | `ci(github): add automated testing workflow`      |
| `perf`     | Performance improvements | `perf(api): optimize database queries`            |
| `build`    | Build system changes     | `build(webpack): update webpack configuration`    |

### Scopes

Use scopes to indicate which part of the codebase is affected:

- `ui` - UI components
- `core` - Core functionality
- `api` - API endpoints
- `auth` - Authentication
- `docs` - Documentation
- `deps` - Dependencies

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass:**

   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

2. **Update documentation** if your changes affect user-facing features

3. **Add tests** for new functionality

4. **Follow the commit convention** for all commits

### Pull Request Template

When creating a Pull Request, use the following template:

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not
      work as expected)
- [ ] Documentation update

## Testing

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist

- [ ] All tests pass
- [ ] Code is properly formatted
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Accessibility considerations addressed
```

### Review Process

1. **Automated Checks:** CI/CD pipeline runs tests and linting
2. **Code Review:** At least one maintainer must approve
3. **Address Feedback:** Respond to review comments promptly
4. **Merge:** Maintainers will merge after approval

## Release Process

### Version Management

We use [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Workflow

1. **Feature Freeze:** Stop merging new features
2. **Testing:** Comprehensive testing across environments
3. **Documentation:** Update changelog and documentation
4. **Release:** Create git tag and GitHub release
5. **Deploy:** Deploy to production environments

## Support and Questions

### Getting Help

- **Documentation:** Check our [documentation](https://docs.ajrly.app)
- **Issues:** Search existing
  [GitHub issues](https://github.com/nasraldin/ajrly-workspaces/issues)
- **Discussions:** Use
  [GitHub Discussions](https://github.com/nasraldin/ajrly-workspaces/discussions)
- **Email:** Contact us at info@ajrly.com

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** General questions and discussions
- **Email:** security@ajrly.com for security issues

## Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Contributor hall of fame
- GitHub contributors list

---

**Thank you for contributing to Ajrly!** 🚀

Your contributions help make Ajrly better for everyone in the community.
