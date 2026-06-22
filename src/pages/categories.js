/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { CategoryBadge } from "../components/taxonomy-badges"

const CategoriesPage = ({ data }) => {
  const categories = [...data.allMarkdownRemark.group].sort(
    (a, b) => b.totalCount - a.totalCount
  )

  return (
    <Layout className="page">
      <Seo title="Categories" description="Browse posts by category" />
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <p sx={{ color: "muted" }}>No categories yet.</p>
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
          {categories.map(({ fieldValue, totalCount }) => (
            <li
              key={fieldValue}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <CategoryBadge category={fieldValue} />
              <span sx={{ color: "muted", fontSize: 0 }}>
                {totalCount} {totalCount === 1 ? "post" : "posts"}
              </span>
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
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
