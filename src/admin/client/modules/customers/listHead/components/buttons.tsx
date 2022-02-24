import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import GroupSelect from "modules/customerGroups/select"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import React from "react"
import Search from "./search"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupId: null,
      openSetGroup: false,
      openDelete: false,
    }
  }

  showSetGroup = () => {
    this.setState({ openSetGroup: true })
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeSetGroup = () => {
    this.setState({ openSetGroup: false })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteCustomers = () => {
    this.setState({ openDelete: false })
    this.props.onDelete()
  }

  saveSetGroup = () => {
    this.setState({ openSetGroup: false })
    this.props.onSetGroup(this.state.groupId)
  }

  selectSetGroup = groupId => {
    this.setState({ groupId: groupId })
  }

  render() {
    const { search, setSearch, selectedCount, onDelete } = this.props

    const actionsSetGroup = [
      <FlatButton
        label={messages.cancel}
        onClick={this.closeSetGroup}
        style={{ marginRight: 10 }}
      />,
      <FlatButton
        label={messages.save}
        primary
        keyboardFocused
        onClick={this.saveSetGroup}
      />,
    ]

    return (
      <span>
        <Search value={search} setSearch={setSearch} />
        {selectedCount > 0 && (
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
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.customers_setGroup}
              onClick={this.showSetGroup}
            >
              <FontIcon color="#fff" className="material-icons">
                folder
              </FontIcon>
            </IconButton>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle={false}
              itemsCount={selectedCount}
              onCancel={this.closeDelete}
              onDelete={this.deleteCustomers}
            />
            <Dialog
              title={messages.customers_setGroup}
              actions={actionsSetGroup}
              modal={false}
              open={this.state.openSetGroup}
              onRequestClose={this.closeSetGroup}
              autoScrollBodyContent
            >
              <GroupSelect
                onSelect={this.selectSetGroup}
                selectedId={this.state.groupId}
                showRoot
                showAll={false}
              />
            </Dialog>
          </span>
        )}
      </span>
    )
  }
}

export default Buttons
