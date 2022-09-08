import React, { FC, useState } from "react"
import { Field, Form } from "react-final-form"
import { Link } from "react-router-dom"
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
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

interface Props {
  onSubmit
  forgotPasswordProperties
  resetPasswordProperties
  checkoutFields
}

const ResetPassword: FC<Props> = props => {
  const [comparePassword, setComparePassword] = useState("")

  const {
    onSubmit,
    forgotPasswordProperties,
    resetPasswordProperties,
    checkoutFields,
  } = props

  const passwordTemp = value => {
    setComparePassword(value.currentTarget.defaultValue)
  }

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

  const getFieldValidators = fieldName => {
    const isOptional = isFieldOptional(fieldName)

    return value => {
      const checkValidateRequired = !isOptional && validateRequired(value)
      const checkValidateEmail = fieldName === "email" && validateEmail(value)
      const checkConfirmPassword =
        fieldName === "password_verify" && confirmPassword(value)

      return checkValidateRequired || checkValidateEmail || checkConfirmPassword
    }
  }

  const confirmPassword = (value: string) => {
    if (value !== comparePassword) return text.password_verify_failed

    return undefined
  }

  const getFieldPlaceholder = fieldName => {
    const field = getField(fieldName)
    return field && field.placeholder && field.placeholder.length > 0
      ? field.placeholder
      : ""
  }

  const getFieldLabelText = (fieldName: string) => {
    const field = getField(fieldName)
    if (field && field.label && field.label.length > 0) return field.label

    switch (fieldName) {
      case "password":
        return text.password
      case "password_verify":
        return text.password_verify
      default:
        return "Unnamed field"
    }
  }

  const getFieldLabel = (fieldName: string) => {
    const labelText = getFieldLabelText(fieldName)
    return isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  const inputClassName = "login-input-field"
  const loginTitleClassName = "login-title"
  const loginSuccessTitleClassName = "login-success-title"
  const loginButtonClass = "account-button button"
  return (
    <div className="login-container">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
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
                  onBlur={passwordTemp}
                  label={getFieldLabel("password")}
                  validate={getFieldValidators("password")}
                  placeholder={getFieldPlaceholder("password")}
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
                  onBlur={passwordTemp}
                  label={getFieldLabel("password_verify")}
                  validate={getFieldValidators("password_verify")}
                  placeholder={getFieldPlaceholder("password_verify")}
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
                    key="back-to-login"
                    className={loginButtonClass}
                  >
                    {text.back_to_login}
                  </Link>
                )}
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}

export default ResetPassword
