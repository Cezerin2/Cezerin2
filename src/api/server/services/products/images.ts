import formidable from "formidable"
import fse from "fs-extra"
import { ObjectID } from "mongodb"
import path from "path"
import url from "url"
import { db } from "../../lib/mongo"
import parse from "../../lib/parse"
import settings from "../../lib/settings"
import utils from "../../lib/utils"
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
              image.url = url.resolve(
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
            fse.removeSync(filepath)
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

  async addImage(req, res, next?) {
    const productID = req.params.productId
    if (!ObjectID.isValid(productID)) {
      res.status(500).send(this.getErrorMessage("Invalid identifier"))
      return
    }

    const uploadedFiles = []
    const productObjectID = new ObjectID(productID)
    const uploadDir = path.resolve(
      `${settings.productsUploadPath}/${productID}`
    )
    fse.ensureDirSync(uploadDir)

    const form = new formidable.IncomingForm()
    form.uploadDir = uploadDir

    form
      .on("fileBegin", (name, file) => {
        // Emitted whenever a field / value pair has been received.
        file.name = utils.getCorrectFileName(file.name)
        file.path = `${uploadDir}/${file.name}`
      })
      .on("file", async (field, file) => {
        // Every time a file has been uploaded successfully,
        if (file.name) {
          const imageData = {
            id: new ObjectID(),
            alt: "",
            position: 99,
            filename: file.name,
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
      })
      .on("error", error => {
        res.status(500).send(this.getErrorMessage(error))
      })
      .on("end", () => {
        res.send(uploadedFiles)
      })

    form.parse(req)
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
