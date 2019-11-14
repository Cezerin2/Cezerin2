var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { Link, Redirect, NavLink } from 'react-router-dom';
import Lscache from 'lscache';

const validateRequired = value => value && value.length > 0 ? undefined : text.required;

const validateEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const InputField = field => React.createElement(
	'div',
	{ className: field.className },
	React.createElement(
		'label',
		{ htmlFor: field.id },
		field.label,
		field.meta.touched && field.meta.error && React.createElement(
			'span',
			{ className: 'error' },
			field.meta.error
		)
	),
	React.createElement('input', _extends({}, field.input, {
		placeholder: field.placeholder,
		type: field.type,
		id: field.id,
		disabled: field.disabled,
		className: field.meta.touched && field.meta.error ? 'invalid' : ''
	}))
);

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);

		this.getField = fieldName => {
			const fields = this.props.checkoutFields || [];
			const field = fields.find(item => item.name === fieldName);
			return field;
		};

		this.getFieldStatus = fieldName => {
			const field = this.getField(fieldName);
			return field && field.status ? field.status : 'required';
		};

		this.isFieldOptional = fieldName => {
			return this.getFieldStatus(fieldName) === 'optional';
		};

		this.isFieldHidden = fieldName => {
			return this.getFieldStatus(fieldName) === 'hidden';
		};

		this.isFieldDisabled = fieldName => {
			return this.getFieldStatus(fieldName) === 'disabled';
		};

		this.getFieldValidators = fieldName => {
			const isOptional = this.isFieldOptional(fieldName);
			let validatorsArray = [];
			if (!isOptional) {
				validatorsArray.push(validateRequired);
			}
			if (fieldName === 'email') {
				validatorsArray.push(validateEmail);
			}

			return validatorsArray;
		};

		this.getFieldPlaceholder = fieldName => {
			const field = this.getField(fieldName);
			return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : '';
		};

		this.getFieldLabelText = fieldName => {
			const field = this.getField(fieldName);
			if (field && field.label && field.label.length > 0) {
				return field.label;
			} else {
				switch (fieldName) {
					case 'email':
						return text.email;
						break;
					case 'password':
						return text.password;
						break;
					default:
						return 'Unnamed field';
				}
			}
		};

		this.getFieldLabel = fieldName => {
			const labelText = this.getFieldLabelText(fieldName);
			return this.isFieldOptional(fieldName) ? `${labelText} (${text.optional})` : labelText;
		};
	}

	render() {
		const {
			handleSubmit,
			forgotPasswordProperties
		} = this.props;

		const inputClassName = 'login-input-field';
		const loginTitleClassName = 'login-title';
		const sendPasswordSuccessTitleClassName = 'send-password-success-title';
		const sendPasswordFailedTitleClassName = 'send-password-failed-title';
		const loginButtonClass = 'account-button button';
		return React.createElement(
			'div',
			{ className: 'login-container' },
			React.createElement(
				'form',
				{ onSubmit: handleSubmit, className: 'login-form' },
				React.createElement(
					'div',
					{ className: 'login-section' },
					React.createElement(
						'h1',
						{ className: loginTitleClassName },
						text.forgot_password
					),
					React.createElement(
						'p',
						{ className: loginTitleClassName },
						forgotPasswordProperties === undefined ? text.forgot_password_subtitle : ''
					),
					forgotPasswordProperties !== undefined && forgotPasswordProperties.status ? React.createElement(
						'p',
						{ className: sendPasswordSuccessTitleClassName },
						text.forgot_password_email_sent_success
					) : '',
					forgotPasswordProperties !== undefined && !forgotPasswordProperties.status ? React.createElement(
						'p',
						{ className: sendPasswordFailedTitleClassName },
						text.forgot_password_email_sent_failed
					) : '',
					React.createElement(Field, {
						className: inputClassName,
						name: 'email',
						id: 'customer.email',
						component: InputField,
						type: 'email',
						props: forgotPasswordProperties !== undefined && forgotPasswordProperties.status ? { disabled: true } : this.value,
						label: this.getFieldLabel('email'),
						validate: this.getFieldValidators('email'),
						placeholder: this.getFieldPlaceholder('email')
					}),
					React.createElement(
						'div',
						{ className: 'login-button-wrap' },
						React.createElement(
							'button',
							{
								type: 'submit',
								className: loginButtonClass,
								disabled: forgotPasswordProperties !== undefined && forgotPasswordProperties.status
							},
							text.forgot_password_submit
						)
					)
				)
			)
		);
	}
}
export default reduxForm({
	form: 'ForgotPassword'
})(ForgotPassword);