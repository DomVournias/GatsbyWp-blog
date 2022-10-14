const React = require("react")
const StateContext = require("./context/StateContext")

exports.wrapRootElement = ({ element }) => {
  return <StateContext>{element}</StateContext>
}
