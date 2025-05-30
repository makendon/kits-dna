---
title: Build Gotcha's on GitHub Pages
date: 2024-11-08
tags:
  - kits-dna
  - jekyll
  - liquid
---
*This is the 5th post in the building kits-dna series.* After deploying to GitHub Pages my site didn’t work the same as running locally, the links were broken, and there was another problem…

## Broken Links

To be fair the Jekyll documentation encourages the use of **Liquid** filters, one of which can solve this problem. I didn’t use it, I got drawn into the use of page permalinks like a cowboy :cowboy_hat_face:

### Problem

From the **Projects** page I link to the **Blog**. This was done using `[Blog](/blog/)` where `/blog/` is the **Blog** page permalink defined in *frontmatter*. This worked fine when the site was running locally, however the link broke when the site was published to GitHub Pages. The only page I could navigate to without a bunch of 404's was... the homepage.

When the site was published to GitHub Pages the site URL was `[username].github.io/kits-dna` (note this was before adding a custom domain). When I clicked on the header link to go to the blog I got a *404 Page Not Found* error :no_entry_sign: The URL that couldn't be found was `[username].github.io/blog` - oh oh - where has `/kits-dna` gone?

I needed a way to prepend the URL with `kits-dna`, because the blog page is a file within the `kits-dna` repository root.

### Solution

To fix the broken links I needed to prepend `kits-dna` before the permalink so that the page would be found. This was done by using the **Liquid** filter `relative_url`. For more information read [Liquid Filters](https://jekyllrb.com/docs/liquid/filters/) on Jekyll's documentation.

> *Prepend `baseurl` config value to the input to convert a URL path into a relative URL. This is recommended for a site that is hosted on a subpath of a domain - Liquid Filters*

Here’s how this looks in `Markdown`

```markdown
[blog](|| '/blog/' | relative_url ||)
```

and `HTML`

```html
<a href="|| "/blog/" | relative_url ||">blog</a>
```

> :warning: **Warning:** Even in fenced code blocks **Liquid** wanted to do its thing so in order to show the *relative_url* part of the links I've replaced {curly brackets} with |pipes|.

The output of adding the *relative_url* would be `[username].github.io/kits-dna/blog` and hey presto, the links work :white_check_mark:

### Links and Custom Domains

Relative URLs still work if you add a custom domain. You'll need to ensure you add your custom domain to the `url` metadata in the `_config.yml` file.

I'll cover how to add a custom domain to your site in a future post.

> :memo: **Note:** I added a custom domain after the initial build and deployment.

## Mobile

This isn’t a build gotcha, more a *design* gotcha. I noticed after my wife visited the published site on her iPhone and it looked crap. This is worthy of its own post so I’ll dive into this next.

## Wrap Up

This is just a quick post that hopefully let’s you get the links right first time, or maybe you just read the Jekyll documentation properly :joy: It’s not too onerous to change but as it’s one of those issues you don’t see till you’ve deployed your site, it's easier to use the correct link structure from the start of your project. If nothing else it'll save toil on multiple deployments when you catch another link you’ve not changed!

I've only hinted at mobile, the next post will cover *responsive* design. This was a great lesson to learn.

Thanks for reading :call_me_hand:
