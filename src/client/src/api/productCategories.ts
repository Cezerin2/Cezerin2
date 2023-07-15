const ProductCategories {
  constructor(client) {
    client = client
    resourceUrl = "/product_categories"
  }

  list(filter) {
    return client.get(resourceUrl, filter)
  }

  retrieve(id) {
    return client.get(`${resourceUrl}/${id}`)
  }

  create(data) {
    return client.post(resourceUrl, data)
  }

  update(id, data) {
    return client.put(`${resourceUrl}/${id}`, data)
  }

  delete(id) {
    return client.delete(`${resourceUrl}/${id}`)
  }

  uploadImage(categoryId, formData) {
    return client.postFormData(
      `${resourceUrl}/${categoryId}/image`,
      formData
    )
  }

  deleteImage(id) {
    return client.delete(`${resourceUrl}/${id}/image`)
  }
}

export default ProductCategories
