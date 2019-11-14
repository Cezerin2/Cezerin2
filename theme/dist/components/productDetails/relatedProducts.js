import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import CustomProducts from '../products/custom';

export default class RelatedProducts extends React.PureComponent {
	render() {
		const { ids, settings, addCartItem, limit } = this.props;
		if (ids && ids.length > 0) {
			let title = themeSettings.related_products_title && themeSettings.related_products_title.length > 0 ? themeSettings.related_products_title : text.relatedProducts;

			return React.createElement(
				'section',
				{ className: 'section section-product-related' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'title is-4 has-text-centered' },
						title
					),
					React.createElement(CustomProducts, {
						ids: ids,
						sort: null,
						limit: limit,
						isCentered: true,
						settings: settings,
						addCartItem: addCartItem
					})
				)
			);
		} else {
			return null;
		}
	}
}