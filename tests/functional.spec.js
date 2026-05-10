// @ts-check
import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// TC-002, TC-004: Page Load and Routing
// ---------------------------------------------------------------------------

test.describe("Page Load and Routing", () => {
  // TC-002
  test("all primary pages return HTTP 200", async ({ page }) => {
    const urls = [
      "/",
      "/about",
      "/product",
      "/blog",
      "/side-projects",
      "/resume",
      "/tags",
      "/contact",
      "/accessibility",
      "/privacy",
      "/feed.xml",
      "/sitemap.xml",
    ];

    for (const url of urls) {
      const response = await page.goto(url);
      expect(response?.status(), `Expected ${url} to return 200`).toBe(200);
    }
  });

  // TC-004
  test("side-project sub-pages load correctly", async ({ page }) => {
    await page.goto("/side-projects/kits-dna");
    await expect(page.getByRole("heading", { name: "kits-dna", exact: true, level: 1 })).toBeVisible();

    await page.goto("/side-projects/scratch");
    await expect(page.getByRole("heading", { name: "Dino adventures" })).toBeVisible();

    await page.goto("/side-projects/cs50p-final-project");
    await expect(page.getByRole("heading", { name: "CS50P final project", level: 1 })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// TC-006, TC-007: Navigation
// ---------------------------------------------------------------------------

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // TC-006
  test("all desktop nav links are present and navigable", async ({ page }) => {
    await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Product", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Side Projects", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact", exact: true })).toBeVisible();

    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page.getByRole("heading", { name: "About me" })).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: "Product", exact: true }).click();
    await expect(page.getByRole("article").filter({ hasText: "Business outcomes" })).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: "Side Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/side-projects/);

    await page.goto("/");
    await page.getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Get in touch" })).toBeVisible();
  });

  // TC-007
  test("active nav item has aria-current='page'", async ({ page }) => {
    await page.goto("/about");

    const currentLink = page.locator("nav a[aria-current='page']");
    await expect(currentLink).toHaveText("About");
    await expect(currentLink).toHaveCount(1);
  });
});

// ---------------------------------------------------------------------------
// TC-091, TC-092: Homepage Content
// ---------------------------------------------------------------------------

test.describe("Homepage Content", () => {
  // TC-091
  test("latest posts section shows 3 posts with links", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Latest posts" })).toBeVisible();

    const latestSection = page.locator("section:has(h2:text('Latest posts'))");
    const postCards = latestSection.locator(".grid article");
    await expect(postCards).toHaveCount(3);

    const postLinks = latestSection.locator(".blog-post-list-heading a");
    await expect(postLinks).toHaveCount(3);

    for (const link of await postLinks.all()) {
      await expect(link).toHaveAttribute("href", /^\/blog\//);
    }

    await expect(page.getByRole("button", { name: "View all posts" })).toBeVisible();
    await expect(page.getByRole("button", { name: "View all posts" })).toHaveAttribute("href", "/blog/");
  });

  // TC-092
  test("homepage hero has About, Product, and Side Projects CTAs", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Product", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Side Projects", exact: true })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// TC-014, TC-015, TC-016: Dark / Light Mode Toggle
// ---------------------------------------------------------------------------

test.describe("Dark / Light Mode Toggle", () => {
  // TC-014
  test("dark mode toggle", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark/Light Mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
  });

  // TC-015
  test("dark mode toggle switches between dark and light on each click", async ({ page }) => {
    await page.goto("/");
    const initialTheme = await page.locator("html").getAttribute("data-theme");

    await page.getByRole("button", { name: "Dark/Light Mode" }).click();

    const expectedAfterFirst = initialTheme === "dark" ? "light" : "dark";
    await expect(page.locator("html")).toHaveAttribute("data-theme", expectedAfterFirst);

    await page.getByRole("button", { name: "Dark/Light Mode" }).click();

    if (initialTheme === null) throw new Error("expected initial data-theme attribute to be set");
    await expect(page.locator("html")).toHaveAttribute("data-theme", initialTheme);
  });

  // TC-016
  test("dark mode preference is persisted in localStorage across page navigations", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark/Light Mode" }).click();
    const themeSwitchedTo = await page.locator("html").getAttribute("data-theme");

    await page.goto("/about");

    if (themeSwitchedTo === null) throw new Error("expected data-theme attribute to be set after toggle");
    await expect(page.locator("html")).toHaveAttribute("data-theme", themeSwitchedTo);

    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe(themeSwitchedTo);
  });
});

// ---------------------------------------------------------------------------
// TC-008, TC-019, TC-020, TC-087, TC-088, TC-089: Search Functionality (modal)
// ---------------------------------------------------------------------------

