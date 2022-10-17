import React from "react"
import Layout from "../components/layout"
import PostsArchive from "../components/posts-archive"
import ProductsArchive from "../components/products-archive"

export default function Home() {
  return (
    <Layout isHomePage>
      <header className="blog-header">
        <h1>
          Headless blog <br /> with Gatsby and Wordpress
        </h1>
        <hr />
      </header>
      <ProductsArchive />
      <PostsArchive />
    </Layout>
  )
}
