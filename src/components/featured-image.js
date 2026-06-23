/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"

// Renders an optimized GatsbyImage when the image was processed by sharp.
// Falls back to a plain <img> (via publicURL) for formats sharp can't
// process — animated GIFs, SVGs, etc. Returns null when there's no image.
const FeaturedImage = ({ image, alt, className }) => {
  if (!image) return null

  const data = image.childImageSharp?.gatsbyImageData
  if (data) {
    return <GatsbyImage image={data} alt={alt} className={className} />
  }

  if (image.publicURL) {
    return (
      <img
        src={image.publicURL}
        alt={alt}
        className={className}
        loading="lazy"
      />
    )
  }

  return null
}

export default FeaturedImage
