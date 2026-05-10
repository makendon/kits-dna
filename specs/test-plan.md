# kitfrance.com — Comprehensive Test Plan

**Project:** kits-dna (kitfrance.com)
**Framework:** Playwright
**Base URL:** <http://localhost:8080>
**Date:** 2026-02-27

---

## Summary of Existing Test Coverage

| File | Tests |
| --- | --- |
| `functional.spec.js` | Page load/routing, navigation, homepage content, dark mode, search, blog, RSS, tags, about, product, resume, footer, SEO, external links, 404 |
| `accessibility.spec.js` | axe-core scan: homepage, product, side-projects, blog; WCAG 2.1 A/AA on homepage |
| `mobile.spec.js` | Burger menu open/close, mobile search, mobile dark mode, viewport responsiveness, mobile blog nav, mobile external links, mobile 404 |

---

## Test Scenarios

### Section 1 — Page Load and Routing

#### TC-001: Homepage loads with correct title

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Assert page title matches `/Kit France/`

**Expected:** Title contains "Kit France".

---

#### TC-002: All primary pages return HTTP 200

**File:** `functional.spec.js`
**Status:** Covered

**Assumption:** Site is running on <http://localhost:8080> with a complete build including the Pagefind search index.

**Steps:**

1. Navigate to each of the following URLs in turn: `/`, `/about`, `/product`, `/blog`, `/side-projects`, `/resume`, `/tags`, `/contact`, `/accessibility`, `/privacy`, `/feed.xml`, `/sitemap.xml`
2. For each URL, assert the HTTP response status is 200

**Expected:** All pages return 200. Feed and sitemap return valid XML content.

---

#### TC-003: 404 page for non-existent routes

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/non-existent-page`
2. Assert response status is 404
3. Assert the page contains text matching `/404/`

**Expected:** 404 status returned, 404 message visible on page.

---

#### TC-004: Side-project sub-pages load correctly

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/side-projects/kits-dna`
2. Assert a heading containing "kits-dna" is visible
3. Navigate to `/side-projects/scratch`
4. Assert a heading containing "Scratch" or "Dino adventures" is visible
5. Navigate to `/side-projects/cs50p-final-project`
6. Assert content about "Investment Portfolio" is visible

**Expected:** All three sub-pages load with their expected headings and content.

---

### Section 2 — Navigation (Desktop)

#### TC-005: Logo link navigates to homepage

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/about`
2. Click the logo image link (alt text "CF") in the header
3. Assert URL is `/`

**Expected:** User is taken back to the homepage.

---

#### TC-006: All desktop nav links are present and navigable

**File:** `functional.spec.js`
**Status:** Partially covered — About, Product, Blog covered; Contact not independently verified

**Steps:**

1. Navigate to `/`
2. Verify the nav contains links with text: "About", "Product", "Side Projects", "Blog", "Contact"
3. Click "About" and assert the destination page heading "About me" is visible
4. Return to homepage, click "Product" and assert product content is visible
5. Return to homepage, click "Side Projects" and assert `/side-projects` is loaded
6. Return to homepage, click "Blog" and assert the Blog heading is visible
7. Return to homepage, click "Contact" and assert the contact page heading is visible

**Expected:** All five navigation links are present and navigate to the correct pages.

---

#### TC-007: Active nav item has aria-current="page"

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/about`
2. Find the "About" link in the nav
3. Assert it has the attribute `aria-current="page"`
4. Verify no other nav link has `aria-current="page"`

**Expected:** Only the current page's nav link has `aria-current="page"`.

---

#### TC-008: Search trigger in nav bar opens the search modal

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Click the `pagefind-modal-trigger` button in the nav
3. Assert `dialog.pf-modal[open]` is visible

**Expected:** The Pagefind search modal opens.

---

### Section 3 — Navigation (Mobile / Burger Menu)

#### TC-009: Burger menu is visible on mobile viewports

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open the site on a mobile viewport (e.g. 375×667)
2. Assert the `label[for*='burger-menu']` element is visible

**Expected:** Burger menu toggle is visible.

---

#### TC-010: Burger menu opens navigation on click

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open the site on a mobile viewport
2. Click the burger menu label
3. Assert `ul.nav-links` is visible

