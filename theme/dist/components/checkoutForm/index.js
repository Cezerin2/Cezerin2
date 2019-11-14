import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import CheckoutStepContacts from './stepContacts';
import CheckoutStepShipping from './stepShipping';
import CheckoutStepPayment from './stepPayment';
import Lscache from 'lscache';

export default class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);

		this.changeStep = step => {
			this.setState({ step: step });
		};

		this.handleContactsSave = () => {
			this.changeStep(2);
		};

		this.handleContactsEdit = () => {
			this.changeStep(1);
		};

		this.handleShippingSave = () => {
			this.changeStep(3);
		};

		this.handleShippingEdit = () => {
			this.changeStep(2);
		};

		this.handleContactsSubmit = values => {
			let { shipping_address, billing_address } = values;
			shipping_address.full_name = `${values.first_name} ${values.last_name}`;
			this.props.updateCart({
				full_name: `${values.first_name} ${values.last_name}`,
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email,
				mobile: values.mobile,
				password: values.password,
				shipping_address,
				billing_address,
				payment_method_id: null,
				shipping_method_id: null
			}, cart => {
				this.props.loadShippingMethods();
				this.props.loadPaymentMethods();
			});

			this.handleContactsSave();
		};

		this.handleShippingMethodSave = shippingMethodId => {
			this.props.updateCart({
				payment_method_id: null,
				shipping_method_id: shippingMethodId
			}, cart => {
				this.props.loadPaymentMethods();
			});
		};

		this.handlePaymentMethodSave = paymentMethodId => {
			this.props.updateCart({
				payment_method_id: paymentMethodId
			});
		};

		this.isShowPaymentForm = () => {
			const { payment_method_gateway } = this.props.state.cart;
			const paymentGatewayExists = payment_method_gateway && payment_method_gateway !== '';
			return paymentGatewayExists;
		};

		this.handleShippingSubmit = values => {
			if (this.isShowPaymentForm()) {
				let { shipping_address, billing_address, comments } = values;
				shipping_address.full_name = `${values.first_name} ${values.last_name}`;

				this.props.updateCart({
					shipping_address,
					billing_address,
					comments
				});
				this.handleShippingSave();
			} else {
				this.props.checkout(values);
			}
		};

		this.handleSuccessPayment = () => {
			this.props.checkout(null);
		};

		this.handleCheckoutWithToken = tokenId => {
			this.props.updateCart({
				payment_token: tokenId
			}, cart => {
				this.props.checkout(null);
			});
		};

		this.state = {
			step: 1
		};
	}

	componentDidMount() {
		this.props.loadShippingMethods();
		this.props.loadPaymentMethods();
		this.props.customerData({
			token: Lscache.get('auth_data')
		});

		this.props.cartLayerInitialized({
			cartlayerBtnInitialized: false
		});
	}

	render() {
		const { step } = this.state;

		const {
			settings,
			cart,
			customerProperties,
			paymentMethods,
			shippingMethods,
			shippingMethod,
			loadingShippingMethods,
			loadingPaymentMethods,
			checkoutFields,
			processingCheckout,
			cartlayerBtnInitialized
		} = this.props.state;

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		if (cart && cart.items.length > 0) {
			const showPaymentForm = this.isShowPaymentForm();

			let shippingMethod = null;
			let paymentMethod = null;
			const { shipping_method_id, payment_method_id } = cart;
			if (shipping_method_id && shippingMethods && shippingMethods.length > 0) {
				shippingMethod = shippingMethods.find(method => method.id === shipping_method_id);
			}
			if (payment_method_id && paymentMethods && paymentMethods.length > 0) {
				paymentMethod = paymentMethods.find(method => method.id === payment_method_id);
			}

			return React.createElement(
				'div',
				{ className: 'checkout-form' },
				React.createElement(CheckoutStepContacts, {
					isReadOnly: step > 1,
					step: step,
					title: text.customerDetails,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					editButtonClassName: checkoutEditButtonClass,
					initialValues: cart,
					settings: settings,
					customerProperties: customerProperties,
					paymentMethods: paymentMethods,
					shippingMethod: shippingMethod,
					shippingMethods: shippingMethods,
					loadingShippingMethods: loadingShippingMethods,
					loadingPaymentMethods: loadingPaymentMethods,
					checkoutFields: checkoutFields,
					onEdit: this.handleContactsEdit,
					onSubmit: this.handleContactsSubmit,
					saveShippingMethod: this.handleShippingMethodSave,
					savePaymentMethod: this.handlePaymentMethodSave,
					cartlayerBtnInitialized: cartlayerBtnInitialized
				}),
				React.createElement(CheckoutStepShipping, {
					show: step >= 2,
					step: step,
					isReadOnly: step > 2,
					title: text.shipping,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					editButtonClassName: checkoutEditButtonClass,
					initialValues: cart,
					settings: settings,
					processingCheckout: processingCheckout,
					shippingMethod: shippingMethod,
					paymentMethod: paymentMethod,
					checkoutFields: checkoutFields,
					showPaymentForm: showPaymentForm,
					onSave: this.handleShippingSave,
					onEdit: this.handleShippingEdit,
					onSubmit: this.handleShippingSubmit
				}),
				showPaymentForm && React.createElement(CheckoutStepPayment, {
					show: step === 3,
					step: step,
					title: text.payment,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					cart: cart,
					settings: settings,
					processingCheckout: processingCheckout,
					handleSuccessPayment: this.handleSuccessPayment,
					onCreateToken: this.handleCheckoutWithToken
				})
			);
		} else {
			return React.createElement(
				'p',
				null,
				text.emptyCheckout
			);
		}
	}
}