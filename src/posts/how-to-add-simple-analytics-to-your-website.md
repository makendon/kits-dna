---
title: How to Add Simple Analytics to Your Website
date: 2024-11-22
tags:
  - kits-dna
  - analytics
  - simple-analytics
---
*This is the 7th post in the building kits-dna series.* Google Analytics is popular but does it meet modern privacy standards such as GDPR? Here’s a simple alternative.

Minima supports [Google Analytics (GA)](https://marketingplatform.google.com/about/analytics/) out of the box, all you need to do is sign up for GA and add your tracking code to the relevant file on your site. GA is pretty comprehensive in terms of tracked metrics, but I did find the sidebar annoying. It’s worth mentioning that Jekyll and Minima are quite old in technology terms and aren’t regularly updated, for example the GA reference is to Universal Analytics (UA). Times have also changed in the privacy space such as the introduction of GDPR (for us here in Europe) - can you still use GA?

## Tracking Cookies

GA is now on version 4 which Google suggests meets privacy standards, the issue is GA tracks IP addresses and uses tracking cookies, this is what gives it a full feature set. I haven’t come across many blogs (if any) that have a cookie banner, which they should if using GA due to the privacy laws. There are products that provide cookie banners, some for free, but I explored if there were any simpler analytics options out of the box where I didn’t need to configure a cookie banner.

## Google Analytics Alternatives

Two alternatives for GA stood out:

- [Plausible Analytics](https://plausible.io/)
- [Simple Analytics](https://www.simpleanalytics.com/)

Both are privacy focussed with no need for a cookie banner. The negative when compared with GA is they are both *simple* in terms of the metrics they track. As `kits-dna` is just a hobby site I went for Simple Analytics as they offer a free tier and appear more privacy *first*, than privacy friendly. E.g. Plausible hash IP addresses, whereas Simple Analytics doesn’t collect IP addresses.

Interestingly if my site grows above 100k page views and I want some features such as longer retention, then Plausible has the cheaper paid tier.

## Simple Analytics

> *"Simple Analytics is a privacy-friendly and simple alternative to Google Analytics. No cookies. No trackers. **No consent required from your visitors**. Just straightforward analytics. - Simple Analytics"*

### Dashboard Metrics

Here's the list of metrics available on the Simple Analytics dashboard, good enough for a personal website/blog.

- Visitors
- Page views
- Time on page
- Live page views
- Referrals
- Pages
- Devices
- Browsers
- Countries

### How to Get Started

Simple Analytics works by using a `JavaScript` script that runs on each page. There’s no official guide for setting up Simple Analytics with Jekyll but it’s easy, here’s how:

1. [Sign up for an account](https://www.simpleanalytics.com/signup)
2. In your `_includes` directory create a new file called `simple-analytics.html`
3. [Paste the script](https://docs.simpleanalytics.com/script) into the `simple-analytics.html` file
4. Add the `simple-analytics.html` include to the body of your `default.html` layout before the closing `</body` tag.

> :bulb: **Tip:** Liquid is stopping the code blocks so see my [kits-dna default.html file](https://github.com/makendon/kits-dna/blob/main/_layouts/default.html) for an example.

As with GA, you can still use the `jekyll.environment == 'production'` tag with Simple Analytics. This means that the script will only be included if the Jekyll environment is equal to *production* such as your published site on GitHub Pages. Page views when developing locally (local host) will not be included in analytics as this would be *non-production.*

> :memo: **Note:** I’ve added a section to my sites privacy policy covering the use of Simple Analytics.

## Wrap Up

You’ve now got privacy first analytics without needing to worry about cookie banners. Analytics let you track the number of visitors to your site so that you can optimise the sites performance. Something like >60% of web traffic these days comes from mobile devices. If most of your visitors are using a mobile device you might want to prioritise improving the mobile experience over desktop.

Thanks for reading :call_me_hand:
