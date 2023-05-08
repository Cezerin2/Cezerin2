import settings from "lib/settings"
import React, { FC, useEffect, useState } from "react"
import TinyMCE from "../tinymce"

const config = {
  inline: true,
  plugins: [
    "autolink lists link image charmap preview anchor",
    "searchreplace visualblocks code fullscreen",
    "media table paste code textcolor directionality",
  ],
  toolbar1:
    "image media | styleselect | bold italic bullist numlist link alignleft aligncenter alignright alignjustify",
  toolbar2:
    "undo redo | forecolor paste removeformat table | outdent indent | preview code",
}

const Editor: FC<{ input; entityId }> = ({ input, entityId }) => {
  const [value, setValue] = useState(input.value)

  useEffect(() => {
    setValue(input.value)
  }, [input.value])

  const onChange = e => {
    const content = e.target.getContent()
    setValue(content)
    input.onChange(content)
  }

  return (
    <TinyMCE
      entityId={entityId}
      content={value}
      config={{
        relative_urls: false,
        remove_script_host: false,
        convert_urls: false,
        language: settings.language,
        themes: config.themes,
        inline: config.inline,
        plugins: config.plugins,
        toolbar1: config.toolbar1,
        toolbar2: config.toolbar2,
        menubar: false,
      }}
      onChange={onChange}
    />
  )
}

export default Editor
