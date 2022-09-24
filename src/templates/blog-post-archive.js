import { graphql, Link } from "gatsby"
import moment from "moment/moment"
import React from "react"

import Layout from "../components/layout"
import PostCard from "../components/PostCard"
import Seo from "../components/seo"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data?.allWpPost?.nodes

  console.log(data)

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />

        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />
      <header className="blog-header">
        <h1>
          Headless blog <br /> with Gatsby and Wordpress
        </h1>
        <hr />
      </header>
      <section className="post-cards-section">
        <ol className="post-cards" style={{ listStyle: `none` }}>
          {posts.map(post => {
            let image = post.featuredImage.node.localFile.childImageSharp.fluid
            return (
              <PostCard
                key={post.id}
                url={post.uri}
                date={moment(posts.date).format("MMMM DD, YYYY")}
                comments={post.comments}
                title={post.title}
                author={post.author.node.name}
                image={image}
                imgAlt={post.featured}
              />
              // <li >
              //   <article className="post-list-item">
              //     <header>
              //       <h2>
              //         <Link to={post.uri} itemProp="url">
              //           <span>{parse(title)}</span>
              //         </Link>
              //       </h2>

              //       <small>{date}</small>
              //     </header>
              //     <section itemProp="description">{parse(post.excerpt)}</section>
              //   </article>
              // </li>
            )
          })}
        </ol>

        {previousPagePath && (
          <>
            <Link to={previousPagePath}>Previous page</Link>
            <br />
          </>
        )}
        {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive {
    allWpPost {
      nodes {
        date
        slug
        uri
        title
        id
        excerpt
        author {
          node {
            name
          }
        }
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
    }
  }
`
// query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
//   allWpPost(
//     sort: { fields: [date], order: DESC }
//     limit: $postsPerPage
//     skip: $offset
//   ) {
//     nodes {
//       excerpt
//       uri
//       date(formatString: "MMMM DD, YYYY")
//       title
//       excerpt
//     }
//   }
// }
