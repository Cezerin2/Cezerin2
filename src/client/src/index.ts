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
import WebStoreAccount from "./webstore/account"
import WebStoreServices from "./webstore/services"
import WebStoreClient from "./webstoreClient"

interface Options {
  apiBaseUrl?: string
  apiToken?: string
  ajaxBaseUrl?: string
  webstoreToken?: string
}

class Client {
  apiBaseUrl?: string
  apiToken?: string
  ajaxBaseUrl?: string
  webstoreToken?: string
  products: Products
  productCategories: ProductCategories
  customers: Customers
  orders: Orders
  orderStatuses: OrderStatuses
  shippingMethods: ShippingMethods
  paymentMethods: PaymentMethods
  paymentGateways: PaymentGateways
  customerGroups: CustomerGroups
  sitemap: Sitemap
  theme: Theme
  countries: Countries
  currencies: Currencies
  text: Text
  settings: Settings
  checkoutFields: CheckoutFields
  pages: Pages
  tokens: Tokens
  redirects: Redirects
  webhooks: Webhooks
  files: Files
  apps: { settings: AppSettings }
  ajax: {
    products: Products
    sitemap: Sitemap
    cart: AjaxCart
    login: AjaxLogin
    register: AjaxRegister
    account: AjaxAccount
    forgotPassword: AjaxForgotPassword
    resetPassword: AjaxResetPassword
    cookieBanner: AjaxCookieBanner
    countries: Countries
    currencies: Currencies
    shippingMethods: AjaxShippingMethods
    paymentMethods: AjaxPaymentMethods
    paymentFormSettings: AjaxPaymentFormSettings
    pages: Pages
  }
  webstore: { account: WebStoreAccount; services: WebStoreServices }

  constructor(options: Options = {}) {
    this.apiBaseUrl = options.apiBaseUrl || "/api/v1"
    this.apiToken = options.apiToken
    this.ajaxBaseUrl = options.ajaxBaseUrl || "/ajax"
    this.webstoreToken = options.webstoreToken

    const apiClient = new ApiClient({
      baseUrl: this.apiBaseUrl,
      token: this.apiToken,
    })
    const ajaxClient = new AjaxClient({ baseUrl: this.ajaxBaseUrl })
    const webstoreClient = new WebStoreClient({ token: this.webstoreToken })

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
