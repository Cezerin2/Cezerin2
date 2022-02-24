import Lscache from "lscache"
import React from "react"
import { Redirect } from "react-router-dom"
import { themeSettings } from "../../lib/settings"
import { encodeUserPassword } from "../authHeader"
import Account from "./account"

class AccountForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handlecustomerProperties = () => {
    this.props.customerData({
      token: Lscache.get("auth_data"),
    })
  }

  handleFormSubmit = values => {
    const { shipping_address, billing_address } = values
    this.props.changecustomerProperties({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: encodeUserPassword(values.password),
      token: Lscache.get("auth_data"),
      shipping_address,
      billing_address,
      saved_addresses:
        this.props.state.customerProperties.order_statuses.total_count,
      history: this.props.history,
    })

    this.props.updateCart({
      shipping_address: shipping_address,
      billing_address: billing_address,
      payment_method_id: null,
      shipping_method_id: null,
    })
  }

  render() {
    const {
      settings,
      cart,
      customerProperties,
      initialValues,
      cartlayerBtnInitialized,
    } = this.props.state

    Lscache.flushExpired()

    if (Lscache.get("auth_data") === null && customerProperties === undefined) {
      Lscache.flush()
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    } else {
      const cacheTimeStamp = localStorage.getItem(
        "lscache-auth_data-cacheexpiration"
      )
      if (Number(cacheTimeStamp) <= Math.floor(new Date().getTime() / 1000)) {
        Lscache.flush()
        return (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }

      const {
        checkoutInputClass = "checkout-field",
        checkoutButtonClass = "checkout-button",
        checkoutEditButtonClass = "checkout-button-edit",
      } = themeSettings

      return (
        <Account
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          editButtonClassName={checkoutEditButtonClass}
          settings={settings}
          cart={cart}
          customerProperties={
            customerProperties || this.handlecustomerProperties()
          }
          initialValues={initialValues}
          cartlayerBtnInitialized={cartlayerBtnInitialized}
          onSubmit={this.handleFormSubmit}
        />
      )
    }
  }
}

export default AccountForm
