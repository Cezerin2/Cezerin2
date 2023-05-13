import api from "lib/api"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle } from "modules/shared/form"
import React from "react"
import { Field, Form } from "react-final-form"
import { DatePicker, TextField } from "redux-form-material-ui"
import style from "./style.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]
  const numberFields = [
    "regular_price",
    "sale_price",
    "stock_quantity",
    "weight",
  ]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  numberFields.map(field => {
    if (values && values[field] && isNaN(parseFloat(values[field]))) {
      errors[field] = messages.errors_number
    }
  })

  return errors
}

const slugExists = values => {
  if (values.slug && values.slug.length > 0) {
    return api.products
      .slugExists(values.id, values.slug)
      .then(response => response.status === 200)
  } else {
    return Promise.resolve(false)
  }
}

const skuExists = values => {
  if (values.sku && values.sku.length > 0) {
    return api.products
      .skuExists(values.id, values.sku)
      .then(response => response.status === 200)
  } else {
    return Promise.resolve(false)
  }
}

const asyncValidate = values => {
  return Promise.all([slugExists(values), skuExists(values)]).then(
    ([isSlugExists, isSkuExists]) => {
      let errors = {}

      if (isSlugExists) {
        errors.slug = messages.errors_urlTaken
      }

      if (isSkuExists) {
        errors.sku = messages.skuTaken
      }

      if (Object.keys(errors).length > 0) {
        return Promise.reject(errors)
      } else {
        return Promise.resolve()
      }
    }
  )
}

const ProductInventoryForm = ({ initialValues, onSubmit, settings }) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      asyncValidate={asyncValidate}
      validateOnBlur
    >
      {({ handleSubmit, pristine, form, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <div className="row" style={{ marginBottom: 50 }}>
                <div className="col-xs-5">
                  <div className="blue-title">{messages.products_pricing}</div>
                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        name="regular_price"
                        component={TextField}
                        floatingLabelText={
                          messages.products_regularPrice +
                          ` (${settings.currency_symbol})`
                        }
                        fullWidth
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        name="sale_price"
                        component={TextField}
                        floatingLabelText={
                          messages.products_salePrice +
                          ` (${settings.currency_symbol})`
                        }
                        fullWidth
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        name="date_sale_from"
                        component={DatePicker}
                        textFieldStyle={{ width: "100%" }}
                        format={(value, name) => (value === "" ? null : value)}
                        floatingLabelText={messages.products_dateSaleFrom}
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        name="date_sale_to"
                        component={DatePicker}
                        textFieldStyle={{ width: "100%" }}
                        format={(value, name) => (value === "" ? null : value)}
                        floatingLabelText={messages.products_dateSaleTo}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xs-5 col-xs-offset-2">
                  <div className="blue-title">
                    {messages.products_inventory}
                  </div>

                  <Field
                    name="sku"
                    component={TextField}
                    floatingLabelText={messages.products_sku}
                    fullWidth
                  />

                  <div className="row">
                    <div className="col-xs-6">
                      <Field
                        name="stock_quantity"
                        component={TextField}
                        floatingLabelText={messages.products_stockQuantity}
                        fullWidth
                      />
                    </div>
                    <div className="col-xs-6">
                      <Field
                        name="weight"
                        component={TextField}
                        floatingLabelText={
                          messages.products_weight +
                          ` (${settings.weight_unit})`
                        }
                        fullWidth
                      />
                    </div>
                  </div>

                  <Field
                    name="date_stock_expected"
                    component={DatePicker}
                    textFieldStyle={{ width: "100%" }}
                    format={(value, name) => (value === "" ? null : value)}
                    floatingLabelText={messages.products_dateStockExpected}
                  />
                </div>
              </div>

              <Field
                name="stock_tracking"
                component={CustomToggle}
                label={messages.products_stockTracking}
              />
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <Field
                name="stock_preorder"
                component={CustomToggle}
                label={messages.products_stockPreorder}
              />
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <Field
                name="stock_backorder"
                component={CustomToggle}
                label={messages.products_stockBackorder}
              />
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <Field
                name="discontinued"
                component={CustomToggle}
                label={messages.products_discontinued}
              />
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <Field
                name="enabled"
                component={CustomToggle}
                label={messages.enabled}
              />
            </div>
            <div
              className={
                "buttons-box " +
                (pristine ? "buttons-box-pristine" : "buttons-box-show")
              }
            >
              <FlatButton
                label={messages.cancel}
                className={style.button}
                onClick={form.reset}
                disabled={pristine || submitting}
              />
              <RaisedButton
                type="submit"
                label={messages.save}
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

export default ProductInventoryForm
