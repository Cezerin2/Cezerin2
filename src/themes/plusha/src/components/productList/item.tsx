import React from "react"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../../lib/settings"
import ItemPrice from "./itemPrice"
import AddToCartButton from "./addToCartButton"
// import Gallery from './gallery';
import Tags from "./tags"

const Item = ({
  product,
  addCartItem,
  settings,

  selectedVariant,
  isAllOptionsSelected = false,
  quantity = 1,
}) => {
  const addToCart = () => {
    const item = {
      product_id: product.id,
      quantity,
    }

    if (selectedVariant) {
      item.variant_id = selectedVariant.id
    }

    addCartItem(item)
  }

  const imageUrl =
    product && product.images && product.images.length > 0
      ? product.images[0].url
      : "/assets/images/noimage.svg"

  return (
    <div className="products__item">
      <NavLink to={product.path} className="products__link" />
      <div className="image-gallery-slides">
        <div
          className="image-gallery-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      <Tags tags={product.tags} />
      <div className="content products__content">
        <div className="products__name">
          <NavLink to={product.path}>{product.name}</NavLink>
        </div>
        <ItemPrice product={product} settings={settings} />

        <div className="products__button button-addtocart">
          <AddToCartButton
            product={product}
            variant={selectedVariant}
            addCartItem={addToCart}
            isAllOptionsSelected={isAllOptionsSelected}
          />
        </div>
      </div>
    </div>
  )
}

export default Item
