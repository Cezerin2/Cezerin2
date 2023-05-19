import React from "react"
import { themeSettings, text } from "../../lib/settings"

const Attribute = ({ name, value }) => (
  <div className="product-attribute">
    <div className="product-attribute__name">{name}:</div>
    <div className="product-attribute__value">{value}</div>
  </div>
)

const Attributes = ({ attributes }) => {
  if (attributes && attributes.length > 0) {
    const items = attributes.map((attribute, index) => (
      <Attribute key={index} name={attribute.name} value={attribute.value} />
    ))

    return (
      <div className="product__attributes">
        <div className="product__title">{text.attributes}</div>
        {items}
      </div>
    )
  }
  return null
}
export default Attributes
