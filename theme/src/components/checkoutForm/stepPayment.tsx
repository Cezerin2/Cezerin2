import React, { FC } from "react"
import { text } from "../../lib/settings"
import PaymentForm from "./paymentForm"

interface Props {
  cart: { payment_method_gateway; grand_total }
  settings
  processingCheckout
  handleSuccessPayment
  inputClassName
  buttonClassName
  shippingMethod
  show
  title
  onCreateToken
}

const CheckoutStepPayment: FC<Props> = props => {
  const {
    cart: { payment_method_gateway, grand_total },
    settings,
    processingCheckout,
    handleSuccessPayment,
    inputClassName,
    buttonClassName,
    shippingMethod,
    show,
    title,
    onCreateToken,
  } = props

  if (!show)
    return (
      <div className="checkout-step">
        <h1>
          <span>3</span>
          {title}
        </h1>
      </div>
    )

  return (
    <div className="checkout-step">
      <h1>
        <span>3</span>
        {title}
      </h1>
      <div className="checkout-button-wrap">
        {!processingCheckout && (
          <PaymentForm
            gateway={payment_method_gateway}
            amount={grand_total}
            shopSettings={settings}
            shippingMethod={shippingMethod}
            onPayment={handleSuccessPayment}
            inputClassName={inputClassName}
            buttonClassName={buttonClassName}
            onCreateToken={onCreateToken}
          />
        )}
        {processingCheckout && <p>{text.loading}</p>}
      </div>
    </div>
  )
}

export default CheckoutStepPayment
