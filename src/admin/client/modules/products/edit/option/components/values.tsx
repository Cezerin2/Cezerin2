import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import Paper from "material-ui/Paper"
import React, { FC, useState } from "react"
import style from "./style.css"
import OptionValueEdit from "./valuesEdit"

const OptionValueAdd: FC<{ onCreate }> = props => {
  const [value, setValue] = useState("")

  const onCreate = () => {
    if (value !== "") {
      props.onCreate(value)
      setValue("")
    }
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      onCreate()
    }
  }

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          placeholder={messages.newOptionValue}
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton title={messages.add} onClick={onCreate} tabIndex={-1}>
          <FontIcon color="#a1a1a1" className="material-icons">
            add_circle
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

const OptionValues = ({
  optionValues,
  createOptionValue,
  updateOptionValue,
  deleteOptionValue,
}) => {
  const valueRows = optionValues.map((value, index) => (
    <OptionValueEdit
      key={index}
      value={value}
      onChange={updateOptionValue}
      onDelete={deleteOptionValue}
    />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="blue-title" style={{ padding: "20px 30px" }}>
        {messages.optionValues}
      </div>
      <div className={style.grid}>
        {valueRows}
        <OptionValueAdd onCreate={createOptionValue} />
      </div>
    </Paper>
  )
}

export default OptionValues
