import Lscache from "lscache"
import React, { FC, useState } from "react"
import { Field, Form } from "react-final-form"
import { Link, NavLink, Redirect } from "react-router-dom"
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
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

interface Props {
  onSubmit
  customerProperties
  cartlayerBtnInitialized
  checkoutFields
}

const Login: FC<Props> = props => {
  const [unauthorized, setUnauthorized] = useState(false)

  const {
    onSubmit,
    customerProperties,
    cartlayerBtnInitialized,
    checkoutFields,
  } = props

  const verifyAuth = () => {
    setUnauthorized(true)
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

      return checkValidateRequired || checkValidateEmail
    }
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

  if (customerProperties !== undefined && Lscache.get("auth_data") !== null) {
    return (
      <Redirect
        to={{
          pathname: "/customer-account",
        }}
      />
    )
  }

  if (customerProperties !== undefined) {
    if (!customerProperties.authenticated) {
      if (!unauthorized) {
        verifyAuth()
      }
    }
  }

  const inputClassName = "login-input-field"
  const titleClassName = "login-title"
  const loginButtonClass = "account-button button"
  const loginSectionGuest = "login-section-guest"
  const errorAlertText = "error-alert-text"
  const loginForm =
    cartlayerBtnInitialized !== undefined && cartlayerBtnInitialized
      ? "login-form login-form login-form-with-guest"
      : "login-form"

  return (
    <div className="login-container">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={loginForm}>
            <div className="login-section">
              <h2 className={titleClassName}>{text.login_title}</h2>
              {customerProperties !== undefined &&
              customerProperties.loggedin_failed ? (
                <p className={errorAlertText}>{text.login_failed}</p>
              ) : (
                ""
              )}
              {!isFieldHidden("email") && (
                <Field
                  className={inputClassName}
                  name="email"
                  id="customer.email"
                  component={InputField}
                  type="email"
                  label={getFieldLabel("email")}
                  validate={getFieldValidators("email")}
                  placeholder={getFieldPlaceholder("email")}
                />
              )}

              {!isFieldHidden("password") && (
                <Field
                  className={inputClassName}
                  name="password"
                  id="customer.password"
                  component={InputField}
                  type="password"
                  label={getFieldLabel("password")}
                  validate={getFieldValidators("password")}
                  placeholder={getFieldPlaceholder("password")}
                />
              )}
              <div className="login-link-wrap">
                <Link to="/forgot-password">{text.forgot_password}</Link>
              </div>
              <div className="login-button-wrap">
                <button type="submit" className={loginButtonClass}>
                  {text.login}
                </button>
              </div>

              <NavLink className="logo-image" to="/register">
                <div className="login-button-wrap">
                  <button type="button" className={loginButtonClass}>
                    {text.register}
                  </button>
                </div>
              </NavLink>
            </div>
          </form>
        )}
      </Form>
      {cartlayerBtnInitialized !== undefined && cartlayerBtnInitialized && (
        <div className={loginSectionGuest}>
          <h2>{text.continue_guest_headline}</h2>
          <p>{text.continue_guest_text}</p>
          <NavLink
            className="button loginButtonClass"
            style={{ textTransform: "uppercase" }}
            to="/checkout"
          >
            {text.proceedToCheckout}
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Login
