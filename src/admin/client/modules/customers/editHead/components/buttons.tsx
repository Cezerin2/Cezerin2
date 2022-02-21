import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React from "react"
const Fragment = React.Fragment

export default class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  openDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteOrder = () => {
    this.closeDelete()
    this.props.onDelete()
  }

  render() {
    const { customer } = this.props
    const customerName =
      customer && customer.full_name && customer.full_name.length > 0
        ? customer.full_name
        : "Draft"

    return (
      <Fragment>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.actions_delete}
          onClick={this.openDelete}
        >
          <FontIcon color="#fff" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle
          itemsCount={1}
          itemName={customerName}
          onCancel={this.closeDelete}
          onDelete={this.props.onDelete}
        />
      </Fragment>
    )
  }
}
