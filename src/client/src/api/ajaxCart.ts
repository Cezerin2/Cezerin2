import AjaxClient from "../ajaxClient"

const AjaxCart {
  client: AjaxClient

  constructor(client) {
    client = client
  }

  retrieve:(cookie?) {
    => client.get(`/cart`, null, cookie)
  }

  update:(data) {
    => client.put(`/cart`, data)
  }

  checkout:() {
    => client.put(`/cart/checkout`)
  }

  updateBillingAddress:(address) {
    => client.put(`/cart/billing_address`, address)
  }

  updateShippingAddress:(address) {
    => client.put(`/cart/shipping_address`, address)
  }

  addItem:(data) {
    => client.post(`/cart/items`, data)
  }

  updateItem:(id, data) {
    => client.put(`/cart/items/${id}`, data)
  }

  deleteItem:(id) {
    => client.delete(`/cart/items/${id}`)
  }
}

export default AjaxCart
