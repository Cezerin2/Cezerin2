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
  const requiredFields = ["email", "full_name"]

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

const CustomerEditForm: FC<Props> = props => {
  const [groups, setGroups] = useState([])

  const { initialValues, onSubmit, onCancel } = props

  useEffect(() => {
    api.customerGroups.list().then(({ status, json }) => {
      setGroups(json)
    })
  }, [])

  const groupItems = groups.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  groupItems.push(
    <MenuItem
      key="none"
      value={null}
      primaryText={messages.customers_noGroup}
    />
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
            <div>
              <Field
                component={TextField}
                fullWidth
                name="full_name"
                floatingLabelText={messages.full_name}
              />
            </div>
            <Field
              component={SelectField}
              fullWidth
              name="group_id"
              floatingLabelText={messages.group}
            >
              {groupItems}
            </Field>
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
            <div>
              <Field
                component={TextField}
                fullWidth
                name="note"
                floatingLabelText={messages.note}
                multiLine
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

export default CustomerEditForm
