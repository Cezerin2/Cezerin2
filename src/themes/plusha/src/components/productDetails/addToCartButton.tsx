import React from "react"
import * as helper from "../../lib/helper"
import { themeSettings, text } from "../../lib/settings"

const AddToCartButton = ({
  product,
  variant,
  addCartItem,
  isAllOptionsSelected,
}) => {
  let buttonStyle = {}
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

  let addToCartText = "Add To Cart"

  if (product.stock_status === "discontinued") {
    return (
      <button
        type="button"
        className="button is-dark"
        style={buttonStyle}
        disabled
      >
        {text.discontinued}
      </button>
    )
  }
  if (product.variable && variant && variant.stock_quantity > 0) {
    return (
      <button
        type="button"
        className="button"
        style={buttonStyle}
        onClick={addCartItem}
      >
        {addToCartText}
      </button>
    )
  }
  if (product.variable && !isAllOptionsSelected) {
    return (
      <button type="button" className="button" style={buttonStyle} disabled>
        {text.optionsRequired}
      </button>
    )
  }
  if (product.variable && !product.stock_backorder) {
    return (
      <button type="button" className="button" style={buttonStyle} disabled>
        {text.outOfStock}
      </button>
    )
  }
  if (product.stock_status === "available") {
    return (
      <button
        type="button"
        className="button"
        style={buttonStyle}
        onClick={addCartItem}
      >
        {addToCartText}
      </button>
    )
  }
  if (product.stock_status === "out_of_stock") {
    return (
      <button type="button" className="button" style={buttonStyle} disabled>
        {text.outOfStock}
      </button>
    )
  }
  return null
}

export default AddToCartButton
