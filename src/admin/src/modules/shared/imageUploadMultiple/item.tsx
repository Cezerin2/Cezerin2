import { Create, Delete } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import Paper from "material-ui/Paper"
import React from "react"
import style from "./style.sass"

const GalleryItem = ({ url, alt, id, onDelete, onImageEdit }) => (
  <Paper zDepth={1} rounded={false}>
    <div className={style.preview}>
      <img src={url} title={alt} />
    </div>
    <div className={style.footer}>
      <IconButton
        touch
        tooltip={messages.edit}
        tooltipPosition="top-right"
        onClick={onImageEdit}
      >
        <Create htmlColor="rgba(0,0,0,0.5)" />
      </IconButton>
      <IconButton
        touch
        tooltip={messages.actions_delete}
        tooltipPosition="top-right"
        onClick={() => {
          onDelete(id)
        }}
      >
        <Delete htmlColor="rgba(0,0,0,0.5)" />
      </IconButton>
    </div>
  </Paper>
)

export default GalleryItem
