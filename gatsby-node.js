// const path = require("path")
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/product\/([^\/]+$)/)) {
    page.context.layout = "product"
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query WpProducts {
      allWpProduct {
        edges {
          node {
            ... on WpSimpleProduct {
              id
              uri
            }
          }
        }
      }
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          node {
            id
            uri
          }
        }
      }
    }
  `)

  const productsTemplate = require.resolve(`./src/templates/product`)
  const postsTemplate = require.resolve(`./src/templates/blog-post`)

  if (result.errors) {
    return
  }

  result.data.allWpProduct.edges.forEach(product => {
    let id = product.node.id
    let uri = product.node.uri

    createPage({
      path: `${uri}`,
      component: productsTemplate,
      context: {
        id,
        uri,
        layout: "product",
      },
    })
  })

  result.data.allWpPost.edges.forEach(post => {
    let id = post.node.id
    let uri = post.node.uri

    createPage({
      path: `${uri}`,
      component: postsTemplate,
      context: {
        id,
        uri,
        // layout: "product",
      },
    })
  })
}
