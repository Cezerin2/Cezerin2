import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import ConfirmationDialog from "modules/shared/confirmation"
import { MultiSelect } from "modules/shared/form"
import React, { FC, useEffect, useState } from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const Scopes = [
  "admin",
  "dashboard",
  "read:products",
  "write:products",
  "read:product_categories",
  "write:product_categories",
  "read:orders",
  "write:orders",
  "read:customers",
  "write:customers",
  "read:customer_groups",
  "write:customer_groups",
  "read:pages",
  "write:pages",
  "read:order_statuses",
  "write:order_statuses",
  "read:theme",
  "write:theme",
  "read:sitemap",
  "",
  "read:shipping_methods",
  "write:shipping_methods",
  "read:payment_methods",
  "write:payment_methods",
  "read:settings",
  "write:settings",
  "read:files",
  "write:files",
]

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

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
  tokenId
  newToken
  onDelete
  onLoad: () => void
}

const EditTokenForm: FC<Props> = props => {
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)

  const { initialValues, onSubmit, tokenId, newToken, onDelete, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const isTokenAdded = !!newToken
  const isAdd = tokenId === null || tokenId === undefined

  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Paper className="paper-box" zDepth={1}>
              <div className={style.innerBox}>
                <Field
                  name="name"
                  component={TextField}
                  floatingLabelText={messages.settings_tokenName}
                  fullWidth
                />
                <Field
                  name="email"
                  component={TextField}
                  floatingLabelText={messages.email}
                  fullWidth
                  disabled={!isAdd}
                  type="email"
                />
                <Field
                  name="expiration"
                  component={TextField}
                  floatingLabelText={messages.settings_tokenExp}
                  fullWidth
                  type="number"
                />
                <div className="blue-title">
                  {messages.settings_selectScopes}
                </div>
                <Field
                  name="scopes"
                  component={MultiSelect}
                  items={Scopes}
                  disabled={!isAdd}
                />
              </div>
              <div className="buttons-box">
                {!isAdd && (
                  <RaisedButton
                    label={messages.settings_revokeAccess}
                    secondary
                    style={{ float: "left" }}
                    onClick={() => setShowRevokeDialog(true)}
                  />
                )}
                <RaisedButton
                  type="submit"
                  label={
                    isAdd ? messages.settings_generateToken : messages.save
                  }
                  primary
                  className={style.button}
                  disabled={pristine || submitting}
                />
              </div>
            </Paper>
          </form>
        )}
      </Form>

      <ConfirmationDialog
        open={isTokenAdded}
        title={messages.settings_copyYourNewToken}
        description={newToken}
        submitLabel={messages.actions_done}
        cancelLabel={messages.cancel}
        modal
      />

      <ConfirmationDialog
        open={showRevokeDialog}
        title={messages.settings_tokenRevokeTitle}
        description={messages.settings_tokenRevokeDescription}
        onSubmit={onDelete}
        submitLabel={messages.settings_revokeAccess}
        cancelLabel={messages.cancel}
      />
    </>
  )
}

export default EditTokenForm
