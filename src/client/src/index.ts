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
import { ClientType, Options } from "./types"
import WebStoreAccount from "./webstore/account"
import WebStoreServices from "./webstore/services"
import WebStoreClient from "./webstoreClient"

class Client extends ClientType {
  constructor(
    { apiBaseUrl, apiToken, ajaxBaseUrl, webstoreToken }: Options = {
      apiBaseUrl: "/api/v1",
      ajaxBaseUrl: "/ajax",
    }
  ) {
    super()

    const apiClient = new ApiClient({
      baseUrl: apiBaseUrl,
      token: apiToken,
    })

    const ajaxClient = new AjaxClient({ baseUrl: ajaxBaseUrl })
    const webstoreClient = new WebStoreClient({ token: webstoreToken })

    this.products = new Products(apiClient)
    this.productCategories = new ProductCategories(apiClient)
    this.customers = new Customers(apiClient)
    this.orders = new Orders(apiClient)
    this.orderStatuses = new OrderStatuses(apiClient)
    this.shippingMethods = new ShippingMethods(apiClient)
    this.paymentMethods = new PaymentMethods(apiClient)
    this.paymentGateways = new PaymentGateways(apiClient)
    this.customerGroups = new CustomerGroups(apiClient)
    this.sitemap = new Sitemap(apiClient)
    this.theme = new Theme(apiClient)
    this.countries = new Countries(apiClient)
    this.currencies = new Currencies(apiClient)
    this.text = new Text(apiClient)
    this.settings = new Settings(apiClient)
    this.checkoutFields = new CheckoutFields(apiClient)
    this.pages = new Pages(apiClient)
    this.tokens = new Tokens(apiClient)
    this.redirects = new Redirects(apiClient)
    this.webhooks = new Webhooks(apiClient)
    this.files = new Files(apiClient)
    this.apps = { settings: new AppSettings(apiClient) }

    this.ajax = {
      products: new Products(ajaxClient),
      sitemap: new Sitemap(ajaxClient),
      cart: new AjaxCart(ajaxClient),
      login: new AjaxLogin(ajaxClient),
      register: new AjaxRegister(ajaxClient),
      account: new AjaxAccount(ajaxClient),
      forgotPassword: new AjaxForgotPassword(ajaxClient),
      resetPassword: new AjaxResetPassword(ajaxClient),
      cookieBanner: new AjaxCookieBanner(ajaxClient),
      countries: new Countries(ajaxClient),
      currencies: new Currencies(ajaxClient),
      shippingMethods: new AjaxShippingMethods(ajaxClient),
      paymentMethods: new AjaxPaymentMethods(ajaxClient),
      paymentFormSettings: new AjaxPaymentFormSettings(ajaxClient),
      pages: new Pages(ajaxClient),
    }

    this.webstore = {
      account: new WebStoreAccount(webstoreClient),
      services: new WebStoreServices(webstoreClient),
    }
  }

  static authorize = ApiClient.authorize

  static authorizeInWebStore = WebStoreClient.authorize
}

export default Client
