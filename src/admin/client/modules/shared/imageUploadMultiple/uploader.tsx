import messages from "lib/text"
import RaisedButton from "material-ui/RaisedButton"
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

    console.log(files)

    console.log(form)

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
          accept="image/*"
          ref={node => {
            this.dropzone = node
          }}
          style={{}}
          className={style.dropzone}
          activeClassName={style.dropzoneActive}
          rejectClassName={style.dropzoneReject}
        >
          {this.props.children}
          {!this.props.children && (
            <div className={style.dropzoneEmpty}>{messages.help_dropHere}</div>
          )}
        </Dropzone>

        {!uploading && (
          <RaisedButton
            primary
            label={messages.chooseImage}
            style={{ marginLeft: 20, marginTop: 10 }}
            onClick={() => {
              this.dropzone.open()
            }}
          />
        )}

        <Snackbar open={uploading} message={messages.messages_uploading} />
      </div>
    )
  }
}

export default MultiUploader
