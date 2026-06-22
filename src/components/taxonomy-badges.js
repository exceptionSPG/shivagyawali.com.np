/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { tagPath, categoryPath } from "../util/taxonomy"

// Shared pill style. Colors come from theme tokens so light/dark modes and
// future tweaks live in src/gatsby-plugin-theme-ui/index.js.
const badgeBase = {
  display: "inline-block",
  fontSize: 0,
  lineHeight: 1.2,
  py: 1,
  px: 2,
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
  whiteSpace: "nowrap",
}

export const CategoryBadge = ({ category }) => {
  if (!category) return null
  return (
    <Link
      to={categoryPath(category)}
      sx={{
        ...badgeBase,
        bg: "categoryBg",
        color: "categoryText",
        "&:hover": { color: "categoryText", opacity: 0.85 },
      }}
    >
      {category}
    </Link>
  )
}

export const TagBadge = ({ tag }) => {
  if (!tag) return null
  return (
    <Link
      to={tagPath(tag)}
      sx={{
        ...badgeBase,
        bg: "tagBg",
        color: "tagText",
        "&:hover": { color: "tagText", opacity: 0.85 },
      }}
    >
      #{tag}
    </Link>
  )
}

export const TagList = ({ tags }) => {
  if (!tags || tags.length === 0) return null
  return (
    <ul
      className="post-tags"
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
        mt: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {tags.map(tag => (
        <li key={tag}>
          <TagBadge tag={tag} />
        </li>
      ))}
    </ul>
  )
}
