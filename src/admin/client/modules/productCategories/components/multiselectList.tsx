import { Folder, VisibilityOff } from "@mui/icons-material"
import Checkbox from "material-ui/Checkbox"
import { List, ListItem } from "material-ui/List"
import React, { FC } from "react"

const styles = {
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  innerItem: {
    paddingLeft: 55,
  },
  nestedListStyle: {
    padding: "0 0 0 15px",
  },
}

const FolderIcon = <Folder />
const DraftIcon = <VisibilityOff />

interface ItemProps {
  item
  opened
  selectedIds
  nestedItems
  onCheck
}

const Item: FC<ItemProps> = props => {
  const { item, opened, selectedIds, nestedItems, onCheck } = props

  const isChecked =
    selectedIds && selectedIds.length > 0 && selectedIds.includes(item.id)
  // const style = isChecked ? styles.selectedItem : null;

  return (
    <ListItem
      className="treeItem"
      initiallyOpen={opened}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      nestedItems={nestedItems}
      leftCheckbox={
        <Checkbox checked={isChecked} onCheck={() => onCheck(item.id)} />
      }
      nestedListStyle={styles.nestedListStyle}
    />
  )
}

interface Props {
  selectedIds
  items
  opened?: boolean
  onCheck
}

const Categories: FC<Props> = props => {
  const {
    selectedIds: propSelectedIds,
    items,
    opened: propOpened = false,
    onCheck,
  } = props

  const getItem = (selectedIds, allItems, item, opened) => {
    const nestedItems = getChildren(selectedIds, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedIds={selectedIds}
        nestedItems={nestedItems}
        onCheck={onCheck}
      />
    )
  }

  const getChildren = (selectedIds, allItems, id, opened) => {
    if (allItems && id)
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => getItem(selectedIds, allItems, item, opened))

    return []
  }

  const rows = items
    .filter(item => item.parent_id === null)
    .map(item => getItem(propSelectedIds, items, item, propOpened))

  return <List>{rows}</List>
}

export default Categories
