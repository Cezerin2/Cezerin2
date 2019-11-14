import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MetaTags from '../components/metaTags';
import OrderSummary from '../components/orderSummary';
import CheckoutForm from '../components/checkoutForm';

const CheckoutContainer = props => {
	const {
		state: { pageDetails }
	} = props;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		React.createElement(
			'section',
			{ className: 'section section-checkout' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'columns columns-checkout' },
					React.createElement(
						'div',
						{ className: 'column is-5-widescreen is-offset-1-widescreen is-6-desktop' },
						React.createElement(OrderSummary, props)
					),
					React.createElement(
						'div',
						{ className: 'column is-6-widescreen is-6-desktop' },
						React.createElement(CheckoutForm, props)
					)
				)
			)
		)
	);
};

CheckoutContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default CheckoutContainer;