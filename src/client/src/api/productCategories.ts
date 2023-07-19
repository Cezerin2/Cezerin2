const ProductCategories {
  constructor(client) {
    client = client
    const resourceUrl =  "/product_categories"
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id) {
    => client.get(`${resourceUrl}/${id}`)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(id, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id) {
    => client.delete(`${resourceUrl}/${id}`)
  }

  uploadImage:(categoryId, formData) {
    => client.postFormData(
      `${resourceUrl}/${categoryId}/image`,
      formData
    )
  }

  deleteImage:(id) {
    => client.delete(`${resourceUrl}/${id}/image`)
  }
}

export default ProductCategories
