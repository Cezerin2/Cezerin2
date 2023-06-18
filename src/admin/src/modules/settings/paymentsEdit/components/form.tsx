import messages from "lib/text"
import Divider from "material-ui/Divider"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import PaymentGateway from "modules/settings/paymentGateway"
import { AVAILABLE_PAYMENT_GATEWAYS } from "modules/settings/paymentGateway/availablePaymentGateways"
import { CustomToggle } from "modules/shared/form"
import React, { FC, useEffect, useState } from "react"
import { Field, Form } from "react-final-form"
import { SelectField, TextField } from "redux-form-material-ui"
import SelectShippingMethodsField from "./selectShipping"
import style from "./style.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

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
  shippingMethods
  methodId
  settings
  onLoad
}

const EditPaymentMethodForm: FC<Props> = props => {
  const [gateway, setGateway] = useState(null)

  const {
    initialValues,
    onSubmit,
    shippingMethods,
    methodId,
    settings,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [onLoad])

  useEffect(() => {
    setGateway(initialValues.gateway)
  }, [initialValues.gateway])

  const isAdd = methodId === null || methodId === undefined
  let paymentGateways = []
  paymentGateways.push(<MenuItem value="" key="none" primaryText="None" />)
  for (const gateways of AVAILABLE_PAYMENT_GATEWAYS) {
    paymentGateways.push(
      <MenuItem
        value={gateways.key}
        key={gateways.key}
        primaryText={gateways.name}
      />
    )
  }

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, pristine, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <div className="blue-title">{messages.paymentGateway}</div>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <div>
                    <Field
                      component={SelectField}
                      autoWidth
                      fullWidth
                      name="gateway"
                      floatingLabelFixed
                      floatingLabelText={messages.paymentGateway}
                      onChange={(event, currentValue, prevValue) =>
                        setGateway(currentValue)
                      }
                    >
                      {paymentGateways}
                    </Field>
                  </div>
                  <PaymentGateway gateway={gateway} />
                </div>
              </div>

              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-xs-12 col-sm-4">
                  <div className="blue-title">{messages.description}</div>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="name"
                      floatingLabelText={messages.settings_paymentMethodName}
                    />
                  </div>
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="description"
                      multiLine
                      floatingLabelText={messages.description}
                    />
                  </div>
                  <div>
                    <Field
                      component={CustomToggle}
                      name="enabled"
                      label={messages.enabled}
                      style={{ paddingTop: 16, paddingBottom: 20 }}
                    />
                  </div>
                  <Divider />
                </div>
              </div>

              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-xs-12 col-sm-4">
                  <div className="blue-title">
                    {messages.settings_conditions}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="conditions.countries"
                      floatingLabelText={messages.settings_countries}
                      hintText="US,UK,AU,SG"
                    />
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.subtotal_min"
                        type="number"
                        fullWidth
                        floatingLabelText={
                          messages.settings_minSubtotal +
                          ` (${settings.currency_symbol})`
                        }
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.subtotal_max"
                        type="number"
                        fullWidth
                        floatingLabelText={
                          messages.settings_maxSubtotal +
                          ` (${settings.currency_symbol})`
                        }
                      />
                    </div>
                  </div>
                  <div className="gray-title" style={{ marginTop: "30px" }}>
                    {messages.settings_onlyShippingMethods}
                  </div>
                  <Field
                    name="conditions.shipping_method_ids"
                    component={SelectShippingMethodsField}
                    shippingMethods={shippingMethods}
                  />
                </div>
              </div>
            </div>
            <div className="buttons-box">
              <RaisedButton
                type="submit"
                label={isAdd ? messages.add : messages.save}
                primary
                className={style.button}
                disabled={pristine || submitting}
              />
            </div>
          </Paper>
        </form>
      )}
    </Form>
  )
}

export default EditPaymentMethodForm
