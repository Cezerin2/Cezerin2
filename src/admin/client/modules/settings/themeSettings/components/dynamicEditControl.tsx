import MenuItem from "material-ui/MenuItem"
import { ColorField, CustomToggle, NumberField } from "modules/shared/form"
import React from "react"
import { Field, FieldArray } from "redux-form"
import { SelectField, TextField } from "redux-form-material-ui"
import ArrayEditor from "./arrayEditor"
import ImageEditor from "./imageEditor"
import style from "./style.css"

const DynamicEditControl = ({
  type,
  fieldName,
  label,
  options,
  properties,
}) => {
  const hasOptions = options && Array.isArray(options) && options.length > 0
  const hasProperties =
    properties && Array.isArray(properties) && properties.length > 0

  if (type === "string" && !hasOptions) {
    return (
      <Field
        component={TextField}
        fullWidth={true}
        name={fieldName}
        floatingLabelText={label}
      />
    )
  } else if (type === "string" && hasOptions) {
    const selectOptions = options.map((option, index) => (
      <MenuItem key={index} value={option.value} primaryText={option.label} />
    ))
    return (
      <Field
        component={SelectField}
        name={fieldName}
        floatingLabelText={label}
        fullWidth={true}
        autoWidth={true}
      >
        {selectOptions}
      </Field>
    )
  } else if (type === "number") {
    return <Field component={NumberField} name={fieldName} label={label} />
  } else if (type === "color") {
    return (
      <div className={style.colorInput}>
        <label>{label}</label>
        <Field component={ColorField} name={fieldName} />
      </div>
    )
  } else if (type === "boolean") {
    return (
      <Field
        component={CustomToggle}
        name={fieldName}
        label={label}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      />
    )
  } else if (type === "array" && hasProperties) {
    return (
      <FieldArray
        name={fieldName}
        component={ArrayEditor}
        label={label}
        properties={properties}
      />
    )
  } else if (type === "image") {
    return <Field name={fieldName} component={ImageEditor} label={label} />
  } else {
    return null
  }
}

export default DynamicEditControl
