import { ObjectID } from "mongodb"
import { db } from "../../lib/mongo"

class ShippingMethodsLightService {
  constructor() {}

  getMethods(filter = {}) {
    return db
      .collection("shippingMethods")
      .find(filter)
      .toArray()
      .then(items => items.map(item => this.changeProperties(item)))
  }

  getMethodPrice(id) {
    const filter = {}
    if (id) {
      filter._id = new ObjectID(id)
    }

    return this.getMethods(filter).then(methods =>
      methods.length > 0 ? methods[0].price || 0 : 0
    )
  }

  changeProperties(item) {
    if (item) {
      item.id = item._id.toString()
      delete item._id
    }
    return item
  }
}

export default new ShippingMethodsLightService()
