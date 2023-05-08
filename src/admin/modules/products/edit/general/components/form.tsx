import api from "lib/api"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import Editor from "modules/shared/editor"
import React from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.sass"

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

const slugExists = values => {
  if (values.slug && values.slug.length > 0) {
    return api.products
      .slugExists(values.id, values.slug)
      .then(response => response.status === 200)
  } else {
    return Promise.resolve(false)
  }
}

const asyncValidate = values => {
  return Promise.all([slugExists(values)]).then(([isSlugExists]) => {
    let errors = {}

    if (isSlugExists) {
      errors.slug = messages.errors_urlTaken
    }

    if (Object.keys(errors).length > 0) {
      return Promise.reject(errors)
    } else {
      return Promise.resolve()
    }
  })
}

const ProductGeneralForm = ({ initialValues, onSubmit }) => {
  if (initialValues) {
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
                <Field
                  name="name"
                  component={TextField}
                  floatingLabelText={messages.products_name + " *"}
                  fullWidth
                />
                <Field
                  name="slug"
                  component={TextField}
                  floatingLabelText={messages.slug}
                  fullWidth
                />
                <p className="field-hint">{messages.help_slug}</p>
                <Field
                  name="meta_title"
                  component={TextField}
                  floatingLabelText={messages.pageTitle}
                  fullWidth
                />
                <Field
                  name="meta_description"
                  component={TextField}
                  floatingLabelText={messages.metaDescription}
                  fullWidth
                />
                <div className="field-hint" style={{ marginTop: 40 }}>
                  {messages.description}
                </div>
                <Field name="description" component={Editor} />
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
  } else {
    return null
  }
}

export default ProductGeneralForm
