---
layout: post
title: Building kits-dna
date: 2024-09-07
categories: kits-dna
---

Over a series of blog posts I’ll show how I’ve built `kits-dna`. My goal with this is to show people who aren’t *engineers/developers* how easy it is to create a personal website, either as a portfolio, blog or both, and get started with an internet presence outside of social media.

> :memo: **Note:** For a brief overview of `kits-dna` read my project “**Personal Website**”, on my [Projects](/projects/) page.

# GitHub

I use GitHub Pages for hosting, it’s easy to get started. GitHub is the home of open source so it made sense to start there as a beginner. If you’re a beginner like me, take the plunge and sign up, I recommend the following training from [“GitHub Skills”](https://github.com/skills):

- Introduction to GitHub
- Communicate using Markdown
- GitHub Pages

> :bulb: **Tip:** If like me you are new to `git` technology *products* such as GitHub or GitLab, i recommend learning `git`. Udacity have a course entitled [Version Control with Git](https://www.udacity.com/course/version-control-with-git--ud123) which combined with their [Shell Workshop](https://www.udacity.com/course/shell-workshop--ud206) gives a basic understanding of `git` and `bash` in the terminal which can be used locally (your PC/Laptop) or with GitHub Codespaces.

## GitHub Pages

Why [GitHub Pages]([https://pages.github.com](https://pages.github.com/))? I’m not a developer, i don’t know any programming languages so i needed something that was simple to use and get started with. I didn’t need `javascript` and i don't need extensive hosting on a cloud platform.

GitHub Pages supports [Jekyll]([https://jekyllrb.com](https://jekyllrb.com/)) and a number of Jekyll [themes](https://pages.github.com/themes/) out the box.

GitHub Pages also support custom domains which is pretty cool and best of all, GitHub Pages is **free**!

### Jekyll

> “Transform your plain text into static websites and blogs”

This means you write content in [Markdown](https://daringfireball.net/projects/markdown/) and it's converted into `html`. Jekyll can generate a static website, which you can run locally and see changes in *refresh-o-time*, which is really useful.

Jekyll themes are styles of site, the default Jekyll theme is `minima` but there’s lots out there, you can even create your own. I took `minima` and customised it. I’ll go into this in another blog post, but for now i’d recommend initialising a git repository locally or on GitHub (and use Codespaces) and get started experimenting with Jekyll. I did this locally on my RaspberryPi 4 then tested with GitHub Codespaces to see if i could develop on my iPad Pro. Useful Jekyll links:

- [Quickstart](https://jekyllrb.com/docs/)
- [Step by Step Tutorial](https://jekyllrb.com/docs/step-by-step/01-setup/)

> :bulb: **Tip:** You’ll know how you learn best but i found just getting stuck in and doing helps tremendously with tech. If nothing else it re-enforces `git` commands!

#### **Next posts**

In the next couple of posts i’ll cover:

- How you can use an iPad or tablet to create a website. I’ll write about GitHub Codespaces in this post.
- How you can customise Jekyll. This starts to get a little more technical, but it’s not programming, it’s working with markup code such as `html`and `css`.
