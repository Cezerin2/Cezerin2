import React, { FC } from "react"
import { Field, Form } from "react-final-form"

const InputField = field => (
  <div className={field.className}>
    <label htmlFor={field.id}>
      {field.label}
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </label>
    <input
      {...field.input}
      placeholder={field.placeholder}
      disabled={field.disabled}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

interface SingleInputProps {
  key?: number
  name: string
  id?: string
  component: "input" | ((field: any) => JSX.Element)
  type: "text" | "radio"
  label?: string
  value?: string | boolean
  validate?: (value: string) => Record<string, string>
  onClick?: (value: string) => void
  className?: string
}

export const SingleInput: FC<SingleInputProps> = props => {
  const {
    className,
    component,
    id,
    key,
    label,
    name,
    onClick,
    type,
    validate,
    value,
  } = props

  return (
    <Form onSubmit={() => {}}>
      {() => (
        <Field
          name={name}
          component={component}
          key={key}
          type={type}
          validate={validate}
          value={value?.toString()}
          className={className}
          id={id}
          label={label}
          onClick={onClick}
        />
      )}
    </Form>
  )
}

export default InputField
