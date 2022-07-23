import Lscache from "lscache"
import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { themeSettings } from "../../lib/settings"
import Account from "./account"

interface Props {
  customerData
  changecustomerProperties
  state
  history
  updateCart
}

const AccountForm: FC<Props> = props => {
  const { customerData, changecustomerProperties, state, history, updateCart } =
    props

  const handlecustomerProperties = () => {
    customerData({
      token: Lscache.get("auth_data"),
    })
  }

  const handleFormSubmit = values => {
    const { shipping_address, billing_address } = values
    changecustomerProperties({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      token: Lscache.get("auth_data"),
      shipping_address,
      billing_address,
      saved_addresses: state.customerProperties.order_statuses.total_count,
      history: history,
    })

    updateCart({
      shipping_address: shipping_address,
      billing_address: billing_address,
      payment_method_id: null,
      shipping_method_id: null,
    })
  }

  const {
    settings,
    cart,
    customerProperties,
    initialValues,
    cartlayerBtnInitialized,
  } = state

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
        customerProperties={customerProperties || handlecustomerProperties()}
        initialValues={initialValues}
        cartlayerBtnInitialized={cartlayerBtnInitialized}
        onSubmit={handleFormSubmit}
      />
    )
  }
}

export default AccountForm
