import React from "react"
import { themeSettings } from "../../lib/settings"
import ForgotPassword from "./forgotPassword"

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit = values => {
    this.props.forgotPassword({
      email: values.email,
      history: this.props.history,
    })
  }

  render() {
    const { settings, forgotPasswordProperties } = this.props.state

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
          onSubmit={this.handleFormSubmit}
        />
      </div>
    )
  }
}

export default ForgotPasswordForm
