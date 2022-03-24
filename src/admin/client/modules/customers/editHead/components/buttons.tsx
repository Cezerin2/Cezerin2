import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  customer
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { customer, onDelete } = props

  const deleteOrder = () => {
    setOpenDelete(false)
    onDelete()
  }

  const customerName =
    customer && customer.full_name && customer.full_name.length > 0
      ? customer.full_name
      : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={() => setOpenDelete(true)}
      >
        <FontIcon color="#fff" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={customerName}
        onCancel={() => setOpenDelete(false)}
        onDelete={onDelete}
      />
    </>
  )
}

export default Buttons
