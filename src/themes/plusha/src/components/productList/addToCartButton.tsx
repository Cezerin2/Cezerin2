import React from "react"
import { NavLink } from "react-router-dom"
import * as helper from "../../lib/helper"
import { themeSettings, text } from "../../lib/settings"

const AddToCartButton = ({
  product,
  variant,
  addCartItem,
  isAllOptionsSelected,
}) => {
  const buttonStyle = {}
  if (
    themeSettings.button_addtocart_bg &&
    themeSettings.button_addtocart_bg.length > 0
  ) {
    buttonStyle.backgroundColor = themeSettings.button_addtocart_bg
  }
  if (
    themeSettings.button_addtocart_color &&
    themeSettings.button_addtocart_color.length > 0
  ) {
    buttonStyle.color = themeSettings.button_addtocart_color
  }

  let seeMoreText = "Details"

  const addToCartText =
    themeSettings.button_addtocart_text &&
    themeSettings.button_addtocart_text.length > 0
      ? themeSettings.button_addtocart_text
      : text.addToCart

  if (product.stock_status === "discontinued") {
    return (
      <button
        type="button"
        className="button is-dark is-fullwidth"
        style={buttonStyle}
        disabled
      >
        {" "}
        {text.discontinued}{" "}
      </button>
    )
  }
  if (product.variants) {
    return (
      <NavLink
        to={product.path}
        className="button is-success is-fullwidth"
        style={buttonStyle}
      >
        {seeMoreText}
      </NavLink>
    )
  }
  if (product.variable && !isAllOptionsSelected) {
    return (
      <button
        type="button"
        className="button is-success is-fullwidth"
        style={buttonStyle}
        disabled
      >
        {" "}
        {text.optionsRequired}{" "}
      </button>
    )
  }
  if (product.variable && !product.stock_backorder) {
    return (
      <button
        type="button"
        className="button is-success is-fullwidth"
        style={buttonStyle}
        disabled
      >
        {" "}
        {text.outOfStock}{" "}
      </button>
    )
  }
  if (product.stock_status === "available") {
    return (
      <button
        type="button"
        className="button is-success is-fullwidth"
        style={buttonStyle}
        onClick={addCartItem}
      >
        {" "}
        {addToCartText}{" "}
      </button>
    )
  }
  if (product.stock_status === "out_of_stock") {
    return (
      <button
        type="button"
        className="button is-success is-fullwidth"
        style={buttonStyle}
        disabled
      >
        {" "}
        {text.outOfStock}{" "}
      </button>
    )
  }
  return null
}

export default AddToCartButton
