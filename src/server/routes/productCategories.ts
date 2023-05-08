import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import CategoriesService from "../services/products/productCategories"

const router = new Router()

const getCategories: Middleware = async ctx => {
  const data = await CategoriesService.getCategories(ctx.query)
  ctx.body = data
}

const getSingleCategory: Middleware = async ctx => {
  const data = await CategoriesService.getSingleCategory(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addCategory: Middleware = async ctx => {
  const data = await CategoriesService.addCategory(ctx.request.body)
  ctx.body = data
}

const updateCategory: Middleware = async ctx => {
  const data = await CategoriesService.updateCategory(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteCategory: Middleware = async ctx => {
  const data = await CategoriesService.deleteCategory(ctx.params.id)
  ctx.status = data ? 200 : 404
}

const { uploadCategoryImage } = CategoriesService

const deleteCategoryImage: Middleware = ctx =>
  CategoriesService.deleteCategoryImage(ctx.params.id)

router
  .get(
    "/v1/product_categories",
    security.checkUserScope(security.scope.READ_PRODUCT_CATEGORIES),
    getCategories
  )
  .post(
    "/v1/product_categories",
    security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
    addCategory
  )
  .get(
    "/v1/product_categories/:id",
    security.checkUserScope(security.scope.READ_PRODUCT_CATEGORIES),
    getSingleCategory
  )
  .put(
    "/v1/product_categories/:id",
    security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
    updateCategory
  )
  .delete(
    "/v1/product_categories/:id",
    security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
    deleteCategory
  )
  .post(
    "/v1/product_categories/:id/image",
    security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
    uploadCategoryImage
  )
  .delete(
    "/v1/product_categories/:id/image",
    security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
    deleteCategoryImage
  )

export default router
