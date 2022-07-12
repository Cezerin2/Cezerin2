import React, { FC, useEffect } from "react"

let scriptAdded = false

interface Props {
  formSettings
  shopSettings
  onPayment
}

const PayPalButton: FC<Props> = props => {
  const { formSettings, shopSettings, onPayment } = props

  const addScript = () => {
    if (scriptAdded) {
      executeScript()
      return
    }

    const SCRIPT_URL = "https://www.paypalobjects.com/api/checkout.min.js"
    const container = document.body || document.head
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.onload = () => {
      executeScript()
    }
    container.appendChild(script)
    scriptAdded = true
  }

  const executeScript = () => {
    document.getElementById("paypal-button-container").innerHTML = null

    paypal.Button.render(
      {
        // Set your environment
        env: formSettings.env, // sandbox | production
        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,
        // Specify the style of the button
        style: {
          label: "pay",
          size: formSettings.size,
          shape: formSettings.shape,
          color: formSettings.color,
        },
        client: {
          sandbox: formSettings.client,
          production: formSettings.client,
        },
        // Wait for the PayPal button to be clicked
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              intent: "sale",
              transactions: [
                {
                  custom: formSettings.order_id,
                  notify_url: formSettings.notify_url,
                  amount: {
                    total: formSettings.amount,
                    currency: formSettings.currency,
                  },
                },
              ],
            },
            experience: {
              input_fields: { no_shipping: 1 },
            },
          })
        },
        // Wait for the payment to be authorized by the customer
        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function () {
            onPayment()
          })
        },
      },
      "#paypal-button-container"
    )
  }

  useEffect(() => {
    addScript()
  }, [])

  useEffect(() => {
    executeScript()
  })

  return (
    <div>
      <div id="paypal-button-container" />
    </div>
  )
}

export default PayPalButton
