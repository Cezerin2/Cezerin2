import messages from "lib/text"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import ConfirmationDialog from "modules/shared/confirmation"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import ProductSearchDialog from "modules/shared/productSearch"
import React, { FC, useState } from "react"

interface Props {
  settings
  order
  onDelete
  setClosed
  setCancelled
  holdOrder
  resumeOrder
  addItem
}

const Buttons: FC<Props> = props => {
  const [showClose, setShowClose] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)

  const {
    settings,
    order,
    onDelete,
    setClosed,
    setCancelled,
    holdOrder,
    resumeOrder,
    addItem,
  } = props

  if (order) {
    const orderName = `${messages.order} #${order.number}`

    let menuItems = []
    if (order.closed) {
      //
    } else if (order.cancelled) {
      //
    } else {
      menuItems.push(
        <MenuItem
          key="addItem"
          primaryText={messages.addOrderItem}
          onClick={() => setShowAddItem(true)}
        />
      )
      menuItems.push(<Divider key="dev1" />)
      if (order.hold) {
        menuItems.push(
          <MenuItem
            key="resume"
            primaryText={messages.resumeOrder}
            onClick={() => resumeOrder(order.id)}
          />
        )
      } else {
        menuItems.push(
          <MenuItem
            key="hold"
            primaryText={messages.holdOrder}
            onClick={() => holdOrder(order.id)}
          />
        )
      }
      menuItems.push(
        <MenuItem
          key="close"
          primaryText={messages.closeOrder}
          onClick={() => setShowClose(true)}
        />
      )
      menuItems.push(
        <MenuItem
          key="cancel"
          primaryText={messages.cancelOrder}
          onClick={() => setShowCancel(true)}
        />
      )
    }

    return (
      <span>
        <ProductSearchDialog
          open={showAddItem}
          title={messages.addOrderItem}
          settings={settings}
          onSubmit={productId => {
            setShowAddItem(false)
            addItem(order.id, productId)
          }}
          onCancel={() => setShowAddItem(false)}
          submitLabel={messages.add}
          cancelLabel={messages.cancel}
        />

        <ConfirmationDialog
          open={showClose}
          title={orderName}
          description={messages.closeOrderConfirmation}
          onSubmit={() => {
            setShowClose(false)
            setClosed(order.id)
          }}
          onCancel={() => setShowClose(false)}
          submitLabel={messages.closeOrder}
          cancelLabel={messages.cancel}
        />

        <ConfirmationDialog
          open={showCancel}
          title={orderName}
          description={messages.cancelOrderConfirmation}
          onSubmit={() => {
            setShowCancel(false)
            setCancelled(order.id)
          }}
          onCancel={() => setShowCancel(false)}
          submitLabel={messages.cancelOrder}
          cancelLabel={messages.cancel}
        />

        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={orderName}
          onCancel={() => setOpenDelete(false)}
          onDelete={() => {
            setOpenDelete(false)
            onDelete()
          }}
        />

        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <FontIcon color="#fff" className="material-icons">
                more_vert
              </FontIcon>
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {menuItems}
          <MenuItem
            primaryText={messages.deleteOrder}
            onClick={() => setOpenDelete(true)}
          />
        </IconMenu>
      </span>
    )
  } else {
    return <span />
  }
}

export default Buttons
