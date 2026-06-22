/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { tagPath, categoryPath } from "../util/taxonomy"

const PostCard = ({ data }) => (
  <article
    className="post-card"
    sx={{
      bg: "cardBg",
    }}
  >
    {data.frontmatter.featuredImage ? (
      <Link to={data.frontmatter.slug}>
        <GatsbyImage
          image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={data.frontmatter.title + " - Featured image"}
          className="featured-image"
        />
      </Link>
    ) : (
      ""
    )}
    <div className="post-content">
      <h2 className="title">
        <Link
          to={data.frontmatter.slug}
          sx={{
            variant: "links.postLink",
          }}
        >
          {data.frontmatter.title}
        </Link>
      </h2>
      <p
        className="meta"
        sx={{
          color: "muted",
        }}
      >
        <time>{data.frontmatter.date}</time>
        {data.frontmatter.category ? (
          <Link
            to={categoryPath(data.frontmatter.category)}
            sx={{ variant: "links.postLink", ml: 2 }}
          >
            {data.frontmatter.category}
          </Link>
        ) : null}
      </p>
      {data.frontmatter.tags && data.frontmatter.tags.length > 0 ? (
        <ul
          className="post-tags"
          sx={{
            listStyle: "none",
            p: 0,
            mt: 1,
            mb: 0,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {data.frontmatter.tags.map(tag => (
            <li key={tag} sx={{ mr: 2 }}>
              <Link to={tagPath(tag)} sx={{ variant: "links.postLink" }}>
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </article>
)

export default PostCard
