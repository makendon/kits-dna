// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("site-pages", () => { // 2
  test("homepage should not have any automatically detectable accessibility issues", async ({ page }) => {
    await page.goto("/"); // 3
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
  
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

  test("product page should not have accessibility issues", async ({ page }) => {
    await page.goto("/product");
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("projects page should not have accessibility issues", async ({ page }) => {
    await page.goto("/projects");
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("blog page should not have accessibility issues", async ({ page }) => {
    await page.goto("/blog");
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test("should not have any automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
