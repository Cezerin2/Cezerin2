import { KeyboardArrowRight } from "@mui/icons-material"
import api from "lib/api"
import * as helper from "lib/helper"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import moment from "moment"
import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import style from "./style.sass"

const getOrderStates = order => {
  let states = []

  if (order.hold) {
    states.push(
      <span key="hold" className={style.holdState}>
        {messages.orders_hold}
      </span>
    )
  }

  if (order.paid) {
    states.push(
      <span key="paid" className={style.paidState}>
        {messages.orders_paid}
      </span>
    )
  }

  if (order.delivered) {
    states.push(
      <span key="delivered" className={style.deliveredState}>
        {messages.orders_delivered}
      </span>
    )
  }

  if (order.cancelled) {
    return [
      <span key="cancelled" className={style.cancelledState}>
        {messages.orders_cancelled}
      </span>,
    ]
  }

  if (order.closed) {
    return [
      <span key="closed" className={style.closedState}>
        {messages.orders_closed}
      </span>,
    ]
  }

  if (states.length === 0 && order.draft) {
    states.unshift(
      <span key="draft" className={style.draftState}>
        {messages.orders_draft}
      </span>
    )
  }

  return states
}

const CustomerOrder = ({ order, settings }) => {
  let grandTotalFormatted = helper.formatCurrency(order.grand_total, settings)
  const dateCreated = moment(order.date_placed || order.date_created)
  const dateCreatedFormated = dateCreated.format(settings.date_format)
  const states = getOrderStates(order)

  return (
    <div>
      <Divider />
      <Link to={`/admin/order/${order.id}`} style={{ textDecoration: "none" }}>
        <ListItem
          rightIcon={<KeyboardArrowRight />}
          primaryText={
            <div className="row">
              <div className="col-xs-2">{order.number}</div>
              <div className="col-xs-3" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {dateCreatedFormated}
              </div>
              <div className="col-xs-4">
                <div className={style.states}>{states}</div>
              </div>
              <div className="col-xs-3" style={{ textAlign: "right" }}>
                {grandTotalFormatted}
              </div>
            </div>
          }
        />
      </Link>
    </div>
  )
}

interface Props {
  customerId: string
  settings
}

const CustomerOrders: FC<Props> = props => {
  const [orders, setOrders] = useState([])
  const { customerId, settings } = props

  useEffect(() => {
    api.orders.list({ customer_id: customerId }).then(({ status, json }) => {
      setOrders(json.data)
    })
  }, [])

  let orderItems = []
  if (orders.length > 0) {
    orderItems = orders.map((order, index) => (
      <CustomerOrder key={index} order={order} settings={settings} />
    ))
  }

  return (
    <Paper className="paper-box" zDepth={1}>
      <div
        className="blue-title"
        style={{ paddingLeft: 16, paddingBottom: 16 }}
      >
        {messages.customers_orders}
      </div>
      <List style={{ padding: 0 }}>{orderItems}</List>
    </Paper>
  )
}

export default CustomerOrders
