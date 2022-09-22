import { Delete } from "@mui/icons-material"
import arrayMutators from "final-form-arrays"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC } from "react"
import { Field, Form } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import style from "./style.sass"

const AttributesGrid = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    <div className="row row--no-gutter middle-xs">
      <div className={`col-xs-5 col--no-gutter ${style.head}`}>
        {messages.attributeName}
      </div>
      <div className={`col-xs-7 col--no-gutter ${style.head}`}>
        {messages.attributeValue}
      </div>
    </div>

    {fields.map((field, index) => {
      const fieldName = `${field}.name`
      const fieldValue = `${field}.value`
      return (
        <div
          className="row row--no-gutter middle-xs"
          key={index}
          style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
        >
          <div className="col-xs-5 col--no-gutter">
            <Field
              component="input"
              type="text"
              className={style.input}
              name={fieldName}
              placeholder={messages.attributeName}
            />
          </div>
          <div className="col-xs-6 col--no-gutter">
            <Field
              component="input"
              type="text"
              className={style.input}
              name={fieldValue}
              placeholder={messages.attributeValue}
            />
          </div>
          <div className="col-xs-1 col--no-gutter">
            <IconButton
              title={messages.actions_delete}
              onClick={() => fields.remove(index)}
              tabIndex={-1}
            >
              <Delete htmlColor="#a1a1a1" data-index={index} />
            </IconButton>
          </div>
        </div>
      )
    })}

    <div style={{ margin: 30 }}>
      <RaisedButton
        label={messages.addAttribute}
        onClick={() => fields.push({})}
      />
    </div>
  </div>
)

interface Props {
  initialValues
  onSubmit
}

const ProductAttributesForm: FC<Props> = props => {
  const { initialValues, onSubmit } = props

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
    >
      {({ handleSubmit, pristine, form, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Paper className="paper-box" zDepth={1}>
            <FieldArray name="attributes" component={AttributesGrid} />
            <div
              className={`buttons-box ${
                pristine ? "buttons-box-pristine" : "buttons-box-show"
              }`}
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
}

export default ProductAttributesForm
