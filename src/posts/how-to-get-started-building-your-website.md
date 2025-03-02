---
title: How to Get Started Building Your Website
date: 2024-10-24
tags:
  - kits-dna
  - github codespaces
  - github pages
  - jekyll
---
*This is the 3rd post in the **Building kits-dna** series.*
In posts 1 and 2 of the building kits-dna series I’ve focussed primarily on the technology. But how can *you* “Get Started” building your own personal website?

> :bulb: **Tip:** I recommend reading posts 1 and 2 so that you’ve got some background before going further. If you’re technically confident, jump straight in!

If you’ve already checked out the kits-dna GitHub Repo then you’ve probably seen the [README](https://github.com/makendon/kits-dna/blob/main/README.md). A README tells people about your repo / project, there’s varying guidance for what makes a good one available online but I focussed on “Getting Started”. Below is a copy of the relevant sections from the README with a little added content. We'll then look at how we can get the our website onto the internet.

## Getting Started

### Dependencies

Dependencies in this context are what you’ll need to create a Jekyll based website with version control.

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

## Getting Your Website onto the Internet

Cool. So now you should have a your own copy of kits-dna either locally or on GitHub using Codespaces. If you've got a local copy you're going to need to create a GitHub repository that you can push your changes to from where you can *publish* your website onto the internet using **GitHub Pages**.

There's a couple of ways that Github Pages can be enabled for a repository:

1. Create a new public repository named *username.github.io*
    1. Push / Create content
    2. Open up a browser and go to https:username.github.io
2. Create a new public repository (any name)
    1. Push / Create content
    2. Go to **Settings** from the repository ribbon
    3. Under *Code and automation*, select **Pages**
    4. Under *Build and deployment*, select **Deploy from branch**. This is an auto GitHub Actions workflow, but you can also add a Jekyll GitHub Actions workflow for greater customisation
    5. Under *Branch*, select the **branch** this would usually be *main*, *master* or *gh-pages*
    6. Open up a browser and go to https:repositoryname.github.io

> :hand: **Help:** Visit [GitHub Pages](https://pages.github.com/) for a quick overview. For further help see GitHub's extensive Pages [documentation](https://docs.github.com/en/pages).

### Removing Your Website from the Internet

You've seen your website on the internet but you might want to *unpublish* your website until it's ready for release - this is what I did but you can do whatever you want!

To unpublish your site:

1. Go to **Settings** from the repository ribbon
2. Under *Code and automation*, select **Pages**
3. Where it says "Your site is live at..." click the **three dots (Additional site options)**
4. Select **Unpublish site**

If you try to visit your site now you'll receive a *404 page not found* error. You can now work on improving your site till it's ready to viewed!

To re-publish your site simply commit / merge into the branch that you configured GitHub Pages to deploy from and the workflow will re-deploy your site.

## Wrap Up

If you’ve followed this “Getting Started” *guide* you should now:

1. Have your own copy of `kits-dna` - whether local or on GitHub - that you can make your own
2. Be able publish *your* website to the internet

I've not covered `git` commands here, hopefully you checked out that nice Udacity course I referenced in post 1! All this is great practice, so hopefully you're starting to feel a little more confident with the terminal and running commands.

Hey maybe you’ve gotten the hobbyist dev bug! :nerd_face:
