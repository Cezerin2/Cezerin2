import ApiClient from "../apiClient"

class Wishlist {
  client: ApiClient

  constructor(client: ApiClient) {
    this.client = client
  }

  retrieve = (params?) => {
    return this.client.get("/v1/wishlist", params)
  }

  addItem = (data) => {
    return this.client.post("/v1/wishlist/items", data)
  }

  deleteItem = (itemId: string) => {
    return this.client.delete(`/v1/wishlist/items/${itemId}`)
  }

  deleteItemByProduct = (productId: string, params?) => {
    return this.client.delete(`/v1/wishlist/items/product/${productId}`, params)
  }

  transferSessionToCustomer = (data) => {
    return this.client.post("/v1/wishlist/transfer", data)
  }
}

export default Wishlist
