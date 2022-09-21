import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import Snackbar from "material-ui/Snackbar"
import React, { FC, useRef } from "react"
import Dropzone from "react-dropzone"
import style from "./style.sass"

interface Props {
  uploading
  onUpload
}

const MultiUploader: FC<Props> = props => {
  const dropzone = useRef<{ open: () => void }>()

  const { uploading, onUpload } = props

  const onDrop = files => {
    const form = new FormData()
    files.map(file => {
      form.append("file", file)
    })
    onUpload(form)
  }

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        multiple
        disableClick
        ref={node => {
          dropzone.current = node
        }}
        style={{}}
        className={style.dropzone + (uploading ? ` ${style.uploading}` : "")}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        <div className={style.dropzoneEmpty}>
          {messages.help_dropHere}
          <FlatButton
            label={messages.chooseImage}
            className={style.button}
            onClick={() => {
              dropzone.current.open()
            }}
          />
        </div>
      </Dropzone>

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </div>
  )
}

export default MultiUploader
