import messages from "lib/text"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import FileItem from "./fileItem"
import FileUploader from "./fileUploader"
import style from "./style.sass"

interface Props {
  files
  settings
  onDelete
  onUpload
  uploading: boolean
  onLoad: () => void
}

const FileList: FC<Props> = props => {
  const { files, settings, onDelete, onUpload, uploading, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const listItems = files.map((file, index) => (
    <FileItem key={index} file={file} settings={settings} onDelete={onDelete} />
  ))

  return (
    <>
      <div className={`${style.head} row row--no-gutter`}>
        <div className="col-xs-5">{messages.fileName}</div>
        <div className="col-xs-3">{messages.fileModified}</div>
        <div className="col-xs-2">{messages.fileSize}</div>
        <div className="col-xs-2" />
      </div>
      <Paper className="paper-box" zDepth={1}>
        {listItems}
      </Paper>
      <FileUploader onUpload={onUpload} uploading={uploading} />
    </>
  )
}

export default FileList
