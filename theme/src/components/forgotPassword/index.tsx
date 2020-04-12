import React from 'react'
import { themeSettings } from '../../lib/settings'
import ForgotPassword from './forgotPassword'

const ForgotPasswordForm = () => {
	handleFormSubmit = (values) => {
		this.props.forgotPassword({
			email: values.email,
			history: this.props.history,
		})
	}

	const { settings, forgotPasswordProperties } = this.props.state

	const {
		checkoutInputClass = 'checkout-field',
		checkoutButtonClass = 'checkout-button',
	} = themeSettings

	return (
		<>
			<ForgotPassword
				inputClassName={checkoutInputClass}
				buttonClassName={checkoutButtonClass}
				settings={settings}
				forgotPasswordProperties={forgotPasswordProperties}
				onSubmit={handleFormSubmit}
			/>
		</>
	)
}

export default ForgotPasswordForm
