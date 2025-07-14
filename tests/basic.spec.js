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
