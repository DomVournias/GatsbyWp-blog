import React from "react"
import Cart from "./cart"
import CartButton from "./cart-button"

const Layout = ({ isHomePage, children }) => {
  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <CartButton />
      <Cart />
      <main>{children}</main>
    </div>
  )
}

export default Layout
