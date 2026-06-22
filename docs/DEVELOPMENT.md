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

---

## 4. Planned / upcoming work

Tracked for future passes (not yet implemented):

- Easier menu management: add pages and external links / dropdown items.
- RSS feed (`/feed` or `/rss`).
- Upgrade theme-ui stack to `^0.17.x` and remove the `legacy-peer-deps` flag
  from `.npmrc` (needs local build verification of theming + dark mode).
