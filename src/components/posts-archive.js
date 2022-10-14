import { graphql, useStaticQuery } from "gatsby"
import moment from "moment/moment"
import React from "react"

import PostCard from "./post-card"

const Posts_Archive = () => {
  const data = useStaticQuery(graphql`
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
  `)
  const posts = data?.allWpPost?.nodes

  if (!posts.length) {
    return (
      <div>
        {/* <Seo title="All posts" /> */}

        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </div>
    )
  }

  // console.log(data)

  return (
    <section className="post-cards-section">
      <ol className="post-cards">
        {posts.map(post => (
          <PostCard
            key={post.id}
            url={post.uri}
            date={moment(posts.date).format("MMMM DD, YYYY")}
            comments={post.comments}
            title={post.title}
            author={post.author.node.name}
            image={post.featuredImage.node.localFile.childImageSharp.fluid}
            imgAlt={post.featured}
          />
        ))}
      </ol>
    </section>
  )
}

export default Posts_Archive
