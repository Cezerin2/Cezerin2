const ProductOptionValues {
  constructor(client) {
    client = client
  }

  list(productId, optionId) {
    return client.get(`/products/${productId}/options/${optionId}/values`)
  }

  retrieve(productId, optionId, valueId) {
    return client.get(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }

  create(productId, optionId, data) {
    return client.post(
      `/products/${productId}/options/${optionId}/values`,
      data
    )
  }

  update(productId, optionId, valueId, data) {
    return client.put(
      `/products/${productId}/options/${optionId}/values/${valueId}`,
      data
    )
  }

  delete(productId, optionId, valueId) {
    return client.delete(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }
}

export default ProductOptionValues
