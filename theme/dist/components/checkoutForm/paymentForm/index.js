import React from 'react';
import api from '../../../lib/api';
import PayPalCheckout from './PayPalCheckout';
import LiqPay from './LiqPay';
import StripeElements from './StripeElements';

export default class PaymentForm extends React.Component {
	constructor(props) {
		super(props);

		this.fetchFormSettings = () => {
			this.setState({
				loading: true
			});

			api.ajax.paymentFormSettings.retrieve().then(({ status, json }) => {
				this.setState({
					formSettings: json,
					loading: false
				});
			}).catch(e => {
				this.setState({
					formSettings: null,
					loading: false
				});
				console.log(e);
			});
		};

		this.state = {
			formSettings: null,
			loading: false
		};
	}

	componentDidMount() {
		this.fetchFormSettings();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount) {
			this.fetchFormSettings();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount || this.state !== nextState;
	}

	render() {
		const { gateway, shopSettings, onPayment, onCreateToken } = this.props;
		const { formSettings, loading } = this.state;

		if (loading) {
			return null;
		} else if (formSettings && gateway && gateway !== '') {
			switch (gateway) {
				case 'paypal-checkout':
					return React.createElement(
						'div',
						{ className: 'payment-form' },
						React.createElement(PayPalCheckout, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment
						})
					);
				case 'liqpay':
					return React.createElement(
						'div',
						{ className: 'payment-form' },
						React.createElement(LiqPay, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment
						})
					);
				case 'stripe-elements':
					return React.createElement(
						'div',
						{ className: 'payment-form' },
						React.createElement(StripeElements, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment,
							onCreateToken: onCreateToken
						})
					);
				default:
					return React.createElement(
						'div',
						null,
						'Payment Gateway ',
						React.createElement(
							'b',
							null,
							gateway
						),
						' not found!'
					);
			}
		} else {
			return null;
		}
	}
}