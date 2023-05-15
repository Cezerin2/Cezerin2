class ProductImages {
  constructor(client) {
    this.client = client
  }

  list(productId) {
    return this.client.get(`/products/${productId}/images`)
  }

  update(productId, imageId, data) {
    return this.client.put(`/products/${productId}/images/${imageId}`, data)
  }

  upload(productId, formData) {
    return this.client.postFormData(`/products/${productId}/images`, formData)
  }

  delete(productId, imageId) {
    return this.client.delete(`/products/${productId}/images/${imageId}`)
  }
}

export default ProductImages
