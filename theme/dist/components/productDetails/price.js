import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const FormattedCurrency = ({ number, settings }) => helper.formatCurrency(number, settings);

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => React.createElement(
	'div',
	{ className: 'product-price' },
	React.createElement(
		'span',
		{ className: 'product-new-price' },
		React.createElement(FormattedCurrency, { settings: settings, number: newPrice })
	),
	React.createElement(
		'del',
		{ className: 'product-old-price' },
		React.createElement(FormattedCurrency, { settings: settings, number: oldPrice })
	)
);

const Price = ({ product, variant, isAllOptionsSelected, settings }) => {
	let priceStyle = {};
	if (themeSettings.details_price_size && themeSettings.details_price_size > 0) {
		priceStyle.fontSize = themeSettings.details_price_size + 'px';
	}
	if (themeSettings.details_price_color && themeSettings.details_price_color.length > 0) {
		priceStyle.color = themeSettings.details_price_color;
	}

	let price = 0;
	let oldPrice = 0;

	if (product.variable && variant && variant.price > 0) {
		price = variant.price;
	} else {
		price = product.price;
	}

	if (product.on_sale) {
		oldPrice = product.regular_price;
	}

	if (oldPrice > 0) {
		return React.createElement(NewAndOldPrices, {
			settings: settings,
			newPrice: price,
			oldPrice: oldPrice
		});
	} else {
		return React.createElement(
			'div',
			{ className: 'product-price', style: priceStyle },
			React.createElement(FormattedCurrency, { settings: settings, number: price })
		);
	}
};

export default Price;