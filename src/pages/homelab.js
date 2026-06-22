/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/post-card"

const HomelabPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout className="blog-page">
      <Seo title="Homelab" description="Posts and notes about my homelab" />
      <h1>Homelab</h1>
      {posts.length === 0 ? (
        <p sx={{ color: "muted" }}>No homelab posts yet.</p>
      ) : (
        <div className="grids col-1 sm-2 lg-3">{posts}</div>
      )}
    </Layout>
  )
}

export default HomelabPage

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "homelab-post" } } }
    ) {
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
