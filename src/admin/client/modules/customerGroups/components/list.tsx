import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
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

const FolderIcon = <FontIcon className="material-icons">folder</FontIcon>

interface props {
  onSelect
  selectedId
  items
  showAll
  showRoot
  showManage
  onLoad: () => void
}

const Groups: FC<props> = props => {
  const { onSelect, selectedId, items, showAll, showRoot, showManage, onLoad } =
    props

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
      onClick={() => onSelect(item.id)}
    />
  ))

  return (
    <List>
      {showRoot && (
        <ListItem
          className="treeItem"
          primaryText={messages.customers_noGroup}
          style={selectedId === "root" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<FontIcon className="material-icons">clear</FontIcon>}
          onClick={() => {
            onSelect("root")
          }}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={messages.customerGroups_all}
          style={selectedId === "all" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={FolderIcon}
          onClick={() => {
            onSelect("all")
          }}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/admin/customers/groups" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.customerGroups_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
        </Link>
      )}
    </List>
  )
}

export default Groups
