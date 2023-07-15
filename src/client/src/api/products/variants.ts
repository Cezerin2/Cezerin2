const ProductVariants {
  constructor(client) {
    this.client = client
  }

  list(productId) {
    return this.client.get(`/products/${productId}/variants`)
  }

  create(productId, data) {
    return this.client.post(`/products/${productId}/variants`, data)
  }

  update(productId, variantId, data) {
    return this.client.put(`/products/${productId}/variants/${variantId}`, data)
  }

  delete(productId, variantId) {
    return this.client.delete(`/products/${productId}/variants/${variantId}`)
  }

  setOption(productId, variantId, data) {
    return this.client.put(
      `/products/${productId}/variants/${variantId}/options`,
      data
    )
  }
}

export default ProductVariants