**Expected:** Navigation menu becomes visible after click.

---

#### TC-011: Burger menu closes on second click

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open the site on a mobile viewport
2. Click the burger menu label to open
3. Click the burger menu label again to close
4. Assert `ul.nav-links` is no longer visible

**Expected:** Navigation menu hides after second click.

---

#### TC-012: Mobile nav links navigate to correct pages

**File:** `mobile.spec.js`
**Status:** Partially covered — Blog only

**Steps:**

1. Open the site on a mobile viewport
2. Open the burger menu
3. Click "About" and assert URL navigates to `/about`
4. Return to homepage and open the burger menu
5. Click "Contact" and assert URL navigates to `/contact`

**Expected:** All mobile nav links navigate correctly.

---

#### TC-013: Mobile landscape orientation does not break layout

**File:** `mobile.spec.js`
**Status:** Covered (body visible check only)

**Steps:**

1. Set viewport to 667×375 (landscape mobile)
2. Assert `body` is visible
3. Assert the header is visible
4. Assert the footer is visible

**Expected:** Page renders without overflow or hidden critical elements.

---

### Section 4 — Dark / Light Mode Toggle

#### TC-014: Dark mode toggle sets data-theme attribute

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Click the button with name "Dark/Light Mode"
3. Assert the `html` element has a `data-theme` attribute matching `/dark|light/`

**Expected:** `data-theme` is set to either "dark" or "light".

---

#### TC-015: Dark mode toggle switches between dark and light on each click

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Note the initial value of `html[data-theme]`
3. Click the "Dark/Light Mode" button
4. Assert `html[data-theme]` has changed to the opposite value
5. Click the button again
6. Assert `html[data-theme]` returns to the original value

**Expected:** Each click toggles the theme between "dark" and "light".

---

#### TC-016: Dark mode preference is persisted in localStorage across page navigations

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Click the "Dark/Light Mode" button and note the resulting `data-theme` value
3. Navigate to `/about`
4. Assert `html[data-theme]` still matches the value set in step 2
5. Evaluate `localStorage.getItem('theme')` and assert it matches the expected value

**Expected:** Theme preference is saved to `localStorage` and applied consistently across page navigations.

---

#### TC-017: Mobile dark mode toggle works from mobile viewport

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open site on mobile viewport
2. Open the burger menu if needed
3. Click "Dark/Light Mode" button
4. Assert `html[data-theme]` matches `/dark|light/`

**Expected:** Dark mode toggles correctly on mobile.

---

### Section 5 — Search Functionality (Pagefind modal)

The site uses the Pagefind Component UI modal. The trigger lives in the header (`pagefind-modal-trigger`); the dialog (`pagefind-modal`) is mounted once in `base.njk` and rendered as a native `<dialog class="pf-modal">`. There is no dedicated `/search` page and the default modal layout does not render filter controls.

#### TC-019: Search returns results for a known term

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Click the `pagefind-modal-trigger` button
3. Assert `dialog.pf-modal[open]` is visible
4. Fill `dialog[open] .pf-input` with "git"
5. Assert at least one `ul.pf-results li` is visible

**Expected:** Results are displayed for the term "git".

---

#### TC-020: Search with a term that yields no results shows an empty state

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Open the modal via the header trigger
3. Fill the modal input with "xyzzy12345nonexistent"
4. Assert `ul.pf-results li` has count 0

**Expected:** Zero results in the modal results list.

---

#### TC-023: Mobile search works correctly

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open site on mobile viewport
2. Open the burger menu so `.nav-utilities` becomes visible
3. Click the `pagefind-modal-trigger` button
4. Assert `dialog.pf-modal[open]` is visible
5. Fill the modal input with "git"
6. Assert at least one `ul.pf-results li` is visible

**Expected:** Modal-based search works correctly on a mobile viewport (the trigger lives in `.nav-utilities`, hidden behind the burger on mobile).

---

#### TC-087: Keyboard shortcut opens the search modal

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Press `Meta+K` (or `Control+K` on non-mac runners)
3. Assert `dialog.pf-modal[open]` is visible

