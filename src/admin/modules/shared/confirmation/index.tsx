import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import React, { FC, useEffect, useState } from "react"

interface Props {
  title
  description
  submitLabel
  cancelLabel
  modal?: boolean
  onSubmit?
  onCancel?
}

const ConfirmationDialog: FC<Props> = props => {
  const [open, setOpen] = useState(props.open)

  const {
    title,
    description,
    submitLabel,
    cancelLabel,
    modal = false,
    onSubmit,
    onCancel,
  } = props

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const handleCancel = () => {
    setOpen(false)
    if (onCancel) onCancel()
  }

  const handleSubmit = () => {
    setOpen(false)
    if (onSubmit) onSubmit()
  }

  const actions = [
    <FlatButton
      label={cancelLabel}
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={submitLabel}
      primary
      keyboardFocused
      onClick={handleSubmit}
    />,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={modal}
      open={open}
      onRequestClose={handleCancel}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
