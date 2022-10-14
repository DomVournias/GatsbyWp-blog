import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import { useStateContext } from "../../context/StateContext"
import Layout from "../components/layout"

const ProductTemplate = ({ data: { item } }) => {
  const [slideImage, setSlideImage] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { onAdd, qty, setShowCart } = useStateContext()
  const [product, setProduct] = useState(item)

  useEffect(() => {
    // Replacing the default price from comma to dot
    let removeComa = product.price.replace(",", ".")
    // Parsing the number from String to Number
    let parsedPrice = parseFloat(removeComa)
    // Updating the queried project with the Parsed Price
    setProduct({
      ...product,
      price: parsedPrice,
    })
  }, [item])

  const galleryImages = product.galleryImages.nodes

  const selectImage = i => {
    setSlideImage(i)
    setSelectedIndex(i)
  }

  // const handleAddToCart = () => {
  //   onAdd(product, qty)
  //   setShowCart(true)
  // }
  return (
    <Layout>
      <div className="layout-pt">
        <Link to="/">Back to home</Link>
        <div className="wrapper-pt">
          <section className="left-side-pt">
            <div className="featured-image-pt">
              <GatsbyImage
                image={
                  galleryImages[slideImage].localFile.childrenImageSharp[0]
                    .gatsbyImageData
                }
                key={slideImage}
                alt={`slide-image-${slideImage}`}
                style={{ height: "100%", width: "100%" }}
                imgStyle={{ objectFit: "contain" }}
                placeholder="blurred"
                formats={"webp"}
              />
            </div>
            <ol className="gallery-images-pt">
              {galleryImages.map((item, i) => {
                let image =
                  item.localFile?.childrenImageSharp[0].gatsbyImageData
                return (
                  <li
                    key={i}
                    onClick={() => selectImage(i)}
                    slide={i}
                    className={
                      i === selectedIndex
                        ? "gallery-image-pt-selected"
                        : "gallery-image-pt-not-selected"
                    }
                  >
                    <GatsbyImage
                      image={image}
                      key={i}
                      alt={`slide-image-${i}`}
                      layout={"fullWidth"}
                      placeholder={"blurred"}
                      formats={["auto", "webp"]}
                    />
                  </li>
                )
              })}
            </ol>
          </section>
          <section className="right-side-pt">
            <h2 className="product-name-pt">{product.name}</h2>
            <p className="product-description-pt">
              {parse(product.description)}
            </p>
            <span className="product-price-pt">${product.price}</span>
            <div className="quantity-pt">
              <button
                className="button white-button"
                onClick={() => onAdd(product, qty)}
              >
                Add to cart
              </button>
              <button className="button dark-button">Buy now</button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductById($id: String!) {
    item: wpProduct(id: { eq: $id }) {
      ... on WpSimpleProduct {
        id
        name
        description
        price
        uri
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        galleryImages {
          nodes {
            localFile {
              childrenImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
