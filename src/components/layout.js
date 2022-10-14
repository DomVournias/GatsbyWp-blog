import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Cart from "./cart"
import CartButton from "./cart-button"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <CartButton />
      <Cart />
      <main>{children}</main>
    </div>
  )
}

export default Layout
