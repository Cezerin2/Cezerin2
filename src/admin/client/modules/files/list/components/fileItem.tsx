import * as helper from "lib/helper"
import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import moment from "moment"
import React from "react"
import style from "./style.css"

const iconButtonElement = (
  <IconButton touch>
    <FontIcon color="rgb(189, 189, 189)" className="material-icons">
      more_vert
    </FontIcon>
  </IconButton>
)

class FileItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  hideDelete = () => {
    this.setState({ openDelete: false })
  }

  handleDelete = () => {
    const fileName = this.props.file.file
    this.props.onDelete(fileName)
    this.hideDelete()
  }

  render() {
    const { file, settings } = this.props
    const fileName = file.file
    const fileUrl = `${settings.domain}/${file.file}`
    const modifiedDate = moment(file.modified)
    const modifiedDateFormated = modifiedDate.format(`${settings.date_format}`)
    const fileSizeFormated = helper.formatFileSize(file.size)

    return (
      <div className={style.item + " row row--no-gutter middle-xs"}>
        <div className={style.name + " col-xs-5"}>
          <a href={fileUrl} target="_blank" rel="noopener">
            {file.file}
          </a>
        </div>
        <div className={style.date + " col-xs-3"}>{modifiedDateFormated}</div>
        <div className={style.size + " col-xs-2"}>{fileSizeFormated}</div>
        <div className={style.more + " col-xs-2"}>
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={this.showDelete}>
              {messages.actions_delete}
            </MenuItem>
          </IconMenu>
          <DeleteConfirmation
            open={this.state.openDelete}
            isSingle
            itemsCount={1}
            itemName={fileName}
            onCancel={this.hideDelete}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    )
  }
}

export default FileItem
