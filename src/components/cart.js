import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FiShoppingBag } from "react-icons/fi"
import { HiOutlineChevronLeft } from "react-icons/hi"
import { useStateContext } from "../../context/StateContext"

const Cart = () => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    totalPrice,
    cartItems,
    toggleCartItemQuantity,
  } = useStateContext()

  console.log(totalQuantities)
  console.log(cartItems)

  if (showCart === true)
    return (
      <div className="cart">
        <div className="cart-container">
          <button
            className="cart-heading"
            onClick={() => setShowCart(!showCart)}
          >
            <HiOutlineChevronLeft />
            <h3>Your Cart</h3>
            <span>( {totalQuantities} items )</span>
          </button>

          {cartItems.length < 1 && (
            <div className="cart-empty">
              <FiShoppingBag />
              <h3>Your shopping bag is empty</h3>
              <Link to="/" className="shopping-button">
                Continue Shopping
              </Link>
            </div>
          )}
          {cartItems.length >= 1 && (
            <div className="cart-content">
              <ol className="cart-items">
                {cartItems.map((item, i) => (
                  <li className="cart-item" key={i}>
                    <div className="cart-item-image">
                      <GatsbyImage
                        image={
                          item.image.localFile.childImageSharp.gatsbyImageData
                        }
                        alt={item.name}
                        style={{
                          height: "80px",
                          width: "80px",
                          margin: "15px",
                        }}
                        imgStyle={{ objectFit: "contain" }}
                        placeholder="blurred"
                        formats={"webp"}
                      />
                    </div>
                    <div className="cart-item-info">
                      <div>
                        <h3 className="item-name line-clamp">{item.name}</h3>
                      </div>

                      <div className="cart-item-quantity">
                        <span
                          id="minus"
                          onClick={() => toggleCartItemQuantity(item.id, "dec")}
                        >
                          -
                        </span>
                        <span id="count">{item.quantity}</span>
                        <span
                          id="plus"
                          onClick={() => toggleCartItemQuantity(item.id, "inc")}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="cart-item-price">
                      <div id="item-delete">
                        <AiOutlineCloseCircle />
                      </div>
                      <div>
                        <span id="item-price">${item.price}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="cart-totals">
                <div>
                  <h4>Subtotal:</h4>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="checkout-button">
                  <button>Pay with Stripe</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  return null
}

export default Cart
