import AjaxClient from "../../ajaxClient"
import ApiClient from "../../apiClient"
import ProductImages from "./images"
import ProductOptions from "./options"
import ProductVariants from "./variants"

const Products {
  client: ApiClient | AjaxClient
  resourceUrl: string
  options: ProductOptions
  variants: ProductVariants
  images: ProductImages

  constructor(client: ApiClient | AjaxClient) {
    client = client
    resourceUrl = "/products"

    options = new ProductOptions(client)
    variants = new ProductVariants(client)
    images = new ProductImages(client)
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id, filter?) {
    return client.get(`${resourceUrl}/${id}`, filter)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(id, data) {
    return client.put(`${resourceUrl}/${id}`, data)
  }

  delete(id) {
    return client.delete(`${resourceUrl}/${id}`)
  }

  skuExists(productId, sku) {
    return client.get(`${resourceUrl}/${productId}/sku`, { sku })
  }

  slugExists(productId, slug) {
    return client.get(`${resourceUrl}/${productId}/slug`, { slug })
  }
}

export default Products
