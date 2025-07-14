// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Mobile Browser Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mobile navigation menu", async ({ page }) => {
    // Test mobile hamburger menu
    const menuButton = page.locator("label[for*='burger-menu']");
    await expect(menuButton).toBeVisible();
    await menuButton.click();
        
    // Verify mobile menu opens
    const mobileNav = page.locator("ul.nav-links").first();
    await expect(mobileNav).toBeVisible();
        
    // Test navigation to blog through mobile menu
    await page.getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test("mobile menu close functionality", async ({ page }) => {
    const menuButton = page.locator("label[for*='burger-menu']");
        
    if (await menuButton.isVisible()) {
      // Open menu
      await menuButton.click();
      const mobileNav = page.locator("ul.nav-links").first();
      await expect(mobileNav).toBeVisible();
            
      // Close menu by clicking burger again
      await menuButton.click();
      await expect(mobileNav).not.toBeVisible();
    }
  });

  test("mobile search functionality", async ({ page }) => {
    // Open mobile menu first
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
        
    await page.getByTitle("Search").click();
    await page.getByRole("textbox", { name: "Search" }).fill("git");
    await page.keyboard.press("Enter");
        
    // Verify search results are properly displayed on mobile
    await expect(page.getByLabel("Search this site").locator("div").filter({ hasText: "Filters Content content pages" })).toBeVisible();
  });

  test("mobile dark mode toggle", async ({ page }) => {
    // Find dark mode button (might be in mobile menu)
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
        
    await page.getByRole("button", { name: "Dark/Light Mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
  });

  test("mobile viewport responsiveness", async ({ page }) => {
    // Test portrait orientation
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();
        
    // Test landscape orientation
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator("body")).toBeVisible();
        
    // Ensure mobile menu is still accessible
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeVisible();
    }
  });

  test("mobile blog post navigation", async ({ page }) => {
    // Open mobile menu and navigate to blog
    const menuButton = page.locator("label[for*='burger-menu']");
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
        
    await page.getByRole("link", { name: "Blog", exact: true }).click();
        
    // Check if blog posts are listed and properly displayed on mobile
    const blogPosts = page.locator("article").first();
    await expect(blogPosts).toBeVisible();
        
    // Test blog post URL on mobile
    await blogPosts.locator("a").tap();
    await expect(page).toHaveURL(/\/blog/);
  });

  test("mobile external links", async ({ page }) => {
    // Check external links behavior on mobile
    const externalLinks = page.locator("a[target=\"_blank\"], a[href^=\"http\"]");
    if (await externalLinks.count() > 0) {
      await expect(externalLinks.first()).toHaveAttribute("target", "_blank");
      // On mobile, external links should still open in new tab
      await expect(externalLinks.first()).toHaveAttribute("rel", /noopener|noreferrer/);
    }
  });

  test("mobile 404 page", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/404/)).toBeVisible();
        
    // Ensure 404 page is mobile-responsive
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText(/404/)).toBeVisible();
  });
});
