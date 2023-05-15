import AjaxClient from "../../ajaxClient"
import ApiClient from "../../apiClient"
import ProductOptionValues from "./optionValues"

class ProductOptions {
  client: ApiClient | AjaxClient
  values: ProductOptionValues

  constructor(client: ApiClient | AjaxClient) {
    this.client = client

    this.values = new ProductOptionValues(client)
  }

  list(productId) {
    return this.client.get(`/products/${productId}/options`)
  }

  retrieve(productId, optionId) {
    return this.client.get(`/products/${productId}/options/${optionId}`)
  }

  create(productId, data) {
    return this.client.post(`/products/${productId}/options`, data)
  }

  update(productId, optionId, data) {
    return this.client.put(`/products/${productId}/options/${optionId}`, data)
  }

  delete(productId, optionId) {
    return this.client.delete(`/products/${productId}/options/${optionId}`)
  }
}

export default ProductOptions
