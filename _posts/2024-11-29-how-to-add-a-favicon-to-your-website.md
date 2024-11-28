---
layout: post
title: How to Add a Favicon to Your Website
date: 2024-11-28
categories: kits-dna
---
*This is the 8th post in the building kits-dna series.* Ever wondered what the icons on the web browser tab are next to the name of the site you're visiting? They're favicons, short for *favourite icons*.

When I was first testing my kits-dna next to the website name on the browser tab there was just a **G** in a square. It didn't look like the majority of the sites you visit. I wanted in on this just to make my site look a wee bit more polished and friendly. Favicons are relatively simple to create, easy to add to your site but very stubborn!

## How to Create a Favicon

There's lots of free of favicon generators out there, I used [**Favicon.io**](https://favicon.io/) which lets you upload your own image such as a site logo, use an emoji or generate a favicon from text.

## How to Add a Favicon to Repo

Once you've downloaded your favicon you need to add it to your site.

1. Create an **assets** directory in the root of your repo
2. Create a sub-directory called something like **favicons**
3. Copy the contents of the favicon download into the **favicons** folder

> :bulb: **Tip:** Checkout the [assets](https://github.com/makendon/kits-dna/tree/main/assets) directory in `kits-dna` for an example.

Now you've got favicons in your repo you need to add the code. The favicon code goes into the `head` or your site, for the non-techies this is different to your site `header`. The `_includes` directory in the repository root contains a `head.html` file. You need to add the following line of `HTML` code:

```html
<link rel="icon" type="image/x-icon" href="{{ "/assets/favicons/favicon.ico" | relative_url }}">
```

You'll need to update the icon reference to the relative path of your favicon. You can then test to see if your favicon is working on your site by running it locally.

## Favicon Bug?

Hopefully you guys are seeing the correct favicon... I'm not! :joy:

I think browser caching is an issue. Oddly the favicon that displays for my site either locally or when published isn't one of my current site assets! It's an old one, so the browser has cached (stored) it, and hasn't looked to for the new file/link.

If you've read my blog and my [About Me]({{ '/about/' | relative_url }}) page you'll know I use the :call_me_hand: emoji to represent a *shaka*, this is a homage to our honeymoon in Hawaii. :call_me_hand: is also the sites favicon, however I updated it to be more shaka like by rotating the icon. If you look in my `assets/favicons-emoji` directory you'll see what the favicon should be.

I called this section a *bug* rather than an issue because the issue might not be browser caching, I have cleared the cache and it's still an issue, so I might have to try a couple of other things.

## Wrap Up

Just a short post this week. Favicons aren't going to make or break your site, if you only use one browser tab at a time you won't notice it, but if you like tabs (developers I see you :wink:) it add a nice bit of style and professionalism.

Thanks for reading :call_me_hand:
