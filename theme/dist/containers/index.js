import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import CustomProducts from '../components/products/custom';
import HomeSlider from '../components/homeSlider';

const IndexContainer = props => {
	const {
		addCartItem,
		state: { pageDetails, settings }
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
		React.createElement(HomeSlider, { images: themeSettings.home_slider }),
		pageDetails.content && pageDetails.content.length > 10 && React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement('div', {
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					})
				)
			)
		),
		React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'title is-4 has-text-centered' },
					themeSettings.home_products_title
				),
				React.createElement(CustomProducts, {
					sku: themeSettings.home_products_sku,
					sort: themeSettings.home_products_sort,
					limit: themeSettings.home_products_limit,
					settings: settings,
					addCartItem: addCartItem
				})
			)
		)
	);
};

IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default IndexContainer;