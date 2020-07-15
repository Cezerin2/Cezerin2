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

const InputField = field => (
  <div className={field.className}>
    <label htmlFor={field.id}>
      {field.label}
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </label>
    <input
      {...field.input}
      placeholder={field.placeholder}
      type={field.type}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comparePassword: "",
    }
  }

  passwordTemp = value => {
    this.setState({ comparePassword: value.currentTarget.defaultValue })
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
    if (fieldName === "password_verify") {
      validatorsArray.push(this.confirmPassword)
    }

    return validatorsArray
  }

  confirmPassword = value => {
    if (value !== this.state.comparePassword) {
      return text.password_verify_failed
    }
    return undefined
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
        case "password":
          return text.password
          break
        case "password_verify":
          return text.password_verify
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
    const {
      handleSubmit,
      forgotPasswordProperties,
      resetPasswordProperties,
    } = this.props

    const inputClassName = "login-input-field"
    const loginTitleClassName = "login-title"
    const loginSuccessTitleClassName = "login-success-title"
    const loginButtonClass = "account-button button"
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-section">
            <h1 className={loginTitleClassName}>{text.reset_password}</h1>
            <p
              className={
                !resetPasswordProperties.verified
                  ? loginTitleClassName
                  : loginSuccessTitleClassName
              }
            >
              {!resetPasswordProperties.verified
                ? text.reset_password_subtitle
                : text.reset_password_subtitle_success}
            </p>

            {!resetPasswordProperties.verified && (
              <Field
                className={inputClassName}
                name="password"
                id="customer.password"
                component={InputField}
                type="password"
                autoComplete="new-password"
                onBlur={this.passwordTemp}
                label={this.getFieldLabel("password")}
                validate={this.getFieldValidators("password")}
                placeholder={this.getFieldPlaceholder("password")}
              />
            )}
            {!resetPasswordProperties.verified && (
              <Field
                className={inputClassName}
                name="password_verify"
                id="customer.password_verify"
                component={InputField}
                type="password"
                autoComplete="new-password"
                onBlur={this.passwordTemp}
                label={this.getFieldLabel("password_verify")}
                validate={this.getFieldValidators("password_verify")}
                placeholder={this.getFieldPlaceholder("password_verify")}
              />
            )}

            <div className="login-button-wrap">
              {!resetPasswordProperties.verified && (
                <button type="submit" className={loginButtonClass}>
                  {text.forgot_password_submit}
                </button>
              )}
              {resetPasswordProperties.verified && (
                <Link
                  to="/login"
                  style={{ textDecoration: "none" }}
                  key={"back-to-login"}
                  className={loginButtonClass}
                >
                  {text.back_to_login}
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default reduxForm({
  form: "ResetPassword",
})(ResetPassword)
