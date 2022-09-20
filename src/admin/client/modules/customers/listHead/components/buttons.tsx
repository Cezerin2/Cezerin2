import { Delete, Folder } from "@mui/icons-material"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import GroupSelect from "modules/customerGroups/select"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"
import Search from "./search"

interface Props {
  search
  setSearch
  selectedCount
  onDelete
  onSetGroup
}

const Buttons: FC<Props> = props => {
  const [groupId, setGroupId] = useState(null)
  const [openSetGroup, setOpenSetGroup] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { search, setSearch, selectedCount, onDelete, onSetGroup } = props

  const closeSetGroup = () => setOpenSetGroup(false)

  const deleteCustomers = () => {
    setOpenDelete(false)
    onDelete()
  }

  const saveSetGroup = () => {
    setOpenSetGroup(false)
    onSetGroup(groupId)
  }

  const actionsSetGroup = [
    <FlatButton
      label={messages.cancel}
      onClick={closeSetGroup}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.save}
      primary
      keyboardFocused
      onClick={saveSetGroup}
    />,
  ]

  return (
    <span>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <span>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={() => setOpenDelete(true)}
          >
            <Delete htmlColor="#fff" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.customers_setGroup}
            onClick={() => setOpenSetGroup(true)}
          >
            <Folder htmlColor="#fff" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteCustomers}
          />
          <Dialog
            title={messages.customers_setGroup}
            actions={actionsSetGroup}
            modal={false}
            open={openSetGroup}
            onRequestClose={closeSetGroup}
            autoScrollBodyContent
          >
            <GroupSelect
              onSelect={setGroupId}
              selectedId={groupId}
              showRoot
              showAll={false}
            />
          </Dialog>
        </span>
      )}
    </span>
  )
}

export default Buttons
