import React, { Fragment } from "react"
import { themeSettings, text } from "../../lib/settings"

export default class Quantity extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity > nextProps.maxQuantity) {
      this.setQuantity(nextProps.maxQuantity)
    }
  }

  handleChange = event => {
    this.setQuantity(event.target.value)
  }

  setQuantity = quantity => {
    let intQuantity = quantity
    this.setState({
      quantity,
    })
    if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
      intQuantity = parseInt(quantity)
      this.setState({ quantity: intQuantity })
      this.props.onChange(intQuantity)
    } else if (intQuantity > this.props.maxQuantity) {
      intQuantity = parseInt(this.props.maxQuantity)
      this.setState({ quantity: intQuantity })
      this.props.onChange(intQuantity)
    }
  }

  increment = () => {
    const newQuantity = this.state.quantity + 1
    this.setQuantity(newQuantity)
  }

  decrement = () => {
    const newQuantity = this.state.quantity - 1
    this.setQuantity(newQuantity)
  }

  render() {
    const { maxQuantity } = this.props
    const { quantity } = this.state
    const disabled = maxQuantity === 0
    const value = disabled ? 0 : quantity

    return (
      <div className="product__quantity">
        <div className="product__title">{text.qty}</div>
        <div className="product-quantity">
          <button
            type="button"
            className="decrement"
            onClick={this.decrement}
          />
          <input
            value={value}
            onChange={this.handleChange}
            maxLength="3"
            type="number"
            pattern="\d*"
            disabled={disabled}
          />
          <button
            type="button"
            className="increment"
            onClick={this.increment}
          />
        </div>
      </div>
    )
  }
}
