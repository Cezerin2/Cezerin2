import api from "lib/api"
import ImageUpload from "modules/shared/imageUpload"
import React, { FC } from "react"

interface Props {
  input
  label: string
}

const ThemeImageUpload: FC<Props> = props => {
  const { input, label } = props

  const onDelete = () => {
    const fileName = input.value
    api.theme.assets.deleteFile(fileName).then(() => {
      input.onChange("")
    })
  }

  const onUpload = formData => {
    api.theme.assets.uploadFile(formData).then(({ status, json }) => {
      const fileName = json.file
      input.onChange(fileName)
    })
  }

  const imageUrl =
    input.value && input.value.length > 0
      ? `/assets/images/${input.value}`
      : null

  return (
    <>
      <p>{label}</p>
      <ImageUpload
        uploading={false}
        imageUrl={imageUrl}
        onDelete={onDelete}
        onUpload={onUpload}
      />
    </>
  )
}

export default ThemeImageUpload
