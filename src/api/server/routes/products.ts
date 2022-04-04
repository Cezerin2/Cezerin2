import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import ProductImagesService from "../services/products/images"
import ProductOptionsService from "../services/products/options"
import ProductOptionValuesService from "../services/products/optionValues"
import ProductsService from "../services/products/products"
import ProductVariantsService from "../services/products/variants"

const router = Router()

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.getProducts(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleProduct = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.getSingleProduct(req.params.productId)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addProduct = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.addProduct(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.updateProduct(req.params.productId, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.deleteProduct(req.params.productId)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

const getImages = (req: Request, res: Response, next: NextFunction) => {
  ProductImagesService.getImages(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const addImage = async (req: Request, res: Response, next: NextFunction) => {
  await ProductImagesService.addImage(req, res, next)
}

const updateImage = (req: Request, res: Response, next: NextFunction) => {
  ProductImagesService.updateImage(
    req.params.productId,
    req.params.imageId,
    req.body
  ).then(data => {
    res.end()
  })
}

const deleteImage = (req: Request, res: Response, next: NextFunction) => {
  ProductImagesService.deleteImage(
    req.params.productId,
    req.params.imageId
  ).then(data => {
    res.end()
  })
}

const isSkuExists = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.isSkuExists(req.query.sku, req.params.productId)
    .then(exists => {
      res.status(exists ? 200 : 404).end()
    })
    .catch(next)
}

const isSlugExists = (req: Request, res: Response, next: NextFunction) => {
  ProductsService.isSlugExists(req.query.slug, req.params.productId)
    .then(exists => {
      res.status(exists ? 200 : 404).end()
    })
    .catch(next)
}

const getOptions = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionsService.getOptions(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleOption = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionsService.getSingleOption(
    req.params.productId,
    req.params.optionId
  )
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addOption = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionsService.addOption(req.params.productId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateOption = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionsService.updateOption(
    req.params.productId,
    req.params.optionId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const deleteOption = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionsService.deleteOption(req.params.productId, req.params.optionId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getOptionValues = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionValuesService.getOptionValues(
    req.params.productId,
    req.params.optionId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleOptionValue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ProductOptionValuesService.getSingleOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId
  )
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addOptionValue = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionValuesService.addOptionValue(
    req.params.productId,
    req.params.optionId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateOptionValue = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionValuesService.updateOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const deleteOptionValue = (req: Request, res: Response, next: NextFunction) => {
  ProductOptionValuesService.deleteOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getVariants = (req: Request, res: Response, next: NextFunction) => {
  ProductVariantsService.getVariants(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const addVariant = (req: Request, res: Response, next: NextFunction) => {
  ProductVariantsService.addVariant(req.params.productId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateVariant = (req: Request, res: Response, next: NextFunction) => {
  ProductVariantsService.updateVariant(
    req.params.productId,
    req.params.variantId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const deleteVariant = (req: Request, res: Response, next: NextFunction) => {
  ProductVariantsService.deleteVariant(
    req.params.productId,
    req.params.variantId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const setVariantOption = (req: Request, res: Response, next: NextFunction) => {
  ProductVariantsService.setVariantOption(
    req.params.productId,
    req.params.variantId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

router.get(
  "/v1/products",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getProducts
)
router.post(
  "/v1/products",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  addProduct
)
router.get(
  "/v1/products/:productId",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getSingleProduct
)
router.put(
  "/v1/products/:productId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  updateProduct
)
router.delete(
  "/v1/products/:productId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  deleteProduct
)

router.get(
  "/v1/products/:productId/images",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getImages
)
router.post(
  "/v1/products/:productId/images",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  addImage
)
router.put(
  "/v1/products/:productId/images/:imageId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  updateImage
)
router.delete(
  "/v1/products/:productId/images/:imageId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  deleteImage
)

router.get(
  "/v1/products/:productId/sku",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  isSkuExists
)
router.get(
  "/v1/products/:productId/slug",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  isSlugExists
)

router.get(
  "/v1/products/:productId/options",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getOptions
)
router.get(
  "/v1/products/:productId/options/:optionId",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getSingleOption
)
router.post(
  "/v1/products/:productId/options",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  addOption
)
router.put(
  "/v1/products/:productId/options/:optionId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  updateOption
)
router.delete(
  "/v1/products/:productId/options/:optionId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  deleteOption
)

router.get(
  "/v1/products/:productId/options/:optionId/values",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getOptionValues
)
router.get(
  "/v1/products/:productId/options/:optionId/values/:valueId",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getSingleOptionValue
)
router.post(
  "/v1/products/:productId/options/:optionId/values",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  addOptionValue
)
router.put(
  "/v1/products/:productId/options/:optionId/values/:valueId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  updateOptionValue
)
router.delete(
  "/v1/products/:productId/options/:optionId/values/:valueId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  deleteOptionValue
)

router.get(
  "/v1/products/:productId/variants",
  security.checkUserScope(security.scope.READ_PRODUCTS),
  getVariants
)
router.post(
  "/v1/products/:productId/variants",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  addVariant
)
router.put(
  "/v1/products/:productId/variants/:variantId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  updateVariant
)
router.delete(
  "/v1/products/:productId/variants/:variantId",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  deleteVariant
)
router.put(
  "/v1/products/:productId/variants/:variantId/options",
  security.checkUserScope(security.scope.WRITE_PRODUCTS),
  setVariantOption
)

export default router
