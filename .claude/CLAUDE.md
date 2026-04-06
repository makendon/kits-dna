# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

kits-dna is the repository for **kitfrance.com**, a personal website built with Eleventy (11ty) static site generator. The site deploys to Netlify on each push to `main` and uses Docker for containerized testing environments.

## Development commands

### Local development

```bash
npm ci                    # Install dependencies (use ci, not install)
npm start                 # Build and serve with hot reload on http://localhost:8080
```

### Build

```bash
npm run build             # Production build (sets ELEVENTY_ENVIRONMENT=production)
npm run build:sass        # Compile Sass to CSS
npm run build:eleventy    # Build Eleventy site
npm run build:search      # Build Pagefind search index
```

### Testing

```bash
npm test                  # Run Playwright tests
npm run test:ui           # Run tests in UI mode
npm run test:report       # Show test report
```

### Linting

```bash
npm run eslint            # Lint JavaScript files
npm run eslint:fix        # Fix linting issues automatically
```

### Utilities

```bash
npm run clean             # Remove dist, .cache, playwright-report, and test-results directories
npm run update            # Update npm dependencies
```

### Docker development

```bash
docker build -t kits-dna .
docker run -p 8080:8080 kits-dna
```

## Architecture

### Directory structure

```text
src/
├── _data/              # Global data files (metadata.json, product.json, kitsDna.js)
├── _includes/          # Reusable components (header, footer, seo, etc.)
├── _layouts/           # Page templates (base.njk, post.njk, blog.njk, page.njk)
├── _sass/              # Sass stylesheets (uses PicoCSS)
├── _scripts/           # Custom filters and utilities
│   ├── filters/        # Eleventy filters (dateFormat, filterTagList, sortAlphabetically)
│   ├── getKeys.js      # Key extraction utility
│   └── wordCount.js    # Word count calculation
├── assets/             # Static assets (images, fonts, favicons, documents, js)
├── pages/              # Static pages
└── posts/              # Blog posts (markdown files)
```

### Eleventy configuration

- **Input directory**: `src/`
- **Output directory**: `dist/`
- **Template formats**: md, njk, html, liquid, 11ty.js
- **Markdown engine**: Nunjucks (njk)
- **HTML engine**: Nunjucks (njk)

### Markdown processing

The site uses markdown-it with these plugins:

- `markdown-it-anchor` - Auto-generates heading anchors (level 2+)
- `markdown-it-emoji` - Emoji support
- `markdown-it-github-alerts` - GitHub-style alerts/callouts

### Key plugins

- **@11ty/eleventy-img** - Automatic image optimization (webp, jpeg)
- **@11ty/eleventy-navigation** - Navigation structure
- **@11ty/eleventy-plugin-rss** - RSS/Atom feed generation (feed.xml)
- **@11ty/eleventy-plugin-syntaxhighlight** - Code syntax highlighting
- **@11ty/font-awesome** - Font Awesome icons via shortcode `{% icon "icon-name" %}`
- **pagefind** - Static search functionality

### Styling

- Uses **PicoCSS** as the base CSS framework
- Sass files in `src/_sass/` compile to `dist/css/styles.css`
- Watch mode: `npm run watch:sass`

### Drafts

Posts with `draft: true` in frontmatter are excluded from production builds (`ELEVENTY_RUN_MODE === "build"`).

### Custom filters

- `dateFormat` - Format dates for display
- `filterTagList` - Filter out system tags from tag lists
- `wordCount` - Calculate reading time
- `sortAlphabetically` - Sort collections alphabetically
- `getKeys` - Extract object keys

## Test suite

Playwright tests are in the `tests/` directory:

- `functional.spec.js` - Functional tests grouped by feature area (navigation, blog, search, dark mode, etc.)
- `accessibility.spec.js` - Accessibility tests (includes axe-core)
- `mobile.spec.js` - Mobile-specific tests

Tests run against `http://localhost:8080` by default. Use `BASE_URL` environment variable to test against a different URL.

Desktop browsers (chromium, firefox, webkit) skip mobile.spec.js tests. Mobile browsers (Mobile Chrome, Mobile Safari) only run mobile.spec.js and accessibility.spec.js.

