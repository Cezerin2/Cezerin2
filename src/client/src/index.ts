import AjaxClient from "./ajaxClient"
import AjaxAccount from "./api/ajaxAccount"
import AjaxCart from "./api/ajaxCart"
import AjaxCookieBanner from "./api/ajaxCookieBanner"
import AjaxForgotPassword from "./api/ajaxForgotPassword"
import AjaxLogin from "./api/ajaxLogin"
import AjaxPaymentFormSettings from "./api/ajaxPaymentFormSettings"
import AjaxPaymentMethods from "./api/ajaxPaymentMethods"
import AjaxRegister from "./api/ajaxRegister"
import AjaxResetPassword from "./api/ajaxResetPassword"
import AjaxShippingMethods from "./api/ajaxShippingMethods"
import AppSettings from "./api/apps/settings"
import CheckoutFields from "./api/checkoutFields"
import Countries from "./api/countries"
import Currencies from "./api/currencies"
import CustomerGroups from "./api/customerGroups"
import Customers from "./api/customers"
import Files from "./api/files"
import Orders from "./api/orders/orders"
import OrderStatuses from "./api/orders/statuses"
import Pages from "./api/pages"
import PaymentGateways from "./api/paymentGateways"
import PaymentMethods from "./api/paymentMethods"
import ProductCategories from "./api/productCategories"
import Products from "./api/products/products"
import Redirects from "./api/redirects"
import Settings from "./api/settings"
import ShippingMethods from "./api/shippingMethods"
import Sitemap from "./api/sitemap"
import Text from "./api/text"
import Theme from "./api/theme/theme"
import Tokens from "./api/tokens"
import Webhooks from "./api/webhooks"
import ApiClient from "./apiClient"
import { Options } from "./types"
import WebStoreAccount from "./webstore/account"
import WebStoreServices from "./webstore/services"
import WebStoreClient from "./webstoreClient"

export const Client = (options: Options) => {
  const {
    apiBaseUrl = "/api/v1",
    apiToken,
    ajaxBaseUrl = "/ajax",
    webstoreToken,
  } = options

  const apiClient = ApiClient({
    baseUrl: apiBaseUrl,
    token: apiToken,
  })

  const ajaxClient = AjaxClient({ baseUrl: ajaxBaseUrl })
  const webstoreClient = WebStoreClient({ token: webstoreToken })

  return {
    products: Products(apiClient),
    productCategories: ProductCategories(apiClient),
    customers: Customers(apiClient),
    orders: Orders(apiClient),
    orderStatuses: OrderStatuses(apiClient),
    shippingMethods: ShippingMethods(apiClient),
    paymentMethods: PaymentMethods(apiClient),
    paymentGateways: PaymentGateways(apiClient),
    customerGroups: CustomerGroups(apiClient),
    sitemap: Sitemap(apiClient),
    theme: Theme(apiClient),
    countries: Countries(apiClient),
    currencies: Currencies(apiClient),
    text: Text(apiClient),
    settings: Settings(apiClient),
    checkoutFields: CheckoutFields(apiClient),
    pages: Pages(apiClient),
    tokens: Tokens(apiClient),
    redirects: Redirects(apiClient),
    webhooks: Webhooks(apiClient),
    files: Files(apiClient),
    apps: { settings: AppSettings(apiClient) },

    ajax: {
      products: Products(ajaxClient),
      sitemap: Sitemap(ajaxClient),
      cart: AjaxCart(ajaxClient),
      login: AjaxLogin(ajaxClient),
      register: AjaxRegister(ajaxClient),
      account: AjaxAccount(ajaxClient),
      forgotPassword: AjaxForgotPassword(ajaxClient),
      resetPassword: AjaxResetPassword(ajaxClient),
      cookieBanner: AjaxCookieBanner(ajaxClient),
      countries: Countries(ajaxClient),
      currencies: Currencies(ajaxClient),
      shippingMethods: AjaxShippingMethods(ajaxClient),
      paymentMethods: AjaxPaymentMethods(ajaxClient),
      paymentFormSettings: AjaxPaymentFormSettings(ajaxClient),
      pages: Pages(ajaxClient),
    },

    webstore: {
      account: WebStoreAccount(webstoreClient),
      services: WebStoreServices(webstoreClient),
    },
  }
}

export const { authorize } = ApiClient
export const authorizeInWebStore = WebStoreClient.authorize

export default Client
