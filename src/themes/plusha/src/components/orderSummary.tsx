import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import Lscache from "lscache"
import { themeSettings, text } from "../lib/settings"
import * as helper from "../lib/helper"

const SummaryItem = ({ settings, item, updateCartItemQuantiry }) => {
  const thumbnail = helper.getThumbnailUrl(
    item.image_url,
    themeSettings.cartThumbnailWidth
  )
  const qtyOptions = []
  const maxQty = item.stock_backorder
    ? themeSettings.maxCartItemQty
    : item.stock_quantity >= themeSettings.maxCartItemQty
    ? themeSettings.maxCartItemQty
    : item.stock_quantity

  for (let i = 0; i <= maxQty; i++) {
    const optionText = i === 0 ? text.remove : i
    qtyOptions.push(
      <option key={i} value={i}>
        {optionText}
      </option>
    )
  }

  let price = item.price_total

  return (
    <div className="cart__item cart-item cart-item_checkout">
      <div className="cart-item__details">
        <div className="cart-item__image">
          <NavLink to={item.path}>
            <div
              className="cart-item__img"
              style={{ backgroundImage: `url(${thumbnail})` }}
            />
          </NavLink>
        </div>
        <div className="cart-item__name">
          <NavLink to={item.path}>{item.name}</NavLink>
        </div>
        <div className="cart-item__options cart-options">
          {item.variant_name.length > 0 && (
            <div className="cart-options__name">{item.variant_name}</div>
          )}
          <div className="qty cart-options__name">
            <span className="cart-options__name_qty">{text.qty}:</span>
            <span className="select cart-options__select">
              <select
                onChange={e => {
                  updateCartItemQuantiry(item.id, e.target.value)
                }}
                value={item.quantity}
              >
                {qtyOptions}
              </select>
            </span>
          </div>
        </div>
      </div>

      <div className="cart-item__functions">
        <div className="cart-item__price">
          {helper.formatCurrency(price, settings)}
        </div>
      </div>
    </div>
  )
}

SummaryItem.propTypes = {
  settings: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
  updateCartItemQuantiry: PropTypes.func.isRequired,
}

const OrderSummary = props => {
  const {
    updateCartItemQuantiry,
    state: { cart, settings },
  } = props

  if (cart && cart.items && cart.items.length > 0) {
    const items = cart.items.map(item => (
      <SummaryItem
        key={item.id}
        item={item}
        updateCartItemQuantiry={updateCartItemQuantiry}
        settings={settings}
      />
    ))

    let subtotal = cart.grand_total
    let grand_total = cart.grand_total

    return (
      <Fragment>
        <div className="cart__title cart__title_checkout">
          {text.orderSummary}
        </div>

        {items}
        <div className="cart__summary summary">
          <div className="summary__row">
            {cart.tax_total > 0 && cart.item_tax_included && (
              <div className="summary__col">{text.included_tax}</div>
            )}

            {cart.tax_total > 0 && cart.item_tax_included && (
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(cart.tax_total, settings)}
              </div>
            )}
          </div>
          <div className="summary__row">
            <div className="summary__col">{text.subtotal}</div>
            <div className="summary__col summary__col_price">
              {helper.formatCurrency(subtotal, settings)}
            </div>
          </div>

          <div className="summary__row">
            <div className="summary__col">{text.shipping}</div>
            <div className="summary__col summary__col_price">
              {helper.formatCurrency(cart.shipping_total, settings)}
            </div>
          </div>

          <div className="summary__row">
            {cart.discount_total > 0 && (
              <div className="summary__col">{text.discount}</div>
            )}
            {cart.discount_total > 0 && (
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(cart.discount_total, settings)}
              </div>
            )}
          </div>

          <div className="summary__row">
            {cart.tax_total > 0 && !cart.item_tax_included && (
              <div className="summary__col">{text.tax}</div>
            )}

            {cart.tax_total > 0 && !cart.item_tax_included && (
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(cart.tax_total, settings)}
              </div>
            )}
          </div>

          <div className="summary__row">
            <div className="summary__col">{text.grandTotal}</div>
            <div className="summary__col summary__col_price">
              {helper.formatCurrency(grand_total, settings)}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  return null
}

OrderSummary.propTypes = {
  updateCartItemQuantiry: PropTypes.func.isRequired,
  state: PropTypes.shape({
    cart: PropTypes.shape({}),
    settings: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default OrderSummary
