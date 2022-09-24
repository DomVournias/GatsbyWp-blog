import { graphql, useStaticQuery } from "gatsby"
import React from "react"

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
      <header className="global-header"></header>

      <main>{children}</main>

      <footer></footer>
    </div>
  )
}

export default Layout
