import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../../lib/settings"

import Sort from "../sort"
import PriceSlider from "./priceSlider"
import AttributeFilter from "./attributeFilter"

export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarIsActive: false,
    }
  }

  sidebarToggle = () => {
    this.setState({
      sidebarIsActive: !this.state.sidebarIsActive,
    })
    document.body.classList.toggle("noscroll")
  }

  sidebarClose = () => {
    this.setState({ sidebarIsActive: false })
    document.body.classList.remove("noscroll")
  }

  render() {
    const { sidebarIsActive } = this.state
    const {
      categoryDetails,
      categories,
      settings,
      productFilter,
      productsMinPrice,
      productsMaxPrice,
      productsAttributes,
    } = this.props.state

    return (
      <Fragment>
        <div className="category__sort sort">
          <Sort
            defaultSort={settings.default_product_sorting}
            currentSort={productFilter.sort}
            setSort={this.props.setSort}
          />
          <button
            type="button"
            className="filter__button button button_filter is-hidden-tablet"
            onClick={this.sidebarToggle}
          >
            {text.filterProducts}
          </button>
        </div>

        <div className="category__filter ">
          <div className={sidebarIsActive ? "filter filter-open" : "filter"}>
            <button
              type="button"
              className="modal-close is-hidden-tablet"
              onClick={this.sidebarClose}
            >
              <svg className="icon" width="28">
                <use xlinkHref="#close" />
              </svg>
            </button>
            <h2 className="filter__title is-hidden-tablet">Filter</h2>
            <AttributeFilter
              attributes={productsAttributes}
              setFilterAttribute={this.props.setFilterAttribute}
              unsetFilterAttribute={this.props.unsetFilterAttribute}
            />

            <PriceSlider
              minPrice={productsMinPrice}
              maxPrice={productsMaxPrice}
              minValue={productFilter.priceFrom}
              maxValue={productFilter.priceTo}
              setPriceFromAndTo={this.props.setPriceFromAndTo}
              settings={settings}
            />

            <button
              type="button"
              className="filter__submit button is-hidden-tablet"
              onClick={this.sidebarClose}
            >
              Apply
            </button>
          </div>
        </div>
      </Fragment>
    )
  }
}
