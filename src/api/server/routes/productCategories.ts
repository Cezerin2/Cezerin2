import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import CategoriesService from "../services/products/productCategories"

const router = Router()

const getCategories = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.getCategories(req.query)
    .then(data => res.send(data))
    .catch(next)

const getSingleCategory = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.getSingleCategory(req.params.id)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const addCategory = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.addCategory(req.body)
    .then(data => res.send(data))
    .catch(next)

const updateCategory = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.updateCategory(req.params.id, req.body)
    .then(data => (data ? res.send(data) : res.status(404).end()))
    .catch(next)

const deleteCategory = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.deleteCategory(req.params.id)
    .then(data => res.status(data ? 200 : 404).end())
    .catch(next)

const uploadCategoryImage = (req: Request, res: Response, next: NextFunction) =>
  CategoriesService.uploadCategoryImage(req, res, next)

const deleteCategoryImage = (req: Request, res: Response) => {
  CategoriesService.deleteCategoryImage(req.params.id)
  res.end()
}

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
