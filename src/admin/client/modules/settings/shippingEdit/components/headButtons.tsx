import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React from "react"

export default class Buttons extends React.Component {
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

  deleteGroup = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.shippingMethod.id)
  }

  render() {
    const { shippingMethod, onDelete } = this.props
    const methodName =
      shippingMethod && shippingMethod.name && shippingMethod.name.length > 0
        ? shippingMethod.name
        : "Draft"

    return (
      <span>
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
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle
          itemsCount={1}
          itemName={methodName}
          onCancel={this.closeDelete}
          onDelete={this.deleteGroup}
        />
      </span>
    )
  }
}
