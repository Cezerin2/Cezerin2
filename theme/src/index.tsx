import "core-js/stable"
import "regenerator-runtime/runtime"

export { default as AccountContainer } from "./containers/account"
export { default as CategoryContainer } from "./containers/category"
export { default as CheckoutContainer } from "./containers/checkout"
export { default as CheckoutSuccessContainer } from "./containers/checkoutSuccess"
export { default as ForgotPasswordContainer } from "./containers/forgotPassword"
export { default as IndexContainer } from "./containers/index"
export { default as LoginContainer } from "./containers/login"
export { default as NotFoundContainer } from "./containers/notfound"
export { default as PageContainer } from "./containers/page"
export { default as ProductContainer } from "./containers/product"
export { default as RegisterContainer } from "./containers/register"
export { default as ResetPasswordContainer } from "./containers/resetPassword"
export { default as SearchContainer } from "./containers/search"
export { default as SharedContainer } from "./containers/shared"
export { initOnClient, initOnServer } from "./lib/settings"

// combine all css files into one with webpack. Hack to deal with server side rendering.
if (typeof window !== "undefined") {
  require("../assets/scss/theme.scss")
}
