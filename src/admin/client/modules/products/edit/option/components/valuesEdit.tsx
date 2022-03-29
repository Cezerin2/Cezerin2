import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import style from "./style.css"

class OptionValueEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value.name,
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onBlur = e => {
    this.props.onChange(this.props.value.id, this.state.value)
  }

  onDelete = () => {
    this.props.onDelete(this.props.value.id)
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
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        </div>
        <div className={style.gridColButton}>
          <IconButton
            title={messages.actions_delete}
            onClick={this.onDelete}
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
}

export default OptionValueEdit
