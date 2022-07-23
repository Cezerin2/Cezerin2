import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import React, { FC, useEffect, useState } from "react"

interface Props {
  isSingle?: boolean
  itemsCount?: number
  itemName?: string
  onCancel
  onDelete
}

const ConfirmationDialog: FC<Props> = props => {
  const [open, setOpen] = useState(props.open)

  const {
    isSingle = true,
    itemsCount = 0,
    itemName = "",
    onCancel,
    onDelete,
  } = props

  useEffect(() => {
    if (open !== props.open) {
      setOpen(props.open)
    }
  }, [props.open])

  const handleCancel = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleDelete = () => {
    setOpen(false)
    if (onDelete) {
      onDelete()
    }
  }

  const title = isSingle
    ? messages.singleDeleteTitle.replace("{name}", itemName)
    : messages.multipleDeleteTitle.replace("{count}", itemsCount)

  const description = isSingle
    ? messages.singleDeleteDescription
    : messages.multipleDeleteDescription.replace("{count}", itemsCount)

  const actions = [
    <FlatButton
      label={messages.cancel}
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.actions_delete}
      primary
      keyboardFocused
      onClick={handleDelete}
    />,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleCancel}
      contentStyle={{ maxWidth: 540 }}
      titleStyle={{ fontSize: "18px", lineHeight: "28px" }}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
