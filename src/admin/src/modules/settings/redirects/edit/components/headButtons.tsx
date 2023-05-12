import { Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  redirect
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { redirect, onDelete } = props

  const deletePage = () => {
    setOpenDelete(false)
    onDelete(redirect.id)
  }

  const redirectName =
    redirect && redirect.from && redirect.from.length > 0
      ? redirect.from
      : "Draft"

  if (redirect)
    return (
      <>
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
          itemName={redirectName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deletePage}
        />
      </>
    )

  return null
}

export default Buttons