**Expected:** The Pagefind modal opens via its registered keyboard shortcut.

---

#### TC-088: Escape closes the search modal

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Open the modal via the header trigger
2. Press `Escape`
3. Assert `dialog.pf-modal[open]` is no longer present

**Expected:** Pressing Escape closes the dialog.

---

#### TC-089: Search modal works from a non-home page

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/blog`
2. Click the `pagefind-modal-trigger` button
3. Assert `dialog.pf-modal[open]` is visible

**Expected:** The single modal mounted in `base.njk` works on every page.

---

### Section 6 — Blog Page and Blog Posts

#### TC-024: Blog page lists posts in reverse chronological order

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog`
2. Assert the page heading "Blog" is visible
3. Assert at least one `article` element is visible
4. Collect the date values from all visible article `code` elements
5. Assert dates are in descending order (most recent first)

**Expected:** Blog posts are listed with the most recent post first.

---

#### TC-025: Blog post cards show title, description, and date

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog`
2. Locate the first `article` element
3. Assert it contains a date inside a `code` element
4. Assert it contains a linked title inside `.blog-post-list-heading`
5. Assert it contains a description paragraph

**Expected:** Each blog post card displays date, linked title, and description.

---

#### TC-026: Clicking a blog post card navigates to the full post

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/blog`
2. Click the link in the first `article`
3. Assert URL matches `/blog/`
4. Assert an `h1` heading is visible on the post page

**Expected:** Navigating to a post shows the full post with a heading.

---

#### TC-027: Blog post page displays all expected metadata elements

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog/how-to-test-your-website`
2. Assert the `h1` heading contains the post title
3. Assert the author name "Kit France" is visible
4. Assert a formatted date is visible
5. Assert a reading time estimate (e.g. "X minutes to read") is visible
6. Assert at least one tag link is visible

**Expected:** Post page displays title, author, date, reading time, and tags.

---

#### TC-028: Blog post previous and next navigation links work

**File:** `functional.spec.js`
**Status:** Not covered

**Assumption:** A middle post (not the first or last in the collection) is used.

**Steps:**

1. Navigate to a middle blog post
2. Assert a "Previous post" link is visible in the post footer
3. Assert a "Next post" link is visible in the post footer
4. Click the "Next post" link
5. Assert the URL changes to the next post's URL
6. Assert the `h1` heading changes to the next post's title

**Expected:** Previous and next post navigation works correctly.

---

#### TC-029: "Back to top" link on blog posts returns to the top of the page

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to a long blog post
2. Scroll to the bottom of the page
3. Assert the "Back to top" link is visible
4. Click the "Back to top" link
5. Assert the URL fragment is `#top` or the page scroll position returns to 0

**Expected:** "Back to top" link takes the user to the top of the page.

---

#### TC-030: RSS icon on the blog page links to /feed.xml

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog`
2. Find the RSS icon link (`title="RSS/Atom"`)
3. Assert `href` is `/feed.xml`
4. Assert `target="_blank"` is set
5. Assert `rel` contains `noopener`

**Expected:** RSS icon on the blog page is a correctly configured external link to the feed.

---

### Section 7 — RSS Feed

#### TC-031: RSS feed is accessible and returns valid XML

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/feed.xml`
2. Assert the HTTP response status is 200
3. Assert the page body contains `<feed` or `<rss` as the root XML element

**Expected:** Feed returns valid XML with a feed or rss root element.

---

#### TC-032: RSS feed contains blog post entries

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/feed.xml`
2. Assert the page body contains at least one `<entry>` or `<item>` element
3. Assert entries contain `<title>` and `<link>` child elements

**Expected:** Feed contains at least one post entry with title and link.

---

#### TC-033: Footer RSS icon links to /feed.xml with correct attributes

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Find the RSS icon link in the footer (`title="RSS/Atom"`)
3. Assert `href` is `/feed.xml`
4. Assert `target="_blank"` is set
5. Assert `rel` is `noopener noreferrer`

**Expected:** Footer RSS link is properly configured with correct href and security attributes.

---

### Section 8 — Tags Pages

#### TC-034: Tags index page lists all tags sorted alphabetically

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/tags`
2. Assert the `h1` heading "Tags" is visible
3. Assert at least one `li` element containing an `a` link is present
4. Collect all tag link text values
5. Assert the tag names are sorted alphabetically (case-insensitive)

