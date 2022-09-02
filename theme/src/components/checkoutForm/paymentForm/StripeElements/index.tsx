import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { FC } from "react"
import StoreCheckout from "./StoreCheckout"

interface Props {
  formSettings
  shopSettings
  onPayment
  onCreateToken
}

const StripeElements: FC<Props> = props => {
  const { formSettings, shopSettings, onPayment, onCreateToken } = props

  // Create the Stripe object yourself...
  const stripePromise = loadStripe(formSettings.public_key)

  return (
    <Elements stripe={stripePromise}>
      <StoreCheckout
        formSettings={formSettings}
        shopSettings={shopSettings}
        onPayment={onPayment}
        onCreateToken={onCreateToken}
      />
    </Elements>
  )
}

export default StripeElements
