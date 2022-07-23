import React, { FC, Fragment, useEffect, useState } from "react"
import { text } from "../../lib/settings"

interface Props {
  maxQuantity
  onChange
}

const Quantity: FC<Props> = props => {
  const [quantity, setQuantity] = useState(1)

  const { maxQuantity, onChange } = props

  useEffect(() => {
    if (quantity > maxQuantity) {
      updateQuantity(maxQuantity)
    }
  }, [maxQuantity])

  const handleChange = event => {
    updateQuantity(event.target.value)
  }

  const updateQuantity = quantity => {
    const intQuantity = parseInt(quantity)
    if (intQuantity > 0 && intQuantity <= maxQuantity) {
      setQuantity(intQuantity)
      onChange(intQuantity)
    }
  }

  const increment = () => {
    const newQuantity = quantity + 1
    updateQuantity(newQuantity)
  }

  const decrement = () => {
    const newQuantity = quantity - 1
    updateQuantity(newQuantity)
  }

  const disabled = maxQuantity === 0
  const value = disabled ? 0 : quantity

  return (
    <Fragment>
      <div>{text.qty}</div>
      <div className="product-quantity">
        <a className="decrement" onClick={decrement} />
        <input
          value={value}
          onChange={handleChange}
          maxLength="3"
          type="number"
          pattern="\d*"
          disabled={disabled}
        />
        <a className="increment" onClick={increment} />
      </div>
    </Fragment>
  )
}

export default Quantity
