import AjaxClient from "../../ajaxClient"
import ApiClient from "../../apiClient"
import ProductOptionValues from "./optionValues"

const ProductOptions {
  client: ApiClient | AjaxClient
  values: ProductOptionValues

  constructor(client: ApiClient | AjaxClient) {
    client = client

    values = new ProductOptionValues(client)
  }

  list(productId) {
    return client.get(`/products/${productId}/options`)
  }

  retrieve(productId, optionId) {
    return client.get(`/products/${productId}/options/${optionId}`)
  }

  create(productId, data) {
    return client.post(`/products/${productId}/options`, data)
  }

  update(productId, optionId, data) {
    return client.put(`/products/${productId}/options/${optionId}`, data)
  }

  delete(productId, optionId) {
    return client.delete(`/products/${productId}/options/${optionId}`)
  }
}

export default ProductOptions
