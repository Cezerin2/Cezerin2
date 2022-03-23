import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import TagsInput from "react-tagsinput"
import { Field, FieldArray, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import ProductCategoryMultiSelect from "./productCategoryMultiSelect"
import ProductCategorySelect from "./productCategorySelect"
import ProductsArray from "./productsArray"
import style from "./style.css"

const TagsField = ({ input, placeholder }) => {
  const tagsArray = input.value && Array.isArray(input.value) ? input.value : []
  return (
    <TagsInput
      value={tagsArray}
      inputProps={{ placeholder }}
      onChange={tags => {
        input.onChange(tags)
      }}
    />
  )
}

const ProductAdditionalForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  settings,
  categories,
}) => (
  <form onSubmit={handleSubmit}>
    <Paper className="paper-box" zDepth={1}>
      <div className={style.innerBox}>
        <div
          className="row middle-xs"
          style={{
            padding: "0 0 15px 0",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 20,
          }}
        >
          <div className="col-xs-12 col-sm-4">{messages.category}</div>
          <div className="col-xs-12 col-sm-8">
            <Field
              name="category_id"
              component={ProductCategorySelect}
              categories={categories}
            />
          </div>
        </div>

        <div
          className="row middle-xs"
          style={{
            padding: "0 0 15px 0",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 25,
          }}
        >
          <div className="col-xs-12 col-sm-4">
            {messages.additionalCategories}
          </div>
          <div className="col-xs-12 col-sm-8">
            <FieldArray
              name="category_ids"
              component={ProductCategoryMultiSelect}
              categories={categories}
            />
          </div>
        </div>

        <div
          className="row middle-xs"
          style={{ padding: "0 0 20px 0", borderBottom: "1px solid #e0e0e0" }}
        >
          <div className="col-xs-12 col-sm-4">{messages.tags}</div>
          <div className="col-xs-12 col-sm-8">
            <Field
              name="tags"
              component={TagsField}
              placeholder={messages.newTag}
            />
          </div>
        </div>

        <div
          className="row middle-xs"
          style={{ borderBottom: "1px solid #e0e0e0", marginBottom: 20 }}
        >
          <div className="col-xs-12 col-sm-4">{messages.position}</div>
          <div className="col-xs-12 col-sm-8">
            <Field
              name="position"
              component={TextField}
              floatingLabelText={messages.position}
              fullWidth={false}
              style={{ width: 128 }}
              type="number"
            />
          </div>
        </div>

        {messages.relatedProducts}
        <FieldArray
          name="related_product_ids"
          component={ProductsArray}
          settings={settings}
        />
      </div>
      <div
        className={`buttons-box ${
          pristine ? "buttons-box-pristine" : "buttons-box-show"
        }`}
      >
        <FlatButton
          label={messages.cancel}
          className={style.button}
          onClick={reset}
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
)

export default reduxForm({
  form: "ProductAdditionalForm",
  enableReinitialize: true,
})(ProductAdditionalForm)
