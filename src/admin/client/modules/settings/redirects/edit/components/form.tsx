import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const validate = values => {
  const errors = {}
  const requiredFields = ["from", "to"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

interface Props {
  initialValues
  onSubmit
  redirectId
  onLoad: () => void
}

const EditRedirectForm: FC<Props> = props => {
  const { initialValues, onSubmit, redirectId, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const isAdd = redirectId === null || redirectId === undefined

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, pristine, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <Field
                name="from"
                component={TextField}
                floatingLabelText="From (e.g. /old-path)"
                fullWidth
              />
              <Field
                name="to"
                component={TextField}
                floatingLabelText="To (e.g. /new-path)"
                fullWidth
              />
            </div>
            <div
              className={`buttons-box ${
                pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show"
              }`}
            >
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

export default EditRedirectForm
