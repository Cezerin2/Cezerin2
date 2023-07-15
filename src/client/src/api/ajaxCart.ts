import AjaxClient from "../ajaxClient"

const AjaxCart {
  client: AjaxClient

  constructor(client) {
    client = client
  }

  retrieve(cookie?) {
    return client.get(`/cart`, null, cookie)
  }

  update(data) {
    return client.put(`/cart`, data)
  }

  checkout() {
    return client.put(`/cart/checkout`)
  }

  updateBillingAddress(address) {
    return client.put(`/cart/billing_address`, address)
  }

  updateShippingAddress(address) {
    return client.put(`/cart/shipping_address`, address)
  }

  addItem(data) {
    return client.post(`/cart/items`, data)
  }

  updateItem(id, data) {
    return client.put(`/cart/items/${id}`, data)
  }

  deleteItem(id) {
    return client.delete(`/cart/items/${id}`)
  }
}

export default AjaxCart
