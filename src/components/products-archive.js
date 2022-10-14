import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import React from "react"
import ProductCard from "./product-card"

const Products_Archive = () => {
  const data = useStaticQuery(graphql`
    query ProductArchive {
      allWpProduct {
        nodes {
          ... on WpSimpleProduct {
            id
            name
            uri
            price
            shortDescription
            date
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const products = data?.allWpProduct?.nodes

  // console.log(products)

  return (
    <section className="product-cards-section">
      <ol className="product-cards">
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={parse(product.shortDescription)}
            price={parse(product.price)}
            alt={product.name}
            thumb={
              product.featuredImage.node.localFile.childImageSharp
                .gatsbyImageData
            }
            url={product.uri}
            className="product-thumbnail"
          />
        ))}
      </ol>
    </section>
  )
}

export default Products_Archive
