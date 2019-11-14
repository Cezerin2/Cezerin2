import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inProgress: false
		};
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		this.setState({
			inProgress: true
		});
		const { formSettings, onCreateToken, stripe } = this.props;
		const { token } = await stripe.createToken({
			name: formSettings.email
		});
		if (token && token !== 'undefined') {
			onCreateToken(token.id);
		} else {
			this.setState({
				inProgress: false
			});
		}
	}

	render() {
		const { inProgress } = this.state;
		return React.createElement(
			'div',
			null,
			React.createElement(CardSection, { title: 'Credit Card details' }),
			React.createElement(
				'div',
				{ className: 'checkout-button-wrap' },
				React.createElement(
					'button',
					{
						onClick: this.submit,
						disabled: inProgress,
						className: `checkout-button button is-primary${inProgress ? ' is-loading' : ''}`
					},
					'Confirm order'
				)
			)
		);
	}
}
export default injectStripe(CheckoutForm);