import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const ProductBreadcrumbs = ({ product, categories }) => {
	const items = helper.getProductBreadcrumbs(product, categories);
	return React.createElement(
		'nav',
		{
			className: 'breadcrumb is-small product-breadcrumb',
			'aria-label': 'breadcrumbs'
		},
		React.createElement(
			'ul',
			null,
			React.createElement(
				'li',
				null,
				React.createElement(
					NavLink,
					{ to: '/' },
					text.home
				)
			),
			items
		)
	);
};

export default ProductBreadcrumbs;