import Lscache from "lscache"
import React, { FC, useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import { formatCurrency } from "../../lib/helper"
import { text } from "../../lib/settings"
import InputField from "./inputField"

const validateRequired = value =>
  value && value.length > 0 ? undefined : text.required

const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? text.emailInvalid
    : undefined

const ReadOnlyField = ({ name, value }) => (
  <div className="checkout-field-preview">
    <div className="name">{name}</div>
    <div className="value">{value}</div>
  </div>
)

interface Props {
  handleSubmit
  customerProperties
  pristine
  invalid
  valid
  reset
  submitting
  loadingShippingMethods
  loadingPaymentMethods
  initialValues
  settings
  saveShippingLocation
  saveShippingMethod
  savePaymentMethod
  paymentMethods
  shippingMethods
  inputClassName
  buttonClassName
  editButtonClassName
  onEdit
  isReadOnly
  title
  initialize
  checkoutFields
}

const CheckoutStepContacts: FC<Props> = props => {
  const [loggedin, setLoggedin] = useState(false)
  const [reinitialized, setReinitialized] = useState(false)
  const [emailValues, setEmailValues] = useState("")
  const [comparePassword, setComparePassword] = useState("")

  const {
    handleSubmit,
    customerProperties,
    pristine,
    invalid,
    valid,
    reset,
    submitting,
    loadingShippingMethods,
    loadingPaymentMethods,
    initialValues,
    settings,
    saveShippingLocation,
    saveShippingMethod,
    savePaymentMethod,
    paymentMethods,
    shippingMethods,
    inputClassName,
    buttonClassName,
    editButtonClassName,
    onEdit,
    isReadOnly,
    title,
    initialize,
    checkoutFields,
  } = props

  useEffect(() => {
    if (Lscache.get("auth_data") !== null) {
      setLoggedin(true)
    }
  }, [])

  const setInitialValues = () => {
    Lscache.flushExpired()
    if (Lscache.get("auth_data") !== null) {
      initialize({
        first_name: customerProperties.customer_settings.first_name,
        last_name: customerProperties.customer_settings.last_name,
        email: customerProperties.customer_settings.email,
        mobile:
          typeof customerProperties.customer_settings.mobile !== "undefined" &&
          customerProperties.customer_settings.mobile !== null
            ? customerProperties.customer_settings.mobile
            : "",
        billing_address: {
          address1:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address1 !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address1 !== null
              ? customerProperties.customer_settings.addresses[0].address1
              : "",
          address2:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address2 !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address2 !== null
              ? customerProperties.customer_settings.addresses[0].address2
              : "",
          city:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].city !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].city !== null
              ? customerProperties.customer_settings.addresses[0].city
              : "",
          postal_code:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].postal_code !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].postal_code !==
              null
              ? customerProperties.customer_settings.addresses[0].postal_code
              : "",
          state:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].state !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].state !== null
              ? customerProperties.customer_settings.addresses[0].state
              : "",
          country:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].country !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].country !== null
              ? customerProperties.customer_settings.addresses[0].country
              : "",
        },
        shipping_address: {
          address1:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address1 !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address1 !== null
              ? customerProperties.customer_settings.addresses[0].address1
              : "",
          address2:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address2 !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].address2 !== null
              ? customerProperties.customer_settings.addresses[0].address2
              : "",
          city:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].city !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].city !== null
              ? customerProperties.customer_settings.addresses[0].city
              : "",
          postal_code:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].postal_code !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].postal_code !==
              null
              ? customerProperties.customer_settings.addresses[0].postal_code
              : "",
          state:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].state !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].state !== null
              ? customerProperties.customer_settings.addresses[0].state
              : "",
          country:
            typeof customerProperties.customer_settings.addresses !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].country !==
              "undefined" &&
            customerProperties.customer_settings.addresses.length > 0 &&
            customerProperties.customer_settings.addresses[0].country !== null
              ? customerProperties.customer_settings.addresses[0].country
              : "",
        },
      })
    }

    setReinitialized(true)
    setEmailValues(customerProperties.customer_settings.email)
    // this.props.change("input", {disabled: true});
  }

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

  const isFieldOptional = fieldName => getFieldStatus(fieldName) === "optional"

  const isFieldHidden = fieldName => getFieldStatus(fieldName) === "hidden"

  const getFieldValidators = fieldName => {
    const isOptional = isFieldOptional(fieldName)
    const validatorsArray = []
    if (!isOptional) {
      validatorsArray.push(validateRequired)
    }
    if (fieldName === "email") {
      validatorsArray.push(validateEmail)
    }
    if (fieldName === "password_verify") {
      validatorsArray.push(confirmPassword)
    }

    return validatorsArray
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
    }
    switch (fieldName) {
      case "first_name":
        if (typeof text.first_name !== "undefined" && text.first_name != null)
          return text.first_name
        return ""
      case "last_name":
        if (typeof text.last_name !== "undefined" && text.last_name != null)
          return text.last_name
        return ""
      case "email":
        if (typeof text.email !== "undefined" && text.email != null)
          return text.email
        return ""
      case "mobile":
        if (typeof text.mobile !== "undefined" && text.mobile != null)
          return text.mobile
        return ""
      case "password":
        if (typeof text.password !== "undefined" && text.password != null)
          return text.password
        return ""
      case "password_verify":
        if (
          typeof text.password_verify !== "undefined" &&
          text.password_verify != null
        )
          return text.password_verify
        return ""
      case "address1":
        if (typeof text.address1 !== "undefined" && text.address1 != null)
          return text.address1
        return ""
      case "address2":
        if (typeof text.address2 !== "undefined" && text.address2 != null)
          return text.address2
        return ""
      case "country":
        if (typeof text.country !== "undefined" && text.country != null)
          return text.country
        return ""
      case "state":
        if (typeof text.state !== "undefined" && text.state != null)
          return text.state
        return ""
      case "city":
        if (typeof text.city !== "undefined" && text.city != null)
          return text.city
        return ""
      case "postal_code":
        if (typeof text.postal_code !== "undefined" && text.postal_code != null)
          return text.postal_code
        return ""
      default:
        return "Unnamed field"
    }
  }

  const getFieldLabel = fieldName => {
    const labelText = getFieldLabelText(fieldName)
    return isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  if (customerProperties !== undefined && !reinitialized && loggedin) {
    setInitialValues()
  }

  if (isReadOnly) {
    return (
      <div className="checkout-step">
        <h1>
          <span>1</span>
          {title}
        </h1>
        {!isFieldHidden("first_name") && (
          <ReadOnlyField
            name={text.first_name}
            value={initialValues.first_name}
          />
        )}
        {!isFieldHidden("last_name") && (
          <ReadOnlyField
            name={text.last_name}
            value={initialValues.last_name}
          />
        )}
        {!isFieldHidden("email") && (
          <ReadOnlyField name={text.email} value={initialValues.email} />
        )}
        {!isFieldHidden("mobile") && (
          <ReadOnlyField name={text.mobile} value={initialValues.mobile} />
        )}
        {!isFieldHidden("address1") && (
          <ReadOnlyField
            name={text.address1}
            value={initialValues.shipping_address.address1}
          />
        )}
        {!isFieldHidden("address2") && (
          <ReadOnlyField
            name={text.address2}
            value={initialValues.shipping_address.address2}
          />
        )}
        {!isFieldHidden("country") && (
          <ReadOnlyField
            name={text.country}
            value={initialValues.shipping_address.country}
          />
        )}
        {!isFieldHidden("state") && (
          <ReadOnlyField
            name={text.state}
            value={initialValues.shipping_address.state}
          />
        )}
        {!isFieldHidden("postal_code") && (
          <ReadOnlyField
            name={text.postal_code}
            value={initialValues.shipping_address.postal_code}
          />
        )}
        {!isFieldHidden("city") && (
          <ReadOnlyField
            name={text.city}
            value={initialValues.shipping_address.city}
          />
        )}
        <ReadOnlyField
          name={text.shippingMethod}
          value={initialValues.shipping_method}
        />
        <ReadOnlyField
          name={text.paymentMethod}
          value={initialValues.payment_method}
        />

        <div className="checkout-button-wrap">
          <button
            type="button"
            onClick={onEdit}
            className={editButtonClassName}
          >
            {text.edit}
          </button>
        </div>

        <h2>
          {text.shippingMethods}{" "}
          {loadingShippingMethods && <small>{text.loading}</small>}
        </h2>
        <div className="shipping-methods">
          {shippingMethods.map((method, index) => (
            <label
              key={index}
              className={`shipping-method${
                method.id === initialValues.shipping_method_id ? " active" : ""
              }`}
            >
              <Field
                name="shipping_method_id"
                component="input"
                type="radio"
                value={method.id}
                onClick={() => {
                  saveShippingMethod(method.id)
                }}
              />
              <div>
                <div className="shipping-method-name">{method.name}</div>
                <div className="shipping-method-description">
                  {method.description}
                </div>
              </div>
              <span className="shipping-method-rate">
                {formatCurrency(method.price, settings)}
              </span>
            </label>
          ))}
        </div>

        <h2>
          {text.paymentMethods}{" "}
          {loadingPaymentMethods && <small>{text.loading}</small>}
        </h2>
        <div className="payment-methods">
          {paymentMethods.map((method, index) => (
            <label
              key={index}
              className={`payment-method${
                method.id === initialValues.payment_method_id ? " active" : ""
              }`}
            >
              <Field
                name="payment_method_id"
                validate={[validateRequired]}
                component="input"
                type="radio"
                value={method.id}
                onClick={() => {
                  savePaymentMethod(method.id)
                }}
              />
              <div>
                <div className="payment-method-name">{method.name}</div>
                <div className="payment-method-description">
                  {method.description}
                </div>
              </div>
              <span className="payment-method-logo" />
            </label>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="checkout-step">
      <h1>
        <span>1</span>
        {title}
      </h1>
      <form onSubmit={handleSubmit}>
        {!isFieldHidden("first_name") && (
          <Field
            className={inputClassName}
            name="first_name"
            id="customer.first_name"
            autoComplete="new-password"
            component={InputField}
            type="text"
            label={getFieldLabel("first_name")}
            validate={getFieldValidators("first_name")}
            placeholder={getFieldPlaceholder("first_name")}
          />
        )}

        {!isFieldHidden("last_name") && (
          <Field
            className={inputClassName}
            name="last_name"
            id="customer.last_name"
            autoComplete="new-password"
            component={InputField}
            type="text"
            label={getFieldLabel("last_name")}
            validate={getFieldValidators("last_name")}
            placeholder={getFieldPlaceholder("last_name")}
          />
        )}

        {loggedin ? (
          <ReadOnlyField
            name={text.email}
            value={emailValues}
            className="logged-in-email-field"
            label={getFieldLabel("email")}
          />
        ) : (
          !isFieldHidden("email") && (
            <Field
              className={inputClassName}
              name="email"
              id="customer.email"
              autoComplete="new-password"
              component={InputField} // this.state.loggedin
              type="email"
              label={getFieldLabel("email")}
              validate={getFieldValidators("email")}
              placeholder={getFieldPlaceholder("email")}
            />
          )
        )}

        {!isFieldHidden("mobile") && (
          <Field
            className={inputClassName}
            name="mobile"
            id="customer.mobile"
            autocomplete="new-password"
            component={InputField}
            type="tel"
            label={getFieldLabel("mobile")}
            validate={getFieldValidators("mobile")}
            placeholder={getFieldPlaceholder("mobile")}
          />
        )}

        {loggedin
          ? isFieldHidden("password")
          : !isFieldHidden("password") && (
              <Field
                className={inputClassName}
                name="password"
                id="customer.password"
                autoComplete="new-password"
                component={InputField}
                type="password"
                onBlur={passwordTemp}
                label={!loggedin ? getFieldLabel("password") : ""}
                validate={getFieldValidators("password")}
                placeholder={getFieldPlaceholder("password")}
              />
            )}

        {loggedin
          ? isFieldHidden("password")
          : !isFieldHidden("password") && (
              <Field
                className={inputClassName}
                name="password_verify"
                id="customer.password_verify"
                autoComplete="new-password"
                component={InputField}
                type="password"
                label={!loggedin ? getFieldLabel("password_verify") : ""}
                validate={getFieldValidators("password_verify")}
                placeholder={getFieldPlaceholder("password_verify")}
              />
            )}

        {!isFieldHidden("address1") && (
          <Field
            className={inputClassName}
            name="shipping_address.address1"
            id="shipping_address.address1"
            component={InputField}
            type="text"
            label={getFieldLabel("address1")}
            validate={getFieldValidators("address1")}
            placeholder={getFieldPlaceholder("address1")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ address1: value }))
            }
          />
        )}
        {!isFieldHidden("address2") && (
          <Field
            className={inputClassName}
            name="shipping_address.address2"
            id="shipping_address.address2"
            component={InputField}
            type="text"
            label={getFieldLabel("address2")}
            placeholder={getFieldPlaceholder("address2")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ address2: value }))
            }
          />
        )}

        {!isFieldHidden("country") && (
          <Field
            className={inputClassName}
            name="shipping_address.country"
            id="shipping_address.country"
            component={InputField}
            type="text"
            label={getFieldLabel("country")}
            validate={getFieldValidators("country")}
            placeholder={getFieldPlaceholder("country")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ country: value }))
            }
          />
        )}

        {!isFieldHidden("state") && (
          <Field
            className={inputClassName}
            name="shipping_address.state"
            id="shipping_address.state"
            component={InputField}
            type="text"
            label={getFieldLabel("state")}
            validate={getFieldValidators("state")}
            placeholder={getFieldPlaceholder("state")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ state: value }))
            }
          />
        )}
        {!isFieldHidden("postal_code") && (
          <Field
            className={inputClassName}
            name="shipping_address.postal_code"
            id="shipping_address.postal_code"
            component={InputField}
            type="text"
            label={getFieldLabel("postal_code")}
            validate={getFieldValidators("postal_code")}
            placeholder={getFieldPlaceholder("postal_code")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ postal_code: value }))
            }
          />
        )}
        {!isFieldHidden("city") && (
          <Field
            className={inputClassName}
            name="shipping_address.city"
            id="shipping_address.city"
            component={InputField}
            type="text"
            label={getFieldLabel("city")}
            validate={getFieldValidators("city")}
            placeholder={getFieldPlaceholder("city")}
            onBlur={(event, value) =>
              setTimeout(() => saveShippingLocation({ city: value }))
            }
          />
        )}

        <div className="checkout-button-wrap">
          <button type="submit" disabled={invalid} className={buttonClassName}>
            {text.next}
          </button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: "CheckoutStepContacts",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(CheckoutStepContacts)
