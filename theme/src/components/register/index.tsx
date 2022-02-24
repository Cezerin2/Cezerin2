import React from "react"
import { themeSettings } from "../../lib/settings"
import AuthHeader from "../authHeader"
import Register from "./register"

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      verifiedToken: false,
    }
  }

  handleContactsSubmit = values => {
    this.props.registerUser({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: AuthHeader.encodeUserPassword(values.password),
      history: this.props.history,
    })
  }

  verifyToken() {
    this.setState({ verifiedToken: true })
    this.props.registerUser({
      token: this.props.location.search.split("=")[1],
    })
  }

  render() {
    const { settings, registerProperties } = this.props.state

    if (
      this.props.location.search !== "" &&
      this.props.location.search.indexOf("?token=") !== -1
    ) {
      !this.state.verifiedToken ? this.verifyToken() : ""
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
        onSubmit={this.handleContactsSubmit}
      />
    )
  }
}
