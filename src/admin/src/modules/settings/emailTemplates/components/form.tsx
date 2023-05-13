import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.sass"

interface Props {
  initialValues
  onSubmit
  onLoad
}

const EmailTemplate: FC<Props> = props => {
  const { initialValues, onSubmit, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "initial",
            width: "100%",
          }}
        >
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <div>
                <Field
                  component={TextField}
                  fullWidth
                  name="subject"
                  floatingLabelText={messages.settings_emailSubject}
                />
              </div>
              <div>
                <Field
                  component={TextField}
                  fullWidth
                  name="body"
                  multiLine
                  floatingLabelText={messages.settings_emailBody}
                />
              </div>
            </div>
            <div className="buttons-box">
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

export default EmailTemplate
