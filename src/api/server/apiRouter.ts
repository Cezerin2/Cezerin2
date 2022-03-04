import express from "express"
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
import ThemeRoute from "./routes/theme"
import SecurityTokensRoute from "./routes/tokens"
import WebhooksRoute from "./routes/webhooks"

const apiRouter = express.Router()

new ProductsRoute(apiRouter)
new ProductCategoriesRoute(apiRouter)
new SitemapRoute(apiRouter)
new ThemeRoute(apiRouter)
new CustomersRoute(apiRouter)
new CustomerGroupsRoute(apiRouter)
new OrdersRoute(apiRouter)
new OrderStatusesRoute(apiRouter)
new ShippingMethodsRoute(apiRouter)
new PaymentMethodsRoute(apiRouter)
new PaymentGatewaysRoute(apiRouter)
new SettingsRoute(apiRouter)
new PagesRoute(apiRouter)
new SecurityTokensRoute(apiRouter)
new NotificationsRoute(apiRouter)
new RedirectsRoute(apiRouter)
new FilesRoute(apiRouter)
new AppsRoute(apiRouter)
new WebhooksRoute(apiRouter)

export default apiRouter
