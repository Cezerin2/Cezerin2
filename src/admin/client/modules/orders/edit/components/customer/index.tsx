import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import Divider from "material-ui/Divider"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import ShippingAddressForm from "../shippingAddressForm"
import style from "../style.css"
import { BillingAddress, ShippingAddress } from "./components"

interface Props {
  order
  settings
  onShippingAddressUpdate
}

const OrderCustomer: FC<Props> = props => {
  const [openShippingEdit, setOpenShippingEdit] = useState(false)

  const { order, settings, onShippingAddressUpdate } = props

  const hideShippingEdit = () => setOpenShippingEdit(false)

  const saveShippingEdit = address => {
    onShippingAddressUpdate(address)
    hideShippingEdit()
  }

  const allowEdit = order.closed === false && order.cancelled === false
  let mapAddress = `${order.shipping_address.address1} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.postal_code}`
  mapAddress = mapAddress.replace(/ /g, "+")
  const mapUrl = `https://www.google.com/maps/place/${mapAddress}`

  return (
    <div>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.customer}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div className={style.innerBox}>
          <div className={style.address}>
            <div>
              <Link
                to={`/admin/customer/${order.customer_id}`}
                className={style.link}
              >
                {order.customer && order.customer.full_name}
              </Link>
            </div>
            <div>
              <a href={`MailTo:${order.email}`} className={style.link}>
                {order.email}
              </a>
            </div>
            <div>{order.mobile}</div>
          </div>

          <Divider
            style={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: -30,
              marginRight: -30,
            }}
          />

          <div style={{ paddingBottom: 16, paddingTop: 0 }}>
            {messages.shippingAddress}
          </div>
          <ShippingAddress order={order} settings={settings} />

          {allowEdit && (
            <RaisedButton
              label={messages.edit}
              style={{ marginRight: 15 }}
              onClick={() => setOpenShippingEdit(true)}
            />
          )}
          <a href={mapUrl} target="_blank" rel="noreferrer">
            <FlatButton label="View map" />
          </a>

          <BillingAddress address={order.billing_address} settings={settings} />

          <Dialog
            title={messages.shippingAddress}
            modal={false}
            open={openShippingEdit}
            onRequestClose={hideShippingEdit}
            autoScrollBodyContent
            contentStyle={{ width: 600 }}
          >
            <ShippingAddressForm
              initialValues={order.shipping_address}
              onCancel={hideShippingEdit}
              onSubmit={saveShippingEdit}
              shippingMethod={order.shipping_method_details}
            />
          </Dialog>
        </div>
      </Paper>
    </div>
  )
}

export default OrderCustomer
