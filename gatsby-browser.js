// custom typefaces
import "typeface-merriweather"
import "typeface-montserrat"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
import "./src/css/style.css"

import React from "react"
import { StateContext } from "./context/StateContext"

export const wrapRootElement = ({ element }) => {
  return <StateContext>{element}</StateContext>
}
