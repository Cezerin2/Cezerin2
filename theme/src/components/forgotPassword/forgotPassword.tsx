import React, { FC } from "react"
import { Field, reduxForm } from "redux-form"
import { text } from "../../lib/settings"

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
      disabled={field.disabled}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

interface Props {
  handleSubmit
  forgotPasswordProperties
  checkoutFields
}

const ForgotPassword: FC<Props> = props => {
  const { handleSubmit, forgotPasswordProperties, checkoutFields } = props

  const getField = fieldName => {
    const fields = checkoutFields || []
    const field = fields.find(item => item.name === fieldName)
    return field
  }

  const getFieldStatus = fieldName => {
    const field = getField(fieldName)
    return field && field.status ? field.status : "required"
  }

  const isFieldOptional = fieldName => {
    return getFieldStatus(fieldName) === "optional"
  }

  const isFieldHidden = fieldName => {
    return getFieldStatus(fieldName) === "hidden"
  }

  const isFieldDisabled = fieldName => {
    return getFieldStatus(fieldName) === "disabled"
  }

  const getFieldValidators = fieldName => {
    const isOptional = isFieldOptional(fieldName)
    let validatorsArray = []
    if (!isOptional) {
      validatorsArray.push(validateRequired)
    }
    if (fieldName === "email") {
      validatorsArray.push(validateEmail)
    }

    return validatorsArray
  }

  const getFieldPlaceholder = fieldName => {
    const field = getField(fieldName)
    return field && field.placeholder && field.placeholder.length > 0
      ? field.placeholder
      : ""
  }

  const getFieldLabelText = fieldName => {
    const field = getField(fieldName)
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

  const getFieldLabel = fieldName => {
    const labelText = getFieldLabelText(fieldName)
    return isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  const inputClassName = "login-input-field"
  const loginTitleClassName = "login-title"
  const sendPasswordSuccessTitleClassName = "send-password-success-title"
  const sendPasswordFailedTitleClassName = "send-password-failed-title"
  const loginButtonClass = "account-button button"
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-section">
          <h1 className={loginTitleClassName}>{text.forgot_password}</h1>
          <p className={loginTitleClassName}>
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
              forgotPasswordProperties.status && { disabled: true }
            }
            label={getFieldLabel("email")}
            validate={getFieldValidators("email")}
            placeholder={getFieldPlaceholder("email")}
          />
          <div className="login-button-wrap">
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: "ForgotPassword",
})(ForgotPassword)
