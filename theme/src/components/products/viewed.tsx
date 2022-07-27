import React, { FC, useEffect, useState } from "react"
import { text } from "../../lib/settings"
import CustomProductList from "./custom"

interface Props {
  limit
  settings
  addCartItem
  product
}

const ViewedProducts: FC<Props> = props => {
  const [viewedProducts, setViewedProducts] = useState([])

  const { limit, settings, addCartItem, product } = props

  useEffect(() => {
    setViewedProducts(getArrayFromLocalStorage())

    if (product && product.id) {
      addProductIdToLocalStorage(product.id)
    }

    if (viewedProducts && product && product.id) {
      setViewedProducts(viewedProducts.filter(id => id !== product.id))
    }
  }, [])

  useEffect(() => {
    addProductIdToLocalStorage(product.id)
  }, [product])

  const getArrayFromLocalStorage = () => {
    let values = []
    const viewedProductsList = localStorage.getItem("viewedProducts")

    try {
      if (viewedProductsList && viewedProductsList.length > 0) {
        const viewedProductsParsed = JSON.parse(viewedProductsList)
        if (Array.isArray(viewedProductsParsed)) {
          values = viewedProductsParsed
        }
      }
    } catch (e) {
      //
    }

    return values
  }

  const addProductIdToLocalStorage = productId => {
    if (productId && productId.length > 0) {
      const viewedProductsList = getArrayFromLocalStorage()

      if (viewedProductsList.includes(productId)) {
        const index = viewedProductsList.indexOf(productId)
        viewedProductsList.splice(index, 1)
        viewedProductsList.push(productId)
      } else {
        viewedProductsList.push(productId)
      }

      localStorage.setItem("viewedProducts", JSON.stringify(viewedProductsList))
      setViewedProducts(viewedProductsList)
    }
  }

  if (viewedProducts && viewedProducts.length > 0) {
    const ids = viewedProducts.reverse().slice(0, limit)
    return (
      <section className="section section-product-related">
        <div className="container">
          <div className="title is-4 has-text-centered">
            {text.recentlyViewed}
          </div>
          <CustomProductList
            ids={ids}
            settings={settings}
            addCartItem={addCartItem}
            limit={limit}
            isCentered
          />
        </div>
      </section>
    )
  }
  return null
}

export default ViewedProducts
