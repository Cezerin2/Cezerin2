import React from "react"
import Item from "./item"
import LoadMore from "./loadMore"

const ProductList = (props: any) => {
  const {
    products,
    addCartItem,
    settings,
    loadMoreProducts,
    hasMore,
    loadingProducts,
    loadingMoreProducts,
    isCentered,
    className = "columns is-multiline is-mobile products",
    columnCountOnMobile,
    columnCountOnTablet,
    columnCountOnDesktop,
    columnCountOnWidescreen,
    columnCountOnFullhd,
  } = props

  const items = products
    ? products.map(product => (
        <Item
          key={product.id}
          product={product}
          addCartItem={addCartItem}
          settings={settings}
          columnCountOnMobile={columnCountOnMobile}
          columnCountOnTablet={columnCountOnTablet}
          columnCountOnDesktop={columnCountOnDesktop}
          columnCountOnWidescreen={columnCountOnWidescreen}
          columnCountOnFullhd={columnCountOnFullhd}
        />
      ))
    : null

  return (
    <>
      <div
        className={
          className +
          (loadingProducts ? " loading" : "") +
          (isCentered ? " is-centered" : "")
        }
      >
        {items}
      </div>
      <div className="load-more">
        <LoadMore
          loadMoreProducts={loadMoreProducts}
          hasMore={hasMore}
          loading={loadingMoreProducts}
        />
      </div>
    </>
  )
}

export default ProductList
