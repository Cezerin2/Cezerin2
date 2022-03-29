import messages from "lib/text"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List } from "material-ui/List"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import Head from "./head"
import ProductsListItem from "./item"
import style from "./style.css"

interface Props {
  items
  selected
  loadingItems
  onSelect
  onSelectAll
  selectedAll
  loadMore
  settings
  hasMore
  totalCount
  onLoad
}

const ProductsList: FC<Props> = props => {
  const {
    items,
    selected,
    loadingItems,
    onSelect,
    onSelectAll,
    selectedAll,
    loadMore,
    settings,
    hasMore,
    totalCount,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  const rows = items.map((item, index) => {
    const itemSelected = selected.includes(item.id)
    return (
      <ProductsListItem
        key={index}
        product={item}
        selected={itemSelected}
        onSelect={onSelect}
        settings={settings}
      />
    )
  })

  return (
    <div className="product-list">
      <List>
        <Head onSelectAll={onSelectAll} />
        <Divider />
        {rows}
        <div className={style.more}>
          <RaisedButton
            disabled={loadingItems || !hasMore}
            label={messages.actions_loadMore}
            labelPosition="before"
            primary={false}
            icon={<FontIcon className="material-icons">refresh</FontIcon>}
            onClick={loadMore}
          />
        </div>
      </List>
    </div>
  )
}

export default ProductsList
