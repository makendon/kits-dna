---
title: How to Make Your Website Look Good on Mobile
date: 2024-11-15
tags:
  - kits-dna
---
*This is the 6th post in the building kits-dna series.* This post picks up where we left off with a *design* gotcha - responsive or mobile first design.

As an internal PM for products without a GUI or mobile use cases this escaped me, but by making this mistake I **learnt**. This started with me asking my wife to visit the site after I had first published and released it - user testing :test_tube: - I was excited for her to see it... she picked up her iPhone... and the site looked crap! What?!

I had the following issues:

- Homepage tagline text had overlapped
- Header links broke out of the header
- Footer size grew which meant horizontal scrolling was needed

## Homepage

### Problem

Both `HTML` and `Markdown` text *should* wrap, I tried some `CSS` wrapping but that didn’t work.

How might I stop the text from wrapping?

### Solution

I made the font size responsive so that the size is smaller on mobile devices. You can do this using the below `CSS`

```css
/* Adjust font size for mobile */
@media (max-width: 768px) {
  .homepage h1 {
    font-size: 2.98em; /* Scale down by 20% */
  }

  .homepage h2 {
    font-size: 1.24em; /* Scale down by 20% */
  }
}
```

This solution uses the *max-width* media query. When the device screen size is 768px or smaller the font size will be 20% smaller than if the screen size was 800px.

## Header

### Problem

Minima as a theme caters for mobile devices in its default header. In my infinite wisdom I’d added a *custom* header that ignored the mobile elements :joy:

How might I stop the links breaking out of the header?

### Solution

I hinted at the solution above, but I went back to the default header and changed the style. Wasted effort on my part but I learnt and saved time in the long run trying to work out how to make the custom header responsive.

The default header includes an option for a *hamburger* menu that is hidden by default but is activated for mobile screens. The navigation links then get added under the hamburger menu rather than the actual header. On my site the only remaining header item is the site logo which acts as a *home* link.

I customised the hamburger by changing; the size, the fill and background colour. I also made the hamburger dark mode responsive. The customisation is through the relevant `HTML` and `CSS`.

> :bulb: **Tip:** For mobile testing you can adjust the content-width variable (this might not work for all scenarios) so that you can test the hamburger. I tried changing it, but didn’t make it large enough so I suffered through testing via pull requests and deployments. After getting fed up of this longer process I tried the content-width again and made it excessively large 2600px (on a 23” monitor) which finally showed the responsive header for local testing :grinning:

## Footer

### Problem

There wasn’t anything overly wrong with the site footer but I wasn’t happy with how the social icons placed and you could scroll the footer horizontally which I didn’t like. I’d changed the default footer a little to remove parts I didn’t want on it and to move the social icons to the right hand side, this was a bit tricky to do and it felt a bit hacked but looked fine on a larger screen.

How might I prevent the footer needing to scroll?

### Solution

This issue provided an opportunity to re-design the footer and make it responsive for mobile. This was the first time in building kits-dna where I used AI as an assistant to help me - I still struggle visualising containers and flex boxes - so I asked ChatGPT to help me make a responsive footer with 3 columns, with basic details in each one. AI delivered, it was no frills but I only wanted the skateboard `HTML` and `CSS`.

On mobile devices the footer stacks each column on top of one another removing the excess scrolling. You can stack a footer using the below `CSS`, the key property being *flex-direction: column*.

```css
/* Responsive Footer for Mobile */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }

  .footer-column {
    margin-bottom: 20px;
    padding: 0;
    max-width: 100%;
  }
}
```

> :bulb: **Tip:** You could go back to ChatGPT and tell it how you want the footer to look and what content you want but I’d recommend still doing something yourself if you want to learn because you’ll make more mistakes :school:

## Wrap Up

If you've made it this far try viewing this site on different devices, you can then see the responsive design in action.

Design in general is a new competency for me and building `kits-dna` is a great example of how going outside your comfort zone can lead you to learning new skills. Skills that I'll be able to use to develop my career, and hobbies.

I'm planning to test `kits-dna` on [**Google Lighthouse**](https://developer.chrome.com/docs/lighthouse) which might pick up a raft of different issues for future iterations/improvements. If you spot any issues on mobile or on a laptop / desktop please give me [feedback](/contact) or raise an issue on [GitHub](https://github.com/makendon/kits-dna/issues).

Thanks for reading :call_me_hand:
