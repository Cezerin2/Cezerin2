class ProductOptionValues {
  constructor(client) {
    this.client = client
  }

  list(productId, optionId) {
    return this.client.get(`/products/${productId}/options/${optionId}/values`)
  }

  retrieve(productId, optionId, valueId) {
    return this.client.get(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }

  create(productId, optionId, data) {
    return this.client.post(
      `/products/${productId}/options/${optionId}/values`,
      data
    )
  }

  update(productId, optionId, valueId, data) {
    return this.client.put(
      `/products/${productId}/options/${optionId}/values/${valueId}`,
      data
    )
  }

  delete(productId, optionId, valueId) {
    return this.client.delete(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }
}

export default ProductOptionValues
