/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/post-card"
import Pagination from "../components/pagination"
import { categoryPath } from "../util/taxonomy"

const CategoryTemplate = ({ data, pageContext }) => {
  const { category, currentPage, numPages } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout className="blog-page">
      <Seo
        title={`${category} posts`}
        description={`All posts in the ${category} category`}
      />
      <h1>
        Category: {category}{" "}
        <span sx={{ color: "muted", fontSize: 3 }}>({totalCount})</span>
      </h1>
      <div className="grids col-1 sm-2 lg-3">{posts}</div>
      <Pagination
        basePath={categoryPath(category)}
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export default CategoryTemplate

export const categoryPageQuery = graphql`
  query CategoryPage($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          template: { in: ["blog-post", "homelab-post"] }
          category: { eq: $category }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            category
            tags
            featuredImage {
              publicURL
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
            }
          }
        }
      }
    }
  }
`
