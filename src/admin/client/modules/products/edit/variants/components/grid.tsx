import { Delete } from "@mui/icons-material"
import messages from "lib/text"
import DropDownMenu from "material-ui/DropDownMenu"
import IconButton from "material-ui/IconButton"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import style from "./style.sass"

interface Props {
  type
  placeholder
  variantId
  onChange
}

const VariantInput: FC<Props> = props => {
  const [value, setValue] = useState(props.value)

  const { type, placeholder, variantId, onChange } = props

  return (
    <input
      type={type}
      className={style.textInput}
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onBlur={() => onChange(variantId, value)}
      min="0"
    />
  )
}

const VariantRow = ({
  variant,
  options,
  onSkuChange,
  onPriceChange,
  onStockChange,
  onWeightChange,
  onOptionChange,
  onDeleteVariant,
}) => {
  const cols = options.map((option, index) => {
    const variantOption = variant.options.find(i => i.option_id === option.id)
    const variantOptionValueId = variantOption ? variantOption.value_id : null

    if (option.values && option.values.length > 0) {
      const menuItems = option.values
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .map((value, index) => (
          <MenuItem key={index} value={value.id} primaryText={value.name} />
        ))

      return (
        <div key={option.id} className={style.gridCol}>
          <DropDownMenu
            value={variantOptionValueId}
            style={{ width: "100%" }}
            underlineStyle={{ border: "none" }}
            onChange={(event, key, value) => {
              onOptionChange(variant.id, option.id, value)
            }}
          >
            {menuItems}
          </DropDownMenu>
        </div>
      )
    }

    return <div key={option.id} className={style.gridCol} />
  })

  return (
    <div className={style.gridRow}>
      <div className={style.gridCol}>
        <VariantInput
          type="text"
          placeholder=""
          variantId={variant.id}
          value={variant.sku}
          onChange={onSkuChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.price}
          onChange={onPriceChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.stock_quantity}
          onChange={onStockChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.weight}
          onChange={onWeightChange}
        />
      </div>
      {cols}
      <div className={style.gridCol}>
        <IconButton
          title={messages.actions_delete}
          onClick={() => {
            onDeleteVariant(variant.id)
          }}
          tabIndex={-1}
        >
          <Delete htmlColor="#a1a1a1" />
        </IconButton>
      </div>
    </div>
  )
}

const ProductVariantsGrid = ({
  settings,
  options,
  variants,
  createVariant,
  deleteVariant,
  createOption,
  productId,
  onSkuChange,
  onPriceChange,
  onStockChange,
  onWeightChange,
  onOptionChange,
}) => {
  const hasOptions = options && options.length > 0
  const hasVariants = variants && variants.length > 0

  const headRowCols = hasOptions
    ? options.map((option, index) => (
        <div key={index} className={style.gridCol}>
          <Link
            title={messages.editProductOption}
            to={`/admin/product/${productId}/option/${option.id}`}
          >
            {option.name}
          </Link>
        </div>
      ))
    : null

  const variantRows = hasVariants
    ? variants.map((variant, index) => (
        <VariantRow
          key={index}
          variant={variant}
          options={options}
          onSkuChange={onSkuChange}
          onPriceChange={onPriceChange}
          onStockChange={onStockChange}
          onWeightChange={onWeightChange}
          onOptionChange={onOptionChange}
          onDeleteVariant={deleteVariant}
        />
      ))
    : null

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className={style.grid}>
        <div className={style.gridHeadRow}>
          <div className={style.gridCol}>{messages.products_sku}</div>
          <div className={style.gridCol}>{messages.products_price}</div>
          <div className={style.gridCol}>{messages.products_stock}</div>
          <div className={style.gridCol}>{messages.products_weight}</div>
          {headRowCols}
          <div className={style.gridCol} />
        </div>
        {variantRows}
      </div>
      <div className={style.innerBox}>
        <RaisedButton
          label={messages.addVariant}
          onClick={createVariant}
          style={{ marginRight: 20 }}
          disabled={!hasOptions}
        />
        <RaisedButton label={messages.addOption} onClick={createOption} />
      </div>
    </Paper>
  )
}

export default ProductVariantsGrid
