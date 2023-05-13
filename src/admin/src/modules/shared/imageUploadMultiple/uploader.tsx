import messages from "lib/text"
import RaisedButton from "material-ui/RaisedButton"
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

  const { uploading, onUpload, children } = props

  const onDrop = files => {
    const form = new FormData()
    files.map(file => {
      form.append("file", file)
    })

    console.log(files)

    console.log(form)

    onUpload(form)
  }

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple
        disableClick
        accept="image/*"
        ref={node => {
          dropzone.current = node
        }}
        style={{}}
        className={style.dropzone}
        activeClassName={style.dropzoneActive}
        rejectClassName={style.dropzoneReject}
      >
        {children}
        {!children && (
          <div className={style.dropzoneEmpty}>{messages.help_dropHere}</div>
        )}
      </Dropzone>

      {!uploading && (
        <RaisedButton
          primary
          label={messages.chooseImage}
          style={{ marginLeft: 20, marginTop: 10 }}
          onClick={() => {
            dropzone.current.open()
          }}
        />
      )}

      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
