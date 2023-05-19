import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import ItemPrice from "../productList/itemPrice"
import AddToCartButton from "../productList/addToCartButton"
import Tags from "../productList/tags"

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
    <Fragment>
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
          <NavLink to={product.path} className="products__name">
            {product.name}
          </NavLink>
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
    </Fragment>
  )
}

export default Item
