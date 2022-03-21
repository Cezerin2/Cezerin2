import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import CategorySelect from "modules/productCategories/select"
import React, { FC, useState } from "react"

interface props {
  categories
  input
  meta: { touched; error }
}

const ProductCategorySelect: FC<props> = props => {
  const [open, setOpen] = useState(false)

  const { categories, input } = props

  const close = () => setOpen(false)

  const selectedCategoryId = input.value
  const category = categories.find(item => item.id === selectedCategoryId)
  const categoryName = category ? category.name : ""

  const dialogButtons = [
    <FlatButton
      label={messages.cancel}
      onClick={close}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.save}
      primary
      keyboardFocused
      onClick={close}
    />,
  ]

  return (
    <>
      <Dialog
        title={messages.category}
        actions={dialogButtons}
        modal={false}
        open={open}
        onRequestClose={close}
        autoScrollBodyContent
      >
        <CategorySelect
          onSelect={input.onChange}
          selectedId={selectedCategoryId}
          opened={false}
        />
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
