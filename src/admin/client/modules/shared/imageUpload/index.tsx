import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import Paper from "material-ui/Paper"
import Snackbar from "material-ui/Snackbar"
import React, { FC, useEffect, useRef, useState } from "react"
import Dropzone from "react-dropzone"
import style from "./style.css"

interface Props {
  uploading
  imageUrl
  onDelete
  onUpload
}

const ImageUpload: FC<Props> = props => {
  const [imagePreview, setImagePreview] = useState(props.imageUrl)
  const dropzone = useRef()

  const { uploading, imageUrl, onDelete, onUpload } = props

  useEffect(() => {
    setImagePreview(imageUrl)
  }, [props.imageUrl])

  const onDrop = files => {
    let form = new FormData()
    form.append("file", files[0])
    onUpload(form)
  }

  const hasPreview = imagePreview !== null && imagePreview !== ""
  const previewIsFileUrl = hasPreview ? imagePreview.startsWith("http") : null

  let htmlPreview = (
    <div className={style.noImage}>
      <FontIcon
        style={{ fontSize: 90, color: "#cccccc" }}
        className="material-icons"
      >
        photo_camera
      </FontIcon>
      <div className={style.dropText}>{messages.help_dropHere}</div>
    </div>
  )

  if (hasPreview && previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  } else if (hasPreview && !previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  }

  return (
    <Paper zDepth={1} rounded={false} style={{ width: 200 }}>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        disableClick={hasPreview}
        accept="image/*"
        ref={dropzone}
        style={{}}
        className={style.dropzone}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        <div className={style.preview}>{htmlPreview}</div>
      </Dropzone>

      <div className={style.footer}>
        <IconButton
          touch
          tooltip={messages.actions_upload}
          onClick={() => {
            dropzone.open()
          }}
          tooltipPosition="top-right"
        >
          <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
            file_upload
          </FontIcon>
        </IconButton>
        {hasPreview && (
          <IconButton
            touch
            tooltip={messages.actions_delete}
            onClick={() => {
              setImagePreview(null)
              onDelete()
            }}
            tooltipPosition="top-right"
          >
            <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
        )}
      </div>
      <Snackbar open={uploading} message={messages.messages_uploading} />
    </Paper>
  )
}

export default ImageUpload
