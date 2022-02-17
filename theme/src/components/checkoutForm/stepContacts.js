import React from "react"
import { Field, reduxForm } from "redux-form"
import Lscache from "lscache"
import { themeSettings, text } from "../../lib/settings"
import { formatCurrency } from "../../lib/helper"
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

class CheckoutStepContacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedin: false,
      reinitialized: false,
      emailValues: "",
      comparePassword: "",
    }

    this.setInitialValues = this.setInitialValues.bind(this)
  }

  componentDidMount() {
    if (Lscache.get("auth_data") !== null) {
      this.setState({ loggedin: true })
    }
  }

  setInitialValues() {
    Lscache.flushExpired()
    if (Lscache.get("auth_data") !== null) {
      this.props.initialize({
        first_name: this.props.customerProperties.customer_settings.first_name,
        last_name: this.props.customerProperties.customer_settings.last_name,
        email: this.props.customerProperties.customer_settings.email,
        mobile:
          typeof this.props.customerProperties.customer_settings.mobile !==
            "undefined" &&
          this.props.customerProperties.customer_settings.mobile !== null
            ? this.props.customerProperties.customer_settings.mobile
            : "",
        billing_address: {
          address1:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address1 !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address1 !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .address1
              : "",
          address2:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address2 !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address2 !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .address2
              : "",
          city:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .city !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .city !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .city
              : "",
          postal_code:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .postal_code !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .postal_code !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .postal_code
              : "",
          state:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .state !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .state !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .state
              : "",
          country:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .country !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .country !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .country
              : "",
        },
        shipping_address: {
          address1:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address1 !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address1 !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .address1
              : "",
          address2:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address2 !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .address2 !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .address2
              : "",
          city:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .city !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .city !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .city
              : "",
          postal_code:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .postal_code !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .postal_code !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .postal_code
              : "",
          state:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .state !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .state !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .state
              : "",
          country:
            typeof this.props.customerProperties.customer_settings.addresses !==
              "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .country !== "undefined" &&
            this.props.customerProperties.customer_settings.addresses.length >
              0 &&
            this.props.customerProperties.customer_settings.addresses[0]
              .country !== null
              ? this.props.customerProperties.customer_settings.addresses[0]
                  .country
              : "",
        },
      })
    }

    this.setState({ reinitialized: true })
    this.setState({
      emailValues: this.props.customerProperties.customer_settings.email,
    })
    // this.props.change("input", {disabled: true});
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

  isFieldOptional = fieldName => this.getFieldStatus(fieldName) === "optional"

  isFieldHidden = fieldName => this.getFieldStatus(fieldName) === "hidden"

  getFieldValidators = fieldName => {
    const isOptional = this.isFieldOptional(fieldName)
    const validatorsArray = []
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

  getFieldLabel = fieldName => {
    const labelText = this.getFieldLabelText(fieldName)
    return this.isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  render() {
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
    } = this.props

    if (
      customerProperties !== undefined &&
      !this.state.reinitialized &&
      this.state.loggedin
    ) {
      this.setInitialValues()
    }

    if (isReadOnly) {
      return (
        <div className="checkout-step">
          <h1>
            <span>1</span>
            {title}
          </h1>
          {!this.isFieldHidden("first_name") && (
            <ReadOnlyField
              name={text.first_name}
              value={initialValues.first_name}
            />
          )}
          {!this.isFieldHidden("last_name") && (
            <ReadOnlyField
              name={text.last_name}
              value={initialValues.last_name}
            />
          )}
          {!this.isFieldHidden("email") && (
            <ReadOnlyField name={text.email} value={initialValues.email} />
          )}
          {!this.isFieldHidden("mobile") && (
            <ReadOnlyField name={text.mobile} value={initialValues.mobile} />
          )}
          {!this.isFieldHidden("address1") && (
            <ReadOnlyField
              name={text.address1}
              value={initialValues.shipping_address.address1}
            />
          )}
          {!this.isFieldHidden("address2") && (
            <ReadOnlyField
              name={text.address2}
              value={initialValues.shipping_address.address2}
            />
          )}
          {!this.isFieldHidden("country") && (
            <ReadOnlyField
              name={text.country}
              value={initialValues.shipping_address.country}
            />
          )}
          {!this.isFieldHidden("state") && (
            <ReadOnlyField
              name={text.state}
              value={initialValues.shipping_address.state}
            />
          )}
          {!this.isFieldHidden("postal_code") && (
            <ReadOnlyField
              name={text.postal_code}
              value={initialValues.shipping_address.postal_code}
            />
          )}
          {!this.isFieldHidden("city") && (
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
                  method.id === initialValues.shipping_method_id
                    ? " active"
                    : ""
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
          {!this.isFieldHidden("first_name") && (
            <Field
              className={inputClassName}
              name="first_name"
              id="customer.first_name"
              autoComplete="new-password"
              component={InputField}
              type="text"
              label={this.getFieldLabel("first_name")}
              validate={this.getFieldValidators("first_name")}
              placeholder={this.getFieldPlaceholder("first_name")}
            />
          )}

          {!this.isFieldHidden("last_name") && (
            <Field
              className={inputClassName}
              name="last_name"
              id="customer.last_name"
              autoComplete="new-password"
              component={InputField}
              type="text"
              label={this.getFieldLabel("last_name")}
              validate={this.getFieldValidators("last_name")}
              placeholder={this.getFieldPlaceholder("last_name")}
            />
          )}

          {this.state.loggedin ? (
            <ReadOnlyField
              name={text.email}
              value={this.state.emailValues}
              className="logged-in-email-field"
              label={this.getFieldLabel("email")}
            />
          ) : (
            !this.isFieldHidden("email") && (
              <Field
                className={inputClassName}
                name="email"
                id="customer.email"
                autoComplete="new-password"
                component={InputField} // this.state.loggedin
                type="email"
                label={this.getFieldLabel("email")}
                validate={this.getFieldValidators("email")}
                placeholder={this.getFieldPlaceholder("email")}
              />
            )
          )}

          {!this.isFieldHidden("mobile") && (
            <Field
              className={inputClassName}
              name="mobile"
              id="customer.mobile"
              autocomplete="new-password"
              component={InputField}
              type="tel"
              label={this.getFieldLabel("mobile")}
              validate={this.getFieldValidators("mobile")}
              placeholder={this.getFieldPlaceholder("mobile")}
            />
          )}

          {this.state.loggedin
            ? this.isFieldHidden("password")
            : !this.isFieldHidden("password") && (
                <Field
                  className={inputClassName}
                  name="password"
                  id="customer.password"
                  autoComplete="new-password"
                  component={InputField}
                  type="password"
                  onBlur={this.passwordTemp}
                  label={
                    !this.state.loggedin ? this.getFieldLabel("password") : ""
                  }
                  validate={this.getFieldValidators("password")}
                  placeholder={this.getFieldPlaceholder("password")}
                />
              )}

          {this.state.loggedin
            ? this.isFieldHidden("password")
            : !this.isFieldHidden("password") && (
                <Field
                  className={inputClassName}
                  name="password_verify"
                  id="customer.password_verify"
                  autoComplete="new-password"
                  component={InputField}
                  type="password"
                  label={
                    !this.state.loggedin
                      ? this.getFieldLabel("password_verify")
                      : ""
                  }
                  validate={this.getFieldValidators("password_verify")}
                  placeholder={this.getFieldPlaceholder("password_verify")}
                />
              )}

          {!this.isFieldHidden("address1") && (
            <Field
              className={inputClassName}
              name="shipping_address.address1"
              id="shipping_address.address1"
              component={InputField}
              type="text"
              label={this.getFieldLabel("address1")}
              validate={this.getFieldValidators("address1")}
              placeholder={this.getFieldPlaceholder("address1")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ address1: value }))
              }
            />
          )}
          {!this.isFieldHidden("address2") && (
            <Field
              className={inputClassName}
              name="shipping_address.address2"
              id="shipping_address.address2"
              component={InputField}
              type="text"
              label={this.getFieldLabel("address2")}
              placeholder={this.getFieldPlaceholder("address2")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ address2: value }))
              }
            />
          )}

          {!this.isFieldHidden("country") && (
            <Field
              className={inputClassName}
              name="shipping_address.country"
              id="shipping_address.country"
              component={InputField}
              type="text"
              label={this.getFieldLabel("country")}
              validate={this.getFieldValidators("country")}
              placeholder={this.getFieldPlaceholder("country")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ country: value }))
              }
            />
          )}

          {!this.isFieldHidden("state") && (
            <Field
              className={inputClassName}
              name="shipping_address.state"
              id="shipping_address.state"
              component={InputField}
              type="text"
              label={this.getFieldLabel("state")}
              validate={this.getFieldValidators("state")}
              placeholder={this.getFieldPlaceholder("state")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ state: value }))
              }
            />
          )}
          {!this.isFieldHidden("postal_code") && (
            <Field
              className={inputClassName}
              name="shipping_address.postal_code"
              id="shipping_address.postal_code"
              component={InputField}
              type="text"
              label={this.getFieldLabel("postal_code")}
              validate={this.getFieldValidators("postal_code")}
              placeholder={this.getFieldPlaceholder("postal_code")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ postal_code: value }))
              }
            />
          )}
          {!this.isFieldHidden("city") && (
            <Field
              className={inputClassName}
              name="shipping_address.city"
              id="shipping_address.city"
              component={InputField}
              type="text"
              label={this.getFieldLabel("city")}
              validate={this.getFieldValidators("city")}
              placeholder={this.getFieldPlaceholder("city")}
              onBlur={(event, value) =>
                setTimeout(() => saveShippingLocation({ city: value }))
              }
            />
          )}

          <div className="checkout-button-wrap">
            <button
              type="submit"
              disabled={invalid}
              className={buttonClassName}
            >
              {text.next}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: "CheckoutStepContacts",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(CheckoutStepContacts)
