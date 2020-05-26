import { getParentIds } from "./helper"
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED } from "../pageTypes"

const getBreadcrumbsForProduct = (product, categories) => {
  if (product && product.category_id) {
    const ids = [product.category_id]
    const parentIds = getParentIds(categories, product.category_id)
    ids.push(...parentIds)

    let index = 0
    const breadcrumbs = ids.reverse().map(categoryId => {
      const category = categories.find(item => item.id === categoryId)
      if (category) {
        index++
        return getBreadcrumbItem(category.url, category.name, index)
      }
    })

    return {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs
    }
  }
  return null
}

const getBreadcrumbsForCategory = (currentCategoryId, categories) => {
  if (currentCategoryId) {
    const ids = getParentIds(categories, currentCategoryId)

    let index = 0
    const breadcrumbs = ids.reverse().map(categoryId => {
      const category = categories.find(item => item.id === categoryId)
      if (category) {
        index++
        return getBreadcrumbItem(category.url, category.name, index)
      }
    })

    return {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs
    }
  }
  return null
}

const getBreadcrumbItem = (url, name, position) => ({
  "@type": "ListItem",
  position,
  item: {
    "@id": url,
    name
  }
})

const getProduct = (product, settings) => {
  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0].url : null

  return {
    "@context": "http://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.meta_description,
    image: imageUrl,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: settings.currency_code,
      price: product.price,
      availability:
        product.stock_status === "available"
          ? "http://schema.org/InStock"
          : "http://schema.org/OutOfStock"
    }
  }
}

const getProductJSONLD = (product, categories, settings) => {
  const jsonldArray = []
  const breadcrumbs = getBreadcrumbsForProduct(product, categories)
  if (breadcrumbs) {
    jsonldArray.push(breadcrumbs)
  }
  jsonldArray.push(getProduct(product, settings))

  return jsonldArray.length > 0 ? JSON.stringify(jsonldArray) : ""
}

const getCategoryJSONLD = (categoryId, categories) => {
  const jsonldArray = []
  const breadcrumbs = getBreadcrumbsForCategory(categoryId, categories)
  if (breadcrumbs) {
    jsonldArray.push(breadcrumbs)
  }
  return jsonldArray.length > 0 ? JSON.stringify(jsonldArray) : ""
}

export const getJSONLD = state => {
  if (typeof window === "undefined") {
    switch (state.currentPage.type) {
      case PRODUCT:
        return getProductJSONLD(
          state.productDetails,
          state.categories,
          state.settings
        )
        break
      case PRODUCT_CATEGORY:
        return getCategoryJSONLD(state.categoryDetails.id, state.categories)
        break
      default:
        return ""
    }
  } else {
    return ""
  }
}
