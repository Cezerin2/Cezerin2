const ProductOptionValues {
  constructor(client) {
    client = client
  }

  list:(productId, optionId) {
    => client.get(`/products/${productId}/options/${optionId}/values`)
  }

  retrieve:(productId, optionId, valueId) {
    => client.get(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }

  create:(productId, optionId, data) {
    => client.post(
      `/products/${productId}/options/${optionId}/values`,
      data
    )
  }

  update:(productId, optionId, valueId, data) {
    => client.put(
      `/products/${productId}/options/${optionId}/values/${valueId}`,
      data
    )
  }

  delete:(productId, optionId, valueId) {
    => client.delete(
      `/products/${productId}/options/${optionId}/values/${valueId}`
    )
  }
}

export default ProductOptionValues
