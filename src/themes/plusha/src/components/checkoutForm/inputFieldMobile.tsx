import React from "react"
import InputMask from "react-input-mask"

const InputFieldMobile = field => (
  <div className={field.className}>
    <InputMask
      mask="+9 (999) 999-9999"
      maskPlaceholder={null}
      placeholder={field.label}
      {...field.input}
      disabled={field.disabled}
      type={field.type}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
    <label htmlFor={field.id}>
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
      <span className="input__label">{field.label}</span>
    </label>
  </div>
)

export default InputFieldMobile
