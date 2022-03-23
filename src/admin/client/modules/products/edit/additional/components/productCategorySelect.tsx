import { Dialog, DialogActions } from "@mui/material"
import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import CategorySelect from "modules/productCategories/select"
import React, { FC, useState } from "react"

interface Props {
  categories: { id: string; name: string }[]
  input: { value: string; onChange: () => void }
}

const ProductCategorySelect: FC<Props> = props => {
  const [open, setOpen] = useState(false)

  const { categories, input } = props

  const close = () => setOpen(false)

  const selectedCategoryId = input.value
  const category = categories.find(item => item.id === selectedCategoryId)
  const categoryName = category ? category.name : ""

  return (
    <>
      <Dialog
        title={messages.category}
        open={open}
        onClose={close}
        scroll="body"
      >
        <CategorySelect
          onSelect={input.onChange}
          selectedId={selectedCategoryId}
          opened={false}
        />
        <DialogActions>
          <FlatButton
            label={messages.cancel}
            onClick={close}
            style={{ marginRight: 10 }}
          />
          <FlatButton
            label={messages.save}
            primary
            keyboardFocused
            onClick={close}
          />
        </DialogActions>
      </Dialog>
      <FlatButton
        label={categoryName}
        onClick={() => setOpen(true)}
        icon={
          <FontIcon color="#777" className="material-icons">
            create
          </FontIcon>
        }
      />
    </>
  )
}

export default ProductCategorySelect
