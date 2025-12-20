# kits-dna

`kits-dna` is the repository name for **kitfrance.com**. It uses the **Eleventy** static site generator. 11ty.

[![Netlify Status](https://api.netlify.com/api/v1/badges/698c405f-df5f-4dcb-aa60-191b0cdcaedf/deploy-status)](https://app.netlify.com/sites/kits-dna/deploys)

## Development

A Dockerfile is included for containerised and consistent testing environments. This approach ensures dependencies and the build environment match production, rather than using the Eleventy dev server which may have different behaviour.

## Deployment

This project deploys to Netlify on each push to `main`. A Heroku buildpack creates a production container image on each push to `main` and publishes it to GitHub Container Registry.

## Getting started

### Local dependencies

- Git
- Node.js
- npm

### Create new directory

```bash
mkdir new-site-name
cd new-site-name
```

### Clone repository

```bash
git clone https://github.com/makendon/kits-dna.git
```

### Install dependencies

```npm
npm ci
```

### Serve site

Build and host on a local development server:

```npm
npm start
```

Open a web browser and go to http://localhost:8080/ you should see your local copy of the site running.

#### Make changes

Viola! Now make the site your own, remove the content, add your own! Change the style, go wild. While the site runs locally any changes you make will reflect in real time.

### Build site

Generate a production ready build to the `dist` folder:

```npm
npm run build
```

## Contributing

Help improve `kits-dna`

- Open an issue on the repo
- Fork the repo, make changes and open a pull request

## Licensing

### Source code

Source code licensed under [**GPL v3**](https://www.gnu.org/licenses/gpl-3.0.html).

### Content

All **content** is copyright.
