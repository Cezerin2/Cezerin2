import React, { FC, useState } from "react"
import { themeSettings } from "../../lib/settings"
import Register from "./register"

interface Props {
  registerUser
  history
  location
}

const RegisterForm: FC<Props> = props => {
  const [verifiedToken, setVerifiedToken] = useState(false)

  const { registerUser, history, location } = props

  const handleContactsSubmit = values => {
    registerUser({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      history: history,
    })
  }

  const verifyToken = () => {
    setVerifiedToken(true)

    registerUser({
      token: location.search.split("=")[1],
    })
  }

  if (location.search !== "" && location.search.indexOf("?token=") !== -1) {
    !verifiedToken ? verifyToken() : ""
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  return (
    <Register
      inputClassName={checkoutInputClass}
      buttonClassName={checkoutButtonClass}
      editButtonClassName={checkoutEditButtonClass}
      settings={settings}
      registerProperties={registerProperties}
      onSubmit={handleContactsSubmit}
    />
  )
}

export default RegisterForm
