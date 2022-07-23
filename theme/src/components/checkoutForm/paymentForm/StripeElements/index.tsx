import React, { FC, useEffect, useState } from "react"
import { StripeProvider } from "react-stripe-elements"
import StoreCheckout from "./StoreCheckout"

interface Props {
  formSettings
  shopSettings
  onPayment
  onCreateToken
}

const StripeElements: FC<Props> = props => {
  const [stripe, setStripe] = useState(null)

  const { formSettings, shopSettings, onPayment, onCreateToken } = props

  useEffect(() => {
    const SCRIPT_URL = "https://js.stripe.com/v3/"
    const container = document.body || document.head
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => {
      setStripe(window.Stripe(formSettings.public_key))
    }
    container.appendChild(script)
  }, [])

  return (
    <StripeProvider stripe={stripe}>
      <StoreCheckout
        formSettings={formSettings}
        shopSettings={shopSettings}
        onPayment={onPayment}
        onCreateToken={onCreateToken}
      />
    </StripeProvider>
  )
}

export default StripeElements
