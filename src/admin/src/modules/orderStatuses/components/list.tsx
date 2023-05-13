import { Folder, Settings } from "@mui/icons-material"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const styles = {
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  innerItem: {
    paddingLeft: 55,
  },
}

const FolderIcon = <Folder />

interface Props {
  onSelect
  selectedId
  items
  showAll
  showManage
  onLoad
}

const StatusesList: FC<Props> = props => {
  const { onSelect, selectedId, items, showAll, showManage, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const rows = items.map(item => (
    <ListItem
      key={item.id}
      className="treeItem"
      style={item.id === selectedId ? styles.selectedItem : null}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      leftIcon={FolderIcon}
      onClick={() => {
        onSelect(item.id)
      }}
    />
  ))

  return (
    <List>
      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={messages.allOrderStatuses}
          style={"all" === selectedId ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={FolderIcon}
          onClick={() => {
            onSelect("all")
          }}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/admin/orders/statuses" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.manageOrderStatuses}
            innerDivStyle={styles.innerItem}
            leftIcon={<Settings />}
          />
        </Link>
      )}
    </List>
  )
}

export default StatusesList
