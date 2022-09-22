import messages from "lib/text"
import Divider from "material-ui/Divider"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle } from "modules/shared/form"
import React from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.sass"

const ServiceSettingsForm = ({ initialValues, onSubmit }) => {
  const fields = Object.keys(initialValues).map((key, index) => {
    const value = initialValues[key]
    return (
      <div key={index}>
        {typeof value === "boolean" && (
          <div>
            <Field
              component={CustomToggle}
              name={key}
              fullWidth={false}
              label={key}
              style={{ paddingTop: 16, paddingBottom: 16, width: "auto" }}
            />
            <Divider />
          </div>
        )}

        {typeof value === "number" && (
          <Field
            component={TextField}
            fullWidth
            type="number"
            name={key}
            floatingLabelText={key}
          />
        )}

        {typeof value !== "boolean" && typeof value !== "number" && (
          <Field
            component={TextField}
            fullWidth
            name={key}
            floatingLabelText={key}
          />
        )}
      </div>
    )
  })

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "0 0 15px 20px" }}>
        {messages.drawer_settings}
      </div>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, pristine, submitting }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "initial",
              width: "100%",
            }}
          >
            <Paper style={{ margin: "0px 20px" }} zDepth={1}>
              <div style={{ padding: "10px 30px 30px 30px" }}>{fields}</div>
              <div
                className="buttons-box"
                style={{ display: pristine ? "none" : "block" }}
              >
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
    </div>
  )
}

export default ServiceSettingsForm
