/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

const styles = {
  pagination: {
    a: {
      color: "muted",
      "&.is-active": {
        color: "text",
      },
      "&:hover": {
        color: "text",
      },
    },
  },
}

// basePath is the first-page URL (e.g. "/tags/docker/"); page 2+ append "<n>/".
const pageUrl = (basePath, n) => (n === 1 ? basePath : `${basePath}${n}/`)

const Pagination = ({ basePath, currentPage, numPages }) => {
  if (!numPages || numPages <= 1) return null
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  return (
    <div className="pagination" sx={styles.pagination}>
      <ul>
        {!isFirst && (
          <li>
            <Link to={pageUrl(basePath, currentPage - 1)} rel="prev">
              <span className="icon -left">
                <RiArrowLeftLine />
              </span>{" "}
              Previous
            </Link>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`}>
            <Link
              to={pageUrl(basePath, i + 1)}
              className={currentPage === i + 1 ? "is-active num" : "num"}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        {!isLast && (
          <li>
            <Link to={pageUrl(basePath, currentPage + 1)} rel="next">
              Next{" "}
              <span className="icon -right">
                <RiArrowRightLine />
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
