import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import ProductImagesService from "../services/products/images"
import ProductOptionsService from "../services/products/options"
import ProductOptionValuesService from "../services/products/optionValues"
import ProductsService from "../services/products/products"
import ProductVariantsService from "../services/products/variants"

const router = new Router()

const getProducts: Middleware = async ctx => {
  const data = await ProductsService.getProducts(ctx.query)
  ctx.body = data
}

const getSingleProduct: Middleware = async ctx => {
  const data = await ProductsService.getSingleProduct(ctx.params.productId)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addProduct: Middleware = async ctx => {
  const data = await ProductsService.addProduct(ctx.request.body)
  ctx.body = data
}

const updateProduct: Middleware = async ctx => {
  const data = await ProductsService.updateProduct(
    ctx.params.productId,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteProduct: Middleware = async ctx => {
  const data = await ProductsService.deleteProduct(ctx.params.productId)
  ctx.status = data ? 200 : 404
}

const getImages: Middleware = async ctx => {
  const data = await ProductImagesService.getImages(ctx.params.productId)
  ctx.body = data
}

const { addImage } = ProductImagesService

const updateImage: Middleware = ctx =>
  ProductImagesService.updateImage(
    ctx.params.productId,
    ctx.params.imageId,
    ctx.request.body
  )

const deleteImage: Middleware = ctx =>
  ProductImagesService.deleteImage(ctx.params.productId, ctx.params.imageId)

const isSkuExists: Middleware = async ctx => {
  const exists = await ProductsService.isSkuExists(
    ctx.query.sku,
    ctx.params.productId
  )
  ctx.status = exists ? 200 : 404
}

const isSlugExists: Middleware = async ctx => {
  const exists = await ProductsService.isSlugExists(
    ctx.query.slug,
    ctx.params.productId
  )
  ctx.status = exists ? 200 : 404
}

const getOptions: Middleware = async ctx => {
  const data = await ProductOptionsService.getOptions(ctx.params.productId)
  ctx.body = data
}

const getSingleOption: Middleware = async ctx => {
  const data = await ProductOptionsService.getSingleOption(
    ctx.params.productId,
    ctx.params.optionId
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addOption: Middleware = async ctx => {
  const data = await ProductOptionsService.addOption(
    ctx.params.productId,
    ctx.request.body
  )
  ctx.body = data
}

const updateOption: Middleware = async ctx => {
  const data = await ProductOptionsService.updateOption(
    ctx.params.productId,
    ctx.params.optionId,
    ctx.request.body
  )
  ctx.body = data
}

const deleteOption: Middleware = async ctx => {
  const data = await ProductOptionsService.deleteOption(
    ctx.params.productId,
    ctx.params.optionId
  )
  ctx.body = data
}

const getOptionValues: Middleware = async ctx => {
  const data = await ProductOptionValuesService.getOptionValues(
    ctx.params.productId,
    ctx.params.optionId
  )
  ctx.body = data
}

const getSingleOptionValue: Middleware = async ctx => {
  const data = await ProductOptionValuesService.getSingleOptionValue(
    ctx.params.productId,
    ctx.params.optionId,
    ctx.params.valueId
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addOptionValue: Middleware = async ctx => {
  const data = await ProductOptionValuesService.addOptionValue(
    ctx.params.productId,
    ctx.params.optionId,
    ctx.request.body
  )
  ctx.body = data
}

const updateOptionValue: Middleware = async ctx => {
  const data = await ProductOptionValuesService.updateOptionValue(
    ctx.params.productId,
    ctx.params.optionId,
    ctx.params.valueId,
    ctx.request.body
  )
  ctx.body = data
}

const deleteOptionValue: Middleware = async ctx => {
  const data = await ProductOptionValuesService.deleteOptionValue(
    ctx.params.productId,
    ctx.params.optionId,
    ctx.params.valueId
  )
  ctx.body = data
}

const getVariants: Middleware = async ctx => {
  const data = await ProductVariantsService.getVariants(ctx.params.productId)
  ctx.body = data
}

const addVariant: Middleware = async ctx => {
  const data = await ProductVariantsService.addVariant(
    ctx.params.productId,
    ctx.request.body
  )
  ctx.body = data
}

const updateVariant: Middleware = async ctx => {
  const data = await ProductVariantsService.updateVariant(
    ctx.params.productId,
    ctx.params.variantId,
    ctx.request.body
  )
  ctx.body = data
}

const deleteVariant: Middleware = async ctx => {
  const data = await ProductVariantsService.deleteVariant(
    ctx.params.productId,
    ctx.params.variantId
  )
  ctx.body = data
}

const setVariantOption: Middleware = async ctx => {
  const data = await ProductVariantsService.setVariantOption(
    ctx.params.productId,
    ctx.params.variantId,
    ctx.request.body
  )
  ctx.body = data
}

router
  .get(
    "/v1/products",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getProducts
  )
  .post(
    "/v1/products",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    addProduct
  )
  .get(
    "/v1/products/:productId",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getSingleProduct
  )
  .put(
    "/v1/products/:productId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    updateProduct
  )
  .delete(
    "/v1/products/:productId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    deleteProduct
  )

  .get(
    "/v1/products/:productId/images",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getImages
  )
  .post(
    "/v1/products/:productId/images",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    addImage
  )
  .put(
    "/v1/products/:productId/images/:imageId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    updateImage
  )
  .delete(
    "/v1/products/:productId/images/:imageId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    deleteImage
  )

  .get(
    "/v1/products/:productId/sku",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    isSkuExists
  )
  .get(
    "/v1/products/:productId/slug",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    isSlugExists
  )

  .get(
    "/v1/products/:productId/options",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getOptions
  )
  .get(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getSingleOption
  )
  .post(
    "/v1/products/:productId/options",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    addOption
  )
  .put(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    updateOption
  )
  .delete(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    deleteOption
  )

  .get(
    "/v1/products/:productId/options/:optionId/values",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getOptionValues
  )
  .get(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getSingleOptionValue
  )
  .post(
    "/v1/products/:productId/options/:optionId/values",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    addOptionValue
  )
  .put(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    updateOptionValue
  )
  .delete(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    deleteOptionValue
  )

  .get(
    "/v1/products/:productId/variants",
    security.checkUserScope(security.scope.READ_PRODUCTS),
    getVariants
  )
  .post(
    "/v1/products/:productId/variants",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    addVariant
  )
  .put(
    "/v1/products/:productId/variants/:variantId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    updateVariant
  )
  .delete(
    "/v1/products/:productId/variants/:variantId",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    deleteVariant
  )
  .put(
    "/v1/products/:productId/variants/:variantId/options",
    security.checkUserScope(security.scope.WRITE_PRODUCTS),
    setVariantOption
  )

export default router
