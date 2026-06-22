# Development & Maintenance Guide

This document explains **how to work on this site** and keeps a **running log of
the changes** we make. Add a new entry to the Changelog every time we ship a
meaningful change so the history stays readable without digging through git.

The site is a [Gatsby](https://www.gatsbyjs.com/) blog (originally the
`gatsby-starter-foundation` starter), edited through [Decap CMS](https://decapcms.org/)
and deployed on [Netlify](https://www.netlify.com/).

---

## 1. Local setup

Requirements: Node `18` (see `.node-version`) and npm.

```bash
# install dependencies
npm install

# start the dev server at http://localhost:8000
npm run develop
```

GraphQL explorer runs at `http://localhost:8000/___graphql`.

### Editing content locally with the CMS

The admin UI lives at `/admin/`. To run the CMS against your local files
instead of the live git backend:

1. In `static/admin/config.yml`, uncomment `local_backend: true`.
2. In one terminal run the Decap proxy: `npx decap-server`
3. In another terminal run `npm run develop`.
4. Open `http://localhost:8000/admin/`.

> Note: the proxy command is `decap-server` (the old `netlify-cms-proxy-server`
> is deprecated — see Changelog 2026-06-22).

---

## 2. How we make changes

We work in **small, atomic commits** on a feature branch, verify locally, then
merge.

1. Branch from `main`, e.g. `git checkout -b feat/<short-name>`.
2. Make one focused change per commit. Keep commit messages descriptive
   (what + why).
3. Verify locally with `npm install` (if deps changed) and `npm run develop`.
4. Push the branch. Netlify builds a **deploy preview** for the PR — check it
   before merging.
5. Merge to `main`; Netlify deploys production automatically.

### Where things live

| Path | What |
| --- | --- |
| `src/content/posts/` | Blog posts (markdown + frontmatter) |
| `src/content/pages/` | Home / About / Contact page content |
| `src/templates/` | Page templates (blog-post, blog-list, pages) |
| `src/components/` | Shared UI (header, navigation, footer, cards, search) |
| `src/util/*.json` | Site metadata, colors, social links |
| `static/admin/config.yml` | Decap CMS configuration (collections, fields) |
| `gatsby-config.js` | Plugins & site config |
| `gatsby-node.js` | Build-time page generation |

---

## 3. Changelog

### 2026-06-22 — Upgrade pass 1: fix deprecated dependencies

Branch: `feat/upgrade`. Stack kept on Gatsby 4 / React 16 (no framework bump
this pass); only clearly-deprecated pieces replaced.

**Netlify CMS → Decap CMS** (`commit 1ddfbe4`)

- Netlify CMS is deprecated and unmaintained; Decap CMS is its maintained
  successor.
- `package.json`: `netlify-cms-app` → `decap-cms-app`;
  `gatsby-plugin-netlify-cms` → `gatsby-plugin-decap-cms@^4.0.4`.
- `gatsby-config.js`: plugin `gatsby-plugin-netlify-cms` → `gatsby-plugin-decap-cms`.
- `static/admin/config.yml` + `README.md`: local backend helper command
  `npx netlify-cms-proxy-server` → `npx decap-server`.
- The git-gateway backend and `config.yml` collections are unchanged, so CMS
  content editing is unaffected.

**React 16 → 18 + Decap pin** (follow-up fix)

- Decap CMS `3.1+` requires React 18 as a peer dependency (only the stale
  `3.0.x` allowed React 16), so the first install failed with `ERESOLVE`.
  Gatsby `4.24` has full React 18 support (since `4.11`), so we bumped React
  rather than downgrading the CMS.
- `package.json`: `react` + `react-dom` `^16.14.0` → `^18.2.0`;
  `decap-cms-app` pinned to `~3.6.0` — the **last** Decap line that peers
  React 18 (`3.7+` jumped to a React 19 peer, which Gatsby 4 doesn't support).
- Gatsby manages the React root internally, so no app code changes were needed.

**`.npmrc` legacy-peer-deps** (follow-up fix)

- After the React bump, install failed again: `theme-ui@0.6.2` declares a
  peer of React `16/17` only (the range predates React 18). It runs fine under
  React 18 — the declared range is just conservative — but npm 7+ refuses to
  install on the strict peer mismatch.
- Rather than blind-migrating theme-ui across 11 minor versions (0.6 → 0.17,
  which can't be build-tested in the sandbox and risks breaking the theme),
  added `.npmrc` with `legacy-peer-deps=true`. This relaxes npm's strict peer
  resolution; Netlify also reads `.npmrc`, so the production build is covered.
- Trade-off: peer checks are relaxed project-wide. The proper follow-up is to
  upgrade the theme-ui stack (`theme-ui`, `gatsby-plugin-theme-ui`,
  `@theme-ui/color`) to `^0.17.x`, verify the theme/color-mode code, then drop
  the flag. Tracked under "Planned / upcoming work".
- Watch on first run: `react-helmet@6` and `theme-ui@0.6` may log React 18
  deprecation warnings; they still render. Report anything that actually breaks.

**Universal Analytics → GA4 (gtag)** (`commit 126c52e`)

- Universal Analytics stopped processing data in 2023; the
  `gatsby-plugin-google-analytics` plugin targets it and is deprecated.
- `package.json`: `gatsby-plugin-google-analytics` → `gatsby-plugin-google-gtag`.
- `gatsby-config.js`: new `gatsby-plugin-google-gtag` block reading the
  Measurement ID from `src/util/site.json` (`ga`), with `respectDNT: true`.
- `src/util/site.json`: placeholder id updated from UA format (`UA-…`) to GA4
  format (`G-XXXXXXXXXX`). **Action needed:** replace with your real GA4
  Measurement ID to enable analytics. gtag only loads in production builds
  (`gatsby build && gatsby serve`).

#### How to verify pass 1 locally

```bash
npm install          # picks up the swapped dependencies
npm run develop      # site should build and serve at :8000
# visit /admin/ to confirm the Decap CMS UI loads
```

### 2026-06-22 — Pass 2: Categories & Tags

Branch: `feat/categories-tags` (off `feat/upgrade`). Each post can have one
**category** (from a fixed list) and several **tags**.

Frontmatter convention:

```yaml
category: DevOps
tags: ["docker", "ci", "azure"]
```

Both are optional — posts without them render exactly as before. Backfill is
done through Decap CMS (Posts → the Category dropdown + Tags list).

What was added:

- `src/util/taxonomy.js` — shared `kebabCase` + `tagPath`/`categoryPath`
  helpers (unicode-aware), used by both `gatsby-node.js` and the templates.
- `gatsby-node.js` — `createSchemaCustomization` declares `category`/`tags`
  so GraphQL is safe before backfill; groups posts and generates paginated
  `/tags/<slug>/` and `/category/<slug>/` pages.
- `src/templates/tags.js`, `src/templates/category.js` — listing pages.
- `src/components/pagination.js` — reusable pagination component.
- `static/admin/config.yml` — Category (select) + Tags (list) fields.
- Category and tag links shown on post cards and on each post page.

URLs: `/tags/<tag-slug>/` and `/category/<category-slug>/`, paginated at 9
posts per page (`/tags/<slug>/2/`, etc.).

**Adding a new category:** edit the `options:` list of the `category` field in
`static/admin/config.yml`. The category page is generated automatically once a
post uses that value.

#### How to verify locally

```bash
npm run develop
# Add a category + a few tags to a post via /admin/ (or edit its frontmatter),
# then visit /category/<slug>/ and /tags/<slug>/ and check the post card links.
```

### 2026-06-22 — Categories & Tags: index pages + colored badges

- **Index pages:** `/categories/` (`src/pages/categories.js`) and `/tags/`
  (`src/pages/tags.js`) list every category/tag with its post count, sorted by
  count, rendered as colored badges that link to each listing page.
- **Colored badges:** `src/components/taxonomy-badges.js` exports
  `CategoryBadge`, `TagBadge`, and `TagList`, used on post cards, post pages,
  and the index pages. Category pills are **purple**, tag pills **maroon**.
- **Changing the colors:** edit the theme tokens `categoryBg` / `categoryText`
  / `tagBg` / `tagText` in `src/gatsby-plugin-theme-ui/index.js` (there's a
  light value and a `modes.dark` value for each).
- Not yet linked in the site menu — that comes with the menu feature below.

### 2026-06-22 — Pass 3: Menu, combined Categories & Tags, Homelab

Branch: `feat/menu-homelab` (off `feat/categories-tags`).

**Data-driven menu** — `src/util/menu.json` now defines the nav. Edit that one
file to add, remove, or reorder items. Each item:

```json
{ "title": "Blog", "path": "/blog" }
{ "title": "YouTube", "url": "https://…", "external": true, "button": true }
```

- `path` → internal link; `url` + `"external": true` → external link (opens in
  a new tab); `"button": true` → highlighted button style.
- Current menu: Home, About, Blog, Category (`/categories/`),
  Homelab (`/homelab/`), YouTube (external button). Contact was removed from
  the menu (the page itself still exists).
- **Action:** replace the placeholder YouTube URL in `src/util/menu.json`.

**Combined Categories & Tags page** — `/categories/` now lists both categories
and tags with counts; `/tags/` redirects there. Per-tag (`/tags/<slug>/`) and
per-category (`/category/<slug>/`) listing pages are unchanged.

**Homelab section** — a content area separate from the blog:

- New Decap collection **Homelab** → files in `src/content/homelab/`, template
  `homelab-post`, URLs under `/homelab/<slug>`.
- `/homelab/` landing page (`src/pages/homelab.js`) lists homelab posts;
  `src/templates/homelab-post.js` renders each one.
- Homelab posts use `template: homelab-post`, so they never show up in the main
  blog list. Add one via the CMS (Homelab → New) or drop a markdown file in
  `src/content/homelab/` with a `/homelab/...` slug.

**Adding another section later** (e.g. Projects) is the same recipe: a new
Decap collection + folder + a `*-post` template + a landing page + a menu entry.

### 2026-06-22 — Homepage Homelab section + YouTube link

- The homepage now shows an "Explore my Homelab" section (3 latest homelab
  posts + a "View all homelab posts" button), below "Latest in Blog". It's
  hidden automatically when there are no homelab posts. Change the count via
  the `homelabPosts` query `limit` in `src/templates/index-page.js`.
- `BlogListHome` is now reusable: it takes `title`, `viewAllPath`, and
  `viewAllLabel` props.
- The YouTube menu button now points to the real channel.

### 2026-06-22 — Homelab posts support categories & tags

- Homelab posts now have the same **Category** + **Tags** fields as blog posts
  and show the same colored badges (on the post and on the `/homelab/` cards).
- Category options are a **shared list** across the Posts and Homelab
  collections in `static/admin/config.yml`. When adding/removing a category,
  update **both** collections so the dropdowns stay in sync.
- The shared taxonomy pages include homelab posts: `/category/<slug>/`,
  `/tags/<slug>/`, and the combined `/categories/` page list blog **and**
  homelab posts (`template` in `[blog-post, homelab-post]`). So a category like
  "Raspberry Pi" can collect posts from both sections.

---

## 4. Planned / upcoming work

Tracked for future passes (not yet implemented):

- "Add pages" in Decap (a folder Pages collection) plus the editorial
  draft/publish workflow (`publish_mode: editorial_workflow`).
- RSS feed (`/feed` or `/rss`).
- Optional: make the menu editable from Decap instead of the repo JSON file.
- Upgrade theme-ui stack to `^0.17.x` and remove the `legacy-peer-deps` flag
  from `.npmrc` (needs local build verification of theming + dark mode).
