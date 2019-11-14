import React from 'react';
import { Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ResetPassword from './resetPassword';

export default class ResetPasswordForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = values => {
			const userId = this.props.state.resetPasswordProperties.id;
			this.props.resetPassword({
				id: userId,
				password: values.password,
				history: this.props.history
			});
		};

		this.state = {
			verifiedToken: false
		};
	}

	verifyToken() {
		this.setState({ verifiedToken: true });
		this.props.resetPassword({
			token: this.props.location.search.split('=')[1]
		});
	}

	render() {
		!this.state.verifiedToken ? this.verifyToken() : '';

		const {
			settings,
			forgotPasswordProperties,
			resetPasswordProperties
		} = this.props.state;

		if (this.props.location.search === '' || this.props.location.search.indexOf('?token=') === -1 || resetPasswordProperties && !resetPasswordProperties.status) {
			return React.createElement(Redirect, { to: {
					pathname: '/'
				} });
		}

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button'
		} = themeSettings;

		return React.createElement(
			'div',
			null,
			resetPasswordProperties && React.createElement(ResetPassword, {
				inputClassName: checkoutInputClass,
				buttonClassName: checkoutButtonClass,
				settings: settings,
				forgotPasswordProperties: forgotPasswordProperties,
				resetPasswordProperties: resetPasswordProperties,
				onSubmit: this.handleFormSubmit
			})
		);
	}
}