import { graphql, Link } from "gatsby"
import parse from "html-react-parser"
import React from "react"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import BackgroundImage from "gatsby-background-image"
import { AiFillHome } from "react-icons/ai"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post?.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post?.featuredImage?.node?.alt || ``,
  }

  console.log(post)

  return (
    <Layout>
      {!post ? (
        <h3>No content</h3>
      ) : (
        <section className="blog-post-section ">
          <Seo title={post.title} description={post.excerpt} />
          <Link to="/" className="back-home-button">
            <AiFillHome />
            Back
          </Link>

          <article
            className="blog-post boxed"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="blog-post-header">
              {/* if we have a featured image for this post let's display it */}
              {featuredImage?.data && (
                <BackgroundImage
                  fluid={featuredImage.data}
                  alt={featuredImage.alt}
                  style={{
                    backgroundSize: "cover",
                  }}
                  className="blog-post-featured-image"
                >
                  <div className="blog-post-header-inner">
                    <div className="blog-post-header-info glass">
                      <h1 itemProp="headline">{parse(post.title)}</h1>
                      <p itemProp="description">{parse(post.excerpt)}</p>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </BackgroundImage>
              )}
            </header>

            {!!post.content && (
              <section itemProp="articleBody" className="blog-post-content">
                {parse(post.content)}
              </section>
            )}

            <hr />
          </article>

          <nav className="blog-post-nav">
            {/* <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li> */}
          </nav>
        </section>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