**Expected:** All tags are listed in alphabetical order.

---

#### TC-035: Clicking a tag link navigates to the tag page

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/tags`
2. Click the first tag link
3. Assert URL matches `/tags/[tag-name]/`
4. Assert `h1` contains `Posts tagged`

**Expected:** Tag page loads with the correct heading for the selected tag.

---

#### TC-036: Tag page lists posts associated with that tag

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/tags/kits-dna`
2. Assert `h1` heading contains `Posts tagged "kits-dna"`
3. Assert at least one `li` item with a post link is visible
4. Assert each `li` contains a formatted date and a linked post title

**Expected:** Tag page shows a list of posts tagged with "kits-dna".

---

#### TC-037: Tag page has a working link back to /tags

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/tags/kits-dna`
2. Find the link with text "all blog post tags"
3. Assert `href` is `/tags`
4. Click the link
5. Assert URL navigates to `/tags`

**Expected:** "See all blog post tags" link works and returns to the tags index.

---

#### TC-038: Blog post tag links navigate to the correct tag page

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog/how-to-test-your-website`
2. Find the tag links in the post header (e.g. "testing", "playwright")
3. Click the "testing" tag link
4. Assert URL matches `/tags/testing/`
5. Assert `h1` contains `Posts tagged "testing"`

**Expected:** Tag links on a post page navigate to the correct tag index page.

---

### Section 9 — About Page

#### TC-039: About page loads with heading and profile image

**File:** `functional.spec.js`
**Status:** Covered (heading visible after nav click)

**Steps:**

1. Navigate to `/about`
2. Assert a heading containing "About" or "Aloha" is visible
3. Assert the profile image with `alt="Shaka on Mauna Kea"` is present in the DOM

**Expected:** About page displays the heading and profile photo.

---

#### TC-040: About page CTA button links to the résumé page

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/about`
2. Find the "View my résumé" button/link
3. Assert `href` is `/resume`
4. Click it
5. Assert URL is `/resume`

**Expected:** CTA on the About page navigates to the résumé page.

---

#### TC-041: About page internal links navigate to correct destinations

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/about`
2. Click the "product" link in the Product section
3. Assert URL is `/product`
4. Go back, click the "blog" link in the Blog section
5. Assert URL is `/blog`
6. Go back, click the "projects" link in the Side projects section
7. Assert URL is `/side-projects`

**Expected:** All internal links within the About page navigate to their correct destinations.

---

### Section 10 — Product Page

#### TC-042: Product page loads with philosophy content and pillar cards

**File:** `functional.spec.js`
**Status:** Covered (article with "Business outcomes" visible)

**Steps:**

1. Navigate to `/product`
2. Assert a heading containing "product" is visible
3. Assert product pillar `article` cards are visible

**Expected:** Product page loads with philosophy content and pillar cards.

---

#### TC-043: All 9 product pillar cards are displayed

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/product`
2. Locate the product cards section rendered by `product-cards.njk`
3. Count all `article` elements within that section
4. Assert the count is 9

**Expected:** All 9 pillars — Business outcomes, User needs, Discovery, Validate ideas, Build, Launch, Evaluate, Iterate, Love — are displayed.

---

#### TC-044: Product page CTA "Get in touch" navigates to /contact

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/product`
2. Find the "Get in touch" button at the bottom of the page
3. Assert `href` is `/contact`
4. Click it
5. Assert URL is `/contact`

**Expected:** CTA at the bottom of the product page navigates to the contact page.

---

### Section 11 — Side Projects Page

#### TC-045: Side projects page lists all four project cards

**File:** `functional.spec.js`
**Status:** Covered (text check only)

**Steps:**

1. Navigate to `/side-projects`
2. Assert four `article` cards are visible
3. Assert card headings contain: "kits-dna", "Dino adventures", "CS50P final project", "Product"
4. Assert the "Product" card contains a disabled button with text "In the future"

**Expected:** Four project cards are visible, with the last one having a disabled button.

