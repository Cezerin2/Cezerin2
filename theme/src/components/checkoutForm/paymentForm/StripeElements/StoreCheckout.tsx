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
    shopSettings={shopSettings}
    onPayment={onPayment}
    onCreateToken={onCreateToken}
  />
)

export default StoreCheckout
