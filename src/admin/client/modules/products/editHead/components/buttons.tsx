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

  handleDelete = () => {
    this.closeDelete()
    this.props.onDelete()
  }

  render() {
    const { product } = this.props
    const productName =
      product && product.name && product.name.length > 0
        ? product.name
        : "Draft"

    return (
      <Fragment>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.deleteProduct}
          onClick={this.openDelete}
        >
          <FontIcon color="#fff" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
        {product && product.enabled && (
          <a href={product.url} target="_blank">
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.viewOnWebsite}
            >
              <FontIcon color="#fff" className="material-icons">
                open_in_new
              </FontIcon>
            </IconButton>
          </a>
        )}
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle
          itemsCount={1}
          itemName={productName}
          onCancel={this.closeDelete}
          onDelete={this.handleDelete}
        />
      </Fragment>
    )
  }
}
