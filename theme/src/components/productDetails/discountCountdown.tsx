import React, { FC, useEffect, useState } from "react"
import { text } from "../../lib/settings"

const DiscountCountdown: FC<{ product }> = ({ product }) => {
  const [diff, setDiff] = useState(null)

  useEffect(() => {
    const interval = setInterval(tick, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const tick = () => {
    const dateNow = new Date()
    const dateTo = new Date(product.date_sale_to)
    const diffValue = Math.abs(
      Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000)
    )

    setDiff(diffValue)
  }

  const pad = num => {
    return num < 10 ? "0" + num : num
  }

  if (product) {
    let days = Math.floor(diff / (24 * 60 * 60))
    let leftSec = diff - days * 24 * 60 * 60

    let hrs = Math.floor(leftSec / (60 * 60))
    leftSec = leftSec - hrs * 60 * 60

    let min = Math.floor(leftSec / 60)
    leftSec = leftSec - min * 60

    return (
      <div className="discount-countdown">
        <div className="discount-title">{text.saleEnds}:</div>

        <div
          className="columns is-mobile has-text-centered discount-numbers is-gapless"
          style={{ margin: "8px 0" }}
        >
          <div className="column is-2">{pad(days)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(hrs)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(min)}</div>
          <div className="column is-1">:</div>
          <div className="column is-2">{pad(leftSec)}</div>
        </div>

        <div className="columns is-mobile has-text-centered discount-labels is-gapless">
          <div className="column is-2">{text.days}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.hours}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.minutes}</div>
          <div className="column is-1" />
          <div className="column is-2">{text.seconds}</div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default DiscountCountdown
