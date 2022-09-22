import {
  Done,
  Edit,
  LocalShipping,
  MonetizationOn,
  NotInterested,
  PauseCircleOutline,
} from "@mui/icons-material"
import * as helper from "lib/helper"
import messages from "lib/text"
import Checkbox from "material-ui/Checkbox"
import Divider from "material-ui/Divider"
import { ListItem } from "material-ui/List"
import moment from "moment"
import React from "react"
import { Link } from "react-router-dom"
import style from "./style.sass"

const getOrderStateIcons = order => {
  let icons = []

  if (order.hold) {
    icons.push(
      <PauseCircleOutline
        key="hold"
        titleAccess={messages.orders_hold}
        style={{ color: "rgba(0, 0, 0, 0.2)" }}
      />
    )
  }

  if (order.paid) {
    icons.push(
      <MonetizationOn
        key="paid"
        titleAccess={messages.orders_paid}
        style={{ color: "rgba(251, 184, 41, 1)" }}
      />
    )
  }

  if (order.delivered) {
    icons.push(
      <LocalShipping
        key="delivered"
        titleAccess={messages.orders_delivered}
        style={{ color: "rgba(127, 175, 27, 1)" }}
      />
    )
  }

  if (order.cancelled) {
    return [
      <NotInterested
        key="cancelled"
        titleAccess={messages.orders_cancelled}
        style={{ color: "rgba(0, 0, 0, 0.3)" }}
      />,
    ]
  }

  if (order.closed) {
    return [
      <Done
        key="closed"
        titleAccess={messages.orders_closed}
        style={{ color: "rgba(127, 175, 27, 1)" }}
      />,
    ]
  }

  if (icons.length === 0 && order.draft) {
    icons.unshift(
      <Edit
        key="draft"
        titleAccess={messages.orders_draft}
        style={{ color: "rgba(0, 0, 0, 0.1)" }}
      />
    )
  }

  return icons
}

const OrdersListItem = ({ order, onSelect, selected, settings }) => {
  const checked = selected.includes(order.id)
  let grandTotalFormatted = helper.formatCurrency(order.grand_total, settings)

  const stateIcons = getOrderStateIcons(order)
  const dateCreated = moment(order.date_placed || order.date_created)
  const dateCreatedFromNow = dateCreated.format(`${settings.date_format}`)
  let shippingTo = order.shipping_address
    ? order.shipping_address.full_name
    : ""

  return (
    <div className={"orders-item" + (checked === true ? " selected" : "")}>
      <ListItem
        style={{ cursor: "normal" }}
        primaryText={
          <div className="row middle-xs">
            <div className="col-xs-1">
              <Checkbox
                checked={checked}
                onCheck={(event, isInputChecked) => {
                  onSelect(order.id, isInputChecked)
                }}
              />
            </div>
            <div className="col-xs-1">{stateIcons}</div>
            <div className="col-xs-2">
              <Link to={`/admin/order/${order.id}`} className={style.number}>
                {order.number || 0}
              </Link>
              <br />
              <small className={style.small}>{dateCreatedFromNow}</small>
            </div>
            <div className="col-xs-4">
              <div className={style.shipping}>{shippingTo}</div>
              <small className={style.small}>{order.shipping_method}</small>
            </div>
            <div className={"col-xs-2 " + style.price}>
              {grandTotalFormatted}
              <br />
              <small className={style.small}>{order.payment_method}</small>
            </div>
            <div className={"col-xs-2 " + style.status}>{order.status}</div>
          </div>
        }
      />
      <Divider />
    </div>
  )
}

export default OrdersListItem
