import { db } from "../../lib/mongo"
import parse from "../../lib/parse"

class CommerceSettingsService {
  constructor() {
    this.defaultSettings = {
      status: "",
      serviceOptions: "",
      deliveryRadius: "",
    }
  }

  retrieveCommerceSettings() {
    return db
      .collection("commerceSettings")
      .findOne()
      .then(settings => {
        return this.changeProperties(settings)
      })
  }

  updateCommerceSettings(data) {
    const settings = this.getValidDocumentForUpdate(data)
    return this.insertDefaultSettingsIfEmpty().then(() =>
      db
        .collection("commerceSettings")
        .updateOne(
          {},
          {
            $set: settings,
          },
          { upsert: true }
        )
        .then(res => this.retrieveCommerceSettings())
    )
  }

  insertDefaultSettingsIfEmpty() {
    return db
      .collection("commerceSettings")
      .countDocuments({})
      .then(count => {
        if (count === 0) {
          return db
            .collection("commerceSettings")
            .insertOne(this.defaultSettings)
        } else {
          return
        }
      })
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error("Required fields are missing")
    }

    let settings = {}

    if (data.status !== undefined) {
      settings.status = parse.getString(data.status)
    }

    if (data.serviceOptions !== undefined) {
      settings.serviceOptions = parse.getString(data.serviceOptions)
    }

    if (data.deliveryRadius !== undefined) {
      settings.deliveryRadius = parse.getString(data.deliveryRadius)
    }

    return settings
  }

  changeProperties(settings) {
    if (settings) {
      delete settings._id
    } else {
      return this.defaultSettings
    }

    return settings
  }
}

export default new CommerceSettingsService()
