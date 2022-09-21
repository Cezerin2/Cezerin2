import { MoreVert } from "@mui/icons-material"
import * as helper from "lib/helper"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import Divider from "material-ui/Divider"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import SelectField from "material-ui/SelectField"
import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import style from "./style.sass"

const iconButtonElement = (
  <IconButton touch>
    <MoreVert htmlColor="rgb(189, 189, 189)" />
  </IconButton>
)

const ProductOption = ({ option, onChange, selectedOptions }) => {
  const selectedValue = selectedOptions[option.id]
  const values = option.values
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    .map((value, index) => (
      <MenuItem key={index} value={value.id} primaryText={value.name} />
    ))

  return (
    <SelectField
      floatingLabelText={option.name}
      fullWidth
      value={selectedValue}
      onChange={(event, index, value) => {
        onChange(option.id, value)
      }}
    >
      {values}
    </SelectField>
  )
}

const ProductOptions = ({ options, onChange, selectedOptions }) => {
  if (options) {
    const items = options.map((option, index) => (
      <ProductOption
        key={index}
        option={option}
        onChange={onChange}
        selectedOptions={selectedOptions}
      />
    ))
    return <div className="product-options">{items}</div>
  } else {
    return null
  }
}

interface Props {
  item
  settings
  allowEdit
  onItemUpdate
  onItemDelete
}

export const OrderItem: FC<Props> = props => {
  const [quantity, setQuantity] = useState(props.item.quantity)
  const [variantId, setVariantId] = useState(props.item.variant_id)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [quantityItems, setQuantityItems] = useState<Element[]>([])

  const { item, settings, allowEdit, onItemUpdate, onItemDelete } = props

  const hideEditForm = () => setShowEdit(false)

  const quantityChange = (event, index, value) => setQuantity(value)

  const submitEditForm = () => {
    hideEditForm()
    const newVariantId =
      selectedVariant && selectedVariant.id ? selectedVariant.id : variantId
    onItemUpdate(item.id, quantity, newVariantId)
  }

  const onOptionChange = (optionId, valueId) => {
    setQuantity(1)

    if (valueId === "") {
      delete selectedOptions[optionId]
    } else {
      selectedOptions[optionId] = valueId
    }

    setSelectedOptions(selectedOptions)
    findVariantBySelectedOptions()
  }

  const findVariantBySelectedOptions = () => {
    const product = item.product
    for (const variant of product.variants) {
      const variantMutchSelectedOptions = variant.options.every(
        variantOption =>
          selectedOptions[variantOption.option_id] === variantOption.value_id
      )
      if (variantMutchSelectedOptions) {
        setSelectedVariant(variant)
        return
      }
    }

    setSelectedVariant(null)
  }

  const getCurrentVariant = () => {
    const variantId = item.variant_id
    const product = item.product
    let variant = null

    if (
      variantId &&
      product &&
      product.variants &&
      product.variants.length > 0
    ) {
      variant = product.variants.find(v => v.id === variantId)
    }

    return variant
  }

  const getOptionsByVariant = () => {
    const variantId = item.variant_id
    const product = item.product
    let selectedOptions = {}
    if (
      variantId &&
      product &&
      product.variants &&
      product.variants.length > 0
    ) {
      const variant = product.variants.find(v => v.id === variantId)
      if (variant) {
        for (const option of variant.options) {
          selectedOptions[option.option_id] = option.value_id
        }
      }
    }

    return selectedOptions
  }

  const editFormActions = [
    <FlatButton
      label={messages.cancel}
      onClick={hideEditForm}
      style={{ marginRight: 10 }}
    />,
    <FlatButton label={messages.save} primary onClick={submitEditForm} />,
  ]

  const product = item.product
  const price = helper.formatCurrency(item.price, settings)
  const priceTotal = helper.formatCurrency(item.price_total, settings)
  const discountTotal = helper.formatCurrency(item.discount_total, settings)
  const imageUrl =
    product && product.images && product.images.length > 0
      ? product.images[0].url
      : null
  const thumbnailUrl = helper.getThumbnailUrl(imageUrl, 100)
  const productOptions = product ? product.options : []

  let maxItems = product ? product.stock_quantity : 0
  if (selectedVariant) {
    maxItems = selectedVariant.stock_quantity
  } else if (product && product.options && product.options.length > 0) {
    // product variant not exists with this options
    maxItems = 0
  }

  useEffect(() => {
    setSelectedOptions(getOptionsByVariant())
    setSelectedVariant(getCurrentVariant())

    const array = []

    if (maxItems === 0) {
      array.push(
        <MenuItem
          key={0}
          value={0}
          primaryText={messages.products_outOfStock}
        />
      )
      setQuantity(0)
    } else {
      for (let i = 1; i <= maxItems, i <= 100; i++) {
        array.push(<MenuItem key={i} value={i} primaryText={i.toString()} />)
      }
    }

    setQuantityItems(array)
  }, [])

  return (
    <div>
      <div className={style.item + " row row--no-gutter middle-xs"}>
        <div className="col-xs-2">
          {thumbnailUrl && thumbnailUrl !== "" && (
            <img src={thumbnailUrl} className={style.itemImage} />
          )}
        </div>
        <div className={style.itemName + " col-xs-4"}>
          <Link to={`/admin/product/${item.product_id}`}>{item.name}</Link>
          <div>{item.variant_name}</div>
          <div>
            {messages.products_sku}: {item.sku}
          </div>
        </div>
        <div className="col-xs-2" style={{ textAlign: "right" }}>
          {price}
        </div>
        <div className="col-xs-1" style={{ textAlign: "center" }}>
          x {item.quantity}
        </div>
        <div className="col-xs-2" style={{ textAlign: "right" }}>
          {priceTotal}
          {item.discount_total > 0 && (
            <small className={style.itemDiscount}>{discountTotal}</small>
          )}
        </div>
        <div className="col-xs-1" style={{ textAlign: "center" }}>
          {allowEdit && (
            <IconMenu
              iconButtonElement={iconButtonElement}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem onClick={() => setShowEdit(true)}>
                {messages.edit}
              </MenuItem>
              <MenuItem onClick={() => onItemDelete(item.id)}>
                {messages.actions_delete}
              </MenuItem>
            </IconMenu>
          )}
        </div>
      </div>
      <Divider />
      <Dialog
        title={messages.editOrderItem}
        actions={editFormActions}
        modal={false}
        open={showEdit}
        onRequestClose={hideEditForm}
        contentStyle={{ width: 400 }}
      >
        <div>
          <ProductOptions
            options={productOptions}
            onChange={onOptionChange}
            selectedOptions={selectedOptions}
          />
          <SelectField
            floatingLabelText={messages.quantity}
            fullWidth
            value={quantity}
            onChange={quantityChange}
          >
            {quantityItems}
          </SelectField>
        </div>
      </Dialog>
    </div>
  )
}

const OrderItems = ({ order, settings, onItemDelete, onItemUpdate }) => {
  const allowEdit = order.closed === false && order.cancelled === false
  const items = order.items.map((item, index) => (
    <OrderItem
      key={index}
      item={item}
      settings={settings}
      onItemDelete={onItemDelete}
      onItemUpdate={onItemUpdate}
      allowEdit={allowEdit}
    />
  ))
  return <div>{items}</div>
}

export default OrderItems
