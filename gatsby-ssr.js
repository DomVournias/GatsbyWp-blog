import React from "react"
import { StateContext } from "./context/StateContext"

export const wrapRootElement = ({ element }) => {
  return <StateContext>{element}</StateContext>
}

// const React = require("react")
// const StateContext = require("./context/StateContext")

// exports.wrapRootElement = ({ element }) => {
//   return <StateContext>{element}</StateContext>
// }
