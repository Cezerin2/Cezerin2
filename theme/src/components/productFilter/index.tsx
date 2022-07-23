import React, { FC, useState } from "react"
import { text } from "../../lib/settings"
import Sort from "../sort"
import AttributeFilter from "./attributeFilter"
import PriceSlider from "./priceSlider"

interface Props {
  state
  setSort
  setFilterAttribute
  unsetFilterAttribute
  setPriceFromAndTo
}

const ProductFilter: FC<Props> = props => {
  const [sidebarIsActive, setSidebarIsActive] = useState(false)

  const {
    state,
    setSort,
    setFilterAttribute,
    unsetFilterAttribute,
    setPriceFromAndTo,
  } = props

  const sidebarToggle = () => {
    setSidebarIsActive(value => !value)
    document.body.classList.toggle("sidebar-active")
  }

  const sidebarClose = () => {
    setSidebarIsActive(false)
    document.body.classList.remove("sidebar-active")
  }

  const {
    categoryDetails,
    categories,
    settings,
    productFilter,
    productsMinPrice,
    productsMaxPrice,
    productsAttributes,
  } = state

  return (
    <div>
      <div className="is-hidden-tablet">
        <button className="button is-fullwidth" onClick={sidebarToggle}>
          {text.filterProducts}
        </button>
      </div>

      <div
        className={sidebarIsActive ? "modal is-active" : "is-hidden-mobile"}
        style={{ zIndex: 101 }}
      >
        <div
          className={sidebarIsActive ? "dark-overflow" : ""}
          onClick={sidebarClose}
        />
        <div className={sidebarIsActive ? "modal-content" : ""}>
          <div className={sidebarIsActive ? "box sidebar" : ""}>
            <div className="is-hidden-tablet" style={{ marginBottom: 30 }}>
              <Sort
                defaultSort={settings.default_product_sorting}
                currentSort={productFilter.sort}
                setSort={setSort}
              />
            </div>

            <AttributeFilter
              attributes={productsAttributes}
              setFilterAttribute={setFilterAttribute}
              unsetFilterAttribute={unsetFilterAttribute}
            />

            <PriceSlider
              minPrice={productsMinPrice}
              maxPrice={productsMaxPrice}
              minValue={productFilter.priceFrom}
              maxValue={productFilter.priceTo}
              setPriceFromAndTo={setPriceFromAndTo}
              settings={settings}
            />

            <button
              className="button is-fullwidth is-dark is-hidden-tablet"
              onClick={sidebarClose}
            >
              {text.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
