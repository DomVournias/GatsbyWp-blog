import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import React from "react"

const PostCard = props => {
  return (
    <li className="post-card boxed">
      <Link to={props.url}>
        <article
          itemScope
          itemType="http://schema.org/Article"
          className="post-card-container"
        >
          <div className="post-card-top">
            <div className="date-and-comments">
              <span className="post-card-date">{props.date}</span>
              <span className="post-card-comments">{props.comments}</span>
            </div>
            <h3 itemProp="headline" className="post-card-title line-clamp">
              {props.title}
            </h3>
            <span className="author">{props.author}</span>
          </div>
          <div className="post-card-bottom">
            <BackgroundImage
              fluid={props.image}
              alt={props.imgAlt}
              style={{ backgroundSize: "cover" }}
              className="post-card-image"
            />
          </div>
        </article>
      </Link>
    </li>
  )
}

export default PostCard
