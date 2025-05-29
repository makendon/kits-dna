---
title: How to Use an iPad or Tablet to Create a Website
date: 2024-10-11
tags:
  - kits-dna
  - github-codespaces
  - jekyll
---
*This is the 2nd post in the **Building kits-dna** series.*
Most development that I’ve experienced still happens locally - on a devs laptop - before their work is pushed to a central source code management tool such as GitHub, GitLab etc. But do we *need* a laptop?

I have an old laptop and a slow Raspberry Pi 4, but I do have a newer iPad Pro, so I investigated if there was a way to develop locally using an IDE (Integrated Development Environment) using my iPad. There are a few hacks in this space such as using the iPad to remote onto the Pi or using Working Copy, but native IDE’s aren’t available on iOS.

## GitHub Codespaces

[**GitHub Codespaces**]([https://github.com/features/](https://github.com/features/codespaces)) solved this problem. In a nutshell it’s a configured and secured IDE that runs **Visual Studio Code** in the browser and is integrated natively with GitHub.

With just a config file in your repo, you can spin up a Codespace for *free* (120 hours per month) with all the dependencies you need pre-installed. You can even install VS Code extensions as you would locally.

And best yet for projects like a website where you want to run locally to see changes in real time, Codespaces has port forwarding that allows you to do just that... awesome!

> :memo: **Note:** You can use GitHub Codespaces locally, this means you can use your existing VS Code or another supported IDE.

### Getting Started with GitHub Codespaces

1. Create a Repository on GitHub
2. On the **Code** tab, click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespaces on main**

GitHub will spin up a new Codespaces Virtual Machine (VM) running on the default image. The environment is known as a development or dev container. Read [“Introduction to dev containers”](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers) on GitHub for information on dev containers and custom images.

### Jekyll

If you have cloned or forked `kits-dna` the dev container configuration is part of the repository. There is a directory in the repository root called `.devcontainer` which contains the configuration file `devcontainer.json`. Most of the file is comments but the code required to build a dev containers image with Jekyll is:

```json
{
    "name": "Jekyll",
    "image": "mcr.microsoft.com/devcontainers/jekyll:2-bookworm"
}
```

Spinning up a Codespace with this configuration will give you all the dependencies you need to run Ruby and Jekyll commands to build your website.

> :bulb: **Tip:** I highly recommend reading [“Introduction to dev containers”](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers) and give it a go yourself using a predefined configuration.

## Wrap Up

GitHub Codespaces has meant that so far I haven’t needed to shell out £1k+ on a new laptop and the free monthly allowance will be enough for most hobbyists - you can always pay as you go if you need more minutes/hours.

I’ve focussed on my use case of Jekyll in this post, but there are dev container configurations for all sorts, the default image for example includes Python. It would be cool if I can use Codespaces for my future projects but I might end up giving into the temptation of a new shiny laptop!
