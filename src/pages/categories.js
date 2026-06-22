/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { CategoryBadge, TagBadge } from "../components/taxonomy-badges"

const sortByCount = arr => [...arr].sort((a, b) => b.totalCount - a.totalCount)

const listStyle = {
  listStyle: "none",
  p: 0,
  display: "flex",
  flexWrap: "wrap",
  gap: 3,
}
const itemStyle = { display: "flex", alignItems: "center", gap: 2 }
const countStyle = { color: "muted", fontSize: 0 }

const CategoriesPage = ({ data }) => {
  const categories = sortByCount(data.categories.group)
  const tags = sortByCount(data.tags.group)

  return (
    <Layout className="page">
      <Seo
        title="Categories & Tags"
        description="Browse posts by category and tag"
      />
      <h1>Categories &amp; Tags</h1>

      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p sx={{ color: "muted" }}>No categories yet.</p>
      ) : (
        <ul sx={listStyle}>
          {categories.map(({ fieldValue, totalCount }) => (
            <li key={fieldValue} sx={itemStyle}>
              <CategoryBadge category={fieldValue} />
              <span sx={countStyle}>
                {totalCount} {totalCount === 1 ? "post" : "posts"}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h2 sx={{ mt: 4 }}>Tags</h2>
      {tags.length === 0 ? (
        <p sx={{ color: "muted" }}>No tags yet.</p>
      ) : (
        <ul sx={listStyle}>
          {tags.map(({ fieldValue, totalCount }) => (
            <li key={fieldValue} sx={itemStyle}>
              <TagBadge tag={fieldValue} />
              <span sx={countStyle}>{totalCount}</span>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

export default CategoriesPage

export const query = graphql`
  {
    categories: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
    tags: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
