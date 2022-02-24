import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import CategorySelect from "modules/productCategories/select"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React from "react"
const Fragment = React.Fragment

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryIdMoveTo: "root",
      openMoveTo: false,
      openDelete: false,
    }
  }

  showMoveTo = () => {
    this.setState({ openMoveTo: true })
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeMoveTo = () => {
    this.setState({ openMoveTo: false })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteCategory = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.selected.id)
  }

  saveMoveTo = () => {
    this.setState({ openMoveTo: false })
    this.props.onMoveTo(this.state.categoryIdMoveTo)
  }

  selectMoveTo = categoryId => {
    this.setState({ categoryIdMoveTo: categoryId })
  }

  render() {
    const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = this.props
    const categoryName =
      selected && selected.name && selected.name.length > 0
        ? selected.name
        : "Draft"

    const actionsMoveTo = [
      <FlatButton
        label={messages.cancel}
        onClick={this.closeMoveTo}
        style={{ marginRight: 10 }}
      />,
      <FlatButton
        label={messages.actions_moveHere}
        primary
        keyboardFocused
        onClick={this.saveMoveTo}
      />,
    ]

    return (
      <span>
        {selected && (
          <Fragment>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveUp}
              onClick={onMoveUp}
            >
              <FontIcon color="#fff" className="material-icons">
                arrow_upward
              </FontIcon>
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveDown}
              onClick={onMoveDown}
            >
              <FontIcon color="#fff" className="material-icons">
                arrow_downward
              </FontIcon>
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_delete}
              onClick={this.showDelete}
            >
              <FontIcon color="#fff" className="material-icons">
                delete
              </FontIcon>
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveTo}
              onClick={this.showMoveTo}
            >
              <FontIcon color="#fff" className="material-icons">
                folder
              </FontIcon>
            </IconButton>
            <Dialog
              title={messages.actions_moveTo}
              actions={actionsMoveTo}
              modal={false}
              open={this.state.openMoveTo}
              onRequestClose={this.closeMoveTo}
              autoScrollBodyContent
            >
              <CategorySelect
                onSelect={this.selectMoveTo}
                selectedId={this.state.categoryIdMoveTo}
                showRoot
                showAll={false}
              />
            </Dialog>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle
              itemsCount={1}
              itemName={categoryName}
              onCancel={this.closeDelete}
              onDelete={this.deleteCategory}
            />
          </Fragment>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.productCategories_titleAdd}
          onClick={onCreate}
        >
          <FontIcon color="#fff" className="material-icons">
            add
          </FontIcon>
        </IconButton>
      </span>
    )
  }
}

export default Buttons