---

#### TC-046: Side projects "Learn more" button for kits-dna navigates correctly

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/side-projects`
2. Click the "Learn more" button in the kits-dna card
3. Assert URL is `/side-projects/kits-dna`
4. Assert the `h2` "kits-dna" heading is visible

**Expected:** kits-dna project sub-page loads correctly.

---

#### TC-047: Side projects "Check them out" button for Scratch navigates correctly

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/side-projects`
2. Click the "Check them out" button in the Dino adventures card
3. Assert URL is `/side-projects/scratch`
4. Assert content about "Dino adventures" is visible
5. Assert Scratch `iframe` embeds are present on the page

**Expected:** Scratch project sub-page loads with three embedded Scratch projects.

---

#### TC-048: Disabled "Product" card button is not interactive

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/side-projects`
2. Find the "In the future" button in the Product card
3. Assert the button has the `disabled` attribute
4. Assert the button is not enabled for click interaction

**Expected:** Disabled button cannot be interacted with and does not navigate.

---

### Section 12 — Resume Page

#### TC-049: Resume page loads with correct heading and experience section

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/resume`
2. Assert `h1` containing "Kit France" and "Resume" is visible
3. Assert a blockquote summary paragraph is visible
4. Assert the `h2` "Experience" section heading is visible

**Expected:** Resume page loads with full content and correct structure.

---

#### TC-050: Resume accordion sections expand and collapse correctly

**File:** `functional.spec.js`
**Status:** Not covered

**Assumption:** The first `details` element (most recent DWP PM role) is open by default due to the `open` attribute in the template.

**Steps:**

1. Navigate to `/resume`
2. Assert the first `details` element is open and its content is visible
3. Click the `summary` of the second `details` element (Associate PM at DWP)
4. Assert that section expands and its `ul` content becomes visible
5. Click the same `summary` again
6. Assert the section collapses and the `ul` content is no longer visible

**Expected:** Resume accordion sections expand and collapse on click.

---

#### TC-051: Resume PDF download link is present with correct attributes

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/resume`
2. Find the link with `href="/assets/documents/resume.pdf"`
3. Assert the link has the `download` attribute present

**Expected:** Resume PDF download link exists with the proper `download` attribute.

---

#### TC-052: Resume LinkedIn link is present and points to LinkedIn

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/resume`
2. Find the "LinkedIn" link in the blockquote
3. Assert `href` contains "linkedin.com"

**Expected:** LinkedIn link is present and points to the correct external URL.

---

