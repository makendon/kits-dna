---
layout: post
title: Building kits-dna - Post 1
date: 2024-09-29
categories: kits-dna
---
Over a series of blog posts I’ll tell the story of how I built this website, aka `kits-dna`. My goal with this is to show people who aren’t *engineers/developers* that it's easy to create a personal website, either as a portfolio, blog or both, and get started with an internet presence outside of social media.

> :memo: **Note:** For a brief overview of `kits-dna` read my project “**Personal Website**”, on my [Projects](/projects/) page.

## Technologies

### GitHub

[**GitHub**](https://github.com/) is the home of open source so it made sense to start there as a beginner. If you’re a beginner like me, take the plunge and sign up, I recommend the following training from [GitHub Skills](https://github.com/skills):

- Introduction to GitHub
- Communicate using Markdown
- GitHub Pages

> :bulb: **Tip:** If like me you are new to `git` technology *products* such as GitHub or GitLab, I recommend learning `git`. Udacity have a course entitled [Version Control with Git](https://www.udacity.com/course/version-control-with-git--ud123) which combined with their [Shell Workshop](https://www.udacity.com/course/shell-workshop--ud206) gives a basic understanding of `git` and `bash` in the terminal which can be used locally (your PC/Laptop) or with GitHub Codespaces. Both these courses are free.

#### GitHub Pages

I use [**GitHub Pages**]([https://pages.github.com](https://pages.github.com/)) for hosting my site. I wanted something simple, turned out it wasn't quite so simple but this was my fault. I'll talk about my *gotcha's* in an upcoming post.

GitHub Pages supports **Jekyll** and a number of Jekyll [themes](https://pages.github.com/themes/) out the box.

GitHub Pages also support custom domains which is pretty cool and best of all, GitHub Pages is **free**!

### Jekyll

> “Transform your plain text into static websites and blogs”

[**Jekyll**](https://jekyllrb.com/) allows you to write content in [**Markdown**](https://daringfireball.net/projects/markdown/) which is converted into `HTML`. Jekyll can generate a static website, which you can run locally and see changes in *refresh-o-time*, which is really useful.

Jekyll themes are styles of site, the default Jekyll theme is [**Minima**](https://github.com/jekyll/minima/tree/master) but there’re lots out there, you can even create your own. I took Minima and customised both some of the `HTML` and `CSS` - maybe I'll create my own theme at some point as if Minima is updated to v3 in future I'll have a few problems!

To get started with Jekyll, I’d recommend initialising a git repository locally or on GitHub (and Codespaces) and get started experimenting with Jekyll. I did this locally on my RaspberryPi 4 then tested with GitHub Codespaces to see if I my iPad Pro was suitable for developing. Useful Jekyll links:

- [Quickstart](https://jekyllrb.com/docs/)
- [Step by Step Tutorial](https://jekyllrb.com/docs/step-by-step/01-setup/)

> :bulb: **Tip:** You’ll know how you learn best but I find getting stuck in and doing helps a lot with tech. If nothing else it re-enforces `git` commands!

## Next

In upcoming posts on building `kits-dna` I’ll cover:

- How to use an iPad or tablet to create a website
- How to customise the appearance of your site
- Build Gotcha's on GitHub Pages
- How to make your site look good on mobile
- How to add (Simple) Analytics
- How to add a Favicon
