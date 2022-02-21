import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import { CustomToggle, MultiSelect } from "modules/shared/form"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const WEBHOOK_EVENTS = [
  "order.created",
  "order.updated",
  "order.deleted",
  "transaction.created",
  "transaction.updated",
  "transaction.deleted",
  "customer.created",
  "customer.updated",
  "customer.deleted",
]

const validate = values => {
  const errors = {}
  const requiredFields = ["url"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

class EditWebhookForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    let { handleSubmit, pristine, submitting, initialValues, webhookId } =
      this.props
    const isAdd = webhookId === null || webhookId === undefined

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <Field
                name="description"
                component={TextField}
                floatingLabelText={messages.description}
                fullWidth
                multiLine
              />
              <Field
                name="url"
                component={TextField}
                floatingLabelText="URL"
                fullWidth
              />
              <Field
                name="secret"
                component={TextField}
                floatingLabelText={messages.webhookSecret}
                fullWidth
              />
              <div style={{ maxWidth: 256 }}>
                <Field
                  component={CustomToggle}
                  name="enabled"
                  label={messages.enabled}
                  style={{ paddingTop: 16, paddingBottom: 16 }}
                />
              </div>
              <div className="blue-title">{messages.webhookEvents}</div>
              <Field
                name="events"
                component={MultiSelect}
                items={WEBHOOK_EVENTS}
                columns={3}
              />
            </div>
            <div
              className={
                "buttons-box " +
                (pristine && !isAdd
                  ? "buttons-box-pristine"
                  : "buttons-box-show")
              }
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
      </div>
    )
  }
}

export default reduxForm({
  form: "EditWebhookForm",
  validate,
  enableReinitialize: true,
})(EditWebhookForm)
