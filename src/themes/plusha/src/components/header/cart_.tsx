import React from "react"
import { NavLink, Redirect } from "react-router-dom"
import Lscache from "lscache"
import { themeSettings, text } from "../../lib/settings"
import * as helper from "../../lib/helper"

const CartItem = ({ item, deleteCartItem, settings }) => {
  const thumbnail = helper.getThumbnailUrl(
    item.image_url,
    themeSettings.cartThumbnailWidth
  )

  return (
    <div className="cart__item cart-item">
      <div className="cart-item__details">
        <div className="cart-item__image">
          <NavLink to={item.path}>
            <img src={thumbnail} />{" "}
          </NavLink>{" "}
        </div>{" "}
        <div className="cart-item__name">
          <NavLink to={item.path}> {item.name} </NavLink>{" "}
        </div>{" "}
      </div>{" "}
      <div className="cart-item__options cart-options">
        {item.variant_name.length > 0 && (
          <div className="cart-options__name"> {item.variant_name} </div>
        )}

        <div className="cart-options__name">
          {" "}
          {text.qty}: {item.quantity}{" "}
        </div>
      </div>
      <div className="cart-item__functions">
        <div className="cart-item__price">
          {" "}
          {helper.formatCurrency(item.price_total, settings)}{" "}
        </div>{" "}
        <a
          className="cart-item__button button button_light button_cart-delete"
          onClick={() => deleteCartItem(item.id)}
        >
          {text.remove}{" "}
        </a>{" "}
      </div>{" "}
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
        <div>
          <div className="cart__title"> {text.orderSummary} </div> {items}{" "}
          {/* <hr className="separator" />
                    					<div className="columns is-mobile is-gapless">
                    						<div className="column is-7">
                    							<b>{text.subtotal}</b>
                    						</div>
                    						<div className="column is-5 has-text-right">
                    							<b>{helper.formatCurrency(cart.subtotal, settings)}</b>
                    						</div>
                    					</div> */}{" "}
          <NavLink
            className="cart__button button button_cart has-text-centered"
            to={{
              pathname:
                Lscache.get("auth_data") !== null ? "/checkout" : "/login",
              state: { cartLayer: true },
            }}
            onClick={cartToggle}
          >
            {text.proceedToCheckout}{" "}
          </NavLink>{" "}
        </div>
      )
    }
    return (
      <div>
        <p> {text.cartEmpty} </p>{" "}
      </div>
    )
  }
}
