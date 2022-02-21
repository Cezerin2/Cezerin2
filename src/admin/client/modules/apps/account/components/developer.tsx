import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const DeveloperForm = ({
  handleSubmit,
  pristine,
  submitting,
  initialValues,
}) => {
  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.developerProfile}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%",
        }}
      >
        <Paper style={{ margin: "0px 20px" }} zDepth={1}>
          <div style={{ padding: "10px 30px 30px 30px" }}>
            <div>
              <Field
                component={TextField}
                fullWidth
                name="name"
                floatingLabelText={messages.full_name}
              />
            </div>
            <div>
              <Field
                component={TextField}
                fullWidth
                name="description"
                floatingLabelText={messages.description}
                multiLine
                rows={1}
              />
            </div>
            <div>
              <Field
                component={TextField}
                fullWidth
                name="website"
                floatingLabelText={messages.website}
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
          </div>
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
    </div>
  )
}

export default reduxForm({
  form: "WebStoreDeveloperForm",
  enableReinitialize: true,
})(DeveloperForm)
