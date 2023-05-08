import MenuItem from "material-ui/MenuItem"
import React from "react"
import { Field } from "react-final-form"
import { SelectField, TextField } from "redux-form-material-ui"

const GatewaySettings = ({ gateway }) => {
  switch (gateway) {
    case "paypal-checkout":
      return <PayPalButton />
    case "liqpay":
      return <LiqPay />
    case "stripe-elements":
      return <StripeElements />
    default:
      return null
  }
}

export default GatewaySettings

const PayPalButton = props => {
  return (
    <div>
      <Field
        component={SelectField}
        name="env"
        floatingLabelText="Environment"
        fullWidth
        autoWidth
      >
        <MenuItem value="production" primaryText="production" />
        <MenuItem value="sandbox" primaryText="sandbox" />
      </Field>

      <Field
        component={TextField}
        name="client"
        floatingLabelText="Client ID"
        fullWidth
      />

      <Field
        component={SelectField}
        name="size"
        floatingLabelText="Button size"
        fullWidth
        autoWidth
      >
        <MenuItem value="small" primaryText="small" />
        <MenuItem value="medium" primaryText="medium" />
        <MenuItem value="large" primaryText="large" />
        <MenuItem value="responsive" primaryText="responsive" />
      </Field>

      <Field
        component={SelectField}
        name="shape"
        floatingLabelText="Button shape"
        fullWidth
        autoWidth
      >
        <MenuItem value="pill" primaryText="pill" />
        <MenuItem value="rect" primaryText="rect" />
      </Field>

      <Field
        component={SelectField}
        name="color"
        floatingLabelText="Button color"
        fullWidth
        autoWidth
      >
        <MenuItem value="gold" primaryText="gold" />
        <MenuItem value="blue" primaryText="blue" />
        <MenuItem value="silver" primaryText="silver" />
        <MenuItem value="black" primaryText="black" />
      </Field>

      <Field
        component={TextField}
        name="notify_url"
        floatingLabelText="Notify URL"
        hintText="https://<domain>/api/v1/notifications/paypal-checkout"
        fullWidth
      />
    </div>
  )
}

const LiqPay = props => {
  return (
    <div>
      <Field
        component={TextField}
        name="public_key"
        floatingLabelText="Public Key"
        fullWidth
      />

      <Field
        component={TextField}
        name="private_key"
        floatingLabelText="Private Key"
        fullWidth
      />

      <Field
        component={SelectField}
        name="language"
        floatingLabelText="Language"
        fullWidth
        autoWidth
      >
        <MenuItem value="ru" primaryText="Russian" />
        <MenuItem value="uk" primaryText="Ukrainian" />
        <MenuItem value="en" primaryText="English" />
      </Field>

      <Field
        component={TextField}
        name="server_url"
        floatingLabelText="Server URL"
        hintText="https://<domain>/api/v1/notifications/liqpay"
        fullWidth
      />
    </div>
  )
}

const StripeElements = props => {
  return (
    <div>
      <Field
        component={SelectField}
        name="env"
        floatingLabelText="Environment"
        fullWidth
        autoWidth
      >
        <MenuItem value="production" primaryText="production" />
        <MenuItem value="sandbox" primaryText="sandbox" />
      </Field>
      <Field
        component={TextField}
        name="public_key"
        floatingLabelText="Publishable key"
        fullWidth
      />
      <Field
        component={TextField}
        name="secret_key"
        floatingLabelText="Secret key"
        fullWidth
      />
    </div>
  )
}
