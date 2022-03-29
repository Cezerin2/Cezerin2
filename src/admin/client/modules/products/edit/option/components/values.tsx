import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import Paper from "material-ui/Paper"
import React from "react"
import style from "./style.css"
import OptionValueEdit from "./valuesEdit"

class OptionValueAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onCreate = () => {
    if (this.state.value !== "") {
      this.props.onCreate(this.state.value)
      this.setState({ value: "" })
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      this.onCreate()
    }
  }

  render() {
    const { value } = this.state

    return (
      <div className={style.gridRow}>
        <div className={style.gridColInput}>
          <input
            type="text"
            className={style.textInput}
            value={value}
            placeholder={messages.newOptionValue}
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={style.gridColButton}>
          <IconButton
            title={messages.add}
            onClick={this.onCreate}
            tabIndex={-1}
          >
            <FontIcon color="#a1a1a1" className="material-icons">
              add_circle
            </FontIcon>
          </IconButton>
        </div>
      </div>
    )
  }
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
