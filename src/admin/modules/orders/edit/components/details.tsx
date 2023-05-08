import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import OrderCustomer from "./customer"
import OrderItems from "./items"
import style from "./style.sass"
import OrderSummary from "./summary"
import OrderTotals from "./totals"

interface Props {
  fetchData
  clearData
  order
  settings
  onItemDelete
  onItemUpdate
  onShippingAddressUpdate
  onOrderSummaryUpdate
  onCheckout
  processingCheckout
}

const OrderDetails: FC<Props> = props => {
  const {
    fetchData,
    clearData,
    order,
    settings,
    onItemDelete,
    onItemUpdate,
    onShippingAddressUpdate,
    onOrderSummaryUpdate,
    onCheckout,
    processingCheckout,
  } = props

  useEffect(() => {
    fetchData()
    return () => clearData()
  }, [])

  if (!order) return null

  return (
    <div className="row row--no-gutter col-full-height">
      <div className="col-xs-12 col-sm-5 col-md-4 col--no-gutter scroll col-full-height">
        <OrderSummary
          order={order}
          settings={settings}
          onOrderSummaryUpdate={onOrderSummaryUpdate}
          onCheckout={onCheckout}
          processingCheckout={processingCheckout}
        />
        <OrderCustomer
          order={order}
          settings={settings}
          onShippingAddressUpdate={onShippingAddressUpdate}
        />
      </div>
      <div className="col-xs-12 col-sm-7 col-md-8 col--no-gutter scroll col-full-height">
        <Paper className="paper-box" zDepth={1}>
          <OrderItems
            order={order}
            settings={settings}
            onItemDelete={onItemDelete}
            onItemUpdate={onItemUpdate}
          />
          <div className={style.innerBox}>
            <div className="row">
              <div className="col-xs-6" />
              <div className="col-xs-6">
                <OrderTotals order={order} settings={settings} />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default OrderDetails
