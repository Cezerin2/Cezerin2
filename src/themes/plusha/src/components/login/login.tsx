import React from "react"
import { Field, reduxForm } from "redux-form"
import { themeSettings, text } from "../../lib/settings"
import { Link, Redirect, NavLink } from "react-router-dom"
import Lscache from "lscache"

const validateRequired = value =>
  value && value.length > 0 ? undefined : text.required

const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? text.emailInvalid
    : undefined

const ReadOnlyField = ({ name, value }) => {
  return (
    <div className="checkout__field-preview field-preview">
      <div className="field-preview__name">{name}</div>
      <div className="field-preview__value">{value}</div>
    </div>
  )
}

const InputField = field => (
  <div className={field.className}>
    <input
      {...field.input}
      placeholder={field.label}
      type={field.type}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
    <label htmlFor={field.id}>
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
      <span className="login__label">{field.label}</span>
    </label>
  </div>
)

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unauthorized: false,
    }
  }

  verifyAuth() {
    this.setState({ unauthorized: true })
  }

  getField = fieldName => {
    const fields = this.props.checkoutFields || []
    const field = fields.find(item => item.name === fieldName)
    return field
  }

  getFieldStatus = fieldName => {
    const field = this.getField(fieldName)
    return field && field.status ? field.status : "required"
  }

  isFieldOptional = fieldName => {
    return this.getFieldStatus(fieldName) === "optional"
  }

  isFieldHidden = fieldName => {
    return this.getFieldStatus(fieldName) === "hidden"
  }

  getFieldValidators = fieldName => {
    const isOptional = this.isFieldOptional(fieldName)
    let validatorsArray = []
    if (!isOptional) {
      validatorsArray.push(validateRequired)
    }
    if (fieldName === "email") {
      validatorsArray.push(validateEmail)
    }

    return validatorsArray
  }

  getFieldPlaceholder = fieldName => {
    const field = this.getField(fieldName)
    return field && field.placeholder && field.placeholder.length > 0
      ? field.placeholder
      : ""
  }

  getFieldLabelText = fieldName => {
    const field = this.getField(fieldName)
    if (field && field.label && field.label.length > 0) {
      return field.label
    } else {
      switch (fieldName) {
        case "email":
          return text.email
          break
        case "password":
          return text.password
          break
        default:
          return "Unnamed field"
      }
    }
  }

  getFieldLabel = fieldName => {
    const labelText = this.getFieldLabelText(fieldName)
    return this.isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  render() {
    const { handleSubmit, customerProperties, cartlayerBtnInitialized } =
      this.props

    if (
      this.props.customerProperties !== undefined &&
      Lscache.get("auth_data") !== null
    ) {
      return (
        <Redirect
          to={{
            pathname: "/customer-account",
          }}
        />
      )
    }

    if (this.props.customerProperties !== undefined) {
      if (!this.props.customerProperties.authenticated) {
        if (!this.state.unauthorized) {
          this.verifyAuth()
        }
      }
    }

    const inputClassName = "login__input-field"
    const titleClassName = "login__title"
    const loginButtonClass = "login__button button button_login"
    const loginSectionGuest = "login__section login__section_guest"
    const errorAlertText = "error-alert-text"
    const loginForm =
      this.props.cartlayerBtnInitialized !== undefined &&
      this.props.cartlayerBtnInitialized
        ? "login__section login__section_with-guest"
        : "login__section"

    return (
      <section className="login-container section-container">
        <div className={loginForm}>
          <form onSubmit={handleSubmit} className="login__form">
            <h2 className={titleClassName}>{text.login_title}</h2>
            {this.props.customerProperties !== undefined &&
            this.props.customerProperties.loggedin_failed ? (
              <p className={errorAlertText}>{text.login_failed}</p>
            ) : (
              ""
            )}
            {!this.isFieldHidden("email") && (
              <Field
                className={inputClassName}
                name="email"
                id="customer.email"
                component={InputField}
                type="email"
                label={this.getFieldLabel("email")}
                validate={this.getFieldValidators("email")}
                placeholder={this.getFieldPlaceholder("email")}
              />
            )}

            {!this.isFieldHidden("password") && (
              <Field
                className={inputClassName}
                name="password"
                id="customer.password"
                component={InputField}
                type="password"
                label={this.getFieldLabel("password")}
                validate={this.getFieldValidators("password")}
                placeholder={this.getFieldPlaceholder("password")}
              />
            )}
            <div className="login__link">
              <Link to="/forgot-password">{text.forgot_password}</Link>
            </div>
            <button type="submit" className={loginButtonClass}>
              {text.login}
            </button>

            <NavLink className="login__registration" to="/register">
              <button
                type="button"
                className="login__button button button_light"
                onClick={this.switchRegister}
              >
                {text.register}
              </button>
            </NavLink>
          </form>
        </div>

        {this.props.cartlayerBtnInitialized !== undefined &&
          this.props.cartlayerBtnInitialized && (
            <div className={loginSectionGuest}>
              <div className="login__guest">
                <h2 className={titleClassName}>
                  {text.continue_guest_headline}
                </h2>
                <p className="login__text_guest">{text.continue_guest_text}</p>
                <NavLink className={loginButtonClass} to="/checkout">
                  {text.proceedToCheckout}
                </NavLink>
              </div>
            </div>
          )}
      </section>
    )
  }
}
export default reduxForm({
  form: "Login",
})(Login)
