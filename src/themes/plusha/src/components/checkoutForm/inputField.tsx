import React from "react"

const InputField = field => (
  <div className={field.className}>
    <input
      {...field.input}
      placeholder={field.label}
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

export default InputField
