---
title: How to use Pico CSS
date: 2025-06-10
tags:
  - pico-css
  - css
  - sass
description: Pico CSS is a framework to easily make your site more beautiful. Here's how to get started for an Eleventy static site.
---
I came across a Mastodon post recently demonstrating an Eleventy starter project with **Pico CSS**, I had a look and liked the style so I started reading through the documentation and thought it had been awhile since I played with my site :bulb:

## CSS frameworks

I was aware of a few CSS frameworks such as **Tailwind** and **Bulma**, these frameworks are essentially libraries, or files that allow you to reuse CSS code without having to write your own.

When I first built `kits-dna` and used the Jekyll theme Minima, the CSS was provided in the theme that I then customised. All the Minima CSS was in files you could edit, with Pico CSS it's provided as a `npm` package so it's abstracted away from you where all you need to do is add any custom CSS you still need. The Minima CSS was a good starting point at the time but I found myself fighting it and when adding customisations I would need to consider things like margins, padding, gaps - it's probably also over 10 years old so in need of a re-fresh :art:

## Pico CSS

[**Pico CSS**](https://picocss.com) is:

> A minimalist and lightweight starter kit that prioritises semantic syntax, making every HTML element responsive and elegant by default.

### Pico CSS highlights

- Uses fewer than 10 classes
- Great styles without dependencies
- Responsive design
- Light and Dark mode
- Customisation with variables
- Performant

### How to install Pico CSS

A few ways to [install Pico CSS](https://picocss.com/docs). I installed with `npm` like my other dependencies.

Navigate to your project and in your terminal type:

```bash
npm install @picocss/pico
```

### How to use Pico CSS with Sass

Then in your main `SCSS` file e.g. `styles.scss` import Pico CSS with `@use`:

```css
@use "pico" with (
	$theme-color: "jade"
);
```

> [!Tip]
> If you want to use a different colour theme to the default "azure" theme you can set this in your main `SCSS` file
> 
>```css
>@use "pico" with (
>	$theme-color: "jade"
>);
>```
> This changes the colour theme to the "jade" theme.

Viola! You don't need to do anything else unless you want to customise some of the 130 variables or use the colours. More on this in a bit because there's one more important step if you're using **Eleventy** with **Sass**.

### Pico CSS with Eleventy and Sass

Remember with Eleventy you typically have to pass through or watch for changes if you're using **Sass**. For Sass to find the Pico CSS package and import / use it, the Sass script in your `package.json` file needs updating.

```json
"watch:sass": "sass --load-path=node_modules/@picocss/pico/scss/ --watch src/_sass/styles.scss:dist/css/styles.css",
"build:sass": "sass --load-path=node_modules/@picocss/pico/scss/ src/_sass/styles.scss dist/css/styles.css",
```

We've added `--load-path=node_modules/@picocss/pico/scss/` to our script. Sass will load Pico CSS and reflect the changes to the hot loading server.

> [!Warning]
> If you don't update your Sass script you'll see the following error in your terminal `Error: Can't find stylesheet to import`.

## Features in use on `kits-dna`

I'm using the following features on my site, I'll quickly cover how you can get started with each. For a full list of features see [Pico CSS documentation](https://picocss.com/docs). From here on I'll refer to Pico CSS as Pico.

> [!Tip]
> You can reduce the weight of Pico by turning off features you're not using such as forms. This means less CSS will be copied to your output directory. See the [Pico CSS Sass Settings](https://picocss.com/docs/sass#settings) documentation for how to do this.

### Container

The *wrapper* is now what Pico calls a container. All this does is centre the viewport, or you can have a full width layout. Pico has default breakpoints for different sized devices so is responsive by default.

To set up a container use the `.container` class. Here's an example layout from my sites `base.njk` file.

```html
<main class="container" aria-label="Content">
	<div>
		[{ content | safe }] <!--replace square brackets with curly braces-->
	</div>
</main>
```

### Header navigation

Pico has a clever navbar component, that applies styling to the `<nav>` HTML tag. Unordered `<ul>` and ordered lists `<li>` tags are automatically spaced, unstyled and inlined. Nav items are only underlined when hovered.

You can take advantage of these features by including other parts of your sites header within the navbar. `kits-dna` used to have a 3 column header, 1 for the logo and site name, 1 for the nav links and 1 for the search and dark mode icons. Now all these elements are part of the `<nav>` and equally distributed within the container. Example:

```html
<header class="container">
	<nav>
		<ul>
			<li>
				[site logo goes here]
			</li>
		</ul>
		<ul>
			<li>
				[nav links go here]
			</li>
		</ul>
		<ul>
			<li>
				[Icon links go here]
			</li>
		</ul>
	</nav>
</header>
```

### Buttons

Buttons like the navbar use a native HTML tag `<button>` without classes.

The buttons on `kits-dna` homepage are slightly different, they use `role="button"` inside an anchor link (`<a>` HTML tag) for example:

```html
<a href="/about" role="button">About me</a>
```

This allows the buttons to serve as call to action links, with appropriate link styling, otherwise the colours can clash leading to accessibility issues.

Buttons also come with colour variants using the `.secondary` or `.contrast` classes and you can remove their fill so that they are outline only using the `.outline` class.

You can also disable buttons using `<button disabled>Your string</button>`, this prevents the button from being clickable and gives a *greyed* out effect.

> [!Note]
> Buttons come with some other features I'm not using. You can check those out on [Pico's button documentation](https://picocss.com/docs/button).

### Columns

To create columns with Pico you can use a variation of a grid system. Pico's grid system is equally distributed and responsive by default, on smaller mobile devices columns collapse vertically.

To create a grid use the `.grid` class. Then add `<div>` tags for the number of columns. The below example would have 3 columns:

```html
<div class="grid"> 
	<div>Column 1</div> 
	<div>Column 2</div> 
	<div>Column 3</div>
</div>
```

### Cards

Pico makes adding cards a breeze! They are even sectioned with a header, body and footer.

To create a card use the `<article>` tag, no class required. Pico has a classless version but as you saw above we do take advantage of some classes, here though it's just semantic HTML.

I now use cards to display my list of blog posts with the date in the header and the title and description in the body (no `<body>` tag required), for example:

```html
<article>
	<header>
		[Date]
	</header>
	<h4>[Post title]</h4>
	<p>[Post description]</p>
</article>
```

I also *probably* misbehave the intended use of cards by placing each blog post in its own card. Why?

- Card header contains the post title, description, and metadata
- Card body contains the post content
- Card footer contains the post pagination links (previous / next posts) and back to top link

### Tooltips

Tooltips are `JavaScript` free and add nice annotation to icons. Try hovering over one of the icons in the footer. Your browser will return a title / name for the icon but the tooltip is a neat extra to add highlight the context.

Add a tooltip by including `data-tooltip="[insert tooltip]"` to an element.

### Dark mode

Pico comes with dark mode colours as default for each theme, and will automatically change to dark mode based on device settings. This is great because used to take a lot of time and effort to find dark mode colours or remember to add features / colours to the dark mode style sheet - Pico handles 90%+ of this for me now. A couple of points to note:

1. You probably will need some custom dark mode colours - if you have a Search bar for example
2. If you want an option for a user to toggle dark mode, you'll need to add that feature yourself

Pico has some documentation to support [CSS variables for color schemes](https://picocss.com/docs/css-variables#css-variables-for-color-schemes), but you'll need something like:

```css
/* Device settings */
@media only screen and (prefers-color-scheme: dark) {
	:root:not([data-theme]) {
		.search {
			[class]
		}
	}
}
/* Toggle option */
[data-theme="dark"] {
	.search {
		[class]
	}
}
```

> [!Note]
> Setting up a dark mode toggle is outside the scope of this post, but you can look at `kits-dna` as an example.

### Colours

Pico doesn't just come with theme colours, there're 380 colours you can use to personalise your site. `kits-dna` is using the **Jade** colour scheme which comes with 19 colours of varying shades / tints. Check out the [Pico Colors documentation](https://picocss.com/docs/colors) for all available colours.

You can use non-theme colours, my product icons use the colour `orange-400`. You can use colours in Sass like importing variables, in your main stylesheet add `@use "colors" as *;`. You can then use the colour like:

```css
.card-icons {
	color: $orange-400;
}
```

## Reduced number of SCSS files

I'm using *more* lines of CSS in `kits-dna` with Pico CSS, but I now only have 4 `SCSS` files contributing to my main stylesheet, down from 7.

- custom
- dark-mode
- fonts
- github-alerts

Custom `SCSS` is now < 200 lines, I've given power over to Pico CSS for wrapper, container, inline code, tables etc.

I also host the font [**Figtree**](https://www.erikdkennedy.com/projects/figtree.html) rather than using the Google Fonts API (more performant), and have the style required for the [markdown-it GitHub alerts plugin](https://www.npmjs.com/package/markdown-it-github-alerts).

## Negatives

Two negatives I can think of:

1. No hamburger menu for mobile devices. Instead Pico CSS is responsive to smaller screens and reduces the font size accordingly, however if you had enough items in your site navbar, it would impact the grid / column styling. Feature request? I did try to get my old hamburger menu to work with Pico CSS but I couldn't easily do it, so I released without - perhaps I'll go back and tinker with it, but it might mean a custom header.
2. While lightweight compared to other frameworks it's heavier than my previous CSS. But as I mentioned at the start of this post, I'm happy with this trade-off and the Lighthouse performance is **100**.

## Wrap up

Not starting with Pico CSS or a CSS framework taught be more about CSS and Sass than if I'd used one from the outset of building a website - all that Jekyll Minima theme CSS customisation! But I think that makes it easier to adopt a framework, and understand the value. I flipped `kits-dna` over to Pico CSS in just a few hours!

Pico CSS has added a modern look, it's easy to install and use and isn't overkill. If I build another small project or website again I'll definitely use it, and hopefully after reading this post you might consider it too. Beautiful, simple to use and high performing, what more do you want. If I was building a SaaS application would I use it? Probably not, but that's not [Pico's target audience / usage scenario](https://picocss.com/docs/usage-scenarios), it comes down to using the right tool or framework for the job.

Thanks for reading :call_me_hand:
