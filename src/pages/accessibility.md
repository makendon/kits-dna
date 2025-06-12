---
title: Accessibility
---
I want as many people as possible to be able to use this website, however be aware that parts will not be fully accessible.

If the sites accessibility can be improved please [contact me](/contact) or open an issue on [kits-dna](https://github.com/makendon/kits-dna/issues).

The following steps have been taken to make this website accessible:

## Automated testing

### Lighthouse

[Lighthouse](https://developer.chrome.com/docs/lighthouse) tests are ran manually via Chrome Developer Tools and via a GitHub Actions workflow on each `pull request`. Lighthouse includes an [Accessibility audit](https://developer.chrome.com/docs/lighthouse/accessibility/scoring).

### Playwright

[Playwright](https://playwright.dev) is a framework for web testing and automation and can be used for accessibility testing. The accessibility tests use the [axe accessibility testing engine](https://www.deque.com/axe/), axe checks aginst a wide range of accessibility rules such as [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/)(WCAG) and some "best practices". Tests are also run against specific WCAG tags or success criteria.

Playwright tests are ran against the development server, both locally and via a GitHub Actions workflow on each `pull request`.

> [!Important]
> Not all pages on this site are included in automated testing. For Playwright, only the main navigation, home and search pages are tested.

## Images

- All images have alt text

## Emoji

- This site uses emojis, emojis have built in alt text

## Dark Mode

This website is configured for auto dark mode based on your device/browser settings. If you want to manually enable dark mode please click on the moon icon in the top right hand corner of the site, to change back to light mode click on the sun icon. The icons are called "Toggle Dark/Light Mode".
