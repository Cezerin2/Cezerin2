import Checkbox from "material-ui/Checkbox"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect, useState } from "react"

interface Props {
  input
  shippingMethods
}

const SelectShippingMethodsField: FC<Props> = props => {
  const ids = Array.isArray(props.input.value) ? props.input.value : []
  const [selectedIds, setSelectedIds] = useState(ids)

  const { input, shippingMethods } = props

  useEffect(() => {
    const newIds = Array.isArray(input.value) ? input.value : []
    if (newIds !== selectedIds) {
      setSelectedIds(newIds)
    }
  }, [input])

  const onCheckboxChecked = methodId => {
    let idsList = selectedIds
    if (idsList.includes(methodId)) {
      idsList = idsList.filter(id => id !== methodId)
    } else {
      idsList.push(methodId)
    }
    setSelectedIds(idsList)
    input.onChange(idsList)
  }

  const isCheckboxChecked = methodId => {
    return selectedIds.includes(methodId)
  }

  const items = shippingMethods.map(method => (
    <ListItem
      key={method.id}
      leftCheckbox={
        <Checkbox
          checked={isCheckboxChecked(method.id)}
          onCheck={(e, isChecked) => {
            onCheckboxChecked(method.id)
          }}
        />
      }
      primaryText={method.name}
      secondaryText={method.description}
    />
  ))

  return <List>{items}</List>
}

export default SelectShippingMethodsField
