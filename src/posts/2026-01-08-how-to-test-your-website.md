---
title: How to test your website
date: 2026-01-08
tags:
  - testing
  - playwright
description: I used to test changes to kits-dna manually, but in the spirit of CI/CD here's how I added automated testing.
---
## What's testing?

Testing simply means checking that your application works as the user expects. When initially building this site I tested the functionality manually, primarily on the development server and then after pushing to `production` I ran some live tests. Changing deployment mechanism to Netlify allowed **build previews** that essentially replaced the need for live tests as it replicates the `production` environment - it's still manual though, I open a couple of pages, check the blog posts are there, does the search work etc.

Regardless of scale this is important stuff, but could I automate it? :robot:

### Automated testing

If you're a QA test engineer this will be your bread and butter, but as we build a lot of infrastructure at work, I wasn't too familiar with test suites. There's plenty available, **Selenium**, **Cypress** and **Playwright** maintained by Microsoft. I tested [**Playwright**](https://playwright.dev), their documentation is beginner friendly and there's a cool test generation feature.

## Playwright

> *Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. Playwright supports Chromium, WebKit and Firefox on Windows, Linux and macOS, locally or in CI, headless or headed, with native mobile emulation for Chrome (Android) and Mobile Safari.*

Playwright is gaining traction as a modern testing tool for web apps. It supports `node`, `java`, `python` and `.NET` and different browsers and operating systems (including mobile). There's lots of features and plenty of API's, take a look at [Playwright documentation](https://playwright.dev/docs/intro) for more information.

### Concepts

Playwright tests centre around **Actions** and **Assertions**.

```js
test('has title', async ({ page }) => {  
  await page.goto('https://playwright.dev/');  
  
  // Expect a title "to contain" a substring.  
  await expect(page).toHaveTitle(/Playwright/);  
});
```

In this example a test called 'has title' is making a navigation action to go to the page *https://playwright.dev/*, Playwright waits for the page to reach the load state before continuing. Playwright then asserts or expects the page to have the title *Playwright*. This test will pass if the page loads and the title is as per the assertion, the test will fail if the title was different.

Tests can run locally and in CI so that each time you make a change to your site, the tests can run to see if you've broken anything such as missing links or not building the search index.

## How to install and configure Playwright

You can install Playwright by running `npm init playwright@latest` this will create the following files/folders.

```bash
playwright.config.ts         # Test configuration
tests/
  example.spec.ts            # Minimal example test
```

I have my test configuration setup as `JavaScript` since I have don't have any `TypeScript`.  I haven't changed too much from the default configuration but for an Eleventy project using the development server `http://localhost:8080` you need to ensure you add this for base URL as below:

```js
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
use: {
  /* Base URL to use in actions like `await page.goto('/')`. */
  baseURL: process.env.BASE_URL || "http://localhost:8080",
```

```js
/* Run your local dev server before starting the tests */
webServer: process.env.BASE_URL ? undefined : {
  command: "npm start",
  url: "http://localhost:8080",
  reuseExistingServer: !process.env.CI,
},
```

The configuration file also lets you select what browsers you want your tests to run on:

- Chromium
- Firefox
- Webkit (Safari)

You can also run tests against mobile browsers.

## How to generate tests

Test files go in the `tests` directory and follow the format `[test].spec.js`. Here's an example of a simple test.

>[!NOTE]
> The ts-check is because I'm not using `TypeScript`.

```js
// @ts-check
import { test, expect } from "@playwright/test";

test("basic", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Kit France/);
  await page.goto("/");
  await page.getByRole("button", { name: "About" }).click();
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  await page.getByRole("link", { name: "CF" }).click();
  await page.getByRole("button", { name: "Product" }).click();
  await expect(page.getByRole("article").filter({ hasText: "Business outcomes" })).toBeVisible();
  await page.getByRole("link", { name: "Side Projects", exact: true }).click();
  await expect(page.getByText("Jamstack kits-dna My personal")).toBeVisible();
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  await page.getByTitle("Search").click();
  await expect(page.getByRole("textbox", { name: "Search" })).toBeVisible();
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.getByRole("button", { name: "Dark/Light Mode" })).toBeVisible();
});
```

This test called **basic** performs actions and assertions - go's to pages, clicks buttons, expects to see headings or visible elements.

> [!TIP]
> Playwright also support [accessibility testing](https://playwright.dev/java/docs/accessibility-testing).

### Recording tests

Playwright supports generating tests by [recordings](https://playwright.dev/java/docs/codegen-intro) :record_button: A browser window opens, records your interactions and writes the test!

Beyond recordings Playwright now supports `agents` where you can use GitHub Copilot in VS Code or Claude Code to run the agents. The agents can analyses your application and add test specifications as markdown files. From the specs another agent can generate tests. There's even an agent that can fix broken tests. I haven't used agents yet but if i add tests in future I'll consider it.

## Running tests

Run your tests locally using the command `npx playwright test`, the tests run in what's called *headless* mode where you don't see the tests run in the browser, only in the terminal. To see the tests run in a browser use the command `npx playwright test --ui`, the tests run quickly! Once your tests have run you can view a report.

> [!TIP]
> If you're a VS Code user you can run whole or individual tests from the testing menu (Test Explorer). You can also install the Playwright extension.

### Continuous integration

I run my playwright tests as part of a continuous integration (CI) workflow. The workflow runs on each pull request opened against the main branch. If the tests pass I'm confident I can merge, if the tests fail I've got something to fix!

The workflow starts with installing dependencies and building the site. It then installs Playwright and the browsers, starts the development server and runs Playwright before stopping the development server. Check out my [Playwright workflow](https://github.com/makendon/kits-dna/blob/main/.github/workflows/playwright.yml) on GitHub.

I also run the tests in a container after building a Docker image for reproducibility purposes as a more *production* like environment.

## Wrap up

I've only scratched the surface with testing and Playwright. The size and use of `kits-dna` doesn't warrant any further discovery for the time being. That said getting a basic implementation has helped me understand testing better, it's value and given me the confidence to merge changes if all my tests pass without having to do manual checks - which is great for managing dependabot pull requests!

My hope is that this post inspires you to add at least one test to your personal website :test_tube:

Thanks for reading :call_me_hand:
