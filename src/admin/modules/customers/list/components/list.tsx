import { Refresh } from "@mui/icons-material"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import { List } from "material-ui/List"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import Head from "./head"
import CustomersListItem from "./item"
import style from "./style.sass"

interface Props {
  items
  selected
  loadingItems
  hasMore
  onSelect
  onSelectAll
  loadMore
  settings
  onLoad
}

const CustomersList: FC<Props> = props => {
  const {
    items,
    selected,
    loadingItems,
    hasMore,
    onSelect,
    onSelectAll,
    loadMore,
    settings,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  const rows = items.map((item, index) => (
    <CustomersListItem
      key={index}
      customer={item}
      selected={selected}
      onSelect={onSelect}
      settings={settings}
    />
  ))

  return (
    <div>
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
            icon={<Refresh />}
            onClick={loadMore}
          />
        </div>
      </List>
    </div>
  )
}

export default CustomersList
