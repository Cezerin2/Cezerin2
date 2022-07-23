import React, { FC, useEffect } from "react"

let scriptAdded = false

interface Props {
  formSettings
  shopSettings
  onPayment
}

const LiqPayButton: FC<Props> = props => {
  const { formSettings, shopSettings, onPayment } = props

  const addScript = () => {
    if (scriptAdded) {
      executeScript()
      return
    }

    const SCRIPT_URL = "https://static.liqpay.ua/libjs/checkout.js"
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
    LiqPayCheckout.init({
      data: formSettings.data,
      signature: formSettings.signature,
      language: formSettings.language,
      embedTo: "#liqpay_checkout",
      mode: "embed",
    })
      .on("liqpay.callback", function (data) {
        if (data.status === "success") {
          onPayment()
        }
      })
      .on("liqpay.ready", function (data) {
        // ready
      })
      .on("liqpay.close", function (data) {
        // close
      })
  }

  useEffect(() => {
    addScript()
  }, [])

  useEffect(() => {
    executeScript()
  })

  return (
    <div>
      <div id="liqpay_checkout" />
    </div>
  )
}

export default LiqPayButton
