import React, { Fragment } from "react"
import { themeSettings, text } from "../../lib/settings"
import Item from "./item"
import LoadMore from "./loadMore"

const ProductList = ({
  products,
  addCartItem,
  settings,
  loadMoreProducts,
  hasMore,
  loadingProducts,
  loadingMoreProducts,
  className = "products products_list",
}) => {
  const items = products
    ? products.map(product => (
        <Item
          key={product.id}
          product={product}
          addCartItem={addCartItem}
          settings={settings}
        />
      ))
    : null

  return (
    <Fragment>
      <div className={className + (loadingProducts ? " loading" : "")}>
        {items}
      </div>
      <div className="load-more">
        <LoadMore
          loadMoreProducts={loadMoreProducts}
          hasMore={hasMore}
          loading={loadingMoreProducts}
        />
      </div>
    </Fragment>
  )
}

export default ProductList
