import messages from "lib/text"
import Paper from "material-ui/Paper"
import React, { Fragment } from "react"
import FileItem from "./fileItem"
import FileUploader from "./fileUploader"
import style from "./style.css"

class FileList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    const { files, settings, onDelete, onUpload, uploading } = this.props
    let listItems = files.map((file, index) => (
      <FileItem
        key={index}
        file={file}
        settings={settings}
        onDelete={onDelete}
      />
    ))

    return (
      <Fragment>
        <div className={style.head + " row row--no-gutter"}>
          <div className="col-xs-5">{messages.fileName}</div>
          <div className="col-xs-3">{messages.fileModified}</div>
          <div className="col-xs-2">{messages.fileSize}</div>
          <div className="col-xs-2" />
        </div>
        <Paper className="paper-box" zDepth={1}>
          {listItems}
        </Paper>
        <FileUploader onUpload={onUpload} uploading={uploading} />
      </Fragment>
    )
  }
}

export default FileList
