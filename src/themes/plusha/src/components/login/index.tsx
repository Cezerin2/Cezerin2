import React from "react"
import AuthHeader from "../authHeader"
import { themeSettings, text } from "../../lib/settings"
import Lscache from "lscache"
import Login from "./login"

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit = values => {
    let cartLayer = false
    if (
      this.props.location !== undefined &&
      this.props.location.state !== undefined
    ) {
      if (
        this.props.location.state.cartLayer &&
        Lscache.get("auth_data") === null
      ) {
        cartLayer = true
      }
    }

    this.props.loginUser({
      email: values.email,
      password: AuthHeader.encodeUserPassword(values.password),
      history: this.props.history,
      cartLayer,
    })
  }

  render() {
    const { settings, customerProperties, cartlayerBtnInitialized } =
      this.props.state

    if (this.props.state.customerProperties !== undefined) {
      if (this.props.state.customerProperties.authenticated) {
        const expiryMilliseconds = 1000 // time units is seconds
        Lscache.setExpiryMilliseconds(expiryMilliseconds)
        Lscache.set(
          "auth_data",
          this.props.state.customerProperties.token,
          6000
        )
        // Lscache.set('customer_data', this.props.state.customerProperties, 6000);
      }
    }

    const {
      checkoutInputClass = "checkout__field",
      checkoutButtonClass = "checkout__button button",
      checkoutEditButtonClass = "checkout__button_edit",
    } = themeSettings

    return (
      <Login
        inputClassName={checkoutInputClass}
        buttonClassName={checkoutButtonClass}
        editButtonClassName={checkoutEditButtonClass}
        settings={settings}
        customerProperties={customerProperties}
        cartlayerBtnInitialized={cartlayerBtnInitialized}
        readOnly
        onSubmit={this.handleFormSubmit}
      />
    )
  }
}
