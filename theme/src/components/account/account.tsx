import Lscache from "lscache"
import React, { FC, useEffect, useState } from "react"
import { Field, Form } from "react-final-form"
import { Link, Redirect } from "react-router-dom"
import { text } from "../../lib/settings"

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
  initialValues
  onSubmit
  customerProperties
  cartlayerBtnInitialized
  cart
  checkoutFields
}

const Account: FC<Props> = props => {
  const [profileSection, setProfileSection] = useState(1)
  const [profileEdit, setProfileEdit] = useState(false)
  const [reinitialized, setReinitialized] = useState(false)
  const [initialValues, setInitialValues] = useState(props.initialValues)
  const [cartLayer, setCartLayer] = useState(false)

  const {
    onSubmit,
    customerProperties,
    cartlayerBtnInitialized,
    cart,
    checkoutFields,
  } = props

  const initialize = () =>
    setInitialValues({
      first_name: customerProperties.customer_settings.first_name,
      last_name: customerProperties.customer_settings.last_name,
      email: customerProperties.customer_settings.email,
      password: customerProperties.customer_settings.password,
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
          customerProperties.customer_settings.addresses[0].postal_code !== null
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
          customerProperties.customer_settings.addresses[0].postal_code !== null
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

  const getTableHeaderLabel = tableHeaderLabel => {
    switch (tableHeaderLabel) {
      case "product_image":
        return text.product_image
      case "product_id":
        return text.order_line_id
      case "variant_id":
        return text.product_variant_id
      case "quantity":
        return text.product_qty
      case "discount_total":
        return text.product_discount_total
      case "name":
        return text.product_name
      case "price":
        return text.product_price
      case "price_total":
        return text.product_price_total
      case "sku":
        return text.product_sku
      case "tax_class":
        return text.product_tax_class
      case "tax_total":
        return text.product_tax_total
      case "variant_name":
        return text.product_variant_name
      case "weight":
        return text.product_weight
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

  const handleProfile = () => {
    setProfileEdit(false)
    setProfileSection(1)
  }

  const handleOrderHistory = () => {
    setProfileSection(2)
  }

  const handleLogout = () => {
    Lscache.flush()
  }

  const handleContactsEdit = () => {
    setProfileEdit(true)
  }

  Lscache.flushExpired()

  const accountInputField = "account-field"
  const accountForm = "account-form"
  const titleClassName = "login-title"
  const accountEditButtonClass = "account-button button"
  const accountHeaderMenueContainer = "account-header-menue-container"
  const accountHeaderMenueItems = "account-header-menue-items"
  const accountProfileContainer = "account-profile-container"
  const accountProfileList = "account-profile-list"
  const accountButtonContainer = "account-button-container"
  const continueShoppingButton =
    "continue-shopping-button account-button button"
  const accountProfileHeadline = "account-profile-headline"
  const isActive = "is-active"

  const billingAddress = {}
  const shippingAddress = {}
  let orderHistory = {}
  const list = []
  let tableStyle = null
  let keyCounter = 0
  let listHeader = []

  if (customerProperties === undefined || Lscache.get("auth_data") === null) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    )
  }

  if (
    customerProperties !== undefined &&
    customerProperties.cartLayer &&
    Lscache.get("auth_data") !== null
  ) {
    return (
      <Redirect
        to={{
          pathname: "/checkout",
        }}
      />
    )
  }

  if (customerProperties !== undefined) {
    if (
      customerProperties.customer_settings &&
      customerProperties.customer_settings.addresses
    ) {
      ;[].slice
        .call(customerProperties.customer_settings.addresses)
        .forEach((key, i) => {
          if (i < 1) {
            billingAddress.address1 = key.address1
            billingAddress.address2 = key.address2
            billingAddress.city = key.city
            billingAddress.postal_code = key.postal_code
            billingAddress.state = key.state
            billingAddress.country = key.country
          }
          if (i > 0) {
            shippingAddress.address1 = key.address1
            shippingAddress.address2 = key.address2
            shippingAddress.city = key.city
            shippingAddress.postal_code = key.postal_code
            shippingAddress.state = key.state
            shippingAddress.country = key.country
          }
        })

      orderHistory = customerProperties.order_statuses.data
        .filter(obj => obj.draft !== true)
        .reduce((map, obj, i) => {
          obj.items.forEach(element => {
            element.product_id = obj.number
          })
          map[`ordered_items${i}`] = obj.items
          return map
        }, {})
    }

    // get all orders
    keyCounter = 0
    for (var i in orderHistory) {
      listHeader = orderHistory[i].map((p, j) => {
        if (j < 1) {
          return (
            <tr className="tr-header" key={keyCounter}>
              {Object.keys(p).map((k, l) => {
                if (!["id", "variant_id"].includes(k)) {
                  return (
                    <th className="td-header" key={keyCounter + l}>
                      {getTableHeaderLabel(k)}
                    </th>
                  )
                }
              })}
            </tr>
          )
        }
      })
      keyCounter++
    }
    keyCounter = 0
    for (var i in orderHistory) {
      list.push(
        orderHistory[i].map(p => (
          <tr className="tr-body" key={`${p.id}${i}`}>
            {Object.keys(p).map((k, d) => {
              if (k.indexOf("product_image") !== -1) {
                const setCounter = i.replace(/^\D+/g, "")
                const urlContent =
                  customerProperties.order_statuses.data[
                    setCounter
                  ].landing_url.split(",")
                if (p.product_image === null) {
                  return (
                    <td className="td-body" key={`${p.id}${k}`}>
                      <div
                        suppressContentEditableWarning="true"
                        contentEditable="false"
                        value={k}
                      >
                        <a
                          href={
                            urlContent.length <= 1
                              ? customerProperties.order_statuses.data[
                                  setCounter
                                ].landing_url
                              : urlContent[keyCounter++]
                          }
                        >
                          <span key={`${p.id}${k}`}>{text.no_image}</span>
                        </a>
                      </div>
                    </td>
                  )
                }
                return (
                  <td className="td-body" key={`${p.id}${k}`}>
                    <div
                      suppressContentEditableWarning="true"
                      contentEditable="false"
                      value={k}
                    >
                      <a
                        href={
                          urlContent.length <= 1
                            ? customerProperties.order_statuses.data[setCounter]
                                .landing_url
                            : urlContent[keyCounter++]
                        }
                      >
                        <img src={p[k][0].url} alt="thumbnail" />
                      </a>
                    </div>
                  </td>
                )
              }

              if (!["id", "variant_id"].includes(k)) {
                return (
                  <td className="td-body" key={`${p.id}${k}`}>
                    <div
                      suppressContentEditableWarning="true"
                      contentEditable="false"
                      value={k}
                    >
                      {p[k]}
                    </div>
                  </td>
                )
              }
            })}
          </tr>
        ))
      )
    }

    useEffect(() => {
      if (profileEdit && !reinitialized) initialize()

      setReinitialized(true)

      // setEmailValues(customerProperties.customer_settings.email)
    }, [profileEdit, reinitialized])

    tableStyle = {
      align: "center",
    }

    return (
      <div className="account-container">
        <div className="account-section">
          <h2 className={titleClassName}>
            {text.welcome} {customerProperties.customer_settings.full_name}
          </h2>
        </div>
        <div className={accountHeaderMenueContainer}>
          <ul className={accountHeaderMenueItems}>
            <li
              className={profileSection === 1 ? isActive : ""}
              onClick={handleProfile}
            >
              {text.profile}
            </li>
            <li
              className={profileSection === 2 ? isActive : ""}
              onClick={handleOrderHistory}
            >
              {text.orders}
            </li>
            <li>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                key="logout"
                onClick={handleLogout}
              >
                {text.logout}
              </Link>
            </li>
          </ul>
        </div>
        {profileSection === 1 && !profileEdit && (
          <div className={accountProfileContainer}>
            <div className={accountProfileList}>
              <div className={accountProfileHeadline}>
                <img
                  src="/assets/images/icons/person.svg"
                  alt="person-icon"
                  className="person-icon"
                  style={{ width: 25, height: 20 }}
                />
                <h4>{text.account_profile_headline}</h4>
              </div>
              <ReadOnlyField
                name={text.member_since}
                value={new Date(
                  customerProperties.customer_settings.date_created
                ).toLocaleDateString("de-DE")}
              />
              <ReadOnlyField
                name={text.first_name}
                value={customerProperties.customer_settings.first_name}
              />
              <ReadOnlyField
                name={text.last_name}
                value={customerProperties.customer_settings.last_name}
              />
              <ReadOnlyField
                name={text.email}
                value={customerProperties.customer_settings.email}
              />
              <ReadOnlyField
                name={text.mobile}
                value={customerProperties.customer_settings.mobile}
              />
            </div>
            <div className={accountProfileList}>
              <div className={accountProfileHeadline}>
                <img
                  src="/assets/images/icons/address.svg"
                  alt="person-icon"
                  className="person-icon"
                  style={{ width: 25, height: 20 }}
                />
                <h4>{text.account_billing_headline}</h4>
              </div>
              {Object.keys(billingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.address1}
                  value={billingAddress.address1}
                />
              )}
              {Object.keys(billingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.address2}
                  value={billingAddress.address2}
                />
              )}
              {Object.keys(billingAddress).length > 0 && (
                <ReadOnlyField name={text.city} value={billingAddress.city} />
              )}
              {Object.keys(billingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.postal_code}
                  value={billingAddress.postal_code}
                />
              )}
              {Object.keys(billingAddress).length > 0 && (
                <ReadOnlyField name={text.state} value={billingAddress.state} />
              )}
              <p>
                {Object.keys(billingAddress).length === 0 ? text.empty : ""}
              </p>
            </div>
            <div className={accountProfileList}>
              <div className={accountProfileHeadline}>
                <img
                  src="/assets/images/icons/bag.svg"
                  alt="person-icon"
                  className="person-icon"
                  style={{ width: 25, height: 20 }}
                />
                <h4>{text.shippingAddress}</h4>
              </div>
              {Object.keys(shippingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.address1}
                  value={shippingAddress.address1}
                />
              )}
              {Object.keys(shippingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.address2}
                  value={shippingAddress.address2}
                />
              )}
              {Object.keys(shippingAddress).length > 0 && (
                <ReadOnlyField name={text.city} value={shippingAddress.city} />
              )}
              {Object.keys(shippingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.postal_code}
                  value={shippingAddress.postal_code}
                />
              )}
              {Object.keys(shippingAddress).length > 0 && (
                <ReadOnlyField
                  name={text.state}
                  value={shippingAddress.state}
                />
              )}
              <p>
                {Object.keys(shippingAddress).length === 0 ? text.empty : ""}
              </p>
            </div>
          </div>
        )}
        {profileSection === 1 && profileEdit && (
          <div className={accountProfileContainer}>
            <Form
              initialValues={initialValues}
              onSubmit={onSubmit}
              keepDirtyOnReinitialize
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={accountForm}>
                  <h3 className={titleClassName}>{text.edit_profile}</h3>
                  <Field
                    className={accountInputField}
                    name="first_name"
                    id="customer.first_name"
                    autoComplete="new-password"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("first_name")}
                    validate={getFieldValidators("first_name")}
                    placeholder={getFieldPlaceholder("first_name")}
                  />
                  <Field
                    className={accountInputField}
                    name="last_name"
                    id="customer.last_name"
                    autoComplete="new-password"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("last_name")}
                    validate={getFieldValidators("last_name")}
                    placeholder={getFieldPlaceholder("last_name")}
                  />
                  <Field
                    className={accountInputField}
                    name="email"
                    id="customer.email"
                    autoComplete="new-password"
                    component={InputField} // this.state.loggedin
                    type="email"
                    label={getFieldLabel("email")}
                    validate={getFieldValidators("email")}
                    placeholder={getFieldPlaceholder("email")}
                  />
                  <Field
                    className={accountInputField}
                    name="mobile"
                    id="customer.mobile"
                    autoComplete="new-password"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("mobile")}
                    validate={getFieldValidators("mobile")}
                    placeholder={getFieldPlaceholder("mobile")}
                  />
                  <Field
                    className={accountInputField}
                    name="password"
                    id="customer.password"
                    autoComplete="new-password"
                    component={InputField}
                    type="password"
                    label={getFieldLabel("password")}
                    validate={getFieldValidators("password")}
                    placeholder={getFieldPlaceholder("password")}
                  />

                  <Field
                    className={accountInputField}
                    name="password_verify"
                    id="customer.password_verify"
                    autoComplete="new-password"
                    component={InputField}
                    type="password"
                    label={getFieldLabel("password_verify")}
                    validate={getFieldValidators("password_verify")}
                    placeholder={getFieldPlaceholder("password_verify")}
                  />
                  <h3 className={titleClassName}>{text.shippingAddress}</h3>
                  <Field
                    className={accountInputField}
                    name="shipping_address.address1"
                    id="shipping_address.address1"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("address1")}
                    validate={getFieldValidators("address1")}
                    placeholder={getFieldPlaceholder("address1")}
                  />
                  <Field
                    className={accountInputField}
                    name="shipping_address.address2"
                    id="shipping_address.address2"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("address2")}
                    placeholder={getFieldPlaceholder("address2")}
                  />
                  <Field
                    className={accountInputField}
                    name="shipping_address.country"
                    id="shipping_address.country"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("country")}
                    validate={getFieldValidators("country")}
                    placeholder={getFieldPlaceholder("country")}
                  />

                  <Field
                    className={accountInputField}
                    name="shipping_address.state"
                    id="shipping_address.state"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("state")}
                    validate={getFieldValidators("state")}
                    placeholder={getFieldPlaceholder("state")}
                  />

                  <Field
                    className={accountInputField}
                    name="shipping_address.postal_code"
                    id="shipping_address.postal_code"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("postal_code")}
                    validate={getFieldValidators("postal_code")}
                    placeholder={getFieldPlaceholder("postal_code")}
                  />

                  <Field
                    className={accountInputField}
                    name="shipping_address.city"
                    id="shipping_address.city"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("city")}
                    validate={getFieldValidators("city")}
                    placeholder={getFieldPlaceholder("city")}
                  />

                  <h3 className={titleClassName}>{text.billingAddress}</h3>
                  <Field
                    className={accountInputField}
                    name="billing_address.address1"
                    id="billing_address.address1"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("address1")}
                    validate={getFieldValidators("address1")}
                    placeholder={getFieldPlaceholder("address1")}
                  />
                  <Field
                    className={accountInputField}
                    name="billing_address.address2"
                    id="billing_address.address2"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("address2")}
                    placeholder={getFieldPlaceholder("address2")}
                  />
                  <Field
                    className={accountInputField}
                    name="billing_address.country"
                    id="billing_address.country"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("country")}
                    validate={getFieldValidators("country")}
                    placeholder={getFieldPlaceholder("country")}
                  />

                  <Field
                    className={accountInputField}
                    name="billing_address.state"
                    id="billing_address.state"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("state")}
                    validate={getFieldValidators("state")}
                    placeholder={getFieldPlaceholder("state")}
                  />

                  <Field
                    className={accountInputField}
                    name="billing_address.postal_code"
                    id="billing_address.postal_code"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("postal_code")}
                    validate={getFieldValidators("postal_code")}
                    placeholder={getFieldPlaceholder("postal_code")}
                  />

                  <Field
                    className={accountInputField}
                    name="billing_address.city"
                    id="billing_address.city"
                    component={InputField}
                    type="text"
                    label={getFieldLabel("city")}
                    validate={getFieldValidators("city")}
                    placeholder={getFieldPlaceholder("city")}
                  />

                  <div className="checkout-button-wrap">
                    <button
                      type="submit"
                      // disabled={invalid}
                      className={accountEditButtonClass}
                    >
                      {text.save}
                    </button>
                  </div>
                </form>
              )}
            </Form>
          </div>
        )}
        {profileSection === 2 && (
          <div className={accountProfileContainer}>
            <div className="orders-history-container">
              <fieldset className="orders-history-fieldset">
                <div className="heading">
                  {Object.keys(orderHistory).length < 1 && (
                    <p>{text.order_history_empty}</p>
                  )}
                  {Object.keys(orderHistory).length > 0 && (
                    <h4>{text.order_history}</h4>
                  )}
                </div>
                <div className="schedule padd-lr">
                  <div className="tbl-header">
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      id="mytable"
                      style={tableStyle}
                    >
                      <thead>{listHeader}</thead>
                    </table>
                  </div>
                  <div className="tbl-content">
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      className="orders-history-table"
                      style={tableStyle}
                    >
                      <tbody>{list}</tbody>
                    </table>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        )}
        <div className={accountButtonContainer}>
          {profileSection !== 2 && (
            <button
              type="button"
              onClick={handleContactsEdit}
              className={accountEditButtonClass}
            >
              {text.edit}
            </button>
          )}
          <button type="button" className={continueShoppingButton}>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              key="account-continue-shopping"
            >
              {text.continueshopping}
            </Link>
          </button>
        </div>
      </div>
    )
  }
}

export default Account
