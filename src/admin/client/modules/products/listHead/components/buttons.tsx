import { Dialog, DialogActions } from "@mui/material"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import CategorySelect from "modules/productCategories/select"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"
import Search from "./search"

interface Props {
  search
  setSearch
  selectedCount
  onDelete: () => void
  onCreate
  onMoveTo
  // onImportProducts,
}

const Buttons: FC<Props> = props => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState(null)
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onMoveTo,
    // onImportProducts,
  } = props

  const deleteProduct = () => {
    setOpenDelete(false)
    onDelete()
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
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
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={() => setOpenMoveTo(true)}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteProduct}
          />
          <Dialog
            title={messages.actions_moveTo}
            open={openMoveTo}
            onClose={() => setOpenMoveTo(false)}
            scroll="body"
          >
            <CategorySelect
              onSelect={setCategoryIdMoveTo}
              selectedId={categoryIdMoveTo}
              opened
            />
            <DialogActions>
              <FlatButton
                label={messages.cancel}
                onClick={() => setOpenMoveTo(false)}
                style={{ marginRight: 10 }}
              />
              <FlatButton
                label={messages.actions_moveHere}
                primary
                keyboardFocused
                onClick={saveMoveTo}
              />
            </DialogActions>
          </Dialog>
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addProduct}
        onClick={onCreate}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </>
  )
}

export default Buttons
