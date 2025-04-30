---
title: How to add Vale prose checking to your writing
date: 2025-04-30
tags:
  - vale
description: Want to style check your blog posts or writing, Vale is a prose linter that'll alert on words or phrases you don't want to use.
---
## What's a linter

> *A linter is a developer tool that analyses source code for errors, vulnerabilities, and stylistic issues to improve code quality - Sonar*

Linters are common in software development or coding to check for style and code quality. You can think of them similarly to a clothes linter than removes unwanted lint from your clothes to make them look better. Linters are available for most programming languages.

| Linter | Language |
| ------ | ---------- |
| Mardownlint | Markdown |
| ESlint | JavaScript |
| Ruff | Python |
| Checkstyle | Java |
| Hadolint | Docker |
| TFlint | Terraform |
| SonarQube for IDE | 20+ |

## What's Vale

[**Vale**](https://vale.sh) is a prose linter. It has built in configuration that allows you to select popular style guides such as those from Microsoft and Amazon, but you can quickly add your own.

Vale can check the following:

- existence
- substitution
- occurrence
- repetition
- consistency
- conditional
- capitalization
- metric
- spelling
- sequence
- script

For example an existence check could check for any word that you don't want to use in your writing, Vale will then give a warning message such as "Consider removing [word]". More information on each check is available on [Vale's documentation](https://vale.sh/docs/styles#checks).

## How to install Vale

The recommended approach to installing Vale for `macOS` is to use [**Homebrew**](https://brew.sh), after which you can run `brew install vale`. You can read more about installing Vale in the [Vale documentation](https://vale.sh/docs/install).

## How to use Vale

You can use Vale on:

- Command line (CLI)
- VS Code extension (other IDE extensions / plugins available)
- GitHub Actions

### Command line

To use Vale CLI commands navigate to directory where you have markdown files you want to check, then run `vale [name of file].md`

```bash
cd src/pages
vale about.md
```

You'll see Vale run in the terminal and highlight any errors, warnings or suggestions based on the Vale configuration.

### IDE extension

`Vale VSCode` is a VS Code extension that depends on having installed Vale. Once setup as per the instructions on the extension, you don't need to run Vale in the CLI. Vale alerts by underlining words or phrases in your markdown file and in the *problems* tab of the panel.

> [!Note]
> Blue underlines are suggestions, yellow warnings, and red errors

### GitHub Actions

A third way to use Vale is via the GitHub Actions workflow [vale-action](https://github.com/errata-ai/vale-action).

Create a new file in your `.github/workflows` directory called `vale.yml` and add the following code:

```yml
name: Vale CI
on:
  pull_request:
    branches:
      - main
  push:
    branches-ignore:
      - main
    paths:
      - '**.md'
  workflow_dispatch:

permissions:
  contents: read
  checks: write

jobs:
  vale:
    name: vale
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
      - uses: errata-ai/vale-action@v2.1.1
        continue-on-error: true
        with:
          vale_flags: "--glob=!LICENSE.md"
```

> [!Note]
> This workflow excludes the LICENSE.md file to reduce the number of warnings

You can then check your workflow runs in GitHub for any errors, warnings or suggestions. I've set my workflow to allow to fail, meaning Vale can detect errors, warnings and suggestions but will not stop you from deploying. You could if you wish fail your deployments if Vale detects issues, forcing you to resolve them. Personally I use Vale as a guide not a rule, but if you're an organisation wanting to *enforce* a consistent style across documentation, having a workflow that fails would ensure consistency.

## How to configure Vale

Vale needs a configuration file called `.vale.ini` and a directory / sub-directory  called `vale/styles` both in your repository root. The configuration file tells vale what styles you want to run and what file types to run against e.g. `Markdown` files. Here's an example configuration file:

```bash
StylesPath = vale/styles
MinAlertLevel = suggestion
Packages = proselint, write-good
Vocab = Blog
[*.{md}]
BasedOnStyles = proselint, write-good, blog
```

- **StylesPath** tells Vale where to look for style configuration
- **MinAlertLevel** self explanatory, you could choose to ignore suggestions and only alert on warnings
- **Packages** these are packages of configuration that you can use out of the box, this example uses `proselint` and `write-good`. Packages are installed in the `vale/styles` directory
- **Vocab** this checks for any accepted vocabulary, for example words that you want to exclude from spell check. You can also ignore words in a similar way
- **[*.md]** Vale will check all `Markdown` files
- **BasedOnStyles** you can see we're using two packages but also a third called `blog`. `blog` is a custom package or set of rules that I've built based on the style I want for this blog

### How to add packages

To add an out of the box package, simply add the name of the package to your configuration file. E.g. to add the Google package, the above example configuration file becomes:

```bash
Packages: prose lint, write-good, Google
```

After adding your package to the configuration you then need to run the command ` vale sync` in the terminal. This syncs and installs the package into your `vale/styles` directory.

Vale documentation has a list of [available packages](https://vale.sh/explorer).

### How to add custom rules to Vale

Cool, we've added a package, but how can you add your own style?

1. Add a subdirectory to `vale/styles` e.g. `vale/styles/blog`
2. Add a `yml` file e.g. `blog.yml`
3. In this file add the check you want to make e.g. for a **substitution** check add the following:

```yml
extends: substitution
message: "Try using a more conversational word: '%s'."
ignorecase: true
level: suggestion
swap:
  "utilize": "use"
  "leverage": "use" # Or "make the most of"
  "assist": "help"
  "purchase": "buy"
  "obtain": "get"
```

- **extends** is the Vale check. In this example we want to substitute or change words
- **message** is the message Vale returns to suggest making a change. For this blog style I want to substitute words to be more conversational, which suits the tone of my blog
- **ignorecase** checks whether upper or lower case
- **level** alert level of suggestion, this could also be set as warning or error. In this example I just want a suggestion
- **swap** is a list of words that you want to *swap*. In this example Vale searches for "utilize" and if found Vale returns the message "Try using a more conversational word: **use**". As it's a suggestion I can choose to change to word or ignore the suggestion. To build up the rules or words to check you just add more words to the swap list

> [!Warning]
> The swap list uses `yaml` syntax so be sure to remember to indent two spaces when adding a new word

Finally, you need to ensure your Vale configuration file includes your custom rule, which is the name of the subdirectory under `vale/styles`, in this example it's `blog`, so we append this on the line `BasedOnStyles = proselint, write-good, blog` in the configuration file. Vale will now check and alert on your custom rules.

### How to add a dictionary to Vale

Vale can check [spelling](https://vale.sh/docs/checks/spelling) against any [**Hunspell**](https://hunspell.github.io) compatible dictionary. This is especially handy in your IDE if you want to check proper English (GB). You need to download Hunspell dictionary `.aff` and `.dic` files.

> :bulb: **Tip:** You can download dictionaries in many languages from [Wooorm on GitHub](https://github.com/wooorm/dictionaries/tree/main/dictionaries)

To add your dictionary, create a `config/dictionaries` directory / subdirectory, and add the `.aff` and `.dic` files you downloaded.

If you've got a custom rule subdirectory create a `spelling.yml` file or create a new subdirectory and create the file. In this file add:

```yml
extends: spelling
message: "'%s' is a spelling mistake."
dictionaries:
  - en_GB
 ```

Of course change the dictionary as appropriate. Now Vale will check your spelling against the dictionary.

### How to ignore words

Say you've got a word or phrase that isn't in a dictionary such as `kits-dna` or `Eleventy` you can set Vale to [ignore](https://vale.sh/docs/checks/spelling#ignore-files) it. You can also use Vale [Vocabularies](https://vale.sh/docs/keys/vocab) to accept words.

In your `vale/styles/config` directory create a `ignore` directory and add a file called `ignore.txt`. Add each word you want Vale to ignore on a new line of the text file:

```bash
kits-dna
Eleventy
```

Now Vale shouldn't alert on these words.

## Wrap up

In this post we've learnt how to use Vale as a prose linter to check our writing style and spelling. I think it's a neat tool that's easy to get started with and useful for all levels of writing.

My favourite use of Vale so far is to remind myself of heading capitalisation. I started my blog writing posts with title case headings, i.e. each word in the heading is capitalised. This is an accepted style on the web but it's formal, so I've now adopted a less formal sentence style of only capitalising the first word of a heading and any nouns. I've haven't included this example in this post, but have a go at adding a capitalisation rule yourself.

Thanks for reading :call_me_hand:
