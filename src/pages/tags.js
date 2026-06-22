/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { TagBadge } from "../components/taxonomy-badges"

const TagsPage = ({ data }) => {
  const tags = [...data.allMarkdownRemark.group].sort(
    (a, b) => b.totalCount - a.totalCount
  )

  return (
    <Layout className="page">
      <Seo title="Tags" description="Browse posts by tag" />
      <h1>Tags</h1>
      {tags.length === 0 ? (
        <p sx={{ color: "muted" }}>No tags yet.</p>
      ) : (
        <ul
          sx={{
            listStyle: "none",
            p: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {tags.map(({ fieldValue, totalCount }) => (
            <li
              key={fieldValue}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <TagBadge tag={fieldValue} />
              <span sx={{ color: "muted", fontSize: 0 }}>{totalCount}</span>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

export default TagsPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
