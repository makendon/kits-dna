# Security policy

## Supported versions

I release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | :white_check_mark: |

This is a personal website project. Only the latest version deployed to production receives security updates.

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please report it privately:

### Preferred method

- **GitHub Security Advisories**: Use the [private vulnerability reporting feature](https://github.com/makendon/kits-dna/security/advisories/new)

### Alternative methods

- **Issue (for low severity only)**: For non-critical issues, open a [GitHub issue](https://github.com/makendon/kits-dna/issues)

### What to include

Please include the following information in your report:

- **Type of vulnerability** (e.g., XSS, dependency vulnerability, configuration issue)
- **Location** (file path, URL, or component affected)
- **Steps to reproduce** (detailed instructions or proof-of-concept)
- **Impact** (what an attacker could achieve)
- **Suggested fix** (if you have one)
- **Your contact information** (for follow-up questions)

## Response timeline

- **Resolution target**:
  - Critical vulnerabilities: Within 7 days
  - High severity: Within 14 days
  - Medium/Low severity: Within 30 days

## Security measures

This project implements the following security measures:

### Supply chain security

- Dependency scanning via Dependabot
- Automated security updates
- npm audit in CI pipeline
- Pinned Docker base images

### Build security

- Containerized builds (Dockerfile)
- Reproducible builds
- CI/CD security scanning
- Content Security Policy (CSP) via Netlify plugin

### Development security

- Code review required for PRs
- Automated testing (Playwright, ESLint, Vale)
- Security headers configured
- HTTPS enforced

## Policy updates

This security policy may be updated periodically. Last updated: 2026-02-15
