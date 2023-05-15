import AjaxClient from "../../ajaxClient"
import ApiClient from "../../apiClient"
import ProductImages from "./images"
import ProductOptions from "./options"
import ProductVariants from "./variants"

class Products {
  client: ApiClient | AjaxClient
  resourceUrl: string
  options: ProductOptions
  variants: ProductVariants
  images: ProductImages

  constructor(client: ApiClient | AjaxClient) {
    this.client = client
    this.resourceUrl = "/products"

    this.options = new ProductOptions(client)
    this.variants = new ProductVariants(client)
    this.images = new ProductImages(client)
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id, filter) {
    return this.client.get(`${this.resourceUrl}/${id}`, filter)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }

  skuExists(productId, sku) {
    return this.client.get(`${this.resourceUrl}/${productId}/sku`, { sku })
  }

  slugExists(productId, slug) {
    return this.client.get(`${this.resourceUrl}/${productId}/slug`, { slug })
  }
}

export default Products
