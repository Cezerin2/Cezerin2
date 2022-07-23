import Lscache from "lscache"
import React, { FC } from "react"
import { themeSettings } from "../../lib/settings"
import Login from "./login"

interface Props {
  location
  loginUser
  history
  state
}

const LoginForm: FC<Props> = props => {
  const { location, loginUser, history, state } = props

  const handleFormSubmit = values => {
    let cartLayer = false
    if (location !== undefined && location.state !== undefined) {
      if (location.state.cartLayer && Lscache.get("auth_data") === null) {
        cartLayer = true
      }
    }

    loginUser({
      email: values.email,
      password: values.password,
      history: history,
      cartLayer: cartLayer,
    })
  }

  const { settings, customerProperties, cartlayerBtnInitialized } = state

  if (state.customerProperties !== undefined) {
    if (state.customerProperties.authenticated) {
      const expiryMilliseconds = 1000 //time units is seconds
      Lscache.setExpiryMilliseconds(expiryMilliseconds)
      Lscache.set("auth_data", state.customerProperties.token, 6000)
    }
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  return (
    <Login
      inputClassName={checkoutInputClass}
      buttonClassName={checkoutButtonClass}
      editButtonClassName={checkoutEditButtonClass}
      settings={settings}
      customerProperties={customerProperties}
      cartlayerBtnInitialized={cartlayerBtnInitialized}
      readOnly={true}
      onSubmit={handleFormSubmit}
    />
  )
}

export default LoginForm
