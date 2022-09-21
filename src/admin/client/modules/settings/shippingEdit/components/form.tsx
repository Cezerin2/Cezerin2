import arrayMutators from "final-form-arrays"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle } from "modules/shared/form"
import React, { FC, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { TextField } from "redux-form-material-ui"
import FieldsEditor from "./fieldsEditor"
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
  methodId
  settings
  onLoad: () => void
}

const EditShippingMethodForm: FC<Props> = props => {
  const { initialValues, onSubmit, methodId, settings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const isAdd = methodId === null || methodId === undefined

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      validate={validate}
    >
      {({ handleSubmit, pristine, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <div className="blue-title">{messages.description}</div>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="name"
                      floatingLabelText={messages.settings_shippingMethodName}
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

                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="price"
                        type="number"
                        fullWidth
                        floatingLabelText={`${messages.settings_shippingRate} (${settings.currency_symbol})`}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        component={CustomToggle}
                        name="enabled"
                        label={messages.enabled}
                        style={{ paddingTop: 16, paddingBottom: 20 }}
                      />
                      <Divider />
                    </div>
                  </div>
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
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="conditions.states"
                      floatingLabelText={messages.settings_states}
                      hintText="California,Nevada,Oregon"
                    />
                  </div>
                  <div>
                    <Field
                      component={TextField}
                      fullWidth
                      name="conditions.cities"
                      floatingLabelText={messages.settings_cities}
                      hintText="Los Angeles,San Diego,San Jose"
                    />
                  </div>

                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.weight_total_min"
                        type="number"
                        fullWidth
                        floatingLabelText={`${messages.settings_minTotalWeight} (${settings.weight_unit})`}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.weight_total_max"
                        type="number"
                        fullWidth
                        floatingLabelText={`${messages.settings_maxTotalWeight} (${settings.weight_unit})`}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.subtotal_min"
                        type="number"
                        fullWidth
                        floatingLabelText={`${messages.settings_minSubtotal} (${settings.currency_symbol})`}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        component={TextField}
                        name="conditions.subtotal_max"
                        type="number"
                        fullWidth
                        floatingLabelText={`${messages.settings_maxSubtotal} (${settings.currency_symbol})`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-xs-12 col-sm-4">
                  <div className="blue-title">
                    {messages.settings_checkoutFields}
                  </div>
                  <div className="field-hint">
                    Standard:
                    <ul>
                      <li>full_name</li>
                      <li>address1</li>
                      <li>address2</li>
                      <li>postal_code</li>
                      <li>phone</li>
                      <li>company</li>
                    </ul>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <FieldArray name="fields" component={FieldsEditor} />
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

export default EditShippingMethodForm
