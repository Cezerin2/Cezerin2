var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import api from '../../../dist/lib/api';
import { Redirect, Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import Lscache from 'lscache';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';

const validateRequired = value => value && value.length > 0 ? undefined : text.required;

const validateEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const ReadOnlyField = ({ name, value }) => {
	return React.createElement(
		'div',
		{ className: 'checkout-field-preview' },
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
		className: field.meta.touched && field.meta.error ? 'invalid' : ''
	}))
);

class Account extends React.Component {
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

		this.getTableHeaderLabel = tableHeaderLabel => {
			switch (tableHeaderLabel) {
				case 'product_image':
					return text.product_image;
				case 'id':
					return text.order_line_id;
				case 'product_id':
					return text.product_id;
				case 'variant_id':
					return text.product_variant_id;
				case 'quantity':
					return text.product_qty;
				case 'discount_total':
					return text.product_discount_total;
				case 'name':
					return text.product_name;
				case 'price':
					return text.product_price;
				case 'price_total':
					return text.product_price_total;
				case 'sku':
					return text.product_sku;
				case 'tax_class':
					return text.product_tax_class;
				case 'tax_total':
					return text.product_tax_total;
				case 'variant_name':
					return text.product_variant_name;
				case 'weight':
					return text.product_weight;
				default:
					return 'Unnamed field';
			}
		};

		this.getFieldLabel = fieldName => {
			const labelText = this.getFieldLabelText(fieldName);
			return this.isFieldOptional(fieldName) ? `${labelText} (${text.optional})` : labelText;
		};

		this.handleProfile = () => {
			this.setState({ profileSection: 1, profileEdit: false });
		};

		this.handleOrderHistory = () => {
			this.setState({ profileSection: 2 });
		};

		this.handleContactsEdit = () => {
			this.setState({ profileEdit: true });
		};

