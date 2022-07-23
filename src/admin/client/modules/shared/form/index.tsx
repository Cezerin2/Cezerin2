import Checkbox from "material-ui/Checkbox"
import { List, ListItem } from "material-ui/List"
import TextField from "material-ui/TextField"
import Toggle from "material-ui/Toggle"
import React, { FC, useEffect, useState } from "react"

export const CustomToggle = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => {
  return (
    <Toggle
      label={label}
      toggled={input.value ? true : false}
      onToggle={(event, isInputChecked) => {
        input.onChange(isInputChecked)
      }}
      className={className}
      disabled={disabled}
      style={style}
    />
  )
}

export const NumberField = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => (
  <TextField
    floatingLabelText={label}
    fullWidth
    disabled={disabled}
    value={input.value}
    type="number"
    onChange={(event, value) => {
      let number = parseFloat(value)
      number = number ? number : 0
      input.onChange(number)
    }}
  />
)

export const ColorField = ({ input, meta: { touched, error } }) => (
  <input {...input} type="color" />
)

interface Props {
  items
  disabled
  columns?: number
  input
}

export const MultiSelect: FC<Props> = props => {
  const values = Array.isArray(props.input.value) ? props.input.value : []
  const [selectedItems, setSelectedItems] = useState(values)

  const { items, disabled, columns = 2, input } = props

  useEffect(() => {
    if (values !== selectedItems) {
      setSelectedItems(values)
    }
  }, [values])

  const onCheckboxChecked = item => {
    let newSelectedItems = []
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter(i => i !== item)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    newSelectedItems.sort()
    setSelectedItems(newSelectedItems)
    input.onChange(newSelectedItems)
  }

  const isCheckboxChecked = item => {
    return selectedItems.includes(item)
  }

  const columnsClass = 12 / columns

  const elements = items.map((item, index) => (
    <div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
      {item && item !== "" && (
        <ListItem
          leftCheckbox={
            <Checkbox
              checked={isCheckboxChecked(item)}
              disabled={disabled}
              onCheck={(e, isChecked) => {
                onCheckboxChecked(item)
              }}
            />
          }
          primaryText={item}
        />
      )}
    </div>
  ))

  return (
    <List>
      <div className="row">{elements}</div>
    </List>
  )
}
