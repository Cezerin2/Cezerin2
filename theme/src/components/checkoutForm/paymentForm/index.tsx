import React, { FC, useEffect, useState } from "react"
import api from "../../../lib/api"
import LiqPay from "./LiqPay"
import PayPalCheckout from "./PayPalCheckout"
import StripeElements from "./StripeElements"

interface Props {
  gateway
  shopSettings
  onPayment
  onCreateToken
  amount
}

const PaymentForm: FC<Props> = props => {
  const [formSettings, setFormSettings] = useState(null)
  const [loading, setLoading] = useState(false)

  const { gateway, shopSettings, onPayment, onCreateToken, amount } = props

  const fetchFormSettings = () => {
    setLoading(true)

    api.ajax.paymentFormSettings
      .retrieve()
      .then(({ status, json }) => {
        setFormSettings(json)
        setLoading(false)
      })
      .catch(e => {
        setFormSettings(null)
        setLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    fetchFormSettings()
  }, [gateway, amount])

  if (loading) {
    return null
  } else if (formSettings && gateway && gateway !== "") {
    switch (gateway) {
      case "paypal-checkout":
        return (
          <div className="payment-form">
            <PayPalCheckout
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "liqpay":
        return (
          <div className="payment-form">
            <LiqPay
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "stripe-elements":
        return (
          <div className="payment-form">
            <StripeElements
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
              onCreateToken={onCreateToken}
            />
          </div>
        )
      default:
        return (
          <div>
            Payment Gateway <b>{gateway}</b> not found!
          </div>
        )
    }
  } else {
    return null
  }
}

export default PaymentForm
