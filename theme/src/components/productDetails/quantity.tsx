import React from 'react'
import { themeSettings, text } from '../../lib/settings'

const Quantity = () => {
		this.state = {
			quantity: 1,
		}

	componentWillReceiveProps(nextProps) {
		if (this.state.quantity > nextProps.maxQuantity) {
			this.setQuantity(nextProps.maxQuantity)
		}
	}

	handleChange = (event) => {
		this.setQuantity(event.target.value)
	}

	setQuantity = (quantity) => {
		const intQuantity = parseInt(quantity)
		if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
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

		const { maxQuantity } = this.props
		const { quantity } = this.state
		const disabled = maxQuantity === 0
		const value = disabled ? 0 : quantity

		return (
			<>
				<p>{text.qty}</p>
				<div className="product-quantity">
					<a className="decrement" onClick={this.decrement} />
					<input
						value={value}
						onChange={this.handleChange}
						maxLength="3"
						type="number"
						pattern="\d*"
						disabled={disabled}
					/>
					<a className="increment" onClick={this.increment} />
				</div>
			</>
		)
	}
}
export default Quantity
