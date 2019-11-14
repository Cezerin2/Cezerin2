import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import Lscache from 'lscache';

const validateRequired = value => value && value.length > 0 ? undefined : text.required;

const validateEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const ReadOnlyField = ({ step, name, value }) => {
	return React.createElement(
		'div',
		{ className: step > 1 ? "checkout-field-preview" : "checkout-field-preview checkout-field-preview--stepcontacts" },
		React.createElement(
			'div',
			{ className: 'name' },
			name
		),
		React.createElement(
			'div',
			{ className: 'value' },
			value
		)
	);
};

class CheckoutStepContacts extends React.Component {
	constructor(props) {
		super(props);

		this.passwordTemp = value => {
			this.setState({ comparePassword: value.currentTarget.defaultValue });
		};

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

		this.getFieldValidators = fieldName => {
			const isOptional = this.isFieldOptional(fieldName);
			let validatorsArray = [];
			if (!isOptional) {
				validatorsArray.push(validateRequired);
			}
			if (fieldName === 'email') {
				validatorsArray.push(validateEmail);
			}
			if (fieldName === 'password_verify') {
				validatorsArray.push(this.confirmPassword);
			}

			return validatorsArray;
		};

		this.confirmPassword = value => {
			if (value !== this.state.comparePassword) {
				return text.password_verify_failed;
			}
			return undefined;
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
					case 'first_name':
						return text.first_name;
						break;
					case 'last_name':
						return text.last_name;
						break;
					case 'email':
						return text.email;
						break;
					case 'mobile':
						return text.mobile;
						break;
					case 'password':
						return text.password;
						break;
					case 'password_verify':
						return text.password_verify;
						break;
					case 'address1':
						return text.address1;
						break;
					case 'address2':
						return text.address2;
						break;
					case 'country':
						return text.country;
						break;
					case 'state':
						return text.state;
						break;
					case 'city':
						return text.city;
						break;
					case 'postal_code':
						return text.postal_code;
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

		this.state = {
			loggedin: false,
			reinitialized: false,
			emailValues: '',
			comparePassword: ''
		};

		this.setInitialValues = this.setInitialValues.bind(this);
	}

	componentDidMount() {
		if (Lscache.get('auth_data') !== null) {
			this.setState({ loggedin: true });
		}
	}

	setInitialValues() {
		Lscache.flushExpired();
		if (Lscache.get('auth_data') !== null) {
			this.props.initialize({
				first_name: this.props.customerProperties.customer_settings.first_name,
				last_name: this.props.customerProperties.customer_settings.last_name,
				email: this.props.customerProperties.customer_settings.email,
				billing_address: {
					address1: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].address1 : '',
					address2: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].address2 : '',
					city: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].city : '',
					postal_code: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].postal_code : '',
					state: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].state : '',
					country: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].country : ''
				}, shipping_address: {
					address1: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].address1 : '',
					address2: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].address2 : '',
					city: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].city : '',
					postal_code: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].postal_code : '',
					state: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].state : '',
					country: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].country : ''
				}
			});
		}

		this.setState({ reinitialized: true });
		this.setState({ emailValues: this.props.customerProperties.customer_settings.email });
		// this.props.change("input", {disabled: true});
	}

	render() {
		const {
			handleSubmit,
			customerProperties,
			step,
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			loadingShippingMethods,
			loadingPaymentMethods,
			initialValues,
			settings,
			saveShippingLocation,
			saveShippingMethod,
			savePaymentMethod,
			paymentMethods,
			shippingMethods,
			inputClassName,
			buttonClassName,
			editButtonClassName,
			onEdit,
			isReadOnly,
			title
		} = this.props;

		if (customerProperties !== undefined && !this.state.reinitialized && this.state.loggedin) {
			this.setInitialValues();
		}

		if (isReadOnly) {
			return React.createElement(
				'div',
				{ className: 'checkout-step' },
				React.createElement(
					'h1',
					null,
					React.createElement(
						'span',
						null,
						'1'
					),
					title
				),
				!this.isFieldHidden('full_name') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.full_name,
					value: `${initialValues.first_name} ${initialValues.last_name}`
				}),
				this.isFieldHidden('first_name') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.first_name,
					value: initialValues.first_name
				}),
				this.isFieldHidden('last_name') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.last_name,
					value: initialValues.last_name
				}),
				!this.isFieldHidden('email') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.email,
					value: initialValues.email
				}),
				this.isFieldHidden('mobile') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.mobile,
					value: initialValues.mobile
				}),
				!this.isFieldHidden('address1') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.address1,
					value: initialValues.shipping_address.address1
				}),
				!this.isFieldHidden('address2') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.address2,
					value: initialValues.shipping_address.address2
				}),
				!this.isFieldHidden('country') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.country,
					value: initialValues.shipping_address.country
				}),
				!this.isFieldHidden('state') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.state,
					value: initialValues.shipping_address.state
				}),
				!this.isFieldHidden('postal_code') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.postal_code,
					value: initialValues.shipping_address.postal_code
				}),
				!this.isFieldHidden('city') && React.createElement(ReadOnlyField, {
					step: step,
					name: text.city,
					value: initialValues.shipping_address.city
				}),
				React.createElement(ReadOnlyField, {
					step: step,
					name: text.shippingMethod,
					value: initialValues.shipping_method
				}),
				React.createElement(ReadOnlyField, {
					step: step,
					name: text.paymentMethod,
					value: initialValues.payment_method
				}),
				React.createElement(
					'div',
					{ className: 'checkout-button-wrap' },
					React.createElement(
						'button',
						{
							type: 'button',
							onClick: onEdit,
							className: editButtonClassName
						},
						text.edit
					)
				),
				React.createElement(
					'h2',
					null,
					text.shippingMethods,
					' ',
					loadingShippingMethods && React.createElement(
						'small',
						null,
						text.loading
					)
				),
				React.createElement(
					'div',
					{ className: 'shipping-methods' },
					shippingMethods.map((method, index) => React.createElement(
						'label',
						{
							key: index,
							className: 'shipping-method' + (method.id === initialValues.shipping_method_id ? ' active' : '')
						},
						React.createElement(Field, {
							name: 'shipping_method_id',
							component: 'input',
							type: 'radio',
							value: method.id,
							onClick: () => {
								saveShippingMethod(method.id);
							}
						}),
						React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ className: 'shipping-method-name' },
								method.name
							),
							React.createElement(
								'div',
								{ className: 'shipping-method-description' },
								method.description
							)
						),
						React.createElement(
							'span',
							{ className: 'shipping-method-rate' },
							formatCurrency(method.price, settings)
						)
					))
				),
				React.createElement(
					'h2',
					null,
					text.paymentMethods,
					' ',
					loadingPaymentMethods && React.createElement(
						'small',
						null,
						text.loading
					)
				),
				React.createElement(
					'div',
					{ className: 'payment-methods' },
					paymentMethods.map((method, index) => React.createElement(
						'label',
						{
							key: index,
							className: 'payment-method' + (method.id === initialValues.payment_method_id ? ' active' : '')
						},
						React.createElement(Field, {
							name: 'payment_method_id',
							validate: [validateRequired],
							component: 'input',
							type: 'radio',
							value: method.id,
							onClick: () => {
								savePaymentMethod(method.id);
							}
						}),
						React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ className: 'payment-method-name' },
								method.name
							),
							React.createElement(
								'div',
								{ className: 'payment-method-description' },
								method.description
							)
						),
						React.createElement('span', { className: 'payment-method-logo' })
					))
				)
			);
		} else {
			return React.createElement(
				'div',
				{ className: 'checkout-step' },
				React.createElement(
					'h1',
					null,
					React.createElement(
						'span',
						null,
						'1'
					),
					title
				),
				React.createElement(
					'form',
					{ onSubmit: handleSubmit },
					!this.isFieldHidden('first_name') && React.createElement(Field, {
						className: inputClassName,
						name: 'first_name',
						id: 'customer.first_name',
						autoComplete: 'new-password',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('first_name'),
						validate: this.getFieldValidators('first_name'),
						placeholder: this.getFieldPlaceholder('first_name')
					}),
					!this.isFieldHidden('last_name') && React.createElement(Field, {
						className: inputClassName,
						name: 'last_name',
						id: 'customer.last_name',
						autoComplete: 'new-password',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('last_name'),
						validate: this.getFieldValidators('last_name'),
						placeholder: this.getFieldPlaceholder('last_name')
					}),
					this.state.loggedin ? React.createElement(ReadOnlyField, {
						name: text.email,
						value: this.state.emailValues,
						className: 'logged-in-email-field',
						label: this.getFieldLabel('email')
					}) : !this.isFieldHidden('email') && React.createElement(Field, {
						className: inputClassName,
						name: 'email',
						id: 'customer.email',
						autoComplete: 'new-password',
						component: InputField //this.state.loggedin
						, type: 'email',
						label: this.getFieldLabel('email'),
						validate: this.getFieldValidators('email'),
						placeholder: this.getFieldPlaceholder('email')
					}),
					this.isFieldHidden('mobile') && React.createElement(Field, {
						className: inputClassName,
						name: 'mobile',
						id: 'customer.mobile',
						autocomplete: 'new-password',
						component: InputField,
						type: 'tel',
						label: this.getFieldLabel('mobile'),
						validate: this.getFieldValidators('mobile'),
						placeholder: this.getFieldPlaceholder('mobile')
					}),
					this.state.loggedin ? this.isFieldHidden('password') : !this.isFieldHidden('password') && React.createElement(Field, {
						className: inputClassName,
						name: 'password',
						id: 'customer.password',
						autoComplete: 'new-password',
						component: InputField,
						type: 'password',
						onBlur: this.passwordTemp,
						label: !this.state.loggedin ? this.getFieldLabel('password') : '',
						validate: this.getFieldValidators('password'),
						placeholder: this.getFieldPlaceholder('password')
					}),
					this.state.loggedin ? this.isFieldHidden('password') : !this.isFieldHidden('password') && React.createElement(Field, {
						className: inputClassName,
						name: 'password_verify',
						id: 'customer.password_verify',
						autoComplete: 'new-password',
						component: InputField,
						type: 'password',
						label: !this.state.loggedin ? this.getFieldLabel('password_verify') : '',
						validate: this.getFieldValidators('password_verify'),
						placeholder: this.getFieldPlaceholder('password_verify')
					}),
					React.createElement(
						'h2',
						null,
						text.shippingTo
					),
					!this.isFieldHidden('address1') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.address1',
						id: 'shipping_address.address1',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('address1'),
						validate: this.getFieldValidators('address1'),
						placeholder: this.getFieldPlaceholder('address1')
					}),
					!this.isFieldHidden('address2') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.address2',
						id: 'shipping_address.address2',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('address2'),
						placeholder: this.getFieldPlaceholder('address2')
					}),
					!this.isFieldHidden('country') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.country',
						id: 'shipping_address.country',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('country'),
						validate: this.getFieldValidators('country'),
						placeholder: this.getFieldPlaceholder('country')
					}),
					!this.isFieldHidden('state') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.state',
						id: 'shipping_address.state',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('state'),
						validate: this.getFieldValidators('state'),
						placeholder: this.getFieldPlaceholder('state')
					}),
					!this.isFieldHidden('postal_code') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.postal_code',
						id: 'shipping_address.postal_code',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('postal_code'),
						validate: this.getFieldValidators('postal_code'),
						placeholder: this.getFieldPlaceholder('postal_code')
					}),
					!this.isFieldHidden('city') && React.createElement(Field, {
						className: inputClassName,
						name: 'shipping_address.city',
						id: 'shipping_address.city',
						component: InputField,
						type: 'text',
						label: this.getFieldLabel('city'),
						validate: this.getFieldValidators('city'),
						placeholder: this.getFieldPlaceholder('city')
					}),
					React.createElement(
						'div',
						{ className: 'checkout-button-wrap' },
						React.createElement(
							'button',
							{
								type: 'submit',
								disabled: invalid,
								className: buttonClassName
							},
							text.next
						)
					)
				)
			);
		}
	}
}

export default reduxForm({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(CheckoutStepContacts);