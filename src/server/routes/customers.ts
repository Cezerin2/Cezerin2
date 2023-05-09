import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import CustomersService from "../services/customers/customers"

const router = new Router()

const getCustomers: Middleware = async ctx => {
  const data = await CustomersService.getCustomers(ctx.query)
  ctx.body = data
}

const getSingleCustomer: Middleware = async ctx => {
  const data = await CustomersService.getSingleCustomer(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addCustomer: Middleware = async ctx => {
  const data = await CustomersService.addCustomer(ctx.request.body)
  ctx.body = data
}

const updateCustomer: Middleware = async ctx => {
  const data = await CustomersService.updateCustomer(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteCustomer: Middleware = async ctx => {
  const data = await CustomersService.deleteCustomer(ctx.params.id)
  if (data) {
    ctx.status = 200
  } else ctx.status = 404
}

const addAddress: Middleware = ctx =>
  CustomersService.addAddress(ctx.params.id, ctx.request.body)

const updateAddress: Middleware = ctx =>
  CustomersService.updateAddress(
    ctx.params.id,
    ctx.params.address_id,
    ctx.request.body
  )

const deleteAddress: Middleware = ctx =>
  CustomersService.deleteAddress(ctx.params.id, ctx.params.address_id)

const setDefaultBilling: Middleware = ctx =>
  CustomersService.setDefaultBilling(ctx.params.id, ctx.params.address_id)

const setDefaultShipping: Middleware = ctx =>
  CustomersService.setDefaultShipping(ctx.params.id, ctx.params.address_id)

router
  .get(
    "/v1/customers",
    security.checkUserScope(security.scope.READ_CUSTOMERS),
    getCustomers
  )
  .post(
    "/v1/customers",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    addCustomer
  )
  .get(
    "/v1/customers/:id",
    security.checkUserScope(security.scope.READ_CUSTOMERS),
    getSingleCustomer
  )
  .put(
    "/v1/customers/:id",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    updateCustomer
  )
  .delete(
    "/v1/customers/:id",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    deleteCustomer
  )
  .post(
    "/v1/customers/:id/addresses",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    addAddress
  )
  .put(
    "/v1/customers/:id/addresses/:address_id",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    updateAddress
  )
  .delete(
    "/v1/customers/:id/addresses/:address_id",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    deleteAddress
  )
  .post(
    "/v1/customers/:id/addresses/:address_id/default_billing",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    setDefaultBilling
  )
  .post(
    "/v1/customers/:id/addresses/:address_id/default_shipping",
    security.checkUserScope(security.scope.WRITE_CUSTOMERS),
    setDefaultShipping
  )

export default router
