import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React, { Fragment } from "react"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteStatus = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.selected.id)
  }

  render() {
    const { selected, onDelete, onCreate } = this.props
    const statusName =
      selected && selected.name && selected.name.length > 0
        ? selected.name
        : "Draft"

    return (
      <span>
        {selected && (
          <Fragment>
            <IconButton
              touch
              tooltip={messages.actions_delete}
              tooltipPosition="bottom-left"
              onClick={this.showDelete}
            >
              <FontIcon color="#fff" className="material-icons">
                delete
              </FontIcon>
            </IconButton>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle
              itemsCount={1}
              itemName={statusName}
              onCancel={this.closeDelete}
              onDelete={this.deleteStatus}
            />
          </Fragment>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.addOrderStatus}
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
