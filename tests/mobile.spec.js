// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Mobile Browser Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // TC-009, TC-010
  test("mobile navigation menu", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const mobileNav = page.locator("ul.nav-links").first();
    await expect(mobileNav).toBeVisible();

    await page.getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page).toHaveURL(/\/blog/);
  });

  // TC-011
  test("mobile menu close functionality", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");

    if (await menuButton.isVisible()) {
      await menuButton.click();
      const mobileNav = page.locator("ul.nav-links").first();
      await expect(mobileNav).toBeVisible();

      await menuButton.click();
      await expect(mobileNav).not.toBeVisible();
    }
  });

  // TC-023
  test("mobile search functionality", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }

    await page.getByTitle("Search").click();
    await page.getByRole("textbox", { name: "Search" }).fill("git");
    await page.keyboard.press("Enter");

    await expect(page.getByLabel("Search this site").locator("div").filter({ hasText: "Filters Content content pages" })).toBeVisible();
  });

  // TC-017
  test("mobile dark mode toggle", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }

    await page.getByRole("button", { name: "Dark/Light Mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
  });

  test("mobile viewport responsiveness", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();

    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator("body")).toBeVisible();

    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeVisible();
    }
  });

  test("mobile blog post navigation", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }

    await page.getByRole("link", { name: "Blog", exact: true }).click();

    const blogPosts = page.locator("article").first();
    await expect(blogPosts).toBeVisible();

    await blogPosts.locator("a").tap();
    await expect(page).toHaveURL(/\/blog/);
  });

  // TC-066
  test("mobile external links", async ({ page }) => {
    const externalLinks = page.locator("a[target=\"_blank\"], a[href^=\"http\"]");
    if (await externalLinks.count() > 0) {
      await expect(externalLinks.first()).toHaveAttribute("target", "_blank");
      await expect(externalLinks.first()).toHaveAttribute("rel", /noopener|noreferrer/);
    }
  });

  test("mobile 404 page", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/404/)).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText(/404/)).toBeVisible();
  });

  // TC-012: Mobile nav links navigate to correct pages
  test("mobile nav links navigate to correct pages", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");

    await menuButton.click();
    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about/);

    await page.goto("/");
    await menuButton.click();
    await page.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  // TC-013: Mobile landscape orientation does not break layout
  test("mobile landscape orientation does not break layout", async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });

    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  // TC-083: Homepage hero content is visible on mobile
  test("homepage hero content is visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.locator("img[alt='Engineering team']")).toBeVisible();
    // Hero CTAs are <a role="button"> elements, exposed as buttons in the accessibility tree
    await expect(page.getByRole("button", { name: "About", exact: true }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Product", exact: true }).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  // TC-084: Blog post listing reflows to single column on mobile
  test("blog post listing reflows to single column on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/blog");

    await expect(page.locator("article").first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  // TC-085: Product pillar cards reflow correctly on mobile
  test("product pillar cards reflow correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/product");

    await expect(page.locator("article").first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  // TC-086: Resume page is fully readable on mobile
  test("resume page is fully readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/resume");

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("details").first()).toBeVisible();

    // Resume uses exclusive named accordions (details with name attribute).
    // The first details is open by default. Click the second details (first closed one)
    // to open it. Use a specific nth() locator to avoid the dynamic :not([open]) selector
    // re-evaluating after click.
    const secondDetails = page.locator("details").nth(1);
    await secondDetails.locator("summary").click();
    await expect(secondDetails.locator("ul, p").first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
