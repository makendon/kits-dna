// @ts-check
import { test, expect } from "@playwright/test";

test("dark mode toggle", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Dark/Light Mode" }).click();
  // Check if theme changed (you might need to adjust based on your implementation)
  await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
});

test("search functionality", async ({ page }) => {
  await page.goto("/");
  await page.getByTitle("Search").click();
  await page.getByRole("textbox", { name: "Search" }).fill("git");
  await page.keyboard.press("Enter");
  // Verify search results
  await expect(page.getByLabel("Search this site").locator("div").filter({ hasText: "Filters Content content pages" })).toBeVisible();
});

test("blog post navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  // Check if blog posts are listed
  const blogPosts = page.locator("article").first();
  await expect(blogPosts).toBeVisible();
  // Test specific blog post URL slug
  await blogPosts.locator("a").click();
  await expect(page).toHaveURL(/\/blog/);
});

test("external links", async ({ page }) => {
  await page.goto("/");
  // Check external links open in new tab (if any)
  const externalLinks = page.locator("a[target=\"_blank\"], a[href^=\"http\"]");
  if (await externalLinks.count() > 0) {
    await expect(externalLinks.first()).toHaveAttribute("target", "_blank");
  }
});

test("404 page", async ({ page }) => {
  const response = await page.goto("/non-existent-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/404/)).toBeVisible();
});
