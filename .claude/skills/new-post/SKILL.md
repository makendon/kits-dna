# New post command

Create a new blog post scaffold in `src/posts/`.

1. Ask the user for: post title and one or two tags (check existing posts for tag conventions)
2. Derive the filename slug from the title (lowercase, hyphens, no special characters)
3. Use today's date for the filename and `date` field
4. Create the file at `src/posts/YYYY-MM-DD-slug.md` with this frontmatter:

```yaml
---
title: <title>
date: YYYY-MM-DD
tags:
  - <tag>
description:
draft: true
---
```

Leave `description` blank for the user to fill in. Add a `##` heading matching the title beneath the frontmatter, and a `## Wrap up` heading at the end.

Do not add any other content.
