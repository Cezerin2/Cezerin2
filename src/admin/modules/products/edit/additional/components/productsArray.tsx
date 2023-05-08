import { MoreVert } from "@mui/icons-material"
import api from "lib/api"
import * as helper from "lib/helper"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import ProductSearchDialog from "modules/shared/productSearch"
import React, { FC, useEffect, useState } from "react"
import { FieldArrayRenderProps } from "react-final-form-arrays"
import { Link } from "react-router-dom"
import style from "./style.sass"

const ProductShort = ({
  id,
  name,
  thumbnailUrl,
  priceFormatted,
  enabled,
  discontinued,
  actions,
}) => (
  <div
    className={
      style.relatedProduct +
      (enabled === false || discontinued === true
        ? ` ${style.relatedProductDisabled}`
        : "")
    }
  >
    <div className={style.relatedProductImage}>
      {thumbnailUrl && thumbnailUrl !== "" && (
        <img src={thumbnailUrl} alt="thumbnail" />
      )}
    </div>
    <div className={style.relatedProductText}>
      <Link to={`/admin/product/${id}`}>{name}</Link>
      <br />
      <div>{priceFormatted}</div>
    </div>
    <div className={style.relatedProductActions}>{actions}</div>
  </div>
)

const RelatedProductActions = ({ fields, index }) => (
  <IconMenu
    targetOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    iconButtonElement={
      <IconButton touch>
        <MoreVert htmlColor="#777" />
      </IconButton>
    }
  >
    <MenuItem
      primaryText={messages.actions_delete}
      onClick={() => fields.remove(index)}
    />
    {index > 0 && (
      <MenuItem
        primaryText={messages.actions_moveUp}
        onClick={() => fields.move(index, index - 1)}
      />
    )}
    {index + 1 < fields.length && (
      <MenuItem
        primaryText={messages.actions_moveDown}
        onClick={() => fields.move(index, index + 1)}
      />
    )}
  </IconMenu>
)

const RelatedProduct = ({ settings, product, actions }) => {
  if (product) {
    const priceFormatted = helper.formatCurrency(product.price, settings)
    const imageUrl =
      product && typeof product.images[0] !== "undefined"
        ? product.images[0].url
        : null
    const thumbnailUrl = helper.getThumbnailUrl(imageUrl, 100)
    return (
      <ProductShort
        id={product.id}
        name={product.name}
        thumbnailUrl={thumbnailUrl}
        priceFormatted={priceFormatted}
        enabled={product.enabled}
        discontinued={product.discontinued}
        actions={actions}
      />
    )
  }

  // Product doesn't exist
  return (
    <ProductShort
      id="-"
      name=""
      thumbnailUrl=""
      priceFormatted=""
      actions={actions}
    />
  )
}

interface Props {
  settings
}

const ProductsArray: FC<
  FieldArrayRenderProps<any, HTMLElement> & Props
> = props => {
  const [showAddItem, setShowAddItem] = useState(false)
  const [products, setProducts] = useState([])

  const { settings, fields } = props

  const addItem = productId => {
    setShowAddItem(false)
    fields.push(productId)
  }

  useEffect(() => {
    fetchProducts(fields)
  }, [fields])

  const fetchProducts = ids => {
    if (ids && Array.isArray(ids) && ids.length > 0) {
      api.products
        .list({
          limit: 50,
          fields:
            "id,name,enabled,discontinued,price,on_sale,regular_price,images",
          ids,
        })
        .then(productsResponse => {
          setProducts(productsResponse.json.data)
        })
    } else {
      setProducts([])
    }
  }

  return (
    <div>
      <Paper className={style.relatedProducts} zDepth={1}>
        {fields.map((field, index) => {
          const actions = (
            <RelatedProductActions fields={fields} index={index} />
          )
          const productId = fields[index]
          const product = products.find(item => item.id === productId)
          return (
            <RelatedProduct
              key={index}
              settings={settings}
              product={product}
              actions={actions}
            />
          )
        })}

        <ProductSearchDialog
          open={showAddItem}
          title={messages.addOrderItem}
          settings={settings}
          onSubmit={addItem}
          onCancel={() => setShowAddItem(false)}
          submitLabel={messages.add}
          cancelLabel={messages.cancel}
        />
      </Paper>

      <div>
        <RaisedButton
          label={messages.addOrderItem}
          onClick={() => setShowAddItem(true)}
        />
      </div>
    </div>
  )
}

export default ProductsArray
