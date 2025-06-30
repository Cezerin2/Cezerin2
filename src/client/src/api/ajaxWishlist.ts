import AjaxClient from "../ajaxClient"

class AjaxWishlist {
  client: AjaxClient

  constructor(client) {
    this.client = client
  }

  retrieve = (cookie?) => {
    return this.client.get("/wishlist", null, cookie)
  }

  addItem = (data) => {
    return this.client.post("/wishlist/items", data)
  }

  deleteItem = (id) => {
    return this.client.delete(`/wishlist/items/${id}`)
  }
}

export default AjaxWishlist
