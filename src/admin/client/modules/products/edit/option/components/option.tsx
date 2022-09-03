import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle } from "modules/shared/form"
import React, { FC, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { SelectField, TextField } from "redux-form-material-ui"
import style from "./style.css"
import OptionValues from "./values"

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
  deleteOption
  optionValues
  createOptionValue
  updateOptionValue
  deleteOptionValue
  fetchData
}

const ProductOptionForm: FC<Props> = props => {
  const {
    initialValues,
    onSubmit,
    deleteOption,
    optionValues,
    createOptionValue,
    updateOptionValue,
    deleteOptionValue,
    fetchData,
  } = props

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ handleSubmit, pristine, form, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Paper className="paper-box" zDepth={1}>
              <div className={style.innerBox}>
                <Field
                  name="name"
                  component={TextField}
                  floatingLabelText={messages.optionName}
                  fullWidth
                />
                <div className="row">
                  <div className="col-xs-6">
                    <Field
                      name="position"
                      component={TextField}
                      type="number"
                      floatingLabelText={messages.position}
                      fullWidth
                    />
                  </div>
                  <div className="col-xs-6">
                    <Field
                      component={SelectField}
                      autoWidth
                      fullWidth
                      name="control"
                      floatingLabelText={messages.optionControl}
                    >
                      <MenuItem
                        value="select"
                        primaryText={messages.optionControlSelect}
                      />
                    </Field>
                  </div>
                </div>
                <div className={style.shortControl}>
                  <Field
                    name="required"
                    component={CustomToggle}
                    label={messages.settings_fieldRequired}
                  />
                </div>
              </div>
              <div className="buttons-box">
                <RaisedButton
                  label={messages.actions_delete}
                  secondary
                  onClick={deleteOption}
                />
                <FlatButton
                  label={messages.cancel}
                  style={{ marginLeft: 12 }}
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
      <OptionValues
        optionValues={optionValues}
        createOptionValue={createOptionValue}
        updateOptionValue={updateOptionValue}
        deleteOptionValue={deleteOptionValue}
      />
    </div>
  )
}

export default ProductOptionForm
