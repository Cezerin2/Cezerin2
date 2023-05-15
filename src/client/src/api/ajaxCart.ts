class AjaxCart {
  constructor(client) {
    this.client = client
  }

  retrieve(cookie) {
    return this.client.get(`/cart`, null, cookie)
  }

  update(data) {
    return this.client.put(`/cart`, data)
  }

  checkout() {
    return this.client.put(`/cart/checkout`)
  }

  updateBillingAddress(address) {
    return this.client.put(`/cart/billing_address`, address)
  }

  updateShippingAddress(address) {
    return this.client.put(`/cart/shipping_address`, address)
  }

  addItem(data) {
    return this.client.post(`/cart/items`, data)
  }

  updateItem(id, data) {
    return this.client.put(`/cart/items/${id}`, data)
  }

  deleteItem(id) {
    return this.client.delete(`/cart/items/${id}`)
  }
}

export default AjaxCart
