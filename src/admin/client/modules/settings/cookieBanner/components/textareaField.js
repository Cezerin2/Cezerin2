import React from "react"
import { Fields } from "redux-form"
let inp = ""
const setInputValueText = value => {
  inp = value
}
const TextAreaField = field => (
  <div className={field.className}>
    <label htmlFor={field.id}>
      {field.label}
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </label>
    <textarea
      {...field.input}
      placeholder={field.placeholder}
      rows={field.rows}
      id={field.id}
      onInput={event => setInputValueText(event.target.value)}
      value={inp ? inp : field.text}
      rows={field.rows}
      cols={field.cols}
    />
  </div>
)

export default TextAreaField
