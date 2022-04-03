import { Router } from "express"
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

const apiRouter = Router()

apiRouter.use(ProductsRoute)
apiRouter.use(ProductCategoriesRoute)
apiRouter.use(SitemapRoute)
apiRouter.use(ThemeRoute)
apiRouter.use(CustomersRoute)
apiRouter.use(CustomerGroupsRoute)
apiRouter.use(OrdersRoute)
apiRouter.use(OrderStatusesRoute)
apiRouter.use(ShippingMethodsRoute)
apiRouter.use(PaymentMethodsRoute)
apiRouter.use(PaymentGatewaysRoute)
apiRouter.use(SettingsRoute)
apiRouter.use(PagesRoute)
apiRouter.use(SecurityTokensRoute)
apiRouter.use(NotificationsRoute)
apiRouter.use(RedirectsRoute)
apiRouter.use(FilesRoute)
apiRouter.use(AppsRoute)
apiRouter.use(WebhooksRoute)

export default apiRouter
