import { Delete, OpenInNew } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { FC, useState } from "react"

interface Props {
  product
  onDelete
}

const Buttons: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { product, onDelete } = props

  const handleDelete = () => {
    setOpenDelete(false)
    onDelete()
  }

  const productName =
    product && product.name && product.name.length > 0 ? product.name : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.deleteProduct}
        onClick={() => setOpenDelete(true)}
      >
        <Delete htmlColor="#fff" />
      </IconButton>
      {product && product.enabled && (
        <a href={product.url} target="_blank">
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.viewOnWebsite}
          >
            <OpenInNew htmlColor="#fff" />
          </IconButton>
        </a>
      )}
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={productName}
        onCancel={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  )
}

export default Buttons
