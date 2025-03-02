---
title: Migrating from Jekyll to Eleventy
date: 2025-03-02
tags:
  - jekyll
  - eleventy
  - nunjucks
  - netlify
  - github pages
description: Wanting to move on from Jekyll? This post is all about migrating a Jekyll site to Eleventy.
draft: true
---
In my post [Bringing it all together](/bringing-it-all-together) I wrote a section called *Beyond Jekyll* in which I mention an opportunity to move on from Jekyll.

I lost confidence in Jekyll recently. After fixing a low severity vulnerability in one of Jekyll's Ruby Gem dependencies, my build broke.

I considered Hugo, but `kits-dna` is now powered by [**Eleventy**](https://www.11ty.dev) :rocket:  

## Eleventy

> *Eleventy is a simpler static site generator - 11ty.dev*

[**Eleventy**](https://www.11ty.dev) transforms template markup / languages such as `Markdown`, `Liquid` and `Nunjucks` into `HTML`.

Eleventy is written in `JavaScript` which played a part in my decision. No underlying `Ruby` like in Jekyll or `Go` in Hugo. I don't know `JavaScript` but I'm more likely to learn `JavaScript` in the future if I want go further with web development.

### Why Eleventy

I first heard about Eleventy at work. Eleventy is powering a new docs-as-code tool and I wanted to learn more. Over Christmas I setup a `test-eleventy` project and started discovering and experimenting using concepts from `kits-dna` along with the simple but effective [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog/tree/main).

Eleventy is a beautiful blank canvas, it doesn't push you towards a theme or template. You can easily clone a project from GitHub (like this one!) if you want a template to help get started. For me this meant I could de-couple from Jekyll's Minima these that I had give a custom look too.

Moving from Jekyll, the layouts and includes work like Jekyll and Eleventy even defaults to using Liquid for templating and the same output directory `_site` as Jekyll which is nice for folk migrating.

The flip side of Eleventy, If you're just starting out or a non-techy like me, it's a steeper learning curve. If you're happy with using a theme or template, you might be better off with Jekyll, Hugo or another static site generator. If like me you wanted to build a website to learn, then it's a great tool which will give you more freedom.

> :bulb: **Tip:** [Learn Eleventy](https://learn-eleventy.pages.dev) has useful lessons to help you learn Eleventy.

#### Pros

- Regular releases
- No theme constraints
- Hot loading local server
- Folder structure
- Lots of documentation
- Extensibility
- `npm` / `node` project
- Easy serve and build scripts
- Data files
- Alerts to dependency deprecations

#### Cons

- `JavaScript` makes the configuration file tricky to learn compared to `yaml`
- `Sass` needs specially configured
- Requires `JavaScript` filters
- GitHub Pages deployments work differently

## Migrating

I'd recommend setting up a test project before touching your site and blog. This allowed me to understand some of the differences that I'll cover below and get a high level of confidence for my migration. For example Eleventy defaults to Liquid (albeit a different flavour) for templating but **Nunjucks** is more common for Eleventy projects including the `eleventy-base-blog`, so I discovered Nunjucks while testing.

To migrate I created a new `eleventy` branch in my repository. I then deleted the Jekyll dependencies and initialised `npm` followed by installing Eleventy and the dependencies I used on the test project. After that I updated the directory or folder structure. The `src` directory now contains all site content including:

- data
- includes
- layouts
- sass
- scripts
- assets
- pages
- posts

The output directory when Eleventy builds the site is now `dist`. This has nicely streamlined the repository root.

Below I'll dive into specific areas of difference.

### Dependencies

Eleventy depends on `node.js`. Install locally by picking an option from [nodejs.org](https://nodejs.org/en/download). Installing `node.js` will also install `npm` (node package manager).

The [npm](npmjs.com) public registry contains millions of `JavaScript` code packages, including Eleventy. Install Eleventy:

```npm
npm i @11ty/eleventy
```

You can install other dependencies in the same way. If you clone an Eleventy template site, all you need to do to install the required dependencies is run:

```npm
npm install
```

### Nunjucks

[Nunjucks](https://mozilla.github.io/nunjucks/) is a templating language designed for `JavaScript` and is commonly used in Eleventy projects. I didn't commit to learning Liquid in depth with Jekyll and the two are similar, so it isn't a steep learning curve. Since I've adopted elements of the `eleventy-base-blog` it was easier to adopt **Nunjucks** across `kits-dna`.

You'll need to rename `HTML` files in your `_includes` and `_layouts` directories to the `.njk` extension. A couple of things to watch out for include ensuring content has the `safe` tag and for includes the file name is wrapped in double quotes.

### Sass

[Sass](https://sass-lang.com) is compatible with Eleventy and can be installed as a dependency. Sass needs built and watched for changes but you can do this in your `npm` scripts:

```json
"watch:sass": "sass --watch src/_sass/styles.scss:dist/css/styles.css",
"build:sass": "sass src/_sass/styles.scss dist/css/styles.css",
"watch:eleventy": "npx @11ty/eleventy --serve",
"build:eleventy": "npx eleventy",
"start": "npm-run-all build:sass --parallel watch:*",
"build": "npm-run-all build:*",
```

Now when running `npm start` your local server will watch for style changes and sync your browser without needing to refresh.

### Includes

Includes remain the `_includes` directroy. I've kept includes only to what some might call `partials`. Some Eleventy sites place `layouts` in the `_includes` directory. It doesn't really matter, my personal preference is it's cleaner and quicker to find if in their own directory.

### Layouts

Layouts remain in the `_layouts` directory. The files were renamed with the `.njk` extension and updated to Nunjucks syntax / rules.

If you split your `includes` and `layouts` as I have then you'll need to update your `eleventy.config.js` file so that Eleventy can find your `layouts`.

```js
dir: {
		input: "src",          // default: "."
		includes: "_includes",  // default: "_includes" (`input` relative)
		layouts: "_layouts",    // default: "_layouts" (`input` relative)
		data: "_data",          // default: "_data" (`input` relative)
		output: "dist",        // default: "_site"
	},
```

Layouts chain just like in Jekyll, but in Eleventy you can take advantage of directory data files to apply the layout across all files in the directory. For example, my site pages are in `src/pages`, add a file called `pages.json` and you could add the following code:

```json
{
	  "layout": "page.njk",
    "tags": "pages",
    "permalink": "/{{ page.fileSlug }}/"
}
```

Now each page in the `pages` directory will use the `page.njk` layout rather than needing to define this in each pages front matter. You can still use front matter, and Eleventy's data cascade will prioritise front matter allowing you to overwrite the data file and use a different layout if required, I use this for my `blog.md` page.

### JavaScript filters

To replicate some Jekyll functionality in Eleventy we need to `JavaScript` filters. I currently have filters to:

- Output a more conventional date
- Find and sort tags
- Count words to calculate reading time

The filters themselves are short scripts that I've stored in the `_scripts` directory. For your filters to work you need to import and add the filter to your `eleventy.config.js` file before calling it in your Nunjucks template.

### Environments

To set a `production` environment variable so that select features will only work in production such as analytics, you need to do a couple of extra steps compared to Jekyll.

1. Create a data file in your `_data` directory and add the following code

```js
export default function () {
	return {
		environment: process.env.ELEVENTY_ENVIRONMENT || "development",
	};
}
```

2. In your `base.njk` layout (or layout to apply production variable) add:

![Example of updating the environment variable in the base.njk file](/assets/screenshots/prod-env-example.png)

You'll notice that this code is similar to what you used in Jekyll, only rather than calling Jekyll we're calling the `kitsDna.js` data file.

3. Update your `package.json` build script:

```json
"build": "ELEVENTY_ENVIRONMENT=production npm-run-all build:*",
```

When building your site or deploying using the `npm run build` command, your analytics are included.

> :memo: **Note:** If you just run `npm start` for local development your analytics are excluded.

## Gotchas

### Terminal errors

Eleventy can throws errors at your terminal when trying to serve or build the site which will prevent your site from building. When first running `npm start` I had a host of `Sass` errors and template errors to work through before I could view my site locally.
It's frustrating but when you get the errors cleared you get your shiny new site, hang with it, it's worth it :smile:

### CSS stylesheet

Once I cleared my errors and my site built... I had no style. The stylesheet path for Jekyll was `/assets/css/styles.css`. Eleventy outputs style to `/css/styles.css`. Once I got the path right in my `head.njk` file I had my style back.

### Sass

Unlike Jekyll, when you serve and build Eleventy, Eleventy warns you about deprecations which is nice, but it led to me having to clean up and improve the use of variables and other elements in my `scss` sheets.

### Links

You don't need to prepend links in Eleventy as you did in Jekyll, meaning you'll need to remove any `| relative_url` references. In Eleventy simple just use `/file_name`. Eleventy outputs files without a directory, meaning that every page and post has the path `dist/`.

### Post excepts

Eleventy doesn't support post excerpts like Jekyll does. You can work around this by using a description in your post front matter and adding the relevant code to your `post.njk` layout. This post is using it! Cleverer people than me might be able to do something better :smile:

## New features

Migrating to Eleventy has allowed me to add the following new features to `kits-dna`:

- Image transformation
- Blog post tags
- Pages for tags

The tags are nice to haves, but the image transformation will improve the site performance by converting `jpeg` and `png` images to modern formats such as `webp` and outputting multiple images sizes for enhanced responsive design. Images transformed by the nifty `@11ty/eleventy-img` plugin.

## Deploying with Netlify

I had an open issue to discover deploying `kits-dna` using a tool other than GitHub Pages. Migrating to Eleventy brought this into focus because while you can deploy an Eleventy to GitHub Pages, it's not as graceful as Jekyll. GitHub Actions are available but it results in a `gh-pages` deployment branch that GitHub Pages uses to deploy the site, and I've avoided that to date. Time to discover an alternative.

I looked at two providers [**Azure Static Web Apps**](https://azure.microsoft.com/en-us/products/app-service/static) and [**Netlify**](https://www.netlify.com) as simple, free alternatives. I decided to test out **Netlify** using my `test-elventy` project as it's a more commonly used platform and agnostic from Microsoft.

### Getting started with Netlify

To deploy your site with Netlify (assuming your site's code is hosted on GitHub) simply go to [Netlify Apps](https://app.netlify.com) and login with GitHub. You'll then select which repository you want to deploy, give the site a name (determines the URL subdomain e.g. `test-eleventy.netlify.app`) and configure the build settings:

- Branch to deploy = `main`
- Build command = `npm run build`
- Publish directory = `dist`
- Deploy :rocket:

Ta da ! Magic! No need for a GitHub Action workflow, Netlify builds and deploys the site for you :smile:

> :memo: **Note:** I still have GitHub Action workflows for `lighthouse`, `markdownlint` and `vale`. These workflows are allowed to fail and used for review purposes before merging to the main branch. I might write a post on `vale` in the future!

## Wrap up

I've added relevant updates to my previous blog posts where relevant, the lighthouse and search posts in particular came in handy to help reconfigure lighthouse and install pagefind again :handshake:

:face_exhaling: that was a long post. I've covered a lot and could have dived even deeper into each section, but hopefully this gives you the confidence to migrate your Jekyll site or create your first site with Eleventy. You learn so much by doing I suggest you crack on and get started, don't worry about making mistakes, you're learning :smile:

Thanks for reading :call_me_hand:
