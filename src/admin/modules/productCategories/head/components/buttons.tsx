import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Delete,
  Folder,
} from "@mui/icons-material"
import { Dialog, DialogActions } from "@mui/material"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import CategorySelect from "modules/productCategories/select"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  selected
  onMoveUp
  onMoveDown
  onMoveTo
  onDelete
  onCreate
}

const Buttons: FC<Props> = props => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState("root")
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { selected, onMoveUp, onMoveDown, onMoveTo, onDelete, onCreate } = props

  const deleteCategory = () => {
    setOpenDelete(false)
    onDelete(selected.id)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const categoryName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveUp}
            onClick={onMoveUp}
          >
            <ArrowUpward htmlColor="#fff" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <ArrowDownward htmlColor="#fff" />
          </IconButton>
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
            tooltip={messages.actions_moveTo}
            onClick={() => setOpenMoveTo(true)}
          >
            <Folder htmlColor="#fff" />
          </IconButton>
          <Dialog
            title={messages.actions_moveTo}
            open={openMoveTo}
            onClose={() => setOpenMoveTo(false)}
            scroll="body"
          >
            <CategorySelect
              onSelect={setCategoryIdMoveTo}
              selectedId={categoryIdMoveTo}
              showRoot
              showAll={false}
            />
            <DialogActions>
              <FlatButton
                label={messages.cancel}
                onClick={() => setOpenMoveTo(false)}
                style={{ marginRight: 10 }}
              />
              <FlatButton
                label={messages.save}
                primary
                keyboardFocused
                onClick={saveMoveTo}
              />
            </DialogActions>
          </Dialog>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={categoryName}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteCategory}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.productCategories_titleAdd}
        onClick={onCreate}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </span>
  )
}

export default Buttons