test.describe("Search Functionality", () => {
  // TC-008 / TC-019: header trigger opens modal and returns results
  test("search modal opens from header and returns results for known term", async ({ page }) => {
    await page.goto("/");
    await page.locator("pagefind-modal-trigger button").click();
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();
    await page.locator("dialog[open] .pf-input").fill("git");
    await expect(page.locator("ul.pf-results li").first()).toBeVisible();
  });

  // TC-020
  test("search with no results shows empty list", async ({ page }) => {
    await page.goto("/");
    await page.locator("pagefind-modal-trigger button").click();
    await page.locator("dialog[open] .pf-input").fill("xyzzy12345nonexistent");
    await expect(page.locator("ul.pf-results li")).toHaveCount(0);
  });

  // TC-087: keyboard shortcut opens the modal
  test("keyboard shortcut opens the search modal", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator("pagefind-modal-trigger button");
    await expect(trigger).toBeVisible();
    // Pagefind binds Cmd+K on macOS / Ctrl+K elsewhere — derive from aria-keyshortcuts
    const shortcut = await trigger.getAttribute("aria-keyshortcuts");
    expect(shortcut).toMatch(/^(Control|Meta)\+k$/i);
    await page.locator("body").click();
    await page.keyboard.press(shortcut.replace(/\+k$/i, "+KeyK"));
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();
  });

  // TC-088: Escape closes the modal
  test("Escape closes the search modal", async ({ page }) => {
    await page.goto("/");
    await page.locator("pagefind-modal-trigger button").click();
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog.pf-modal[open]")).toHaveCount(0);
  });

  // TC-089: modal works from a non-home page
  test("search modal opens from a non-home page", async ({ page }) => {
    await page.goto("/blog");
    await page.locator("pagefind-modal-trigger button").click();
    await expect(page.locator("dialog.pf-modal[open]")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// TC-024–TC-030: Blog Page and Blog Posts
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

  // TC-026
  test("blog post navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog", exact: true }).click();
    const blogPosts = page.locator("article").first();
    await expect(blogPosts).toBeVisible();
    await blogPosts.locator("a").click();
    await expect(page).toHaveURL(/\/blog/);
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
    if (nextHref === null) throw new Error("expected next-post link to have an href");
    await nextLink.click();

    await expect(page).toHaveURL(nextHref);

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
// TC-031, TC-032, TC-033: RSS Feed
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

// ---------------------------------------------------------------------------
// TC-034–TC-038, TC-087: Tags
// ---------------------------------------------------------------------------

test.describe("Tags", () => {
  // TC-034
  test("tags index page lists tags alphabetically", async ({ page }) => {
    await page.goto("/tags");

    await expect(page.getByRole("heading", { name: "Tags" })).toBeVisible();

    const tagLinks = page.locator("main ul li a");
    await expect(tagLinks.first()).toBeVisible();

    const tagTexts = await tagLinks.allTextContents();
    expect(tagTexts.length).toBeGreaterThan(0);
    const sorted = [...tagTexts].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(tagTexts).toEqual(sorted);
  });

  // TC-035
  test("clicking a tag link navigates to tag page", async ({ page }) => {
    await page.goto("/tags");

    await page.locator("main ul li a").first().click();

    await expect(page).toHaveURL(/\/tags\/[^/]+\//);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Posts tagged");
  });

  // TC-036
  test("tag page lists posts for the kits-dna tag", async ({ page }) => {
    await page.goto("/tags/kits-dna");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Posts tagged");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("kits-dna");

    const postItems = page.locator("main ul li");
    await expect(postItems.first()).toBeVisible();
    await expect(postItems.first().locator("code")).toBeVisible();
    await expect(postItems.first().locator("a")).toBeVisible();
  });

  // TC-037
  test("tag page has working link back to /tags", async ({ page }) => {
    await page.goto("/tags/kits-dna");

    const backLink = page.getByRole("link", { name: "all blog post tags" });
    await expect(backLink).toHaveAttribute("href", "/tags");

    await backLink.click();
    await expect(page).toHaveURL(/\/tags\/?$/);
  });

  // TC-038
  test("blog post tag links navigate to correct tag page", async ({ page }) => {
    await page.goto("/blog/how-to-test-your-website");

    const testingTag = page.getByRole("link", { name: "testing", exact: true });
    await expect(testingTag).toBeVisible();
    await testingTag.click();

    await expect(page).toHaveURL(/\/tags\/testing\//);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("testing");
  });

  // TC-087
  test("navigating directly to a tag URL works", async ({ page }) => {
    await page.goto("/tags/testing/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Posts tagged");
  });
});

// ---------------------------------------------------------------------------
// TC-040: About Page
// ---------------------------------------------------------------------------

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  // TC-040
  test("about page CTA links to /resume", async ({ page }) => {
    // The CTA uses <a role="button"> which is exposed as a button in the accessibility tree
    const resumeLink = page.getByRole("button", { name: /View my résumé/i });
    await expect(resumeLink).toHaveAttribute("href", "/resume");

    await resumeLink.click();
    await expect(page).toHaveURL(/\/resume/);
  });
});

// ---------------------------------------------------------------------------
// TC-043, TC-044: Product Page
// ---------------------------------------------------------------------------

test.describe("Product Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/product");
  });

  // TC-043
  test("all 9 product pillar cards are displayed", async ({ page }) => {
    // 9 product pillar cards plus 1 CTA article at the bottom = 10 total articles
    await expect(page.getByRole("article")).toHaveCount(10);
  });

  // TC-044
  test("product 'Get in touch' CTA navigates to /contact", async ({ page }) => {
    // The CTA uses <a role="button"> which is exposed as a button in the accessibility tree
    const ctaLink = page.getByRole("button", { name: "Get in touch" });
    await expect(ctaLink).toHaveAttribute("href", "/contact");

    await ctaLink.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});

// ---------------------------------------------------------------------------
// TC-049, TC-050, TC-051: Resume
// ---------------------------------------------------------------------------

test.describe("Resume", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  // TC-049
  test("resume page loads with heading and experience section", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Résumé");
    await expect(page.locator("blockquote")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Experience/i })).toBeVisible();
  });

  // TC-050
  test("resume accordion sections expand and collapse", async ({ page }) => {
    const firstDetails = page.locator("details").first();
    await expect(firstDetails).toHaveAttribute("open");
    await expect(firstDetails.locator("ul")).toBeVisible();

    const secondDetails = page.locator("details").nth(1);
    const secondSummary = secondDetails.locator("summary");
    await secondSummary.click();
    await expect(secondDetails.locator("ul")).toBeVisible();

    await secondSummary.click();
    await expect(secondDetails.locator("ul")).not.toBeVisible();
  });

  // TC-051
  test("resume PDF download link has download attribute", async ({ page }) => {
    const pdfLink = page.locator("a[href='/assets/documents/resume.pdf']");
    await expect(pdfLink).toBeVisible();
    await expect(pdfLink).toHaveAttribute("download");
  });
});

