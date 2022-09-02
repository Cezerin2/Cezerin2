import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { FC, FormEventHandler, useState } from "react"
import CardSection from "./CardSection"

interface Props {
  formSettings
  onCreateToken
}

const CheckoutForm: FC<Props> = props => {
  const [inProgress, setInProgress] = useState(false)

  // Get a reference to Stripe or Elements using hooks.
  const stripe = useStripe()
  const elements = useElements()

  const { formSettings, onCreateToken } = props

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setInProgress(true)

    // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements.getElement(CardElement)

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    const { token } = await stripe.createToken(cardElement, {
      name: formSettings.email,
    })

    // TODO: confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
    // stripe.confirmCardPayment(paymentIntentClientSecret, {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // })

    if (token && token !== "undefined") {
      onCreateToken(token.id)
    } else {
      setInProgress(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection title="Credit Card details" />
      <div className="checkout-button-wrap">
        <button
          disabled={inProgress}
          className={`checkout-button button is-primary${
            inProgress ? " is-loading" : ""
          }`}
        >
          Confirm order
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
