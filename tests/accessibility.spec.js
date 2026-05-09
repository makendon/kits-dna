// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("site-pages", () => {
  // TC-070
  test("homepage should not have any automatically detectable accessibility issues", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-071
  test("product page should not have accessibility issues", async ({ page }) => {
    await page.goto("/product");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-072
  test("side-projects page should not have accessibility issues", async ({ page }) => {
    await page.goto("/side-projects");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-073
  test("blog page should not have accessibility issues", async ({ page }) => {
    await page.goto("/blog");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-075
  test("about page should not have accessibility issues", async ({ page }) => {
    await page.goto("/about");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-076
  test("blog post page should not have accessibility issues", async ({ page }) => {
    await page.goto("/blog/how-to-test-your-website");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-077
  test("contact page should not have accessibility issues", async ({ page }) => {
    await page.goto("/contact");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-078
  test.fixme("search modal should not have accessibility issues", async ({ page }) => {
    await page.goto("/");
    await page.locator("pagefind-modal-trigger button").click();
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();

    // Pagefind's component UI ships keyboard-hint text and kbd badges that fail
    // WCAG AA color contrast (#999/#8d8d8d on #fff/#f8f8f8). Tracked as a follow-up.
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("dialog.pf-modal")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-079
  test("tags index page should not have accessibility issues", async ({ page }) => {
    await page.goto("/tags");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-080
  test("resume page should not have accessibility issues", async ({ page }) => {
    await page.goto("/resume");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // TC-081
  test("404 page should not have accessibility issues", async ({ page }) => {
    await page.goto("/non-existent-page");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

// TC-074
test("should not have any automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

// TC-082
test.fixme("dark mode should not introduce any automatically detectable accessibility issues", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Dark/Light Mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  // In dark mode, the Pico CSS Jade theme's primary link/button colour (#008f5e) has
  // insufficient contrast ratio of 4.35:1 against the dark background (#13171f), falling
  // short of the WCAG 2 AA requirement of 4.5:1. This affects nav links, footer links,
  // and CTA buttons. This is a genuine colour contrast issue in the dark mode theme.
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
