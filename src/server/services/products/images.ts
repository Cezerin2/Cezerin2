import { RouterContext } from "@koa/router"
import { removeSync } from "fs-extra"
import { ObjectID } from "mongodb"
import path from "path"
import { db } from "../../lib/mongo"
import parse from "../../lib/parse"
import settings from "../../lib/settings"
import { SaveFileReturn, URLResolve, saveFile } from "../../lib/utils"
import SettingsService from "../settings/settings"

class ProductImagesService {
  getErrorMessage(error) {
    return { error: true, message: error.toString() }
  }

  getImages(productID) {
    if (!ObjectID.isValid(productID))
      return Promise.reject("Invalid identifier")
    const productObjectID = new ObjectID(productID)

    return SettingsService.getSettings().then(generalSettings =>
      db
        .collection("products")
        .findOne({ _id: productObjectID }, { fields: { images: 1 } })
        .then(product => {
          if (product && product.images && product.images.length > 0) {
            let images = product.images.map(image => {
              image.url = URLResolve(
                generalSettings.domain,
                `${settings.productsUploadUrl}/${product._id}/${image.filename}`
              )
              return image
            })

            images = images.sort((a, b) => a.position - b.position)
            return images
          }

          return []
        })
    )
  }

  deleteImage(productID, imageID) {
    if (!ObjectID.isValid(productID) || !ObjectID.isValid(imageID)) {
      return Promise.reject("Invalid identifier")
    }
    const productObjectID = new ObjectID(productID)
    const imageObjectID = new ObjectID(imageID)

    return this.getImages(productID)
      .then(images => {
        if (images && images.length > 0) {
          const imageData = images.find(
            i => i.id.toString() === imageID.toString()
          )
          if (imageData) {
            let filename = imageData.filename
            const filepath = path.resolve(
              `${settings.productsUploadPath}/${productID}/${filename}`
            )
            removeSync(filepath)
            return db
              .collection("products")
              .updateOne(
                { _id: productObjectID },
                { $pull: { images: { id: imageObjectID } } }
              )
          }

          return true
        }

        return true
      })
      .then(() => true)
  }

  async addImage(ctx: RouterContext) {
    const productID = ctx.params.productId
    if (!ObjectID.isValid(productID))
      ctx.throw(this.getErrorMessage("Invalid identifier"))

    const uploadedFiles = []
    const productObjectID = new ObjectID(productID)
    const uploadDir = `${settings.productsUploadPath}/${productID}`

    const onEachFile = async (file: SaveFileReturn) => {
      const imageData = {
        id: new ObjectID(),
        alt: "",
        position: 99,
        filename: file.newFilename,
      }

      uploadedFiles.push(imageData)

      await db.collection("products").updateOne(
        {
          _id: productObjectID,
        },
        {
          $push: { images: imageData },
        }
      )
    }

    const files = await saveFile(ctx, uploadDir, true)
    for await (const file of files) await onEachFile(file)

    ctx.body = uploadedFiles
  }

  updateImage(productID, imageID, data) {
    if (!ObjectID.isValid(productID) || !ObjectID.isValid(imageID))
      return Promise.reject("Invalid identifier")

    const productObjectID = new ObjectID(productID)
    const imageObjectID = new ObjectID(imageID)

    const imageData = this.getValidDocumentForUpdate(data)

    return db.collection("products").updateOne(
      {
        _id: productObjectID,
        "images.id": imageObjectID,
      },
      { $set: imageData }
    )
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error("Required fields are missing")
    }

    const image = {}

    if (data.alt !== undefined) {
      image["images.$.alt"] = parse.getString(data.alt)
    }

    if (data.position !== undefined) {
      image["images.$.position"] = parse.getNumberIfPositive(data.position) || 0
    }

    return image
  }
}

export default new ProductImagesService()