#### TC-053: Resume "Contact me" button navigates to /contact

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/resume`
2. Find the "Contact me" button at the bottom of the page
3. Assert `href` is `/contact`
4. Click it
5. Assert URL is `/contact`

**Expected:** Contact button at the bottom of the résumé navigates to the contact page.

---

### Section 13 — Contact Page and Form

#### TC-054: Contact page loads with form and alternative contact methods

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Assert `h1` "Get in touch" is visible
3. Assert the contact form fieldset is visible
4. Assert the "Send an Email" button link is visible
5. Assert LinkedIn and Mastodon links are visible in the Social section

**Expected:** Contact page shows the form, email button, and social links.

---

#### TC-055: Contact form has all required fields

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Assert a text input with `name="first_name"` and placeholder "First name" is visible
3. Assert an email input with `name="email"` and placeholder "Email" is visible
4. Assert a textarea with `name="message"` and placeholder "Your message" is visible
5. Assert a submit button with text "Send a message" is visible

**Expected:** Form contains a first name field, email field, message textarea, and submit button.

---

#### TC-056: Contact form honeypot field is not visible to users

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Find the input with `name="bot-field"` in the DOM
3. Assert it is not visible (its parent label has the `hidden` class or is otherwise not displayed)

**Expected:** Honeypot field is present in the DOM but not visible to human users.

---

#### TC-057: Contact form email field validates email format client-side

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Fill in the first name field with "Test"
3. Type "not-a-valid-email" into the email field
4. Click "Send a message"
5. Assert the browser's native validation error is shown on the email field

**Expected:** Browser prevents form submission with an invalid email format and shows a validation message.

---

#### TC-058: Contact "Send an Email" mailto link is correctly formed

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Find the "Send an Email" button
3. Assert `href` is `mailto:kit@kitfrance.com?subject=Hello!%20&body=Hi%20Kit!`

**Expected:** Email link has the correct mailto href with subject and body pre-populated.

---

#### TC-059: Contact page Privacy Policy link navigates to /privacy

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Find the "Privacy Policy" link in the consent text paragraph
3. Assert `href` is `/privacy`
4. Click it
5. Assert URL is `/privacy`

**Expected:** Privacy Policy link navigates to the privacy page.

---

### Section 14 — Footer

#### TC-060: Footer social links are present and correctly configured

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Find the footer
3. Assert a GitHub link (`title="GitHub"`) is present with `href` containing "github.com/makendon"
4. Assert a LinkedIn link (`title="LinkedIn"`) is present
5. Assert a Mastodon link (`title="Mastodon"`) is present
6. For each of the three links, assert `target="_blank"` and `rel="noopener noreferrer"`

**Expected:** All footer social links are present with correct external link security attributes.

---

#### TC-061: Footer page links navigate correctly

**File:** `functional.spec.js`
**Status:** Covered for "Home" link only

**Steps:**

1. Navigate to `/about`
2. In the footer, click "Résumé" and assert URL is `/resume`
3. Go back, in the footer click "Accessibility" and assert URL is `/accessibility`
4. Go back, in the footer click "Privacy" and assert URL is `/privacy`

**Expected:** All footer page links navigate to the correct pages.

---

#### TC-062: Footer copyright text includes the author name

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Find the `small` copyright element in the footer
3. Assert it contains "Kit France"

**Expected:** Footer shows copyright text including the author's name.

---

### Section 15 — Accessibility Page

#### TC-063: Accessibility page loads with all expected sections

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/accessibility`
2. Assert `h1` "Accessibility" is visible
3. Assert a heading "Automated testing" is visible
4. Assert a heading "Images" is visible
5. Assert a heading "Dark Mode" is visible

**Expected:** Accessibility statement page loads with all expected content sections.

---

### Section 16 — Privacy Page

#### TC-064: Privacy page loads with all policy sections and a formatted date

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/privacy`
2. Assert `h1` "Privacy Policy" is visible
3. Assert sections with headings "Contact me", "Analytics", "GitHub", "Netlify" are visible
4. Assert a "last updated" date string is visible and not empty

**Expected:** Privacy page loads with all policy sections and a rendered last-updated date.

---

### Section 17 — External Links

#### TC-065: External links on the homepage have target and rel attributes

**File:** `functional.spec.js`
**Status:** Covered

**Steps:**

1. Navigate to `/`
2. Find all external links (matching `a[href^="http"]` and excluding `kitfrance.com`)
3. Assert at least one external link is present
4. For each link, assert `target="_blank"` is set and `rel` contains both `noopener` and `noreferrer`

**Expected:** All external links have security attributes.

---

#### TC-066: External links on mobile have correct security attributes

**File:** `mobile.spec.js`
**Status:** Covered

**Steps:**

1. Open site on a mobile viewport
2. Find the first external link on the homepage
3. Assert `target="_blank"` is set
4. Assert `rel` contains `noopener` or `noreferrer`

**Expected:** External links on mobile have correct security attributes.

---

### Section 18 — SEO and Meta Tags

#### TC-067: Homepage has correct meta description, canonical link, and Open Graph tags

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Assert `meta[name="description"]` exists with a non-empty `content` attribute
3. Assert `link[rel="canonical"]` exists with `href` containing "kitfrance.com"
4. Assert `meta[property="og:title"]` exists
5. Assert `meta[property="og:url"]` exists

**Expected:** Homepage has SEO meta tags and canonical link properly set.

---

#### TC-068: Blog post pages have a title tag reflecting the post title

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog/how-to-test-your-website`
2. Assert the page `<title>` contains "How to test your website"

**Expected:** Post page title reflects the individual post title.

---

