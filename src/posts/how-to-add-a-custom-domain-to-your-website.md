---
title: How to Add a Custom Domain to Your Website
date: 2024-12-06
tags:
  - kits-dna
  - custom domain
  - squarespace
  - dns
  - github pages
---
*This is the 9th post in the building kits-dna series.* Don't want to use GitHub Pages default domain for your site? Here's how to get setup using Squarespace domains.

## What Is a Domain?

A domain is simply the name or the URL of your website. The domain for `kits-dna` is [kitfrance.com](https://kitfrance.com). This is a *custom* domain that I purchased and configured to work with the hosting provider (GitHub Pages). GitHub Pages will give you a default domain but a custom domain is just that wee bit nicer.

## Squarespace

I was going to use Google Domains (because it's Google) but their site redirected to [**Squarespace**](https://domains.squarespace.com/) domains. Squarespace offer website hosting and building but I only use the domain name product. Being honest I didn't shop around, I thought the price was acceptable and I liked the added features:

- WHOIS privacy
- SSL
- Premium DNS

> :warning: **Warning:** DNS is key. Whether you use Squarespace or not, make sure you either know how to configure DNS, or you use a domain registrar who offer a DNS service.

### Cost

The domain costs £16 per year, with a first year discount - thanks Squarespace :smile: - prices depend on the domain suffix / extension e.g. `.com` or `.co.uk`.

### How to Setup Your Squarespace Domain

1. Find and purchase a domain
2. You should be prompted to create an account. If not, create an account
3. Verify your email address. This activates your domain
4. Login to your account
5. Click on your domain
6. Go to **DNS**, and then **DNS Settings**
7. Add **custom records** as per screenshot

![Squarespace Custom records](/assets/screenshots/squarespace-custom-records.jpeg)

- The `TXT` record allows GitHub Pages to verify your domain
- The IP addresses are GitHub Pages servers and are publicly available in documentation
  - IPv6 `AAAA` records are optional
- For the `TXT` and `CNAME` records you will need to use your own GitHub username!

> :warning: **Warning:** Your domain won't work until you verify your email address / domain. I had to request a new verification email. Once verified your domain status becomes **Active**.

## How to Add a Custom Domain on GitHub Pages

By default your domain on GitHub Pages will be `[username].github.io` but you can easily add a custom domain. For full documentation visit [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) on GitHub.

1. [Verify your domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages#verifying-a-domain-for-your-user-site)
2. Create a **CNAME** file in the root of your repository with one line containing your domain. Note, you only need to do this if deploying your site via GitHub Actions
3. Go to your repository **Settings**
    1. Click on **Pages**
    2. Add your domain to the **Custom domain** section and click **Save**. Note, if you're deploying your site from a branch clicking save will make a commit and add a CNAME file (step 2)
4. **Test** by navigating to your custom domain. Be patient, DNS changes can take a couple of days to flow through the web of the internet. Once my domain was active it took less than an hour

## Bonus: Email Forwarding

Squarespace allows email forwarding. You can create an email alias such as `[name]@example.com` which is then forwarded to another email address such as a Gmail address. I use email forwarding on my site for contact via Email. You can configure email forwarding from your domain settings.

## Wrap Up

For less than a haircut you get an elevated, more professional online presence which suits the purpose of my site. If you're just making a simple hobby site then you may not want to bother, but it's another new skill you can learn, this time in the networking and `DNS` space :ninja:

Thanks for reading :call_me_hand:
