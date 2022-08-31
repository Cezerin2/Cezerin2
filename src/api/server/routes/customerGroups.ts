import Router, { Middleware } from "@koa/router"
import security from "../lib/security"
import CustomerGroupsService from "../services/customers/customerGroups"

const router = new Router()

const getGroups: Middleware = async ctx => {
  const data = await CustomerGroupsService.getGroups(ctx.query)
  ctx.body = data
}

const getSingleGroup: Middleware = async ctx => {
  const data = await CustomerGroupsService.getSingleGroup(ctx.params.id)
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const addGroup: Middleware = async ctx => {
  const data = await CustomerGroupsService.addGroup(ctx.request.body)
  ctx.body = data
}

const updateGroup: Middleware = async ctx => {
  const data = await CustomerGroupsService.updateGroup(
    ctx.params.id,
    ctx.request.body
  )
  if (data) {
    ctx.body = data
  } else ctx.status = 404
}

const deleteGroup: Middleware = async ctx => {
  const data = await CustomerGroupsService.deleteGroup(ctx.params.id)
  if (data) {
    ctx.status = 200
  } else ctx.status = 404
}

router
  .get(
    "/v1/customer_groups",
    security.checkUserScope(security.scope.READ_CUSTOMER_GROUPS),
    getGroups
  )
  .post(
    "/v1/customer_groups",
    security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
    addGroup
  )
  .get(
    "/v1/customer_groups/:id",
    security.checkUserScope(security.scope.READ_CUSTOMER_GROUPS),
    getSingleGroup
  )
  .put(
    "/v1/customer_groups/:id",
    security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
    updateGroup
  )
  .delete(
    "/v1/customer_groups/:id",
    security.checkUserScope(security.scope.WRITE_CUSTOMER_GROUPS),
    deleteGroup
  )

export default router
