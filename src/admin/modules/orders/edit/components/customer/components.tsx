import * as helper from "lib/helper"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import React from "react"
import style from "../style.sass"

const getShippingFieldLabel = ({ label, key }) =>
  label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)

const ShippingFieldDiv = ({ label, value }) => (
  <div>
    <label>{label}: </label>
    {value}
  </div>
)

const ShippingFields = ({ order, shippingMethod }) => {
  let rows = null
  if (
    shippingMethod &&
    shippingMethod.fields &&
    shippingMethod.fields.length > 0
  ) {
    rows = shippingMethod.fields.map((field, index) => {
      const fieldLabel = getShippingFieldLabel(field)
      const fieldValue = order.shipping_address[field.key]

      return (
        <ShippingFieldDiv key={index} label={fieldLabel} value={fieldValue} />
      )
    })
  }

  return <div>{rows}</div>
}

export const ShippingAddress = ({ order, settings }) => {
  const address = order.shipping_address
  const shippingMethod = order.shipping_method_details

  return (
    <div className={style.address} style={{ marginBottom: 20 }}>
      <ShippingFields order={order} shippingMethod={shippingMethod} />
      <div className={style.address}>
        <div>{address.full_name}</div>
        <div>{address.company}</div>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>
          {address.city},{" "}
          {address.state && address.state.length > 0
            ? `${address.state}, `
            : ""}
          {address.postal_code}
        </div>
        <div>{address.country}</div>
        <div>{address.phone}</div>
      </div>
    </div>
  )
}

export const BillingAddress = ({ address, settings }) => {
  const billinsAddressIsEmpty =
    address.address1 === "" &&
    address.address2 === "" &&
    address.city === "" &&
    address.company === "" &&
    address.country === "" &&
    address.full_name === "" &&
    address.phone === "" &&
    address.state === "" &&
    address.tax_number === "" &&
    address.postal_code === ""

  if (billinsAddressIsEmpty && settings.hide_billing_address) return null

  if (billinsAddressIsEmpty && !settings.hide_billing_address)
    return (
      <div>
        <Divider
          style={{
            marginTop: 30,
            marginBottom: 30,
            marginLeft: -30,
            marginRight: -30,
          }}
        />
        <div style={{ paddingBottom: 16, paddingTop: 0 }}>
          {messages.billingAddress}
        </div>
        <div className={style.address}>
          <label>{messages.sameAsShipping}</label>
        </div>
      </div>
    )

  return (
    <div>
      <Divider
        style={{
          marginTop: 30,
          marginBottom: 30,
          marginLeft: -30,
          marginRight: -30,
        }}
      />
      <div style={{ paddingBottom: 16, paddingTop: 0 }}>
        {messages.billingAddress}
      </div>
      <div className={style.address}>
        <div>{address.full_name}</div>
        <div>{address.company}</div>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>
          {address.city},{" "}
          {address.state && address.state.length > 0
            ? `${address.state}, `
            : ""}
          {address.postal_code}
        </div>
        <div>{address.country}</div>
        <div>{address.phone}</div>
      </div>
    </div>
  )
}
