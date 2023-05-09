import Router from "@koa/router"
import AppsRoute from "./routes/apps"
import CustomerGroupsRoute from "./routes/customerGroups"
import CustomersRoute from "./routes/customers"
import FilesRoute from "./routes/files"
import NotificationsRoute from "./routes/notifications"
import OrdersRoute from "./routes/orders"
import OrderStatusesRoute from "./routes/orderStatuses"
import PagesRoute from "./routes/pages"
import PaymentGatewaysRoute from "./routes/paymentGateways"
import PaymentMethodsRoute from "./routes/paymentMethods"
import ProductCategoriesRoute from "./routes/productCategories"
import ProductsRoute from "./routes/products"
import RedirectsRoute from "./routes/redirects"
import SettingsRoute from "./routes/settings"
import ShippingMethodsRoute from "./routes/shippingMethods"
import SitemapRoute from "./routes/sitemap"
import StatusRoute from "./routes/status"
import ThemeRoute from "./routes/theme"
import SecurityTokensRoute from "./routes/tokens"
import WebhooksRoute from "./routes/webhooks"

const apiRouter = new Router()

apiRouter
  .use(ProductsRoute.routes())
  .use(ProductCategoriesRoute.routes())
  .use(SitemapRoute.routes())
  .use(ThemeRoute.routes())
  .use(CustomersRoute.routes())
  .use(CustomerGroupsRoute.routes())
  .use(OrdersRoute.routes())
  .use(OrderStatusesRoute.routes())
  .use(ShippingMethodsRoute.routes())
  .use(PaymentMethodsRoute.routes())
  .use(PaymentGatewaysRoute.routes())
  .use(SettingsRoute.routes())
  .use(PagesRoute.routes())
  .use(SecurityTokensRoute.routes())
  .use(NotificationsRoute.routes())
  .use(RedirectsRoute.routes())
  .use(FilesRoute.routes())
  .use(AppsRoute.routes())
  .use(WebhooksRoute.routes())
  .use(StatusRoute.routes())

export default apiRouter
