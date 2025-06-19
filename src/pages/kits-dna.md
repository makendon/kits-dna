---
title: kits-dna
---
## My personal website

`kits-dna` is my personal website, and my first public foray into technology. This site is open source, you can view the code at [kits-dna](https://github.com/makendon/kits-dna) on GitHub.

### Purpose

My goal with `kits-dna` is to show people who aren’t engineers/developers that it's easy to create a personal website, either as a portfolio, blog or both, and get started with an internet presence outside of social media.

I'm using it to showcase my product philosophy and personal projects, and I'll write on the blog. *Thinking* and *writing* are two crucial non-technical skills that I want to grow with this project :thought_balloon:

### How I built kits-dna

Originally I built `kits-dna` using **Jekyll** and hosted on **GitHub Pages**. This was primarily because it's what crisp-dna used (see [Inspiration](/kits-dna/#inspiration)) and it was easy to get started with. Jekyll was also considered the father of `Jamstack` / Static Site Generators. I used the default **Minima** theme, with custom `HTML` and `CSS` for the header and footer. I built the site entirely on my iPad Pro using **GitHub Codespaces**, demonstrating you don't even need a laptop to build a website.

In 2025 I decided to migrate `kits-dna` from Jekyll and GitHub Pages to **Eleventy** and **Netlify**. For more information on how and why I migrated, see my blog post [Migrating from Jekyll to Eleventy](/blog/migrating-from-jekyll-to-eleventy) TL;DR I had a dependency problem I couldn't fix and got frustrated with Jekyll! Eleventy doesn't really have a concept of themes or templates, however there is a feature rich starter blog which I played around with to learn the build system a wee bit before migrating. The lack of themes lent itself well to what I needed since I had introduced style changes to the Jekyll Minima theme I was using, so I wanted something I could put my own stamp on without breaking the theme dependencies.

> [!Note]
> The Jekyll version of my site is available on a [Jekyll branch](https://github.com/makendon/kits-dna/tree/jekyll) and in [v1.5-beta](https://github.com/makendon/kits-dna/releases/tag/v1.5-beta).

Eleventy - touch :wood: - has been great so far. **Hugo** and **Astro** are two other popular alternatives but Eleventy was built to be a better Jekyll, it has a similar feel and structure which makes it easy to migrate to from Jekyll, it even defaults to the same templating language and output directory, albeit the documentation could be easier to follow. It's written in `JavaScript` which is the language of web browsers and has the ability to create components which I've got on my list to discover. Eleventy is now sponsored by **Font Awesome** which will expand the lifetime of the open source project, so I don't anticipate having to migrate build platforms again any time soon.

Eleventy has helped me with a number of aspects of learning technology. It's a `Node.js` project so I've gotten familiar working with `npm`, pulling dependencies from [npmjs](https://www.npmjs.com), using linters, testing software and a little `JavaScript`.

A key impact on migrating to Eleventy was the hosting. It's possible to use GitHub Pages but I didn't like how the GitHib Action worked. **Netlify** stood out as a simple, free, alternative that even allows you to set custom headers for increased security, along with extra features. Deploying your site is a breeze; link your repo, tell Netlify what branch and build command to use and it re-deploys your site when a change (merge) is made to your selected branch e.g. `main`.

I've recently added the **Pico CSS** framework which slightly harks back to using themes, but it's easy to customise variables and it's only style, I still have custom layouts and includes.

That's it for a quick overview, I don't want to write War and Peace on how I built my site here! I wrote the 10-part [building kits-dna blog post series](/tags/kits-dna/) to cover the key details. Finally, check out my [blog](/blog) for updates :hammer_and_wrench:

## Colophon

### Inspiration

The repository name `kits-dna` was inspired by [crisp-dna](https://dna.crisp.se/docs/index.html), this site was the *a ha* moment that I could feasibly build my own static website, and easily write pages in `Markdown`. It got me looking at GitHub Pages, then onto Jekyll and static site generators and I thought... I could do that. Of course my site is an insight into *my* inner workings.

### Tools

- Built with [**Eleventy**](https://www.11ty.dev)
- Styled by [**Pico CSS**](https://picocss.com) (with **Sass**)
- Hosted on [**Netlify**](https://www.netlify.com)
- Search by [**Pagefind**](https://pagefind.app)
- Testing by [**Lighthouse**](https://developer.chrome.com/docs/lighthouse/) & [**Playwright**](https://playwright.dev)

### Colours

Brand colours are Green and Orange. This site uses the **Pico CSS** *Jade* colour theme.

### Fonts

- [**Figtree**](https://www.erikdkennedy.com/projects/figtree.html)

### Icons

- [**Font Awesome**](https://fontawesome.com (using the Eleventy plugin))

### Design philosophy

The design of this site is minimal and clean. While it's a personal website with touches of fun, I wanted to convey a professional look with the header and footer. This is why the footer is two levels; one for a personal touch, and the other for copyright and pages such as Privacy and Accessibility - I haven't seen many personal sites or blogs with these two pages and I wanted to show my visitors that this is important to me.

The site’s logo is a custom design that reflects our honeymoon to Hawaii: a Volcano, Hibiscus flower and large waves are symbols synonymous with Hawaii. There's a deeper meaning though, I have a Geoscience masters degree and a Volcano is a powerful metaphor for product - Volcano's are Earth's *creators*, they create new land.

### Tone

This site aims to strike a balance; professional enough to showcase my product and technical skills, but casual enough to feel personal and approachable. The writing style avoids complex jargon (inevitably there is some), aiming instead for a friendly natural voice, to help you learn and inspire you to have a go at building a website or project - I aim to reflect me, not a perfect copywriter or robot.

### Acknowledgements

Thanks you to my wife for putting up with me spending my evenings building and tinkering on this site and my other projects :heart:
