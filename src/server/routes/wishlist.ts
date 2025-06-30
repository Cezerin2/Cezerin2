import Router from "@koa/router"
import security from "../lib/security"
import WishlistService from "../services/wishlist/wishlist"

const router = new Router()

router.get(
  "/v1/wishlist",
  security.checkUserScope.bind(this, security.scope.READ_CUSTOMERS),
  async ctx => {
    try {
      const data = await WishlistService.getWishlist(ctx.query)
      ctx.status = 200
      ctx.body = data
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
)

router.post(
  "/v1/wishlist/items",
  security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
  async ctx => {
    try {
      const data = await WishlistService.addItem(ctx.request.body)
      ctx.status = 200
      ctx.body = data
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
)

router.delete(
  "/v1/wishlist/items/:id",
  security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
  async ctx => {
    try {
      const result = await WishlistService.deleteItem(ctx.params.id)
      ctx.status = result ? 200 : 404
      ctx.body = { success: result }
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
)

router.delete(
  "/v1/wishlist/items/product/:product_id",
  security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
  async ctx => {
    try {
      const { customer_id, session_id, variant_id } = ctx.query
      const result = await WishlistService.deleteItemByProduct(
        customer_id,
        session_id,
        ctx.params.product_id,
        variant_id
      )
      ctx.status = result ? 200 : 404
      ctx.body = { success: result }
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
)

router.post(
  "/v1/wishlist/transfer",
  security.checkUserScope.bind(this, security.scope.WRITE_CUSTOMERS),
  async ctx => {
    try {
      const { session_id, customer_id } = ctx.request.body
      const result = await WishlistService.transferSessionToCustomer(
        session_id,
        customer_id
      )
      ctx.status = 200
      ctx.body = { transferred: result }
    } catch (error) {
      ctx.throw(500, error.message)
    }
  }
)

export default router
