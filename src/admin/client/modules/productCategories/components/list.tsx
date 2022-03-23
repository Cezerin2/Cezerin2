import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"
import Item, { styles } from "./item"

interface Props {
  selectedId
  items
  showAll?: boolean
  showRoot?: boolean
  showManage?: boolean
  showImport?: boolean
  rootName?: string
  allName?: string
  opened?: boolean
  onLoad: () => void
  onSelect
}

const Categories: FC<Props> = props => {
  const {
    selectedId,
    items,
    showAll = false,
    showRoot = false,
    showManage = false,
    showImport = true,
    rootName = messages.productCategories_root,
    allName = messages.productCategories_all,
    opened = false,
    onLoad,
    onSelect,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  const getItem = (selectedId, allItems, item, opened) => {
    const nestedItems = getChildren(selectedId, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedId={selectedId}
        nestedItems={nestedItems}
        onSelect={onSelect}
      />
    )
  }

  const getChildren = (selectedId, allItems, id, opened) => {
    if (allItems && id) {
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => getItem(selectedId, allItems, item, opened))
    }

    return []
  }

  const handleClickAll = () => {
    onSelect("all")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickRoot = () => {
    onSelect("root")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickImport = () => {
    document.getElementsByClassName("product-list")[0].style.display = "none"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "block"
    }
  }

  const rows = items
    .filter(item => item.parent_id === null)
    .map(item => getItem(selectedId, items, item, opened))

  return (
    <List>
      {showRoot && (
        <ListItem
          primaryText={rootName}
          style={selectedId === "root" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<FontIcon className="material-icons">home</FontIcon>}
          onClick={handleClickRoot}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={allName}
          style={selectedId === "all" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<FontIcon className="material-icons">folder</FontIcon>}
          onClick={handleClickAll}
        />
      )}

      {rows}

      {showManage && (
        <Link
          to="/admin/products/categories"
          style={{ textDecoration: "none" }}
        >
          <ListItem
            className="treeItem"
            primaryText={messages.productCategories_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
        </Link>
      )}

      {showImport && (
        <Link to="/admin/products/import" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.drawer_importing}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">get_app</FontIcon>}
            onClick={handleClickImport}
          />
        </Link>
      )}
    </List>
  )
}

export default Categories
