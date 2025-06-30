import { ObjectID } from "mongodb"
import { db } from "../../lib/mongo"
import parse from "../../lib/parse"

class WishlistService {
  getFilter(params: any = {}) {
    let filter: any = {}
    const customer_id = parse.getObjectIDIfValid(params.customer_id)
    const session_id = parse.getString(params.session_id)

    if (customer_id) {
      filter.customer_id = customer_id
    } else if (session_id) {
      filter.session_id = session_id
    }

    return filter
  }

  async getWishlist(params) {
    const filter = this.getFilter(params)
    
    if (!filter.customer_id && !filter.session_id) {
      return { items: [] }
    }

    const wishlistItems = await db
      .collection("wishlist")
      .find(filter)
      .toArray()

    return {
      items: wishlistItems.map(item => this.changeProperties(item))
    }
  }

  async addItem(data) {
    const item = this.getValidDocumentForInsert(data)
    
    // Check if item already exists
    const existingItem = await db
      .collection("wishlist")
      .findOne({
        product_id: item.product_id,
        variant_id: item.variant_id,
        $or: [
          { customer_id: item.customer_id },
          { session_id: item.session_id }
        ]
      })

    if (existingItem) {
      return Promise.reject("Item already in wishlist")
    }

    const insertResponse = await db
      .collection("wishlist")
      .insertMany([item])
    
    const newItemId = insertResponse.ops[0]._id.toString()
    return this.getSingleItem(newItemId)
  }

  async deleteItem(itemId) {
    if (!ObjectID.isValid(itemId)) {
      return Promise.reject("Invalid identifier")
    }

    const itemObjectID = new ObjectID(itemId)
    const deleteResponse = await db
      .collection("wishlist")
      .deleteOne({ _id: itemObjectID })
    
    return deleteResponse.deletedCount > 0
  }

  async deleteItemByProduct(customer_id, session_id, product_id, variant_id = null) {
    const filter: any = { product_id }
    
    if (customer_id) {
      filter.customer_id = customer_id
    } else if (session_id) {
      filter.session_id = session_id
    } else {
      return Promise.reject("Customer ID or Session ID required")
    }

    if (variant_id) {
      filter.variant_id = variant_id
    }

    const deleteResponse = await db
      .collection("wishlist")
      .deleteOne(filter)
    
    return deleteResponse.deletedCount > 0
  }

  async getSingleItem(itemId) {
    if (!ObjectID.isValid(itemId)) {
      return Promise.reject("Invalid identifier")
    }

    const itemObjectID = new ObjectID(itemId)
    const item = await db
      .collection("wishlist")
      .findOne({ _id: itemObjectID })
    
    return item ? this.changeProperties(item) : null
  }

  async transferSessionToCustomer(session_id, customer_id) {
    if (!session_id || !customer_id) {
      return Promise.reject("Session ID and Customer ID required")
    }

    const customerObjectID = new ObjectID(customer_id)
    
    // Update all session wishlist items to customer
    const updateResponse = await db
      .collection("wishlist")
      .updateMany(
        { session_id },
        { 
          $set: { customer_id: customerObjectID },
          $unset: { session_id: "" }
        }
      )
    
    return updateResponse.modifiedCount
  }

  getValidDocumentForInsert(data) {
    let item: any = {
      date_created: new Date(),
      product_id: parse.getObjectIDIfValid(data.product_id),
      variant_id: parse.getObjectIDIfValid(data.variant_id),
    }

    if (data.customer_id) {
      item.customer_id = parse.getObjectIDIfValid(data.customer_id)
    } else if (data.session_id) {
      item.session_id = parse.getString(data.session_id)
    } else {
      throw new Error("Customer ID or Session ID required")
    }

    return item
  }

  changeProperties(item) {
    if (item) {
      item.id = item._id.toString()
      delete item._id
      
      if (item.customer_id) {
        item.customer_id = item.customer_id.toString()
      }
      
      if (item.product_id) {
        item.product_id = item.product_id.toString()
      }
      
      if (item.variant_id) {
        item.variant_id = item.variant_id.toString()
      }
    }

    return item
  }
}

export default new WishlistService()