		this.state = {
			profileSection: 1,
			profileEdit: false,
			reinitialized: false,
			cartLayer: false
		};
	}

	setInitialValues() {
		this.props.initialize({
			first_name: this.props.customerProperties.customer_settings.first_name,
			last_name: this.props.customerProperties.customer_settings.last_name,
			email: this.props.customerProperties.customer_settings.email,
			password: this.props.customerProperties.customer_settings.password,
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
		this.setState({ reinitialized: true });
		this.setState({ emailValues: this.props.customerProperties.customer_settings.email });
	}

	handleLogout() {
		Lscache.flush();
	}

	render() {
		const { handleSubmit,
			customerProperties,
			cartlayerBtnInitialized,
			cart,
			initialValues
		} = this.props;

		Lscache.flushExpired();

		const accountInputField = 'account-field';
		const accountForm = 'account-form';
		const titleClassName = 'login-title';
		const accountEditButtonClass = 'account-button button';
		const accountHeaderMenueContainer = 'account-header-menue-container';
		const accountHeaderMenueItems = 'account-header-menue-items';
		const accountProfileContainer = 'account-profile-container';
		const accountProfileList = 'account-profile-list';
		const accountButtonContainer = 'account-button-container';
		const continueShoppingButton = 'continue-shopping-button account-button button';
		const accountProfileHeadline = 'account-profile-headline';
		const isActive = 'is-active';

		let billingAddress = {};
		let shippingAddress = {};
		let orderHistory = {};
		const list = [];
		let tableStyle = null;
		let keyCounter = 0;
		let listHeader = [];

		if (customerProperties === undefined || Lscache.get('auth_data') === null) {
			return React.createElement(Redirect, { to: {
					pathname: '/login'
				} });
		}

		if (customerProperties !== undefined && customerProperties.cartLayer && Lscache.get('auth_data') !== null) {
			return React.createElement(Redirect, { to: {
					pathname: '/checkout'
				} });
		}

		if (customerProperties !== undefined) {
			if (customerProperties.customer_settings !== null && 'addresses' in customerProperties.customer_settings) {
				[].slice.call(customerProperties.customer_settings.addresses).forEach(function (key, i) {
					if (i < 1) {
						billingAddress['address1'] = key.address1;
						billingAddress['address2'] = key.address2;
						billingAddress['city'] = key.city;
						billingAddress['postal_code'] = key.postal_code;
						billingAddress['state'] = key.state;
						billingAddress['country'] = key.country;
					}
					if (i > 0) {
						shippingAddress['address1'] = key.address1;
						shippingAddress['address2'] = key.address2;
						shippingAddress['city'] = key.city;
						shippingAddress['postal_code'] = key.postal_code;
						shippingAddress['state'] = key.state;
						shippingAddress['country'] = key.country;
					}
				});

				orderHistory = customerProperties.order_statuses.data.filter(obj => obj.draft !== true).reduce(function (map, obj, i) {
					map['ordered_items' + i] = obj.items;
					return map;
				}, {});
			}

			// get all orders
			keyCounter = 0;
			for (var i in orderHistory) {
				listHeader = orderHistory[i].map((p, j) => {
					if (j < 1) {
						return React.createElement(
							'tr',
							{ className: 'tr-header', key: keyCounter },
							Object.keys(p).map((k, l) => {
								return React.createElement(
									'th',
									{ className: 'td-header', key: keyCounter + l },
									this.getTableHeaderLabel(k)
								);
							})
						);
					}
				});
				keyCounter++;
			};
			keyCounter = 0;
			for (var i in orderHistory) {
				list.push(orderHistory[i].map(p => {
					return React.createElement(
						'tr',
						{ className: 'tr-body', key: p.id + '' + i },
						Object.keys(p).map((k, d) => {
							if (k.indexOf('product_image') !== -1) {
								const setCounter = i.replace(/^\D+/g, '');
								let urlContent = customerProperties.order_statuses.data[setCounter].landing_url.split(',');
								console.log(p.product_image);
								if (p.product_image.length === 0) {
									return React.createElement(
										'td',
										{ className: 'td-body', key: p.id + '' + k },
										React.createElement(
											'div',
											{ suppressContentEditableWarning: 'true', contentEditable: 'false', value: k },
											React.createElement(
												'a',
												{ href: urlContent.length <= 1 ? customerProperties.order_statuses.data[setCounter].landing_url : urlContent[keyCounter++] },
												React.createElement('img', {
													src: '/assets/images/icons/photo_camera.svg',
													alt: 'person-icon',
													className: 'person-icon',
													style: { width: 25, height: 20 }
												})
											)
										)
									);
								}
								if (p.product_image.length !== 0) {
									return React.createElement(
										'td',
										{ className: 'td-body', key: p.id + '' + k },
										React.createElement(
											'div',
											{ suppressContentEditableWarning: 'true', contentEditable: 'false', value: k },
											React.createElement(
												'a',
												{ href: urlContent.length <= 1 ? customerProperties.order_statuses.data[setCounter].landing_url : urlContent[keyCounter++] },
												React.createElement('img', { src: p[k][0].url, alt: 'thumbnail' })
											)
										)
									);
								}
							}

							return React.createElement(
								'td',
								{ className: 'td-body', key: p.id + '' + k },
								React.createElement(
									'div',
									{ suppressContentEditableWarning: 'true', contentEditable: 'false', value: k },
									p[k]
								)
							);
						})
					);
				}));
			};

			if (this.state.profileEdit && !this.state.reinitialized) {
				this.setInitialValues();
			}

			tableStyle = {
				align: 'center'
			};

			return React.createElement(
				'div',
				{ className: 'account-container' },
				React.createElement(
					'div',
					{ className: 'account-section' },
					React.createElement(
						'h2',
						{ className: titleClassName },
						text.welcome,
						' ',
						customerProperties.customer_settings.full_name
					)
				),
				React.createElement(
					'div',
					{ className: accountHeaderMenueContainer },
					React.createElement(
						'ul',
						{ className: accountHeaderMenueItems },
						React.createElement(
							'li',
							{ className: this.state.profileSection === 1 ? isActive : '', onClick: this.handleProfile },
							text.profile
						),
						React.createElement(
							'li',
							{ className: this.state.profileSection === 2 ? isActive : '', onClick: this.handleOrderHistory },
							text.orders
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								Link,
								{ to: '/', style: { textDecoration: 'none' }, key: 'logout', onClick: this.handleLogout },
								text.logout
							)
						)
					)
				),
				this.state.profileSection === 1 && !this.state.profileEdit && React.createElement(
					'div',
					{ className: accountProfileContainer },
					React.createElement(
						'div',
						{ className: accountProfileList },
						React.createElement(
							'div',
							{ className: accountProfileHeadline },
							React.createElement('img', {
								src: '/assets/images/icons/person.svg',
								alt: 'person-icon',
								className: 'person-icon',
								style: { width: 25, height: 20 }
							}),
							React.createElement(
								'h4',
								null,
								text.account_profile_headline
							)
						),
						React.createElement(ReadOnlyField, {
							name: text.member_since,
							value: new Date(customerProperties.customer_settings.date_created).toLocaleDateString("de-DE")
						}),
						React.createElement(ReadOnlyField, {
							name: text.first_name,
							value: customerProperties.customer_settings.first_name
						}),
						React.createElement(ReadOnlyField, {
							name: text.last_name,
							value: customerProperties.customer_settings.last_name
						}),
						React.createElement(ReadOnlyField, {
							name: text.email,
							value: customerProperties.customer_settings.email
						})
					),
					React.createElement(
						'div',
						{ className: accountProfileList },
						React.createElement(
							'div',
							{ className: accountProfileHeadline },
							React.createElement('img', {
								src: '/assets/images/icons/address.svg',
								alt: 'person-icon',
								className: 'person-icon',
								style: { width: 25, height: 20 }
							}),
							React.createElement(
								'h4',
								null,
								text.account_billing_headline
							)
						),
						Object.keys(billingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.address1,
							value: billingAddress.address1
						}),
						Object.keys(billingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.address2,
							value: billingAddress.address2
						}),
						Object.keys(billingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.city,
							value: billingAddress.city
						}),
						Object.keys(billingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.postal_code,
							value: billingAddress.postal_code
						}),
						Object.keys(billingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.state,
							value: billingAddress.state
						}),
						React.createElement(
							'p',
							null,
							Object.keys(billingAddress).length === 0 ? text.empty : ''
						)
					),
					React.createElement(
						'div',
						{ className: accountProfileList },
						React.createElement(
							'div',
							{ className: accountProfileHeadline },
							React.createElement('img', {
								src: '/assets/images/icons/bag.svg',
								alt: 'person-icon',
								className: 'person-icon',
								style: { width: 25, height: 20 }
							}),
							React.createElement(
								'h4',
								null,
								text.shippingAddress
							)
						),
						Object.keys(shippingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.address1,
							value: shippingAddress.address1
						}),
						Object.keys(shippingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.address2,
							value: shippingAddress.address2
						}),
						Object.keys(shippingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.city,
							value: shippingAddress.city
						}),
						Object.keys(shippingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.postal_code,
							value: shippingAddress.postal_code
						}),
						Object.keys(shippingAddress).length > 0 && React.createElement(ReadOnlyField, {
							name: text.state,
							value: shippingAddress.state
						}),
						React.createElement(
							'p',
							null,
							Object.keys(shippingAddress).length === 0 ? text.empty : ''
						)
					)
				),
				this.state.profileSection === 1 && this.state.profileEdit && React.createElement(
					'div',
					{ className: accountProfileContainer },
					React.createElement(
						'form',
						{ onSubmit: handleSubmit, className: accountForm },
						React.createElement(
							'h3',
							{ className: titleClassName },
							text.edit_profile
						),
						React.createElement(Field, {
							className: accountInputField,
							name: 'first_name',
							id: 'customer.first_name',
							autoComplete: 'new-password',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('first_name'),
							validate: this.getFieldValidators('first_name'),
							placeholder: this.getFieldPlaceholder('first_name')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'last_name',
							id: 'customer.last_name',
							autoComplete: 'new-password',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('last_name'),
							validate: this.getFieldValidators('last_name'),
							placeholder: this.getFieldPlaceholder('last_name')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'email',
							id: 'customer.email',
							autoComplete: 'new-password',
							component: InputField //this.state.loggedin
							, type: 'email',
							label: this.getFieldLabel('email'),
							validate: this.getFieldValidators('email'),
							placeholder: this.getFieldPlaceholder('email')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'password',
							id: 'customer.password',
							autoComplete: 'new-password',
							component: InputField,
							type: 'password',
							label: this.getFieldLabel('password'),
							validate: this.getFieldValidators('password'),
							placeholder: this.getFieldPlaceholder('password')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'password_verify',
							id: 'customer.password_verify',
							autoComplete: 'new-password',
							component: InputField,
							type: 'password',
							label: this.getFieldLabel('password_verify'),
							validate: this.getFieldValidators('password_verify'),
							placeholder: this.getFieldPlaceholder('password_verify')
						}),
						React.createElement(
							'h3',
							{ className: titleClassName },
							text.shippingAddress
						),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.address1',
							id: 'shipping_address.address1',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('address1'),
							validate: this.getFieldValidators('address1'),
							placeholder: this.getFieldPlaceholder('address1')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.address2',
							id: 'shipping_address.address2',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('address2'),
							placeholder: this.getFieldPlaceholder('address2')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.country',
							id: 'shipping_address.country',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('country'),
							validate: this.getFieldValidators('country'),
							placeholder: this.getFieldPlaceholder('country')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.state',
							id: 'shipping_address.state',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('state'),
							validate: this.getFieldValidators('state'),
							placeholder: this.getFieldPlaceholder('state')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.postal_code',
							id: 'shipping_address.postal_code',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('postal_code'),
							validate: this.getFieldValidators('postal_code'),
							placeholder: this.getFieldPlaceholder('postal_code')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'shipping_address.city',
							id: 'shipping_address.city',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('city'),
							validate: this.getFieldValidators('city'),
							placeholder: this.getFieldPlaceholder('city')
						}),
						React.createElement(
							'h3',
							{ className: titleClassName },
							text.billingAddress
						),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.address1',
							id: 'billing_address.address1',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('address1'),
							validate: this.getFieldValidators('address1'),
							placeholder: this.getFieldPlaceholder('address1')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.address2',
							id: 'billing_address.address2',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('address2'),
							placeholder: this.getFieldPlaceholder('address2')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.country',
							id: 'billing_address.country',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('country'),
							validate: this.getFieldValidators('country'),
							placeholder: this.getFieldPlaceholder('country')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.state',
							id: 'billing_address.state',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('state'),
							validate: this.getFieldValidators('state'),
							placeholder: this.getFieldPlaceholder('state')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.postal_code',
							id: 'billing_address.postal_code',
							component: InputField,
							type: 'text',
							label: this.getFieldLabel('postal_code'),
							validate: this.getFieldValidators('postal_code'),
							placeholder: this.getFieldPlaceholder('postal_code')
						}),
						React.createElement(Field, {
							className: accountInputField,
							name: 'billing_address.city',
							id: 'billing_address.city',
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
									type: 'submit'
									//disabled={invalid}
									, className: accountEditButtonClass
								},
								text.save
							)
						)
					)
				),
				this.state.profileSection === 2 && React.createElement(
					'div',
					{ className: accountProfileContainer },
					React.createElement(
						'div',
						{ className: 'orders-history-container' },
						React.createElement(
							'fieldset',
							{ className: 'orders-history-fieldset' },
							React.createElement(
								'div',
								{ className: 'heading' },
								Object.keys(orderHistory).length < 1 && React.createElement(
									'p',
									null,
									text.order_history_empty
								),
								Object.keys(orderHistory).length > 0 && React.createElement(
									'h4',
									null,
									text.order_history
								)
							),
							React.createElement(
								'div',
								{ className: 'schedule padd-lr' },
								React.createElement(
									'div',
									{ className: 'tbl-header' },
									React.createElement(
										'table',
										{ cellPadding: '0', cellSpacing: '0', id: 'mytable', style: tableStyle },
										React.createElement(
											'thead',
											null,
											listHeader
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'tbl-content' },
									React.createElement(
										'table',
										{ cellPadding: '0', cellSpacing: '0', className: 'orders-history-table', style: tableStyle },
										React.createElement(
											'tbody',
											null,
											list
										)
									)
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: accountButtonContainer },
					this.state.profileSection !== 2 && React.createElement(
						'button',
						{
							type: 'button',
							onClick: this.handleContactsEdit,
							className: accountEditButtonClass
						},
						text.edit
					),
					React.createElement(
						'button',
						{
							type: 'button',
							className: continueShoppingButton
						},
						React.createElement(
							Link,
							{ to: '/', style: { textDecoration: 'none' }, key: 'account-continue-shopping' },
							text.continueshopping
						)
					)
				)
			);
		}
	}
}
export default reduxForm({
	form: 'Account',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Account);