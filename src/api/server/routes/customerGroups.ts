import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import CustomerGroupsService from "../services/customers/customerGroups"

const router = Router()

const getGroups = (req: Request, res: Response, next: NextFunction) => {
  CustomerGroupsService.getGroups(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleGroup = (req: Request, res: Response, next: NextFunction) => {
  CustomerGroupsService.getSingleGroup(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addGroup = (req: Request, res: Response, next: NextFunction) => {
  CustomerGroupsService.addGroup(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateGroup = (req: Request, res: Response, next: NextFunction) => {
  CustomerGroupsService.updateGroup(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteGroup = (req: Request, res: Response, next: NextFunction) => {
  CustomerGroupsService.deleteGroup(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

router.get(
  "/v1/customer_groups",
  security.checkUserScope(security.scope.READ_CUSTOMER_GROUPS),
  getGroups
)
router.post(
  "/v1/customer_groups",
  security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
  addGroup
)
router.get(
  "/v1/customer_groups/:id",
  security.checkUserScope(security.scope.READ_CUSTOMER_GROUPS),
  getSingleGroup
)
router.put(
  "/v1/customer_groups/:id",
  security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
  updateGroup
)
router.delete(
  "/v1/customer_groups/:id",
  security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
  deleteGroup
)

export default router
