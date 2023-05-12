import { Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  shippingMethod
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { shippingMethod, onDelete } = props

  const deleteGroup = () => {
    setOpenDelete(false)
    onDelete(shippingMethod.id)
  }

  const methodName =
    shippingMethod && shippingMethod.name && shippingMethod.name.length > 0
      ? shippingMethod.name
      : "Draft"

  return (
    <span>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={() => setOpenDelete(true)}
      >
        <Delete htmlColor="#fff" />
      </IconButton>
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={methodName}
        onCancel={() => setOpenDelete(false)}
        onDelete={deleteGroup}
      />
    </span>
  )
}

export default Buttons
