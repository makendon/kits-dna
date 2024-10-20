---
layout: post
title: How to Get Started
date: 2024-10-20
categories: kits-dna
---
This is the 3rd post in the **Building kits-dna** series.
In posts 1 and 2 of the building kits-dna series I’ve focussed primarily on the technology. But how can *you* “Get Started” building your own personal website.

> :bulb: **Tip:** I recommend reading posts 1 and 2 so that you’ve got some background before going further. If you’re technically confident, jump straight in!

If you’ve already checked out the kits-dna GitHub Repo then you’ve probably seen the [README](https://github.com/makendon/kits-dna/blob/main/README.md). A README tells people about your repo / project, there’s varying guidance for what makes a good one available online but I focussed on “Getting Started”. Below is a copy of the relevant sections from the README with a little added content.

## Getting Started

### Dependencies

Dependencies in this context are what you’ll need to create a **Jekyll** based website with version control.

### Local

On your computer (laptop / pc) install:

- Git
- Ruby
- Jekyll

More info on installing dependencies can be found under **Jekyll** below.

### Codespaces

As per post 2, you don’t need a computer to install dependencies locally, you can use **GitHub Codespaces**.

See the `.devcontainer` directory in this repo with pre-installed dependencies.

### Clone Repo

Think of cloning the repo as taking a copy and downloading it to your computer.

```bash
git clone https://github.com/makendon/kits-dna.git
cd kits-dna
```

### Jekyll

Jekyll builds the site locally and is also used by GitHub Pages.

- Install dependencies. Jekyll [pre-requisites](https://jekyllrb.com/docs/installation/) can help for different operating systems
- Install Jekyll and bundler gems

```bash
gem install jekyll bundler
```

- Install the gem dependencies and update

```bash
bundle install && bundle update
```

### Run Site

- Run local server

```bash
bundle exec jekyll serve
```

- Open a web browser and go to http://localhost:4000/ you should see your local copy of the site running

### Make Changes

That's it! Now make the site your own, remove the content, add your own! Change the style, go wild. While the site is running locally any changes you make (except the _config.yml) will be reflected - you may need to refresh your browser.

## GitHub and GitHub Pages

Cool. So now you should have a your own copy of kits-dna either locally or on GitHub using Codespaces. If you've got a local copy you're going to need to create a GitHub Repository that you can push your changes to from where you can *publish* your website onto the internet using **GitHub Pages**.



## Wrap Up

If you’ve followed this “Getting Started” *guide* you should now have your own copy - whether local or on GitHub - of kits-dna that you can do whatever you want too to make your own and get your writings on the internet.

You should also be a little more confident with the terminal and running commands. Hey maybe you’re even going to get the hobbyist dev bug! :nerd_face:
