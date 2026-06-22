/**
 * Shared helpers for categories & tags.
 *
 * Used by both gatsby-node.js (CommonJS, build time) and React templates
 * (compiled by webpack), so this file uses module.exports.
 */

// Turn a label like "Raspberry Pi" or "नेपाली" into a URL-safe slug.
// Unicode-aware so non-Latin tags are preserved rather than emptied.
const kebabCase = str =>
  String(str)
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "")

const tagPath = tag => `/tags/${kebabCase(tag)}/`

const categoryPath = category => `/category/${kebabCase(category)}/`

module.exports = { kebabCase, tagPath, categoryPath }
