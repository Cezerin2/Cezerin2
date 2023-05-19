import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { themeSettings, text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import ProductList from "../components/productList"
import ProductFilter from "../components/productFilter"
import Sort from "../components/sort"
import CategoryBreadcrumbs from "../components/categoryBreadcrumbs"
import * as helper from "../lib/helper"
import BannerAside from "../components/bannerAside"

const getFilterAttributesSummary = productFilter => {
  let attributesSummary = ""
  if (productFilter.attributes) {
    Object.keys(productFilter.attributes).forEach(attributeKey => {
      const attributeName = attributeKey.replace("attributes.", "")
      const attributeValue = productFilter.attributes[attributeKey]
      const attributeValueFormatted = Array.isArray(attributeValue)
        ? attributeValue.join(", ")
        : attributeValue
      attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`
    })
  }
  return attributesSummary
}

const getFilterPriceSummary = (productFilter, settings) => {
  let priceSummary = ""
  if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
    const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings)
    const priceTo = helper.formatCurrency(productFilter.priceTo, settings)
    priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`
  }
  return priceSummary
}

const CategoryHero = ({ categoryDetails, categories }) => (
  <section className="main__header category-header section-container">
    {themeSettings.show_category_breadcrumbs && (
      <CategoryBreadcrumbs
        currentCategory={categoryDetails}
        categories={categories}
      />
    )}
    <h1 className="main__title category-header__title">
      {categoryDetails.name}
    </h1>
  </section>
)

CategoryHero.propTypes = {
  categoryDetails: PropTypes.shape({}).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

const CategoryContainer = props => {
  const {
    setSort,
    addCartItem,
    loadMoreProducts,
    getJSONLD,
    state,
    state: {
      products,
      categoryDetails,
      settings,
      productFilter,
      productsHasMore,
      categories,
      loadingProducts,
      loadingMoreProducts,
    },
  } = props

  const filterAttributesSummary = getFilterAttributesSummary(productFilter)
  const filterPriceSummary = getFilterPriceSummary(productFilter, settings)

  const pageTitle =
    categoryDetails.meta_title && categoryDetails.meta_title.length > 0
      ? categoryDetails.meta_title
      : categoryDetails.name
  const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`

  const jsonld = getJSONLD(state)

  const showFilter = themeSettings.show_product_filter

  return (
    <Fragment>
      <MetaTags
        title={title}
        description={categoryDetails.meta_description}
        canonicalUrl={categoryDetails.url}
        imageUrl={categoryDetails.image}
        ogType="product.group"
        ogTitle={categoryDetails.name}
        ogDescription={categoryDetails.meta_description}
        jsonld={jsonld}
      />

      <CategoryHero categoryDetails={categoryDetails} categories={categories} />

      <section className="category section-container">
        <div className="category__aside">
          {showFilter === true && <ProductFilter {...props} />}
          <BannerAside />
        </div>
        <div className="category__products">
          <ProductList
            products={products}
            addCartItem={addCartItem}
            settings={settings}
            loadMoreProducts={loadMoreProducts}
            hasMore={productsHasMore}
            loadingProducts={loadingProducts}
            loadingMoreProducts={loadingMoreProducts}
          />
        </div>
      </section>
    </Fragment>
  )
}

CategoryContainer.propTypes = {
  setSort: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  loadMoreProducts: PropTypes.func.isRequired,
  getJSONLD: PropTypes.func.isRequired,
  state: PropTypes.shape({
    settings: PropTypes.shape({}),
    products: PropTypes.arrayOf(PropTypes.shape({})),
    productFilter: PropTypes.shape({}),
    productsHasMore: PropTypes.bool,
    categoryDetails: PropTypes.shape({}),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    loadingProducts: PropTypes.bool,
    loadingMoreProducts: PropTypes.bool,
  }).isRequired,
}

export default CategoryContainer
