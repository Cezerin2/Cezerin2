import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import CategoriesService from "../services/products/productCategories"

const router = Router()

const getCategories = (req: Request, res: Response, next: NextFunction) => {
  CategoriesService.getCategories(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleCategory = (req: Request, res: Response, next: NextFunction) => {
  CategoriesService.getSingleCategory(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addCategory = (req: Request, res: Response, next: NextFunction) => {
  CategoriesService.addCategory(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  CategoriesService.updateCategory(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  CategoriesService.deleteCategory(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

const uploadCategoryImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CategoriesService.uploadCategoryImage(req, res, next)
}

const deleteCategoryImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CategoriesService.deleteCategoryImage(req.params.id)
  res.end()
}

router.get(
  "/v1/product_categories",
  security.checkUserScope(security.scope.READ_PRODUCT_CATEGORIES),
  getCategories
)
router.post(
  "/v1/product_categories",
  security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
  addCategory
)
router.get(
  "/v1/product_categories/:id",
  security.checkUserScope(security.scope.READ_PRODUCT_CATEGORIES),
  getSingleCategory
)
router.put(
  "/v1/product_categories/:id",
  security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
  updateCategory
)
router.delete(
  "/v1/product_categories/:id",
  security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
  deleteCategory
)
router.post(
  "/v1/product_categories/:id/image",
  security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
  uploadCategoryImage
)
router.delete(
  "/v1/product_categories/:id/image",
  security.checkUserScope(security.scope.WRITE_PRODUCT_CATEGORIES),
  deleteCategoryImage
)

export default router
