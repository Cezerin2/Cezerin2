import React, { FC, useState } from "react"
import { Redirect } from "react-router-dom"
import { themeSettings } from "../../lib/settings"
import ResetPassword from "./resetPassword"

interface Props {
  resetPassword
  location
  state
  history
}

const ResetPasswordForm: FC<Props> = props => {
  const [verifiedToken, setVerifiedToken] = useState(false)

  const { resetPassword, location, state, history } = props

  const verifyToken = () => {
    setVerifiedToken(true)
    resetPassword({
      token: location.search.split("=")[1],
    })
  }

  const handleFormSubmit = values => {
    const userId = state.resetPasswordProperties.id
    resetPassword({
      id: userId,
      password: values.password,
      history,
    })
  }

  if (!verifiedToken) verifyToken()

  const { settings, forgotPasswordProperties, resetPasswordProperties } = state

  if (
    location.search === "" ||
    location.search.indexOf("?token=") === -1 ||
    (resetPasswordProperties && !resetPasswordProperties.status)
  ) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
  } = themeSettings

  return (
    <div>
      {resetPasswordProperties && (
        <ResetPassword
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          settings={settings}
          forgotPasswordProperties={forgotPasswordProperties}
          resetPasswordProperties={resetPasswordProperties}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

export default ResetPasswordForm
