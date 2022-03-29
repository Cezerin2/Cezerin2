import * as helper from "lib/helper"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import React, { FC } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const validate = values => {
  const errors = {}
  const requiredFields = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const getShippingFieldLabel = ({ label, key }) =>
  label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)

interface Props {
  handleSubmit
  pristine: boolean
  submitting: boolean
  onCancel
  shippingMethod
}

const ShippingAddressForm: FC<Props> = props => {
  const { handleSubmit, pristine, submitting, onCancel, shippingMethod } = props

  let shippingFields = null
  if (
    shippingMethod &&
    shippingMethod.fields &&
    shippingMethod.fields.length > 0
  ) {
    shippingFields = shippingMethod.fields.map((field, index) => {
      const fieldLabel = getShippingFieldLabel(field)

      return (
        <Field
          key={index}
          component={TextField}
          fullWidth
          name={field.key}
          floatingLabelText={fieldLabel}
        />
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {shippingFields}
        <Field
          component={TextField}
          fullWidth
          name="city"
          floatingLabelText={messages.city}
        />
        <div className="row">
          <div className="col-xs-6">
            <Field
              component={TextField}
              fullWidth
              name="state"
              floatingLabelText={messages.state}
            />
          </div>
          <div className="col-xs-6">
            <Field
              component={TextField}
              fullWidth
              name="postal_code"
              floatingLabelText={messages.postal_code}
            />
          </div>
        </div>
        <Field
          component={TextField}
          fullWidth
          name="country"
          floatingLabelText={messages.country}
        />
      </div>
      <div className={style.shippingButtons}>
        <FlatButton label={messages.cancel} onClick={onCancel} />
        <FlatButton
          label={messages.save}
          primary
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: "ShippingAddressForm",
  validate,
  enableReinitialize: true,
})(ShippingAddressForm)
