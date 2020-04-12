import React from 'react';
import { Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ResetPassword from './resetPassword';

const ResetPasswordForm = () => {
		this.state = {
			verifiedToken: false
		};

	verifyToken() {
		this.setState({ verifiedToken: true });
		this.props.resetPassword({
			token: this.props.location.search.split('=')[1]
		});
	}

	handleFormSubmit = values => {
		const userId = this.props.state.resetPasswordProperties.id;
		this.props.resetPassword({
			id: userId,
			password: values.password,
			history: this.props.history
		});
	};

		!this.state.verifiedToken ? this.verifyToken() : '';

		const {
			settings,
			forgotPasswordProperties,
			resetPasswordProperties
		} = this.props.state;

		if (
			this.props.location.search === '' ||
			this.props.location.search.indexOf('?token=') === -1 ||
			(resetPasswordProperties && !resetPasswordProperties.status)
		) {
			return (
				<Redirect
					to={{
						pathname: '/'
					}}
				/>
			);
		}

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button'
		} = themeSettings;

		return (
			<>
				{resetPasswordProperties && (
					<ResetPassword
						inputClassName={checkoutInputClass}
						buttonClassName={checkoutButtonClass}
						settings={settings}
						forgotPasswordProperties={forgotPasswordProperties}
						resetPasswordProperties={resetPasswordProperties}
						onSubmit={handleFormSubmit}
					/>
				)}
			</>
		);
	}

export default ResetPasswordForm