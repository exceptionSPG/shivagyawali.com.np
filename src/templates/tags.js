/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/post-card"
import Pagination from "../components/pagination"
import { tagPath } from "../util/taxonomy"

const TagTemplate = ({ data, pageContext }) => {
  const { tag, currentPage, numPages } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout className="blog-page">
      <Seo
        title={`Posts tagged “${tag}”`}
        description={`All posts tagged ${tag}`}
      />
      <h1>
        Tag: {tag}{" "}
        <span sx={{ color: "muted", fontSize: 3 }}>({totalCount})</span>
      </h1>
      <div className="grids col-1 sm-2 lg-3">{posts}</div>
      <Pagination
        basePath={tagPath(tag)}
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export default TagTemplate

export const tagPageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { template: { eq: "blog-post" }, tags: { in: [$tag] } }
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
