// @ts-check
import { test, expect } from "@playwright/test";

// TC-001, TC-005, TC-006 (partial), TC-008, TC-014 (partial) — recorder smoke test
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

// TC-002, TC-004: Page Load and Routing
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
      "/search",
      "/contact",
      "/accessibility",
      "/privacy",
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

// TC-006, TC-007: Navigation
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

// TC-034 to TC-038, TC-087: Tags
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

// TC-040: About page
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

// TC-043, TC-044: Product page
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

// TC-049, TC-050, TC-051: Resume
test.describe("Resume", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  // TC-049
  test("resume page loads with heading and experience section", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Kit France");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Resume");
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

// TC-060, TC-062: Footer
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

// TC-067, TC-068, TC-089, TC-090: SEO and edge cases
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

    page.on("console", msg => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(consoleErrors, `Console errors: ${consoleErrors.join(", ")}`).toHaveLength(0);
  });
});
