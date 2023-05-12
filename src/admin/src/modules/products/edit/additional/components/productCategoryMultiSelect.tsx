import { Add } from "@mui/icons-material"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import CategoryMultiselect from "modules/productCategories/components/multiselectList"
import React, { FC, useState } from "react"
import { FieldArrayRenderProps } from "react-final-form-arrays"

const CategoryItemActions = ({ fields, index }) => (
  <a
    title={messages.actions_delete}
    onClick={() => fields.remove(index)}
    className="react-tagsinput-remove"
  />
)

const CategoryItem = ({ categoryName, actions }) => (
  <span className="react-tagsinput-tag">
    {categoryName}
    {actions}
  </span>
)

interface Props {
  categories
}

const ProductCategoryMultiSelect: FC<
  FieldArrayRenderProps<any, HTMLElement> & Props
> = props => {
  const [open, setOpen] = useState(false)

  const { categories, fields } = props

  const close = () => setOpen(false)

  const handleCheck = categoryId => {
    if (fields && fields.value.includes(categoryId)) {
      // remove
      fields.forEach((name, index) => {
        if (fields[index] === categoryId) {
          fields.remove(index)
          return
        }
      })
    } else {
      // add
      fields.push(categoryId)
    }
  }

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
    <div className="react-tagsinput">
      <span>
        {fields.map((field, index) => {
          const categoryId = fields[index]
          const category = categories.find(item => item.id === categoryId)
          const categoryName = category ? category.name : "-"
          const actions = <CategoryItemActions fields={fields} index={index} />
          return (
            <CategoryItem
              key={index}
              categoryName={categoryName}
              actions={actions}
            />
          )
        })}
        <Dialog
          title={messages.additionalCategories}
          actions={dialogButtons}
          modal={false}
          open={open}
          onRequestClose={close}
          autoScrollBodyContent
        >
          <CategoryMultiselect
            items={categories}
            selectedIds={fields}
            opened={false}
            onCheck={handleCheck}
          />
        </Dialog>
        <FlatButton
          style={{ minWidth: 52 }}
          onClick={() => setOpen(true)}
          icon={<Add htmlColor="#333" />}
        />
      </span>
    </div>
  )
}

export default ProductCategoryMultiSelect
