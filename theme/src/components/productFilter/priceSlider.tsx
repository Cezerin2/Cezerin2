import { Range } from "rc-slider"
import React, { FC, useEffect, useState } from "react"
import * as helper from "../../lib/helper"
import { text } from "../../lib/settings"

interface Props {
  minPrice
  maxPrice
  setPriceFromAndTo
  settings
}

const PriceSlider: FC<Props> = props => {
  const [minValue, setMinValue] = useState(
    props.minValue > 0 ? props.minValue : props.minPrice
  )
  const [maxValue, setMaxValue] = useState(
    props.maxValue > 0 ? props.maxValue : props.maxPrice
  )

  const { minPrice, maxPrice, setPriceFromAndTo, settings } = props

  useEffect(() => {
    setMinValue(minPrice)
    setMaxValue(maxPrice)
  }, [minPrice, maxPrice])

  const setValues = values => {
    if (Array.isArray(values) && values.length === 2) {
      setMinValue(values[0])
      setMaxValue(values[1])
    }
  }

  return (
    <div className="price-filter">
      <div className="attribute-title">{text.price}</div>
      <Range
        min={minPrice}
        max={maxPrice}
        value={[minValue, maxValue]}
        disabled={maxPrice === 0}
        className="price-filter-range"
        onAfterChange={values => {
          setPriceFromAndTo(...values)
        }}
        onChange={setValues}
      />
      <div className="columns is-mobile is-gapless price-filter-values">
        <div className="column has-text-left">
          {helper.formatCurrency(minValue, settings)}
        </div>
        <div className="column has-text-right">
          {helper.formatCurrency(maxValue, settings)}
        </div>
      </div>
    </div>
  )
}

export default PriceSlider
