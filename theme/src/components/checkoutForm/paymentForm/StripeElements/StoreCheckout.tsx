import React from "react"
import InjectedCheckoutForm from "./CheckoutForm"

const StoreCheckout = ({
  formSettings,
  shopSettings,
  onPayment,
  onCreateToken,
}) => (
  <InjectedCheckoutForm
    formSettings={formSettings}
    onCreateToken={onCreateToken}
  />
)

export default StoreCheckout
