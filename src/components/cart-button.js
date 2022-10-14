import React from "react"
import { FiShoppingBag } from "react-icons/fi"
import { useStateContext } from "../../context/StateContext"

const CartButton = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <button
      className="container-cart-button"
      onClick={() => setShowCart(!showCart)}
    >
      <div className="inner-cart-button">
        <FiShoppingBag />
        <span>{totalQuantities}</span>
      </div>
    </button>
  )
}

export default CartButton
