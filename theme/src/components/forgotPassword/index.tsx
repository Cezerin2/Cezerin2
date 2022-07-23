import React, { FC } from "react"
import { themeSettings } from "../../lib/settings"
import ForgotPassword from "./forgotPassword"

interface Props {
  forgotPassword
  history
  state
}

const ForgotPasswordForm: FC<Props> = props => {
  const { forgotPassword, history, state } = props

  const handleFormSubmit = values => {
    forgotPassword({
      email: values.email,
      history: history,
    })
  }

  const { settings, forgotPasswordProperties } = state

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
  } = themeSettings

  return (
    <div>
      <ForgotPassword
        inputClassName={checkoutInputClass}
        buttonClassName={checkoutButtonClass}
        settings={settings}
        forgotPasswordProperties={forgotPasswordProperties}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default ForgotPasswordForm
