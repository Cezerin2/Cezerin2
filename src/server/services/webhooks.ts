import LRUCache from "lru-cache"
import { ObjectID } from "mongodb"
import { db } from "../lib/mongo"
import parse from "../lib/parse"

const cache = new LRUCache({
  max: 10000,
  ttl: 1000 * 60 * 60 * 24, // 24h
})

const webhooksCacheKey = "webhooks"

class WebhooksService {
  async getWebhooks(query?) {
    const webhooksFromCache = cache.get(webhooksCacheKey)

    if (webhooksFromCache) return webhooksFromCache

    const items = await db.collection("webhooks").find().toArray()
    const result = items.map(item => this.changeProperties(item))
    cache.set(webhooksCacheKey, result)
    return result
  }

  async getSingleWebhook(id: string) {
    if (!ObjectID.isValid(id)) return Promise.reject("Invalid identifier")

    const webhookObjectID = new ObjectID(id)

    const item = await db
      .collection("webhooks")
      .findOne({ _id: webhookObjectID })
    const result = this.changeProperties(item)
    return result
  }

  async addWebhook(data) {
    const webhook = this.getValidDocumentForInsert(data)
    const res = await db.collection("webhooks").insertMany([webhook])
    cache.del(webhooksCacheKey)
    const newWebhookId = res.ops[0]._id.toString()
    const newWebhook = await this.getSingleWebhook(newWebhookId)
    return newWebhook
  }

  async updateWebhook(id: string, data) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject("Invalid identifier")
    }
    const webhookObjectID = new ObjectID(id)
    const webhook = this.getValidDocumentForUpdate(id, data)

    const res = await db.collection("webhooks").updateOne(
      {
        _id: webhookObjectID,
      },
      {
        $set: webhook,
      }
    )

    cache.del(webhooksCacheKey)
    const newWebhook = await this.getSingleWebhook(id)
    return newWebhook
  }

  async deleteWebhook(id) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject("Invalid identifier")
    }
    const webhookObjectID = new ObjectID(id)
    const res = await db
      .collection("webhooks")
      .deleteOne({ _id: webhookObjectID })
    cache.del(webhooksCacheKey)
    return res.deletedCount > 0
  }

  getValidDocumentForInsert(data) {
    let webhook: any = {
      date_created: new Date(),
    }

    webhook.description = parse.getString(data.description)
    webhook.url = parse.getString(data.url)
    webhook.secret = parse.getString(data.secret)
    webhook.enabled = parse.getBooleanIfValid(data.enabled, false)
    webhook.events = parse.getArrayIfValid(data.events) || []

    return webhook
  }

  getValidDocumentForUpdate(id, data) {
    if (Object.keys(data).length === 0) {
      return new Error("Required fields are missing")
    }

    let webhook: any = {
      date_updated: new Date(),
    }

    if (data.description !== undefined) {
      webhook.description = parse.getString(data.description)
    }

    if (data.url !== undefined) {
      webhook.url = parse.getString(data.url)
    }

    if (data.secret !== undefined) {
      webhook.secret = parse.getString(data.secret)
    }

    if (data.enabled !== undefined) {
      webhook.enabled = parse.getBooleanIfValid(data.enabled, false)
    }

    if (data.events !== undefined) {
      webhook.events = parse.getArrayIfValid(data.events) || []
    }

    return webhook
  }

  changeProperties(item) {
    if (item) {
      item.id = item._id.toString()
      item._id = undefined
    }

    return item
  }
}

export default new WebhooksService()
