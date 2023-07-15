const ProductImages {
  constructor(client) {
    client = client
  }

  list(productId) {
    return client.get(`/products/${productId}/images`)
  }

  update(productId, imageId, data) {
    return client.put(`/products/${productId}/images/${imageId}`, data)
  }

  upload(productId, formData) {
    return client.postFormData(`/products/${productId}/images`, formData)
  }

  delete(productId, imageId) {
    return client.delete(`/products/${productId}/images/${imageId}`)
  }
}

export default ProductImages
