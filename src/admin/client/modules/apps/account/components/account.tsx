import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle } from "modules/shared/form"
import React from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const AccountForm = ({ initialValues, onSubmit }) => (
  <div style={{ maxWidth: 720, width: "100%" }}>
    <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
      {messages.account}
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
            <div style={{ padding: "10px 30px 30px 30px" }}>
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
                  name="shop_url"
                  floatingLabelText={messages.shopUrl}
                />
              </div>
              <div>
                <Field
                  component={TextField}
                  fullWidth
                  name="admin_url"
                  floatingLabelText={messages.adminUrl}
                />
              </div>
              <Field
                component={CustomToggle}
                name="is_developer"
                label={messages.isDeveloper}
                style={{ paddingTop: 16, paddingBottom: 16 }}
              />
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
      )}
    </Form>
  </div>
)

export default AccountForm
