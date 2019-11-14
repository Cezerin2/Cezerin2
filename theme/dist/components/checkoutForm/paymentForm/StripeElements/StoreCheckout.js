import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const StoreCheckout = ({
	formSettings,
	shopSettings,
	onPayment,
	onCreateToken
}) => React.createElement(
	Elements,
	null,
	React.createElement(InjectedCheckoutForm, {
		formSettings: formSettings,
		shopSettings: shopSettings,
		onPayment: onPayment,
		onCreateToken: onCreateToken
	})
);

export default StoreCheckout;