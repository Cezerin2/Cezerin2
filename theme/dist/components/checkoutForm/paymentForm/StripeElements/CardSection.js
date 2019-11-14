import React, { Fragment } from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = ({ title }) => React.createElement(
	Fragment,
	null,
	React.createElement(
		'p',
		null,
		title
	),
	React.createElement(CardElement, null)
);

export default CardSection;