#### TC-069: Sitemap is accessible and contains site URLs

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/sitemap.xml`
2. Assert HTTP response status is 200
3. Assert page body contains `<urlset`
4. Assert at least one `<loc>` element containing "kitfrance.com" is present

**Expected:** sitemap.xml returns valid XML with site URLs.

---

### Section 19 — Accessibility (axe-core)

#### TC-070: Homepage passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Covered

---

#### TC-071: Product page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Covered

---

#### TC-072: Side projects page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Covered

---

#### TC-073: Blog index page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Covered

---

#### TC-074: Homepage passes WCAG 2.1 A and AA axe-core scan

**File:** `accessibility.spec.js`
**Status:** Covered

---

#### TC-075: About page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/about`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on the about page.

---

#### TC-076: A blog post page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog/how-to-test-your-website`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on an individual blog post page.

---

#### TC-077: Contact page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/contact`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on the contact page.

---

#### TC-078: Search modal passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** `test.fixme` — Pagefind component UI ships keyboard-hint text (`#999` on `#fff`) and kbd badges (`#8d8d8d` on `#f8f8f8`) that fail WCAG AA colour contrast. Track as a follow-up.

**Steps:**

1. Navigate to `/`
2. Open the search modal via the header trigger
3. Assert `dialog.pf-modal[open]` is visible
4. Run an axe-core scan via AxeBuilder, scoped with `.include("dialog.pf-modal")`
5. Assert the `violations` array is empty

**Expected:** No axe-core violations inside the open search modal.

---

#### TC-079: Tags index page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/tags`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on the tags index page.

---

#### TC-080: Resume page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/resume`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on the résumé page.

---

#### TC-081: 404 page passes axe-core automated scan

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/non-existent-page`
2. Run an axe-core scan via AxeBuilder
3. Assert the `violations` array is empty

**Expected:** No axe-core violations on the 404 error page.

---

#### TC-082: Dark mode does not introduce axe-core violations

**File:** `accessibility.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/`
2. Click the "Dark/Light Mode" button to activate dark mode
3. Assert `html[data-theme]` is "dark"
4. Run an axe-core scan via AxeBuilder
5. Assert the `violations` array is empty

**Expected:** Dark mode theme does not introduce colour contrast or other axe violations.

---

### Section 20 — Responsive Layout

#### TC-083: Homepage hero content is visible on mobile

**File:** `mobile.spec.js`
**Status:** Not covered

**Steps:**

1. Open site on a 375×667 viewport
2. Navigate to `/`
3. Assert the hero image (`alt="Engineering team"`) is visible
4. Assert the "About" and "Product" CTA buttons are visible
5. Assert no horizontal scrollbar is present

**Expected:** Homepage hero content is visible and not cut off on small screens.

---

#### TC-084: Blog post listing reflows to a single column on mobile

**File:** `mobile.spec.js`
**Status:** Not covered

**Steps:**

1. Open site on a 375×667 viewport
2. Navigate to `/blog`
3. Assert `article` elements are visible
4. Assert no horizontal overflow is present on the page body

**Expected:** Blog listing reflows to a single column on small viewports without horizontal overflow.

---

#### TC-085: Product pillar cards reflow correctly on mobile

**File:** `mobile.spec.js`
**Status:** Not covered

**Steps:**

1. Open site on a 375×667 viewport
2. Navigate to `/product`
3. Assert product card `article` elements are visible
4. Assert no horizontal overflow is present

**Expected:** Product cards stack vertically on mobile viewports without overflow.

---

#### TC-086: Resume page is fully readable on mobile

**File:** `mobile.spec.js`
**Status:** Not covered

**Steps:**

1. Open site on a 375×667 viewport
2. Navigate to `/resume`
3. Assert the `h1` heading is visible
4. Assert `details` accordion elements are visible
5. Click a `summary` element to expand it and assert it works
6. Assert no horizontal overflow is present

**Expected:** Resume page content is fully readable and operable on mobile without overflow.

---

### Section 21 — Edge Cases and Error Handling

#### TC-087: Navigating directly to a tag URL loads the correct page

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate directly to `/tags/testing/`
2. Assert the page loads successfully
3. Assert `h1` contains "Posts tagged"

**Expected:** Direct URL navigation to a tag page works without errors.

---

#### TC-088: Submitting an empty search does not cause errors

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/search`
2. Click on the search text box without typing anything
3. Press Enter
4. Assert the page does not display an error
5. Assert the search UI renders in a clean empty or idle state

