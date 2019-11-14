import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import PaymentForm from './paymentForm';

const CheckoutStepPayment = props => {
	const {
		cart,
		settings,
		processingCheckout,
		handleSuccessPayment,
		inputClassName,
		buttonClassName,
		shippingMethod,
		show,
		title,
		onCreateToken
	} = props;

	const { payment_method_gateway, grand_total } = cart;

	if (!show) {
		return React.createElement(
			'div',
			{ className: 'checkout-step' },
			React.createElement(
				'h1',
				null,
				React.createElement(
					'span',
					null,
					'3'
				),
				title
			)
		);
	}
	return React.createElement(
		'div',
		{ className: 'checkout-step' },
		React.createElement(
			'h1',
			null,
			React.createElement(
				'span',
				null,
				'3'
			),
			title
		),
		React.createElement(
			'div',
			{ className: 'checkout-button-wrap' },
			!processingCheckout && React.createElement(PaymentForm, {
				gateway: payment_method_gateway,
				amount: grand_total,
				shopSettings: settings,
				shippingMethod: shippingMethod,
				onPayment: handleSuccessPayment,
				inputClassName: inputClassName,
				buttonClassName: buttonClassName,
				onCreateToken: onCreateToken
			}),
			processingCheckout && React.createElement(
				'p',
				null,
				text.loading
			)
		)
	);
};

export default CheckoutStepPayment;