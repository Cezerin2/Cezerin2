import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  webhook
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { webhook, onDelete } = props

  const deletePage = () => {
    setOpenDelete(false)
    onDelete(webhook.id)
  }

  const webhookName =
    webhook && webhook.url && webhook.url.length > 0 ? webhook.url : "Draft"

  if (webhook)
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
          itemName={webhookName}
          onCancel={() => setOpenDelete(false)}
          onDelete={deletePage}
        />
      </>
    )

  return null
}

export default Buttons
