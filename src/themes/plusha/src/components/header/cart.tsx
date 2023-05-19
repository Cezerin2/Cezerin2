import React, { Fragment } from "react"
import { NavLink, Redirect } from "react-router-dom"
import Lscache from "lscache"
import { themeSettings, text } from "../../lib/settings"
import * as helper from "../../lib/helper"

const CartItem = ({ item, deleteCartItem, settings }) => {
  const thumbnail = helper.getThumbnailUrl(
    item.image_url,
    themeSettings.cartThumbnailWidth
  )

  let price = item.price_total

  return (
    <div className="cart__item cart-item">
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
          <div className="cart-options__name">
            {text.qty}: {item.quantity}
          </div>
        </div>
      </div>

      <div className="cart-item__functions">
        <div className="cart-item__price">
          {helper.formatCurrency(price, settings)}
        </div>
        <a
          className="cart-item__button button button_light button_cart-delete"
          onClick={() => deleteCartItem(item.id)}
        >
          {text.remove}
        </a>
      </div>
    </div>
  )
}

export default class Cart extends React.PureComponent {
  render() {
    const { cart, deleteCartItem, settings, cartToggle } = this.props

    if (cart && cart.items && cart.items.length > 0) {
      const items = cart.items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          deleteCartItem={deleteCartItem}
          settings={settings}
        />
      ))

      return (
        <Fragment>
          <div className="cart__title">{text.orderSummary}</div>
          {items}

          <NavLink
            className="cart__button button button_cart"
            to={{
              pathname: "/checkout",
              state: { cartLayer: true },
            }}
            onClick={cartToggle}
          >
            {text.proceedToCheckout}
          </NavLink>
        </Fragment>
      )
    }
    return (
      <div>
        <p>{text.cartEmpty}</p>
      </div>
    )
  }
}
