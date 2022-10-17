import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const ProductCard = props => {
  return (
    <li className="product-card bordered">
      <div className="product-card-top">
        <Link to={props.url}>
          <GatsbyImage
            image={props.thumb}
            alt={props.alt}
            style={{ width: "86%" }}
            className="product-thumbnail"
          />
        </Link>
      </div>
      <div className="product-card-bottom">
        <div id="info-row">
          <Link to={props.url} className="linkDashed">
            <h2 className="line-clamp linkDashed" id="name">
              {props.name}
            </h2>
          </Link>
          <p className="line-clamp" id="description">
            {props.description}
          </p>
        </div>
        <div id="price-row">
          {" "}
          <Link to={props.url} id="price">
            <span>from</span>
            <font>${props.price}</font>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default ProductCard
