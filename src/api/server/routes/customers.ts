import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import CustomersService from "../services/customers/customers"

const router = Router()

const getCustomers = (req: Request, res: Response, next: NextFunction) => {
  CustomersService.getCustomers(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const getSingleCustomer = (req: Request, res: Response, next: NextFunction) => {
  CustomersService.getSingleCustomer(req.params.id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const addCustomer = (req: Request, res: Response, next: NextFunction) => {
  CustomersService.addCustomer(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
  CustomersService.updateCustomer(req.params.id, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
  CustomersService.deleteCustomer(req.params.id)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

const addAddress = (req: Request, res: Response, next: NextFunction) => {
  const customer_id = req.params.id
  CustomersService.addAddress(customer_id, req.body)
    .then(data => {
      res.end()
    })
    .catch(next)
}

const updateAddress = (req: Request, res: Response, next: NextFunction) => {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.updateAddress(customer_id, address_id, req.body)
    .then(data => {
      res.end()
    })
    .catch(next)
}

const deleteAddress = (req: Request, res: Response, next: NextFunction) => {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.deleteAddress(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

const setDefaultBilling = (req: Request, res: Response, next: NextFunction) => {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.setDefaultBilling(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

const setDefaultShipping = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer_id = req.params.id
  const address_id = req.params.address_id
  CustomersService.setDefaultShipping(customer_id, address_id)
    .then(data => {
      res.end()
    })
    .catch(next)
}

router.get(
  "/v1/customers",
  security.checkUserScope(security.scope.READ_CUSTOMERS),
  getCustomers
)
router.post(
  "/v1/customers",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  addCustomer
)
router.get(
  "/v1/customers/:id",
  security.checkUserScope(security.scope.READ_CUSTOMERS),
  getSingleCustomer
)
router.put(
  "/v1/customers/:id",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  updateCustomer
)
router.delete(
  "/v1/customers/:id",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  deleteCustomer
)
router.post(
  "/v1/customers/:id/addresses",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  addAddress
)
router.put(
  "/v1/customers/:id/addresses/:address_id",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  updateAddress
)
router.delete(
  "/v1/customers/:id/addresses/:address_id",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  deleteAddress
)
router.post(
  "/v1/customers/:id/addresses/:address_id/default_billing",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  setDefaultBilling
)
router.post(
  "/v1/customers/:id/addresses/:address_id/default_shipping",
  security.checkUserScope(security.scope.WRITE_CUSTOMERS),
  setDefaultShipping
)

export default router
