import api from "lib/api"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import MenuItem from "material-ui/MenuItem"
import React, { FC, useEffect, useState } from "react"
import { Field, Form } from "react-final-form"
import { SelectField, TextField } from "redux-form-material-ui"
import style from "./style.sass"

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

interface Props {
  initialValues
  onSubmit
  onCancel
}

const SummaryForm: FC<Props> = props => {
  const [shippingMethods, setShippingMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])

  const { initialValues, onSubmit, onCancel } = props

  const fetchData = orderId => {
    const filter = {
      order_id: orderId,
    }

    api.orderStatuses.list().then(({ status, json }) => setOrderStatuses(json))

    api.shippingMethods
      .list(filter)
      .then(({ status, json }) => setShippingMethods(json))

    api.paymentMethods
      .list(filter)
      .then(({ status, json }) => setPaymentMethods(json))
  }

  useEffect(() => {
    fetchData(initialValues.id)
  }, [])

  const statusItems = orderStatuses.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  const shippingItems = shippingMethods.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  const paymentItems = paymentMethods.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))

  statusItems.push(
    <MenuItem key="none" value={null} primaryText={messages.noOrderStatus} />
  )

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "initial",
            width: "100%",
          }}
        >
          <div>
            <Field
              component={SelectField}
              fullWidth
              name="status_id"
              floatingLabelText={messages.orderStatus}
            >
              {statusItems}
            </Field>

            <div>
              <Field
                component={TextField}
                fullWidth
                name="tracking_number"
                floatingLabelText={messages.trackingNumber}
              />
            </div>

            <Field
              component={SelectField}
              fullWidth
              name="shipping_method_id"
              floatingLabelText={messages.shippingMethod}
            >
              {shippingItems}
            </Field>

            <Field
              component={SelectField}
              fullWidth
              name="payment_method_id"
              floatingLabelText={messages.paymentsMethod}
            >
              {paymentItems}
            </Field>

            <div>
              <Field
                component={TextField}
                fullWidth
                name="comments"
                floatingLabelText={messages.customerComment}
              />
            </div>

            <div>
              <Field
                component={TextField}
                fullWidth
                name="note"
                floatingLabelText={messages.note}
              />
            </div>

            <div>
              <Field
                component={TextField}
                fullWidth
                name="email"
                floatingLabelText={messages.email}
              />
            </div>

            <div>
              <Field
                component={TextField}
                fullWidth
                name="mobile"
                floatingLabelText={messages.mobile}
              />
            </div>
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
      )}
    </Form>
  )
}

export default SummaryForm
