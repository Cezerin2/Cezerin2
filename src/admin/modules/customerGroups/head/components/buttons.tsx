import { Add, Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  selected: { id: string; name: string }
  onDelete: (ID: string) => void
  onCreate: () => void
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)
  const { selected, onDelete, onCreate } = props

  const deleteGroup = () => {
    setOpenDelete(false)
    onDelete(selected.id)
  }

  const groupName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltip={messages.actions_delete}
            tooltipPosition="bottom-left"
            onClick={() => setOpenDelete(true)}
          >
            <Delete htmlColor="#fff" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={groupName}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteGroup}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.customerGroups_titleAdd}
        onClick={onCreate}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </span>
  )
}

export default Buttons
