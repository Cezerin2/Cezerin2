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

  list:(productId) {
    => client.get(`/products/${productId}/options`)
  }

  retrieve:(productId, optionId) {
    => client.get(`/products/${productId}/options/${optionId}`)
  }

  create:(productId, data) {
    => client.post(`/products/${productId}/options`, data)
  }

  update:(productId, optionId, data) {
    => client.put(`/products/${productId}/options/${optionId}`, data)
  }

  delete:(productId, optionId) {
    => client.delete(`/products/${productId}/options/${optionId}`)
  }
}

export default ProductOptions