## ESLint configuration

- 2-space indentation
- Double quotes
- Semicolons required
- Unix line endings
- ES2022 with ES modules
- Configured for both browser and Node.js globals

## Deployment

- **Production**: Netlify (auto-deploy from `main` branch)
- **Container**: Heroku buildpack publishes to GitHub Container Registry
- **Build command**: `npm run build`
- **Plugins**: netlify-plugin-cache (.cache directory), @netlify/plugin-csp-nonce

## Important notes

- Always use `npm ci` instead of `npm install` for consistent dependency installation
- The Dockerfile approach ensures the build environment matches production
- Search index is built separately via `npm run build:search` (uses Pagefind)
- Source code is GPL v3 licensed; content is copyrighted

## Markdown standards

When writing or editing any `.md` file:

- Follow the markdownlint rules defined in `.markdownlint-cli2.yaml` — run `npm run markdown` to check
- Use **en-GB spelling** throughout (configured in `cspell.json`) — run `npm run spell` to check
- Key disabled rules (allowed): long lines (MD013), inline HTML (MD033), duplicate headings (MD024), no required h1 (MD041)

## Claude Code configuration

This repository uses the `.claude/` directory to configure Claude Code behaviour:

### Claude directory structure

- **`CLAUDE.md`** (this file) - Main project instructions, always loaded by Claude Code
- **`skills/`** - Skills that can be invoked via slash commands (e.g., `/review`, `/polish`, `/new-post`)
- **`rules/`** - Contextual guidelines that inform specific workflows (e.g., `editorial.md` for content review)

### Skills

**Skills** (in `skills/`):

- Invoked with slash commands: `/review`, `/polish`, `/new-post`
- Each skill lives in its own subdirectory with a `SKILL.md` entry point
- Load instructions into the current Claude Code session
- Modify Claude's behaviour for that task
- Example: `/review` loads review instructions and Claude follows them in the main session

### Rules

**Rules** (in `rules/`):

- Contextual guidelines referenced by skills or workflows
- Not directly invoked - loaded when needed
- Example: `editorial.md` provides guidelines for the `/review` skill

### Agents

**Agents** (in `agents/`):

Custom subagents that Claude Code can spawn to handle specialised tasks autonomously. Each agent has a defined set of tools and a specific role.

| Agent | Description | When to use |
| --- | --- | --- |
| `playwright-test-planner` | Explores the site via browser and produces a comprehensive test plan | Generating or updating `specs/test-plan.md` |
| `playwright-test-generator` | Executes each test plan step in a real browser and writes the resulting Playwright test code | Implementing new tests from the plan |
| `playwright-test-healer` | Runs failing tests, debugs them, and edits the spec files to fix them | When tests break after site changes |

**Usage examples:**

```text
# Create or refresh the test plan
"Use the playwright-test-planner to create a test plan for kits-dna"

# Implement tests from the plan
"Use the playwright-test-generator to implement this test plan"

# Fix broken tests after a change
"Use the playwright-test-healer to fix the failing tests"
```

**Notes:**

- Agents require the `playwright-test` MCP server to be running (configured in `.mcp.json`)
- The test plan lives in `specs/test-plan.md`
- Generator writes individual spec files; review and merge into the appropriate `tests/*.spec.js` file
- Healer can run, debug, and edit test files directly — check its changes before committing

### MCP servers

This project uses MCP (Model Context Protocol) servers to extend Claude Code capabilities:

**Configured servers** (in `.mcp.json`):

- **GitHub MCP** - Provides GitHub integration for operations like:
  - Creating/reading issues and pull requests
  - Adding comments to issues/PRs
  - Searching repositories
  - Managing labels and milestones

**Setup:**

1. Set environment variable: `GITHUB_PERSONAL_ACCESS_TOKEN`
   - Create token at: <https://github.com/settings/personal-access-tokens>
   - Required scopes: `Read access to code and metadata` and `Read and Write access to issues and pull requests`
2. Claude Code will automatically load the GitHub MCP server
3. No additional configuration needed

**Configuration file:** `.mcp.json` in project root

## Editorial process

See `.claude/rules/editorial.md` for writing guidelines and review process.
