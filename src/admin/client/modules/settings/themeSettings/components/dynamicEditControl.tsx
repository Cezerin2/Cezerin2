import MenuItem from "material-ui/MenuItem"
import { ColorField, CustomToggle, NumberField } from "modules/shared/form"
import React, { FC } from "react"
import { Field, FieldArray } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"
import ArrayEditor from "./arrayEditor"
import ImageEditor from "./imageEditor"
import style from "./style.css"

interface Props {
  type
  fieldName
  label
  options
  properties
}

const DynamicEditControl: FC<Props> = props => {
  const { type, fieldName, label, options, properties } = props

  const hasOptions = options && Array.isArray(options) && options.length > 0
  const hasProperties =
    properties && Array.isArray(properties) && properties.length > 0

  switch (type) {
    case "string":
      if (hasOptions) {
        const selectOptions = options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            primaryText={option.label}
          />
        ))

        return (
          <Field
            component={SelectField}
            name={fieldName}
            floatingLabelText={label}
            fullWidth
            autoWidth
          >
            {selectOptions}
          </Field>
        )
      }

      return (
        <Field
          component={TextField}
          fullWidth
          name={fieldName}
          floatingLabelText={label}
        />
      )

    case "number":
      return <Field component={NumberField} name={fieldName} label={label} />

    case "color":
      return (
        <div className={style.colorInput}>
          <label>{label}</label>
          <Field component={ColorField} name={fieldName} />
        </div>
      )

    case "boolean":
      return (
        <Field
          component={CustomToggle}
          name={fieldName}
          label={label}
          style={{ paddingTop: 16, paddingBottom: 16 }}
        />
      )

    case "array":
      if (hasProperties)
        return (
          <FieldArray
            name={fieldName}
            component={ArrayEditor}
            label={label}
            properties={properties}
          />
        )

      return null

    case "image":
      return <Field name={fieldName} component={ImageEditor} label={label} />

    default:
      return null
  }
}

export default DynamicEditControl
