---
title: How to check your website hyperlinks
date: 2026-03-04
tags:
  - testing
  - lychee
description: Want to test if your hyperlinks are broken, here's how to do it with lychee.
---
We've all seen the dreaded `404 Page Not Found` error. Broken links contribute to poor user experience, but lychee can help.

## lychee

[**lychee**](https://lychee.cli.rs) is a fast, async, stream-based link checker written in `Rust`. It finds broken hyperlinks in `Markdown` and `HTML` :link:

This is valuable because I don't check all links via Playwright – more tests means longer CI runs. `Rust` is known for its speed and lychee checks 1000's of links in less than a minute.

When I added lychee hyperlink checking to `kits-dna` (this site), it found 20+ errors / broken links :facepalm: Many of these were because I renamed my `projects` pages to `side-projects` and forgot to update the links in my site pages and posts. Testing the links at the point of this change would have caught it – apologies if you got a 404 page not found!

I use lychee in two ways:

- Command line utility
- GitHub Action

Now I've added `prek` and pre-commit hooks, I need to wire up lychee as a hook to catch errors at time of commit. For now though I've got ad-hoc local testing via CLI and CI.

## Getting started with lychee

On a Mac you can install lychee via Homebrew:

```bash
brew install lychee
```

You can then navigate to your website repository and run:

```bash
lychee .
```

This command goes into all subdirectories and checks links in `.md` and `.html` files. lychee will detect the number of links, present a progress bar and then once it's done list any errors and give a summary. Here's what I got running it locally:

🔍 201 Total (in 17s) ✅ 123 OK 🚫 49 Errors 👻 18 Excluded 🔀 11 Redirects

> [!TIP]
> Check out the [lychee getting started guide](https://lychee.cli.rs/guides/getting-started/) for more information.

### The base URL problem

You'll notice that the command I run on this site returned 49 errors, but my lychee CI workflow returns 0. This is because you need to account for the `base-URL`.

For example here's one of the 49 errors:

```bash
[ERROR] error: | Error building URL for "/product" (Attribute: Some("href")): Cannot convert path '/product' to a URI: To resolve root-relative links in local files, provide a root dir
```

To fix these errors I need to include the `base-URL`. lychee resolves relative links against the `base-URL`. For example a link `/about` would break without applying the `base-URL` `https://kitfrance.com` or the URL of a dev server.

The command for running link checks against the dev server becomes:

```bash
lychee --base-url 'http://localhost:8080' 'dist/**/*.html'
```

Remember, your dev server needs to be running! Or lychee will fail as the `base-URL` needs to be available. The last argument in the command tells lychee to check links in any `HTML` files in the `dist` or site output directory. In short, I'm only checking the files that will end up on my live site.

> [!NOTE]
> There's also a `root-dir` that you can apply – the error message even suggests it. The docs reference static site builders, however it doesn't give the desired results. lychee makes reference to [base-URL vs root-dir](https://lychee.cli.rs/recipes/base-url/#--base-url-vs---root-dir).

## lychee GitHub Action

There's a [lychee GitHub Action](https://github.com/lycheeverse/lychee-action) for CI checks. I use a similar setup to my Playwright testing workflow:

1. Checkout the repo
2. Setup `node`
3. Install dependencies
4. Start dev server
5. Build search index
6. Check links

The lychee part of this workflow is:

```yaml
- name: Check links
        uses: lycheeverse/lychee-action@8646ba30535128ac92d33dfc9133794bfdd9b411 # v2.8.0
        with:
          args: --no-progress --base-url 'http://localhost:8080' 'dist/**/*.html'
          fail: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

I've added the `--no-progress` argument to remove the progress bar as it's not needed for CI. The workflow will fail on errors. A GITHUB_TOKEN environment variable reduces GitHub rate limiting.

Check out my [lychee workflow](https://github.com/makendon/kits-dna/blob/main/.github/workflows/lychee.yml) on GitHub.

## lychee configuration file

lychee offers a couple of ways to exclude URLs or paths that work, but cause errors – such as timeouts or rate limiting. You can use a `.lycheeignore` file or a `lychee.toml` file, I use the latter. In the configuration file you can add excludes:

```toml
exclude = [
    'localhost:4000',  # Jekyll server example
```

This exclude is for an early blog post when I was still using Jekyll to generate this site. Since I'm not running a server on port 4000, this link check fails and requires an exclusion.

You can also add accepted status codes for valid links to the configuration file:

```toml
accept = [
    "200",
    "429"
]
```

This configuration will accept the 200 and 429 status codes. 429s are often rate limiting related so I ignore these.

> [!TIP]
> This is just the tip of the configuration file iceberg. For more information see the [lychee configuration file guide](https://lychee.cli.rs/guides/config/).

## Wrap up

lychee has a lot more to offer but for a small personal site and blog like `kits-dna` I'm happy with the level of link checking I've now got.

Future iterations:

- Add lychee pre-commit hook
- Add a CI workflow against my **live** site

There are other link checker tools out there, but `Rust` based tools are a great option for command line tools. Whether you use lychee or not, check your links!

Thanks for reading :call_me_hand:
