const ProductVariants {
  constructor(client) {
    client = client
  }

  list:(productId) {
    => client.get(`/products/${productId}/variants`)
  }

  create:(productId, data) {
    => client.post(`/products/${productId}/variants`, data)
  }

  update:(productId, variantId, data) {
    => client.put(`/products/${productId}/variants/${variantId}`, data)
  }

  delete:(productId, variantId) {
    => client.delete(`/products/${productId}/variants/${variantId}`)
  }

  setOption:(productId, variantId, data) {
    => client.put(
      `/products/${productId}/variants/${variantId}/options`,
      data
    )
  }
}

export default ProductVariants
