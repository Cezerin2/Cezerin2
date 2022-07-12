import React, { FC, useState } from "react"
import { themeSettings } from "../../lib/settings"
import ViewedProducts from "../products/viewed"
import AddToCartButton from "./addToCartButton"
import Attributes from "./attributes"
import Breadcrumbs from "./breadcrumbs"
import DiscountCountdown from "./discountCountdown"
import Gallery from "./gallery"
import Options from "./options"
import Price from "./price"
import Quantity from "./quantity"
import RelatedProducts from "./relatedProducts"
import Tags from "./tags"

const Description = ({ description }) => (
  <div
    className="product-content"
    dangerouslySetInnerHTML={{ __html: description }}
  />
)

interface Props {
  product
  settings
  categories
  addCartItem
}

const ProductDetails: FC<Props> = props => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [isAllOptionsSelected, setIsAllOptionsSelected] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { product, settings, categories, addCartItem } = props

  const onOptionChange = (optionId, valueId) => {
    if (valueId === "") {
      delete selectedOptions[optionId]
    } else {
      selectedOptions[optionId] = valueId
    }

    setSelectedOptions(selectedOptions)
    findVariantBySelectedOptions()
    checkSelectedOptions()
  }

  const findVariantBySelectedOptions = () => {
    for (const variant of product.variants) {
      const variantMutchSelectedOptions = variant.options.every(
        variantOption =>
          selectedOptions[variantOption.option_id] === variantOption.value_id
      )
      if (variantMutchSelectedOptions) {
        setSelectedVariant(variant)
        return
      }
    }

    setSelectedVariant(null)
  }

  const addToCart = () => {
    let item = {
      product_id: product.id,
      quantity: quantity,
    }

    if (selectedVariant) {
      item.variant_id = selectedVariant.id
    }

    addCartItem(item)
  }

  const checkSelectedOptions = () => {
    const allOptionsSelected =
      Object.keys(selectedOptions).length === product.options.length
    setIsAllOptionsSelected(allOptionsSelected)
  }

  const maxQuantity =
    product.stock_status === "discontinued"
      ? 0
      : product.stock_backorder
      ? themeSettings.maxCartItemQty
      : selectedVariant
      ? selectedVariant.stock_quantity
      : product.stock_quantity

  if (!product) return null

  return (
    <>
      <section className="section section-product">
        <div className="container">
          <div className="columns">
            <div className="column is-7">
              {themeSettings.show_product_breadcrumbs && (
                <Breadcrumbs product={product} categories={categories} />
              )}
              <Gallery images={product.images} />
            </div>
            <div className="column is-5">
              <div className="content">
                <Tags tags={product.tags} />
                <h1 className="title is-4 product-name">{product.name}</h1>
                <Price
                  product={product}
                  variant={selectedVariant}
                  isAllOptionsSelected={isAllOptionsSelected}
                  settings={settings}
                />

                {themeSettings.show_discount_countdown &&
                  product.on_sale === true && (
                    <DiscountCountdown product={product} />
                  )}

                <Options options={product.options} onChange={onOptionChange} />
                <Quantity maxQuantity={maxQuantity} onChange={setQuantity} />
                <div className="button-addtocart">
                  <AddToCartButton
                    product={product}
                    variant={selectedVariant}
                    addCartItem={addToCart}
                    isAllOptionsSelected={isAllOptionsSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-product-description">
        <div className="container">
          <div className="content">
            <div className="columns">
              <div className="column is-7">
                <Description description={product.description} />
              </div>
              <div className="column is-5">
                <Attributes attributes={product.attributes} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts
        settings={settings}
        addCartItem={addToCart}
        ids={product.related_product_ids}
        limit={10}
      />

      {themeSettings.show_viewed_products && (
        <ViewedProducts
          settings={settings}
          addCartItem={addToCart}
          product={product}
          limit={themeSettings.limit_viewed_products || 4}
        />
      )}
    </>
  )
}

export default ProductDetails
