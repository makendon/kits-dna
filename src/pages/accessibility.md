---
title: Accessibility
---
I want as many people as possible to be able to use this website, however be aware that parts will not be fully accessible.

If the sites accessibility can be improved please [contact me](/contact) or open an issue on [kits-dna](https://github.com/makendon/kits-dna/issues).

The following steps have been taken to make this website accessible:

## Google Lighthouse

This website is tested with [Lighthouse](https://developer.chrome.com/docs/lighthouse). A GitHub Actions workflow runs on each `git push` and outputs the results. Lighthouse includes an [Accessibility audit](https://developer.chrome.com/docs/lighthouse/accessibility/scoring), which I'll use to improve the sites accessibility.

## Images

- All images have alt text

## Emoji

- This site uses jemoji, a GitHub flavoured emoji plugin for jekyll. Emojis have built in alt text

## Colour

- Colour and link contrast checked using [WebAIM](https://webaim.org/resources/) resources (WCAG AAA)
  - Colour Contrast Checker
  - Link Contrast Checker

## Dark Mode

This website is configured for auto dark mode based on your device/browser settings. If you want to change between light or dark mode please change your settings.
