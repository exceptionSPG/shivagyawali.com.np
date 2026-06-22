/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

// Reusable "latest posts" section for the homepage. Defaults to the blog,
// but title / view-all link can be overridden (e.g. for Homelab).
export default function BlogListHome({
  data,
  title = "Latest in Blog",
  viewAllPath = "/blog",
  viewAllLabel = "See more",
}) {
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return (
    <PostMaker
      data={posts}
      title={title}
      viewAllPath={viewAllPath}
      viewAllLabel={viewAllLabel}
    />
  )
}

const PostMaker = ({ data, title, viewAllPath, viewAllLabel }) => (
  <section className="home-posts">
    <h2>
      {title}{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
    <Link
      className="button"
      to={viewAllPath}
      sx={{
        variant: "variants.button",
      }}
    >
      {viewAllLabel}
      <span className="icon -right">
        <RiArrowRightSLine />
      </span>
    </Link>
  </section>
)
