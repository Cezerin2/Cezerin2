import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../lib/settings"
import * as helper from "../lib/helper"

const getCheckoutField = (checkoutFields, fieldName) => {
  if (checkoutFields && checkoutFields.length > 0) {
    return checkoutFields.find(
      f => f.name === fieldName && f.status !== "hidden"
    )
  }
  return null
}

const MobileField = ({ order, checkoutFields }) => {
  const checkoutField = getCheckoutField(checkoutFields, "mobile")
  return checkoutField && order.mobile !== "" ? (
    <ShippingFieldDiv
      label={helper.getCheckoutFieldLabel(checkoutField)}
      value={order.mobile}
    />
  ) : null
}

const CityField = ({ order, checkoutFields }) => {
  const checkoutField = getCheckoutField(checkoutFields, "city")
  return checkoutField && order.shipping_address.city !== "" ? (
    <ShippingFieldDiv
      label={helper.getCheckoutFieldLabel(checkoutField)}
      value={order.shipping_address.city}
    />
  ) : null
}

const CommentsField = ({ order, checkoutFields }) => {
  const checkoutField = getCheckoutField(checkoutFields, "comments")
  return checkoutField && order.comments !== "" ? (
    <ShippingFieldDiv
      label={helper.getCheckoutFieldLabel(checkoutField)}
      value={order.comments}
    />
  ) : null
}

const ShippingFields = ({ order, shippingMethod }) => {
  let shippingFields = null
  if (shippingMethod) {
    shippingFields = Object.keys(order.shipping_address).map((key, i) => {
      const fieldLabel = helper.getShippingFieldLabelOrderSuccess(key)
      const fieldValue = order.shipping_address[key]

      if (
        key.indexOf("coordinates") === -1 &&
        fieldValue !== "" &&
        fieldLabel !== ""
      ) {
        return (
          <ShippingFieldDiv key={i} label={fieldLabel} value={fieldValue} />
        )
      }
    })
  }

  return <div>{shippingFields}</div>
}

const ShippingFieldDiv = ({ label, value }) => (
  <div className="shipping-field delivery__row">
    <div className="delivery__col">{label}</div>
    <div className="delivery__col delivery__col_value">{value}</div>
  </div>
)

const OrderItem = ({ item, settings }) => {
  const thumbnail = helper.getThumbnailUrl(
    item.image_url,
    themeSettings.cartThumbnailWidth
  )
  return (
    <div className="order__item">
      <div className="order__col">
        <div className="order__value order__value_product cart-item">
          <div className="cart-item__details cart-item__details_order">
            <div
              className="cart-item__img"
              style={{ backgroundImage: `url(${thumbnail})` }}
            />

            <div className="cart-item__name">
              {item.name}
              <div className="cart-item__options cart-options">
                {item.variant_name.length > 0 && (
                  <div className="cart-options__name">{item.variant_name}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="order__col">
        <div className="order__option">{text.qty}</div>
        <div className="order__value">{item.quantity}</div>
      </div>
      <div className="order__col">
        <div className="order__option">{text.price}</div>
        <div className="order__value">
          {helper.formatCurrency(item.price, settings)}
        </div>
      </div>

      <div className="order__col">
        <div className="order__option">{text.total}</div>
        <div className="order__value">
          {helper.formatCurrency(item.price_total, settings)}
        </div>
      </div>
    </div>
  )
}

const OrderItems = ({ items, settings }) => {
  if (items && items.length > 0) {
    const rows = items.map(item => (
      <OrderItem key={item.id} item={item} settings={settings} />
    ))
    return <div className="order__body">{rows}</div>
  }
  return null
}

const CheckoutSuccess = ({
  order,
  settings,
  pageDetails,
  shippingMethod,
  checkoutFields,
}) => {
  if (order && order.items && order.items.length > 0) {
    return (
      <Fragment>
        <section className="section-container main__header">
          <h1 className="main__title">{text.checkoutSuccessTitle}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: pageDetails.content,
            }}
          />
        </section>

        <section className="section-container checkout-success">
          <div className="checkout-success__delivery delivery">
            <h2 className="delivery__title">{text.shipping}</h2>
            <div className="delivery__table">
              <MobileField order={order} checkoutFields={checkoutFields} />

              <CityField order={order} checkoutFields={checkoutFields} />

              <ShippingFields order={order} shippingMethod={shippingMethod} />

              <CommentsField order={order} checkoutFields={checkoutFields} />
            </div>

            <div className="delivery__table">
              <div className="delivery__row">
                <div className="delivery__col">{text.orderNumber}: </div>
                <div className="delivery__col delivery__col_value">
                  {order.number}
                </div>
              </div>
              <div className="delivery__row">
                <div className="delivery__col">{text.shippingMethod}: </div>
                <div className="delivery__col delivery__col_value">
                  {order.shipping_method}
                </div>
              </div>
              <div className="delivery__row">
                <div className="delivery__col">{text.paymentMethod}: </div>
                <div className="delivery__col delivery__col_value">
                  {order.payment_method}
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-success__order order">
            <div className="order__table">
              <div className="order__header">
                <div className="order__col">{text.productName}</div>
                <div className="order__col">{text.qty}</div>
                <div className="order__col">{text.price}</div>
                <div className="order__col">{text.total}</div>
              </div>

              <OrderItems items={order.items} settings={settings} />
            </div>
          </div>

          <div className="summary summary_order">
            {order.tax_total > 0 && order.item_tax_included && (
              <div className="summary__row">
                <div className="summary__col">{text.included_tax}:</div>
                <div className="summary__col summary__col_price">
                  {helper.formatCurrency(order.tax_total, settings)}
                </div>
              </div>
            )}

            <div className="summary__row">
              <div className="summary__col">{text.subtotal}:</div>
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(order.subtotal, settings)}
              </div>
            </div>
            <div className="summary__row">
              <div className="summary__col">{text.shipping}:</div>
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(order.shipping_total, settings)}
              </div>
            </div>

            {order.tax_total > 0 && !order.item_tax_included && (
              <div className="summary__row">
                <div className="summary__col">{text.tax}:</div>
                <div className="summary__col summary__col_price">
                  {helper.formatCurrency(order.tax_total, settings)}
                </div>
              </div>
            )}

            <div className="summary__row">
              <div className="summary__col">{text.grandTotal}:</div>
              <div className="summary__col summary__col_price">
                {helper.formatCurrency(order.grand_total, settings)}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
  return <div className="has-text-centered">{text.cartEmpty}</div>
}

CheckoutSuccess.propTypes = {
  order: PropTypes.shape({}),
  settings: PropTypes.shape({}).isRequired,
  pageDetails: PropTypes.shape({}).isRequired,
  shippingMethod: PropTypes.shape({}).isRequired,
  checkoutFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

CheckoutSuccess.defaultProps = {
  order: null,
}

export default CheckoutSuccess
