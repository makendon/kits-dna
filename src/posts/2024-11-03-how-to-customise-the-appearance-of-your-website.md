---
title: How to Customise the Appearance of Your Website
date: 2024-11-03
tags:
  - kits-dna
  - jekyll
  - css
  - dark-mode
description: This is the 4th post in the building kits-dna series. Want to change the appearance of your Jekyll site or the Minima theme? This post contains some ideas of what you can change and some tips on how to do it.
---
Jekyll with GitHub Pages supported themes such as Minima allow you to get started building a site quickly. You can even use “remote themes” that others have made available. However the supported themes are relatively basic and need some love, so I took the Minima theme and customised it :heart:

Minima (at the time of writing) is on release v2.5.2 but the README discusses a v3. I have added elements of v3 such as dark mode but if I update to v3 it’ll likely cause a few problems with the `CSS` whereby I can't receive updates / new features, due to the changes I've made. v3 offers an easier way to customise `CSS` which I might need to look into doing myself, or discover using a higher specification of `CSS` such as ID’s.

## kits-dna vs Minima

I’ve made the following key changes to the Minima theme. (excluding adding additional pages).

- Homepage
- Header
- Footer
- CSS

### Homepage

The Minima *homepage* is my *Blog* page, I didn’t want a list of blog posts as a homepage so I made a custom layout in the `_layouts` directory called `homepage.html`. The homepage layout uses the *default* layout with added `HTML`. The homepage has:

- Two headings with some text
- Image
- Call to action button

Clean and simple, with `CSS` for style.

> :memo: **Note:** Your website needs an **index** file (.html/.markdown/.md). If you have a homepage *layout* all you need in the index file is `YAML` *frontmatter* that references the homepage layout, for example:
>
> ```yaml
> ---
> layout: homepage
> ---
> ```

### Header

I’ve chopped and changed the header but I’ve mostly gone back to the default as it's designed to be responsive on mobile e.g. the header includes a *hamburger* menu on mobile devices. Changes I made:

- Removed the site title
- Centred the links
- Changed the link colour
- Added a site logo

### Footer

I didn’t like the default footer so I made a custom *include* `footer.html` in the `_includes` directory. The only element from the original I've kept is the social icons. The footer is now three responsive columns containing general info, navigation links and contact links which is cleaner and more like a *real* website.

 I'll cover the responsive element in a future blog post.

### CSS

`CSS` or Cascading Style Sheets gives style to `HTML`. I’ve changed or *overridden* a number of the default styles and added my own.

- Background colour
- Font colour
- Link colour
- Homepage
- Header
- Footer
- Colour theme

I’m not going to go through all these changes, I've already touched on the *Homepage*. Have a look yourself at the code in the `_sass` directory and relevant files, header and footer `HTML` code is found in the `_includes` directory.

The important thing to note is that if you want to give your site a custom look or style, then you need to change the `CSS`, even just changing the colour scheme can make a big difference.

#### Example

Here's an example of the `CSS` for some default variables in the `minima.scss` file:

```css
$base-font-size:   16px !default;
$base-font-weight: 400 !default;
$small-font-size:  $base-font-size * 0.875 !default;
$base-line-height: 1.5 !default;

$spacing-unit:     30px !default;

$text-color:       #111 !default;
$background-color: #fdfdfd !default;
$brand-color:      #2a7ae2 !default;

$grey-color:       #828282 !default;
$grey-color-light: lighten($grey-color, 40%) !default;
$grey-color-dark:  darken($grey-color, 25%) !default;
```

Spot which variables I've changed and added:

```css
$base-font-size:   18px !default; // Changed
$base-font-weight: 400 !default;
$small-font-size:  $base-font-size * 0.875 !default;
$large-font-size: 28px !default; // Added
$base-line-height: 1.5 !default;

$spacing-unit:     30px !default;

$text-color:       #111111 !default; // Changed
$text-color-dark:  #fcfcfc; // Added
$background-color: white !default; // Changed
$background-color-dark: #121212; // Added
$brand-color:      #CF1020 !default; // Changed
$brand-color-dark: #f24553; // Added

$grey-color:       #828282 !default;
$grey-color-light: lighten($grey-color, 30%) !default; // Changed
$grey-color-v-light: lighten($grey-color, 45%) !default; // Added
$grey-color-dark:  darken($grey-color, 25%) !default; // Added
```

These aren't huge changes but have a big impact such as changing the background and text colour. Of course, you don't have to use variables, if you check out the `_layout.scss` file you'll see examples where I've not used a variable.

