import { MongoClient } from "mongodb"
import url from "url"
import winston from "winston"
import { mongodbConnection } from "./settings"

const mongoPathName = url.parse(mongodbConnection).pathname
const dbName = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1)

const reconnectInterval = 1000
const connectOptions = {
  reconnectTries: 3600,
  reconnectInterval,
  useNewUrlParser: true,
}

const onClose = () => {
  winston.info("MongoDB connection was closed")
}

const onReconnect = () => {
  winston.info("MongoDB reconnected")
}

export let db = null

const connectWithRetry = () => {
  MongoClient.connect(mongodbConnection, connectOptions, (error, client) => {
    if (error) {
      winston.error(
        `MongoDB connection was failed: ${error.message}`,
        error.message
      )
      setTimeout(connectWithRetry, reconnectInterval)
    } else {
      db = client.db(dbName)
      db.on("close", onClose)
      db.on("reconnect", onReconnect)
      winston.info("MongoDB connected successfully")
    }
  })
}

connectWithRetry()
