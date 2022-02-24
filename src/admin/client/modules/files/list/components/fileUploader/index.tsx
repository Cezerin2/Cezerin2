import messages from "lib/text"
import FlatButton from "material-ui/FlatButton"
import Snackbar from "material-ui/Snackbar"
import React from "react"
import Dropzone from "react-dropzone"
import style from "./style.css"

class MultiUploader extends React.Component {
  onDrop = files => {
    let form = new FormData()
    files.map(file => {
      form.append("file", file)
    })
    this.props.onUpload(form)
  }

  render() {
    const { uploading } = this.props
    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          multiple
          disableClick
          ref={node => {
            this.dropzone = node
          }}
          style={{}}
          className={style.dropzone + (uploading ? " " + style.uploading : "")}
          activeClassName={style.dropzoneActive}
          rejectClassName={style.dropzoneReject}
        >
          <div className={style.dropzoneEmpty}>
            {messages.help_dropHere}
            <FlatButton
              label={messages.chooseImage}
              className={style.button}
              onClick={() => {
                this.dropzone.open()
              }}
            />
          </div>
        </Dropzone>

        <Snackbar open={uploading} message={messages.messages_uploading} />
      </div>
    )
  }
}

export default MultiUploader