Where you see `dark` in the example, this is attributed to the dark colour theme, more on this below.

> :bulb: **Tip:** Check out [CSS Reference]([https://cssreference.io](https://cssreference.io/)) which explains common `CSS` *properties* with illustrated examples.

## How to Override Gem Theme Defaults

Whether you want to override and add custom CSS or a change a layout you need some key files in the root of your site. By default a `Ruby Gem` based theme such as Minima installs `Gem` dependencies locally in a `Gem` file. However, if you have these dependencies in the root of your site then Jekyll will use these first.

> :warning: **Warning:** Don’t be tempted to change any files in the `_site` directory. This directory is created when you build / serve your site, and while you can make changes once you re-build / serve, any changes made will be lost.

Jekyll has documentation for [Overriding Theme Defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) which I recommend reading. In short if you run:

```bash
bundle info --path minima
```

The path to the `Gem` theme defaults will be shown. With this you can create copies into the root of your site. You’ll want to create the following directories:

- _layouts
  - Layouts are `HTML` files that I think of like *templates.* As mentioned above there’s a default layout, a layout for pages and a layout for posts. You can also add your own layouts as I have.
- _includes
  - Includes are `HTML` files that are similar to layouts but are smaller chunks that can be used in a layout. For example the sites head, header and footer are all includes. You then insert the includes into a layout which forms a *webpage*.
- _sass
  - The `SASS` directory contains all the `CSS` to style your site. In Minima these are `SCSS` files.
- assets
  - Site assets such as images.

Next add the files with the content copied. Once you’ve got this you can now freely change the code, and when you build / serve your site Jekyll will use these files first.

> :warning: **Warning:** If overriding as explained above this will cause issues if / when upgrading Minima in the future, it might prevent you updating in future.

## Colour Theme

`kits-dna` has automatic light and dark colour themes. Dark mode isn’t a feature on Minima v2.5.2. The unreleased v3 has *skins* which are similar. I drew inspiration from the skins and developed my own dark mode code with some help from AI. The skins appear to be quite nicely coded but you need to select a skin in the site configuration, I wanted it to be more responsive so the dark mode feature that I’ve built in based on your device or browser settings using *media queries* `@media (prefers-color-scheme: dark)` in `CSS`.

### Dark Mode CSS

Here’s an example:

```css
/* Light Mode */
body {
  color: $text-color;
  background-color: $background-color;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  body {
    color: $text-color-dark;
    background-color: $background-color-dark;
  }
}
```

This example uses variables defined in the `minima.scss` file in the `_sass` directory.

I haven’t added an on-demand toggle as that requires `javascript` but I might add that feature if it can work alongside the responsive media queries.

I’m still iterating improvements to the dark mode feature by adding dark mode “variables” and catching some things that I didn’t consider, for example I didn’t change any *blockquote* or *code* properties so these appeared the same in either light or dark mode, it wasn’t bad but I’ve now softened the colours in dark mode.

### Dark Mode Images

One thing to call out, the homepage image! When I drew this image it was on a white background, so when I changed the homepage background to a darker colour for dark mode it really stood out (it wasn’t unpalatable but it wasn’t right). I tried some online tools to make the background transparent but it didn’t do the job so I turned to AI. The AI was able to change the background colour to a specified hex colour and it even did a decent job of the highlighting, really impressive! AI also helped me with some code to automatically change the image depending on light or dark mode, here it is:

```css
/* Light Mode */
#homeImage {
  content: url('light-image-path.extension');
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: inline-block;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  #homeImage {
      content: url('dark-image-path.extension');
      padding-bottom: 1em;
  }
}
```

I added small padding to the bottom of the image in dark mode but this wasn’t required in light mode.

### Do I *Need* Dark Mode

Being totally honest dark mode wasn’t an MVP or a skateboard feature, the site would be cool in light mode only, but I thought lots of apps and sites these days have considered dark mode and I thought it would be a nice feature to help me learn more about `CSS` and explore the benefits of AI :robot:

## Wrap Up

This is a quick intro into customising the appearance of your site, I’m no expert and no lover of `JSON` but I’ve been able to make the changes learning a little `CSS` and it now looks quite different from the default Minima theme. Maybe I’ll create my own theme :art:

AI code assistants can also provide support but I’ve tried to only use AI when I’ve had a problem / got stuck and I couldn’t  find a solution using traditional web searches. If you wanted, you could probably have a nice long chat with AI giving it all the changes you wanted to make and it would give you the code, I just wanted the skateboard to help me test and learn the skill :skateboard:
