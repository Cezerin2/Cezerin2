import api from "lib/api"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import Editor from "modules/shared/editor"
import { CustomToggle } from "modules/shared/form"
import ImageUpload from "modules/shared/imageUpload"
import React from "react"
import { Field, Form } from "react-final-form"
import { TextField } from "redux-form-material-ui"
import style from "./style.css"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.forEach(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const asyncValidate = values => {
  return new Promise((resolve, reject) => {
    if (values.slug && values.slug.length > 0) {
      api.sitemap
        .retrieve({ path: "/" + values.slug })
        .then(({ status, json }) => {
          if (status === 404) {
            resolve()
          } else {
            if (json && !Object.is(json.resource, values.id)) {
              reject({ slug: messages.errors_urlTaken })
            } else {
              resolve()
            }
          }
        })
    } else {
      resolve()
    }
  })
}

const ProductCategoryEditForm = ({
  initialValues,
  onSubmit,
  uploadingImage,
  onImageUpload,
  onImageDelete,
  isSaving,
}) => {
  let imageUrl = null
  let categoryId = null

  if (initialValues) {
    categoryId = initialValues.id
    imageUrl = initialValues.image
  }

  if (categoryId) {
    return (
      <Paper className="paper-box" zDepth={1}>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          asyncValidate={asyncValidate}
          validateOnBlur
        >
          {({ handleSubmit, pristine, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={style.innerBox}>
                <Field
                  name="name"
                  component={TextField}
                  floatingLabelText={messages.productCategories_name + " *"}
                  fullWidth
                />
                <div className="field-hint" style={{ marginTop: 40 }}>
                  {messages.description}
                </div>
                <Field
                  name="description"
                  entityId={categoryId}
                  component={Editor}
                />
                <div className={style.shortBox}>
                  <Field
                    name="enabled"
                    component={CustomToggle}
                    label={messages.enabled}
                    className={style.toggle}
                  />
                  <ImageUpload
                    uploading={uploadingImage}
                    imageUrl={imageUrl}
                    onDelete={onImageDelete}
                    onUpload={onImageUpload}
                  />
                </div>
                <div className="blue-title">{messages.seo}</div>
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
                  disabled={pristine || submitting || isSaving}
                />
              </div>
            </form>
          )}
        </Form>
      </Paper>
    )
  } else {
    return null
  }
}

export default ProductCategoryEditForm
