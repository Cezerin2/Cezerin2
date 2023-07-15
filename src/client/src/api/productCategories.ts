const ProductCategories {
  constructor(client) {
    this.client = client
    this.resourceUrl = "/product_categories"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(id) {
    return this.client.get(`${this.resourceUrl}/${id}`)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(id, data) {
    return this.client.put(`${this.resourceUrl}/${id}`, data)
  }

  delete(id) {
    return this.client.delete(`${this.resourceUrl}/${id}`)
  }

  uploadImage(categoryId, formData) {
    return this.client.postFormData(
      `${this.resourceUrl}/${categoryId}/image`,
      formData
    )
  }

  deleteImage(id) {
    return this.client.delete(`${this.resourceUrl}/${id}/image`)
  }
}

export default ProductCategories
