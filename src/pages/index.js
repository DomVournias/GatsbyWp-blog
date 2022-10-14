import React from "react"
import { StateContext } from "../../context/StateContext"
import Cart from "../components/cart"
import CartButton from "../components/cart-button"
import Layout from "../components/layout"
import Posts_Archive from "../components/posts-archive"
import Products_Archive from "../components/products-archive"

export default function Home() {
  return (
    <Layout isHomePage>
      <header className="blog-header">
        <h1>
          Headless blog <br /> with Gatsby and Wordpress
        </h1>
        <hr />
      </header>
      <Products_Archive />
      <Posts_Archive />
    </Layout>
  )
}