// ---------------------------------------------------------------------------
// TC-060, TC-062: Footer
// ---------------------------------------------------------------------------

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // TC-060
  test("footer social links present and correctly configured", async ({ page }) => {
    const githubLink = page.locator("footer a[title='GitHub']");
    await expect(githubLink).toHaveAttribute("href", /github\.com\/makendon/);
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = page.locator("footer a[title='LinkedIn']");
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const mastodonLink = page.locator("footer a[title='Mastodon']");
    await expect(mastodonLink).toBeVisible();
    await expect(mastodonLink).toHaveAttribute("target", "_blank");
    await expect(mastodonLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  // TC-062
  test("footer copyright text includes author name", async ({ page }) => {
    await expect(page.locator("footer small").first()).toContainText("Kit France");
  });
});

// ---------------------------------------------------------------------------
// TC-067, TC-068, TC-089, TC-090: SEO and Meta Tags
// ---------------------------------------------------------------------------

test.describe("SEO and Meta Tags", () => {
  // TC-067
  test("homepage has meta description, canonical link, and Open Graph tags", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /.+/);
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /kitfrance\.com/);
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /.+/);
    await expect(page.locator("meta[property='og:url']")).toHaveAttribute("content", /.+/);
  });

  // TC-068
  test("blog post page title reflects post title", async ({ page }) => {
    await page.goto("/blog/how-to-test-your-website");

    await expect(page).toHaveTitle(/How to test your website/i);
  });

  // TC-089
  test("blog post URLs follow lowercase kebab-case slug format", async ({ page }) => {
    await page.goto("/blog");

    const hrefs = await page.locator(".blog-post-list-heading a").evaluateAll(
      links => links.map(link => link.getAttribute("href"))
    );

    // Allow uppercase in slugs for proper nouns (e.g. "iPad")
    const slugPattern = /^\/blog\/[a-zA-Z0-9-]+\/$/;
    for (const href of hrefs) {
      expect(href, `Expected ${href} to be kebab-case`).toMatch(slugPattern);
    }
  });

  // TC-090
  test("page loads without JavaScript console errors", async ({ page }) => {
    const consoleErrors = [];
    const notFound = [];

    page.on("console", msg => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("response", response => {
      if (response.status() === 404) {
        notFound.push(response.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(notFound, `404 responses: ${notFound.join(", ")}`).toHaveLength(0);
    expect(consoleErrors, `Console errors: ${consoleErrors.join(", ")}`).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// TC-065: External Links
// ---------------------------------------------------------------------------

test("all external homepage links have target=_blank and rel containing noopener+noreferrer", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator("a[href^=\"http\"]:not([href*=\"kitfrance.com\"])");
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = externalLinks.nth(i);
    const href = await link.getAttribute("href");
    await expect(link, `external link #${i} (${href}) missing target=_blank`).toHaveAttribute("target", "_blank");
    const rel = await link.getAttribute("rel");
    expect(rel, `external link #${i} (${href}) missing rel attribute`).not.toBeNull();
    expect(rel, `external link #${i} (${href}) rel missing noopener`).toMatch(/noopener/);
    expect(rel, `external link #${i} (${href}) rel missing noreferrer`).toMatch(/noreferrer/);
  }
});

// ---------------------------------------------------------------------------
// TC-003: 404 Page
// ---------------------------------------------------------------------------

test("404 page", async ({ page }) => {
  const response = await page.goto("/non-existent-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/404/)).toBeVisible();
});
