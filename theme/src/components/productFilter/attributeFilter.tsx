import React, { FC, useEffect, useState } from "react"

interface Props {
  checked
  count
  attributeName
  valueName
  setFilterAttribute
  unsetFilterAttribute
}

const AttributeValue: FC<Props> = props => {
  const [checked, setChecked] = useState(props.checked)
  const {
    count,
    attributeName,
    valueName,
    setFilterAttribute,
    unsetFilterAttribute,
  } = props

  useEffect(() => {
    setChecked(props.checked)
  }, [props.checked])

  const onChange = ({ target }) => {
    setChecked(target.checked)

    if (target.checked) {
      setFilterAttribute(attributeName, valueName)
    } else {
      unsetFilterAttribute(attributeName, valueName)
    }
  }

  const isDisabled = count === 0
  const classChecked = checked ? "attribute-checked" : ""
  const classDisabled = isDisabled ? "attribute-disabled" : ""

  return (
    <label className={classChecked + " " + classDisabled}>
      <input
        type="checkbox"
        disabled={isDisabled}
        onChange={onChange}
        checked={checked}
      />
      {valueName}
    </label>
  )
}

const AttributeSet = ({
  attribute,
  setFilterAttribute,
  unsetFilterAttribute,
}) => {
  const values = attribute.values.map((value, index) => (
    <AttributeValue
      key={index}
      attributeName={attribute.name}
      valueName={value.name}
      checked={value.checked}
      count={value.count}
      setFilterAttribute={setFilterAttribute}
      unsetFilterAttribute={unsetFilterAttribute}
    />
  ))

  return (
    <div className="attribute">
      <div className="attribute-title">{attribute.name}</div>
      {values}
    </div>
  )
}

const AttributeFilter = ({
  attributes,
  setFilterAttribute,
  unsetFilterAttribute,
}) => {
  const attributeSets = attributes.map((attribute, index) => (
    <AttributeSet
      key={index}
      attribute={attribute}
      setFilterAttribute={setFilterAttribute}
      unsetFilterAttribute={unsetFilterAttribute}
    />
  ))

  return <div className="attribute-filter">{attributeSets}</div>
}

export default AttributeFilter
