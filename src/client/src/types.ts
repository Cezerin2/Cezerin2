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
import WebStoreAccount from "./webstore/account"
import WebStoreServices from "./webstore/services"

export interface Options {
  apiBaseUrl?: string
  apiToken?: string
  ajaxBaseUrl?: string
  webstoreToken?: string
}

export class ClientType {
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
}
