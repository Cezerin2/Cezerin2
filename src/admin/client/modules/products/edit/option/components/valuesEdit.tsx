import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React, { FC, useState } from "react"
import style from "./style.css"

interface Props {
  value
  onChange
  onDelete
}

const OptionValueEdit: FC<Props> = props => {
  const [value, setValue] = useState(props.value.name)

  const { value: propValue, onChange, onDelete } = props

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onBlur={() => onChange(propValue, value)}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton
          title={messages.actions_delete}
          onClick={() => onDelete(propValue)}
          tabIndex={-1}
        >
          <FontIcon color="#a1a1a1" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

export default OptionValueEdit
