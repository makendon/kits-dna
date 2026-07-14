import { test as base, expect } from "@playwright/test";

// Chromium 149+ suspends rendering while a cross-document view transition is
// pending, and under automation that transition never completes, so the page
// stops producing animation frames entirely. Playwright's actionability check
// waits for an element's box to stay stable across two frames, so every click
// after a navigation hangs until it times out.
//
// Emulating reduced motion means the site's `@view-transition` rule never
// applies, since it is guarded by `prefers-reduced-motion: no-preference`.
// Setting `reducedMotion` in playwright.config.js does not work: as of 1.61 it
// is resolved into the project options but never applied to the browser
// context, so it has to be set on the page.
const test = base.extend({
  page: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(page);
  },
});

export { test, expect };
