import { Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  paymentMethod
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { paymentMethod, onDelete } = props

  const deleteGroup = () => {
    setOpenDelete(false)
    onDelete(paymentMethod.id)
  }

  const methodName =
    paymentMethod && paymentMethod.name && paymentMethod.name.length > 0
      ? paymentMethod.name
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