**Expected:** Pressing Enter in an empty search box does not cause any errors or broken UI.

---

#### TC-089: Blog post URLs follow lowercase kebab-case slug format

**File:** `functional.spec.js`
**Status:** Not covered

**Steps:**

1. Navigate to `/blog`
2. Collect the `href` values from all post title links
3. Assert each URL matches the pattern `/blog/[a-z0-9-]+/`

**Expected:** All blog post URLs are lowercase and kebab-case, with no uppercase letters or underscores.

---

#### TC-090: Page loads without JavaScript console errors

**File:** `functional.spec.js`
**Status:** Not covered

**Assumption:** Console error monitoring is set up via a `page.on('console')` listener before navigation.

**Steps:**

1. Attach a console error listener to the page before navigation
2. Navigate to `/`
3. Wait for the page to fully load including all deferred scripts (`dark-mode.js`)
4. Assert no console errors were captured during the page load

**Expected:** Homepage loads without any JavaScript console errors.

---

#### TC-091: System tags do not appear on blog post pages

**File:** `functional.spec.js`
**Status:** Not covered

**Assumption:** System tags such as "posts" and "pages" are filtered out by the `filterTagList` Eleventy filter.

**Steps:**

1. Navigate to `/blog/how-to-test-your-website`
2. Find all tag links displayed in the post header
3. Assert no tag link has the text "posts"
4. Assert no tag link has the text "pages"
5. Assert the visible tags are user-defined (e.g. "testing", "playwright")

**Expected:** System tags are filtered and never appear as user-facing tag links on post pages.

---

## Coverage Summary

| Category | Total TCs | Covered by Existing Tests | New TCs Needed |
| --- | --- | --- | --- |
| Page Load and Routing | 4 | 1 | 3 |
| Navigation (Desktop) | 4 | 2 | 2 |
| Navigation (Mobile) | 5 | 4 | 1 |
| Dark / Light Mode | 4 | 2 | 2 |
| Search | 6 | 3 | 3 |
| Blog Page and Posts | 7 | 2 | 5 |
| RSS Feed | 3 | 0 | 3 |
| Tags Pages | 5 | 0 | 5 |
| About Page | 3 | 1 | 2 |
| Product Page | 3 | 1 | 2 |
| Side Projects | 4 | 1 | 3 |
| Resume Page | 5 | 0 | 5 |
| Contact Page and Form | 6 | 0 | 6 |
| Footer | 3 | 0 | 3 |
| Accessibility Page | 1 | 0 | 1 |
| Privacy Page | 1 | 0 | 1 |
| External Links | 2 | 2 | 0 |
| SEO and Meta Tags | 3 | 0 | 3 |
| Accessibility (axe-core) | 12 | 5 | 7 |
| Responsive Layout | 4 | 0 | 4 |
| Edge Cases | 5 | 0 | 5 |
| **Total** | **91** | **24** | **67** |

---

## Test Environment Assumptions

- The site is built and served locally at `http://localhost:8080` via `npm start`
- The Pagefind search index has been built via `npm run build:search` and is available at `/pagefind/`
- `localStorage` is clear at the start of each test (fresh browser context)
- Tests run with Playwright against Chromium, Firefox, and WebKit for desktop; Mobile Chrome (Pixel 5) and Mobile Safari (iPhone 13) for mobile
- Dark mode system preference is assumed to be "light" unless specifically stated otherwise in a test

---

## Recommended File Mapping

Tests should be distributed across the existing spec files as follows:

| File | Test Case IDs |
| --- | --- |
| `functional.spec.js` | TC-002 to TC-004, TC-006 to TC-008, TC-014 to TC-016, TC-019 to TC-022, TC-024 to TC-033, TC-034 to TC-053, TC-060 to TC-069, TC-087 to TC-091 |
| `accessibility.spec.js` | TC-075 to TC-082 |
| `mobile.spec.js` | TC-012 to TC-013, TC-083 to TC-086 |
