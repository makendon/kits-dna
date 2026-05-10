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
  // Upstream Pagefind issue: the component UI ships keyboard-hint text and kbd
  // badges with colours that fail WCAG AA contrast. Defaults `--pf-text-muted: #767676`
  // (4.48:1 on #fff) and `--pf-text-secondary: #666` are at or below threshold,
  // and Pagefind's selectors use an `:is(*, #\#)`-stacked specificity hack that
  // resists consumer overrides via the documented CSS variables. Tracking via
  // upstream issue — re-enable once fixed there.
  test.fixme("search modal should not have accessibility issues", async ({ page }) => {
    await page.goto("/");
    await page.locator("pagefind-modal-trigger button").click();
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();

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
test("dark mode should not introduce any automatically detectable accessibility issues", async ({ page }) => {
  // Suppress CSS transitions so axe doesn't capture mid-transition colour values
  // (Firefox in particular reads link colours mid-tween, producing false violations).
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  // On mobile viewports the dark-mode toggle is inside .nav-utilities, hidden behind
  // the burger menu, so open it first.
  const burger = page.locator("label[for*='burger-menu']");
  if (await burger.isVisible()) await burger.click();

  await page.getByRole("button", { name: "Dark/Light Mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
