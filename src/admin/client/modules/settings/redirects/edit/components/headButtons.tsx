import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React from "react"
const { Fragment } = React

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

  deletePage = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.redirect.id)
  }

  render() {
    const { redirect } = this.props
    const redirectName =
      redirect && redirect.from && redirect.from.length > 0
        ? redirect.from
        : "Draft"

    if (redirect) {
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
            itemName={redirectName}
            onCancel={this.closeDelete}
            onDelete={this.deletePage}
          />
        </Fragment>
      )
    }
    return null
  }
}
