const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { tagPath, categoryPath } = require(`./src/util/taxonomy`)

// Declare category/tags on the frontmatter so GraphQL queries don't fail
// while posts are still being backfilled (Gatsby keeps inferring the rest).
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    type MarkdownRemarkFrontmatter {
      category: String
      tags: [String]
    }
  `)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges
  let blogPostsCount = 0

  posts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++
    }
  })

  // Create blog-list pages
  const postsPerPage = 9
  const numPages = Math.ceil(blogPostsCount / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create paginated tag pages (/tags/<slug>/)
  const tagTemplate = path.resolve(`./src/templates/tags.js`)
  result.data.tagsGroup.group.forEach(tag => {
    const tagNumPages = Math.ceil(tag.totalCount / postsPerPage)
    const base = tagPath(tag.fieldValue)
    Array.from({ length: tagNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? base : `${base}${i + 1}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: tagNumPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create paginated category pages (/category/<slug>/)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)
  result.data.categoriesGroup.group.forEach(category => {
    const catNumPages = Math.ceil(category.totalCount / postsPerPage)
    const base = categoryPath(category.fieldValue)
    Array.from({ length: catNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? base : `${base}${i + 1}/`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: catNumPages,
          currentPage: i + 1,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
