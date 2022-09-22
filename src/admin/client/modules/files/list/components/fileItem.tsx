import { MoreVert } from "@mui/icons-material"
import * as helper from "lib/helper"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import DeleteConfirmation from "modules/shared/deleteConfirmation"
import moment from "moment"
import React, { FC, useState } from "react"
import style from "./style.sass"

const iconButtonElement = (
  <IconButton touch>
    <MoreVert htmlColor="rgb(189, 189, 189)" />
  </IconButton>
)

interface Props {
  file
  settings
  onDelete
}

const FileItem: FC<Props> = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const { file, settings, onDelete } = props

  const handleDelete = () => {
    const fileName = file.file
    onDelete(fileName)
    setOpenDelete(false)
  }

  const fileName = file.file
  const fileUrl = `${settings.domain}/${file.file}`
  const modifiedDate = moment(file.modified)
  const modifiedDateFormated = modifiedDate.format(`${settings.date_format}`)
  const fileSizeFormated = helper.formatFileSize(file.size)

  return (
    <div className={`${style.item} row row--no-gutter middle-xs`}>
      <div className={`${style.name} col-xs-5`}>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          {file.file}
        </a>
      </div>
      <div className={`${style.date} col-xs-3`}>{modifiedDateFormated}</div>
      <div className={`${style.size} col-xs-2`}>{fileSizeFormated}</div>
      <div className={`${style.more} col-xs-2`}>
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={() => setOpenDelete(true)}>
            {messages.actions_delete}
          </MenuItem>
        </IconMenu>
        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={fileName}
          onCancel={() => setOpenDelete(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default FileItem
