import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import ForgotPassword from './forgotPassword';

export default class ForgotPasswordForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = values => {
			this.props.forgotPassword({
				email: values.email,
				history: this.props.history
			});
		};
	}

	render() {

		const {
			settings,
			forgotPasswordProperties
		} = this.props.state;

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button'
		} = themeSettings;

		return React.createElement(
			'div',
			null,
			React.createElement(ForgotPassword, {
				inputClassName: checkoutInputClass,
				buttonClassName: checkoutButtonClass,
				settings: settings,
				forgotPasswordProperties: forgotPasswordProperties,
				onSubmit: this.handleFormSubmit
			})
		);
	}
}