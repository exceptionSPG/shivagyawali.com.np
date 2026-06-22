import React, { useEffect } from "react"
import { navigate } from "gatsby"

// The standalone tags index was merged into the combined "/categories/"
// page (Categories & Tags). This page now just redirects there.
// Per-tag listing pages (/tags/<slug>/) are still generated in gatsby-node.
const TagsRedirect = () => {
  useEffect(() => {
    navigate("/categories/", { replace: true })
  }, [])

  return (
    <p style={{ padding: "2rem", textAlign: "center" }}>
      Redirecting to <a href="/categories/">Categories &amp; Tags</a>…
    </p>
  )
}

export default TagsRedirect
