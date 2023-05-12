import Paper from "material-ui/Paper"
import ImageUpload from "modules/shared/imageUpload"
import React, { FC, useEffect } from "react"

interface Props {
  onImageUpload
  onImageDelete
  settings
  onLoad: () => void
}

const GeneralLogoSettingsForm: FC<Props> = props => {
  const { onImageUpload, onImageDelete, settings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const imageUrl = settings && settings.logo ? settings.logo : ""

  return (
    <Paper className="paper-box" zDepth={1}>
      <div style={{ padding: 30 }}>
        <ImageUpload
          uploading={false}
          imageUrl={imageUrl}
          onDelete={onImageDelete}
          onUpload={onImageUpload}
        />
      </div>
    </Paper>
  )
}

export default GeneralLogoSettingsForm
