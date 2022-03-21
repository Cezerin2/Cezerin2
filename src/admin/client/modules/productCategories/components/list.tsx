import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import React from "react"
import { Link } from "react-router-dom"
import Item, { styles } from "./item"

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  getItem(selectedId, allItems, item, opened) {
    const nestedItems = this.getChildren(selectedId, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedId={selectedId}
        nestedItems={nestedItems}
        onSelect={this.props.onSelect}
      />
    )
  }

  getChildren(selectedId, allItems, id, opened) {
    if (allItems && id) {
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => this.getItem(selectedId, allItems, item, opened))
    } else {
      return []
    }
  }

  handleClickAll = () => {
    this.props.onSelect("all")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  handleClickRoot = () => {
    this.props.onSelect("root")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  handleClickImport = () => {
    document.getElementsByClassName("product-list")[0].style.display = "none"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "block"
    }
  }

  render() {
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
    } = this.props

    var rows = items
      .filter(item => item.parent_id === null)
      .map(item => this.getItem(selectedId, items, item, opened))

    return (
      <List>
        {showRoot && (
          <ListItem
            primaryText={rootName}
            style={"root" === selectedId ? styles.selectedItem : null}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">home</FontIcon>}
            onClick={this.handleClickRoot}
          />
        )}

        {showAll && (
          <ListItem
            className="treeItem"
            primaryText={allName}
            style={"all" === selectedId ? styles.selectedItem : null}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">folder</FontIcon>}
            onClick={this.handleClickAll}
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
              leftIcon={
                <FontIcon className="material-icons">settings</FontIcon>
              }
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
              onClick={this.handleClickImport}
            />
          </Link>
        )}
      </List>
    )
  }
}

export default Categories
