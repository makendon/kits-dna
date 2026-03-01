// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// TC-014
test("dark mode toggle", async ({ page }) => {
  await page.getByRole("button", { name: "Dark/Light Mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
});

// TC-019
test("search functionality", async ({ page }) => {
  await page.getByTitle("Search").click();
  await page.getByRole("textbox", { name: "Search" }).fill("git");
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Search this site").locator("div").filter({ hasText: "Filters Content content pages" })).toBeVisible();
});

// TC-026
test("blog post navigation", async ({ page }) => {
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  const blogPosts = page.locator("article").first();
  await expect(blogPosts).toBeVisible();
  await blogPosts.locator("a").click();
  await expect(page).toHaveURL(/\/blog/);
});

// TC-065
test("external links", async ({ page }) => {
  const externalLinks = page.locator("a[target=\"_blank\"], a[href^=\"http\"]");
  if (await externalLinks.count() > 0) {
    await expect(externalLinks.first()).toHaveAttribute("target", "_blank");
  }
});

// TC-003
test("404 page", async ({ page }) => {
  const response = await page.goto("/non-existent-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/404/)).toBeVisible();
});

// ---------------------------------------------------------------------------
// TC-015–016: Dark / Light Mode Toggle
// ---------------------------------------------------------------------------

test.describe("Dark / Light Mode Toggle", () => {
  // TC-015
  test("dark mode toggle switches between dark and light on each click", async ({ page }) => {
    const initialTheme = await page.locator("html").getAttribute("data-theme");

    await page.getByRole("button", { name: "Dark/Light Mode" }).click();

    const expectedAfterFirst = initialTheme === "dark" ? "light" : "dark";
    await expect(page.locator("html")).toHaveAttribute("data-theme", expectedAfterFirst);

    await page.getByRole("button", { name: "Dark/Light Mode" }).click();

    await expect(page.locator("html")).toHaveAttribute("data-theme", initialTheme ?? /dark|light/);
  });

  // TC-016
  test("dark mode preference is persisted in localStorage across page navigations", async ({ page }) => {
    await page.getByRole("button", { name: "Dark/Light Mode" }).click();
    const themeSwitchedTo = await page.locator("html").getAttribute("data-theme");

    await page.goto("/about");

    await expect(page.locator("html")).toHaveAttribute("data-theme", themeSwitchedTo ?? /dark|light/);

    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe(themeSwitchedTo);
  });
});

// ---------------------------------------------------------------------------
// TC-020–022: Search Functionality
// ---------------------------------------------------------------------------

test.describe("Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search");
  });

  // TC-020
  test("search with no results shows empty state", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).fill("xyzzy12345nonexistent");
    await page.keyboard.press("Enter");

    await expect(page.locator(".pagefind-ui__result")).toHaveCount(0);
    await expect(page.locator(".pagefind-ui__message")).toBeVisible();
  });

  // TC-021
  test("search results can be filtered by content type", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).fill("Eleventy");
    await page.keyboard.press("Enter");

    await expect(page.locator(".pagefind-ui__filter-block").filter({ hasText: "Content" })).toBeVisible();

    await page.getByRole("checkbox", { name: "posts" }).click();

    const resultLinks = page.locator(".pagefind-ui__result-link");
    const count = await resultLinks.count();
    expect(count).toBeGreaterThan(0);
    // Verify that at least some results are blog posts when filtering by posts type
    const hrefs = [];
    for (let i = 0; i < count; i++) {
      const href = await resultLinks.nth(i).getAttribute("href");
      hrefs.push(href);
    }
    const blogPostResults = hrefs.filter(href => href?.match(/\/blog\//));
    expect(blogPostResults.length).toBeGreaterThan(0);
  });

  // TC-022
  test("search accessed via header icon navigates to /search", async ({ page }) => {
    await page.goto("/");
    await page.getByTitle("Search").click();

    await expect(page).toHaveURL(/\/search\/?/);
    await expect(page.getByRole("heading", { name: "Search the site", level: 1 })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// TC-024–030: Blog Page and Blog Posts
// ---------------------------------------------------------------------------

test.describe("Blog Page and Blog Posts", () => {
  // TC-024
  test("blog page lists posts in reverse chronological order", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByRole("heading", { name: "Blog", level: 1 })).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();

    const dateCodes = page.locator("article header small code");
    const count = await dateCodes.count();
    expect(count).toBeGreaterThan(0);

    const dateTexts = [];
    for (let i = 0; i < count; i++) {
      dateTexts.push(await dateCodes.nth(i).innerText());
    }

    const parsedDates = dateTexts.map((d) => new Date(d));
    for (let i = 0; i < parsedDates.length - 1; i++) {
      expect(parsedDates[i].getTime()).toBeGreaterThanOrEqual(parsedDates[i + 1].getTime());
    }
  });

  // TC-025
  test("blog post cards show title, description, and date", async ({ page }) => {
    await page.goto("/blog");

    const firstArticle = page.locator("article").first();

    await expect(firstArticle.locator("header small code")).toBeVisible();
    await expect(firstArticle.locator(".blog-post-list-heading a")).toBeVisible();
    await expect(firstArticle.locator("p")).toBeVisible();
  });

  // TC-027
  test("blog post page displays all expected metadata elements", async ({ page }) => {
    await page.goto("/blog/how-to-test-your-website");

    await expect(page.getByRole("heading", { name: "How to test your website", level: 1 })).toBeVisible();
    await expect(page.locator("article header").getByText(/Kit France/)).toBeVisible();
    await expect(page.locator("article header").getByText(/\d{2} \w+ \d{4}/)).toBeVisible();
    await expect(page.getByText(/minute.* to read/)).toBeVisible();
    await expect(page.locator("article header a[href^=\"/tags/\"]").first()).toBeVisible();
  });

  // TC-028
  test("blog post previous and next navigation links work", async ({ page }) => {
    await page.goto("/blog/learning-to-programme-as-a-product-manager-2");

    const prevLink = page.locator(".links-nextprev-prev a");
    await expect(prevLink).toBeVisible();

    const nextLink = page.locator(".links-nextprev-next a");
    await expect(nextLink).toBeVisible();

    const currentHeading = await page.getByRole("heading", { level: 1 }).innerText();
    const nextHref = await nextLink.getAttribute("href");
    await nextLink.click();

    await expect(page).toHaveURL(nextHref ?? /\/blog\//);

    const newHeading = await page.getByRole("heading", { level: 1 }).innerText();
    expect(newHeading).not.toBe(currentHeading);
  });

  // TC-029
  test("back to top link returns to top of page", async ({ page }) => {
    await page.goto("/blog/how-to-test-your-website");

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const backToTopLink = page.getByRole("link", { name: "Back to top" });
    await expect(backToTopLink).toBeVisible();

    await backToTopLink.click();

    await expect(page).toHaveURL(/#top$/);
  });

  // TC-030
  test("RSS icon on the blog page links to /feed.xml", async ({ page }) => {
    await page.goto("/blog");

    const rssLink = page.locator("main").getByTitle("RSS/Atom");

    await expect(rssLink).toHaveAttribute("href", "/feed.xml");
    await expect(rssLink).toHaveAttribute("target", "_blank");
    await expect(rssLink).toHaveAttribute("rel", /noopener/);
  });
});

// ---------------------------------------------------------------------------
// TC-031–033: RSS Feed
// ---------------------------------------------------------------------------

test.describe("RSS Feed", () => {
  // TC-031
  test("RSS feed is accessible and returns valid XML", async ({ page }) => {
    // Use request API to get raw response body — page.content() escapes XML tags in WebKit
    const response = await page.request.get("/feed.xml");

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toMatch(/<feed|<rss/);
  });

  // TC-032
  test("RSS feed contains blog post entries", async ({ page }) => {
    const response = await page.request.get("/feed.xml");
    const body = await response.text();

    expect(body).toMatch(/<entry>|<item>/);
    expect(body).toMatch(/<title>/);
    expect(body).toMatch(/<link/);
  });

  // TC-033
  test("footer RSS icon links to /feed.xml with correct attributes", async ({ page }) => {
    await page.goto("/");

    const footerRss = page.locator("footer").getByTitle("RSS/Atom");

    await expect(footerRss).toHaveAttribute("href", "/feed.xml");
    await expect(footerRss).toHaveAttribute("target", "_blank");
    await expect(footerRss).toHaveAttribute("rel", "noopener noreferrer");
  });
});
