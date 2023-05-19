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
    <input
      {...field.input}
      placeholder={field.label}
      type={field.type}
      id={field.id}
      disabled={field.disabled}
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

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
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

  isFieldOptional = fieldName => this.getFieldStatus(fieldName) === "optional"

  isFieldHidden = fieldName => this.getFieldStatus(fieldName) === "hidden"

  isFieldDisabled = fieldName => this.getFieldStatus(fieldName) === "disabled"

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
    }
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

  getFieldLabel = fieldName => {
    const labelText = this.getFieldLabelText(fieldName)
    return this.isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  render() {
    const { handleSubmit, forgotPasswordProperties } = this.props

    const inputClassName = "login__input-field"
    const loginTitleClassName = "login__title"
    const sendPasswordSuccessTitleClassName = "send-password-success-title"
    const sendPasswordFailedTitleClassName = "send-password-failed-title"
    const loginButtonClass = "login__button button button_login"
    return (
      <section className="login-container section-container">
        <div className="login__section">
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className={loginTitleClassName}>{text.forgot_password}</h1>
            <p className="login__text_guest">
              {forgotPasswordProperties === undefined
                ? text.forgot_password_subtitle
                : ""}
            </p>
            {forgotPasswordProperties !== undefined &&
            forgotPasswordProperties.status ? (
              <p className={sendPasswordSuccessTitleClassName}>
                {text.forgot_password_email_sent_success}
              </p>
            ) : (
              ""
            )}
            {forgotPasswordProperties !== undefined &&
            !forgotPasswordProperties.status ? (
              <p className={sendPasswordFailedTitleClassName}>
                {text.forgot_password_email_sent_failed}
              </p>
            ) : (
              ""
            )}
            <Field
              className={inputClassName}
              name="email"
              id="customer.email"
              component={InputField}
              type="email"
              props={
                forgotPasswordProperties !== undefined &&
                forgotPasswordProperties.status
                  ? { disabled: true }
                  : this.value
              }
              label={this.getFieldLabel("email")}
              validate={this.getFieldValidators("email")}
              placeholder={this.getFieldPlaceholder("email")}
            />

            <button
              type="submit"
              className={loginButtonClass}
              disabled={
                forgotPasswordProperties !== undefined &&
                forgotPasswordProperties.status
              }
            >
              {text.forgot_password_submit}
            </button>
          </form>
        </div>
      </section>
    )
  }
}
export default reduxForm({
  form: "ForgotPassword",
})(ForgotPassword)
