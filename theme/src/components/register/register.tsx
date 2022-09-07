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

const ReadOnlyField = ({ name, value }) => {
  return (
    <div className="checkout-field-preview">
      <div className="name">{name}</div>
      <div className="value">{value}</div>
    </div>
  )
}

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
      disabled={field.disabled}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

const initialData = {
  status: false,
  isRightToken: null,
  isCustomerSaved: null,
}

interface Props {
  onSubmit
  registerProperties
  checkoutFields
}

const Register: FC<Props> = props => {
  const [comparePassword, setComparePassword] = useState("")

  let { onSubmit, registerProperties, checkoutFields } = props

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

  const confirmPassword = value => {
    if (value !== comparePassword) {
      return text.password_verify_failed
    }
    return undefined
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
        case "first_name":
          return text.first_name
          break
        case "last_name":
          return text.last_name
          break
        case "email":
          return text.email
          break
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

  const getFieldLabel = fieldName => {
    const labelText = getFieldLabelText(fieldName)
    return isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  registerProperties =
    registerProperties === undefined ? initialData : registerProperties

  const registerButtonClassName = "account-button button"
  const inputClassName = "login-input-field"
  const titleClassName = "login-title"
  const successAlertText = "success-alert-text"
  const errorAlertText = "error-alert-text"
  const loginButtonClass = "account-button button"
  return (
    <div className="login-container">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="register-section">
              <h2 className={titleClassName}>{text.register_title}</h2>

              {!registerProperties.status &&
              !registerProperties.isCustomerSaved &&
              registerProperties.isCustomerSaved !== null &&
              registerProperties.isRightToken ? (
                <p className={errorAlertText}>{text.registry_failed}</p>
              ) : (
                ""
              )}
              {registerProperties.status ? (
                <p className={successAlertText}>{text.registry_doi_success}</p>
              ) : (
                ""
              )}
              {registerProperties.isCustomerSaved ? (
                <p className={successAlertText}>{text.registry_completed}</p>
              ) : (
                ""
              )}
              {!registerProperties.isRightToken &&
              registerProperties.isRightToken !== null ? (
                <p className={errorAlertText}>{text.registry_wrong_token}</p>
              ) : (
                ""
              )}
              {!registerProperties.isCustomerSaved && (
                <Field
                  className={inputClassName}
                  name="first_name"
                  id="customer.first_name"
                  component={InputField}
                  type="text"
                  props={
                    registerProperties !== undefined &&
                    registerProperties.status && { disabled: true }
                  }
                  label={getFieldLabel("first_name")}
                  validate={getFieldValidators("first_name")}
                  placeholder={getFieldPlaceholder("first_name")}
                />
              )}

              {!registerProperties.isCustomerSaved && (
                <Field
                  className={inputClassName}
                  name="last_name"
                  id="customer.last_name"
                  component={InputField}
                  type="text"
                  props={
                    registerProperties !== undefined &&
                    registerProperties.status && { disabled: true }
                  }
                  label={getFieldLabel("last_name")}
                  validate={getFieldValidators("last_name")}
                  placeholder={getFieldPlaceholder("last_name")}
                />
              )}

              {!registerProperties.isCustomerSaved && (
                <Field
                  className={inputClassName}
                  name="email"
                  id="customer.reg_email"
                  component={InputField}
                  type="email"
                  props={
                    registerProperties !== undefined &&
                    registerProperties.status && { disabled: true }
                  }
                  label={getFieldLabel("email")}
                  validate={getFieldValidators("email")}
                  placeholder={getFieldPlaceholder("email")}
                />
              )}

              {!registerProperties.isCustomerSaved && (
                <Field
                  className={inputClassName}
                  name="password"
                  id="customer.reg_password"
                  component={InputField}
                  type="password"
                  props={
                    registerProperties !== undefined &&
                    registerProperties.status && { disabled: true }
                  }
                  label={getFieldLabel("password")}
                  onBlur={({ currentTarget }) =>
                    setComparePassword(currentTarget.defaultValue)
                  }
                  validate={getFieldValidators("password")}
                  placeholder={getFieldPlaceholder("password")}
                />
              )}

              {!registerProperties.isCustomerSaved && (
                <Field
                  className={inputClassName}
                  name="password_verify"
                  id="customer.reg_password_verify"
                  component={InputField}
                  type="password"
                  props={
                    registerProperties !== undefined &&
                    registerProperties.status && { disabled: true }
                  }
                  label={getFieldLabel("password_verify")}
                  validate={getFieldValidators("password_verify")}
                  placeholder={getFieldPlaceholder("password_verify")}
                />
              )}

              <div className="login-button-wrap">
                {!registerProperties.isCustomerSaved && (
                  <button
                    type="submit"
                    className={registerButtonClassName}
                    disabled={
                      registerProperties !== undefined &&
                      registerProperties.status
                    }
                  >
                    {text.register}
                  </button>
                )}
                {registerProperties.isCustomerSaved && (
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
        )}
      </Form>
    </div>
  )
}

export default Register
