import { Add, Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"
import Search from "./search"

interface Props {
  search
  setSearch
  selectedCount
  onDelete
  onCreate
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { search, setSearch, selectedCount, onDelete, onCreate } = props

  const deleteOrders = () => {
    setOpenDelete(false)
    onDelete()
  }

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
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
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteOrders}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.orders_titleAdd}
        onClick={onCreate}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </>
  )
}

export default Buttons
