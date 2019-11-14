import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const SummaryItem = ({ settings, item, updateCartItemQuantiry }) => {
	const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);
	const qtyOptions = [];
	const maxQty = item.stock_backorder ? themeSettings.maxCartItemQty : item.stock_quantity >= themeSettings.maxCartItemQty ? themeSettings.maxCartItemQty : item.stock_quantity;

	for (let i = 0; i <= maxQty; i++) {
		const optionText = i === 0 ? text.remove : i;
		qtyOptions.push(React.createElement(
			'option',
			{ key: i, value: i },
			optionText
		));
	}

	return React.createElement(
		'div',
		{ className: 'columns is-mobile' },
		React.createElement(
			'div',
			{ className: 'column is-3' },
			React.createElement(
				'div',
				{ className: 'image' },
				React.createElement(
					NavLink,
					{ to: item.path },
					React.createElement('img', {
						className: 'product-image',
						src: thumbnail,
						alt: item.name,
						title: item.name
					})
				)
			)
		),
		React.createElement(
			'div',
			{ className: 'column' },
			React.createElement(
				'div',
				null,
				React.createElement(
					NavLink,
					{ to: item.path },
					item.name
				)
			),
			item.variant_name.length > 0 && React.createElement(
				'div',
				{ className: 'cart-option-name' },
				item.variant_name
			),
			React.createElement(
				'div',
				{ className: 'qty' },
				React.createElement(
					'span',
					null,
					text.qty,
					':'
				),
				React.createElement(
					'span',
					{ className: 'select is-small' },
					React.createElement(
						'select',
						{
							onChange: e => {
								updateCartItemQuantiry(item.id, e.target.value);
							},
							value: item.quantity
						},
						qtyOptions
					)
				)
			)
		),
		React.createElement(
			'div',
			{ className: 'column is-3 has-text-right price' },
			helper.formatCurrency(item.price_total, settings)
		)
	);
};

SummaryItem.propTypes = {
	settings: PropTypes.shape({}).isRequired,
	item: PropTypes.shape({}).isRequired,
	updateCartItemQuantiry: PropTypes.func.isRequired
};

const OrderSummary = props => {
	const {
		updateCartItemQuantiry,
		state: { cart, settings }
	} = props;

	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(item => React.createElement(SummaryItem, {
			key: item.id,
			item: item,
			updateCartItemQuantiry: updateCartItemQuantiry,
			settings: settings
		}));

		return React.createElement(
			'div',
			{
				className: 'checkout-box content is-small',
				style: { paddingBottom: 0 }
			},
			React.createElement(
				'div',
				{ className: 'title is-4' },
				text.orderSummary
			),
			React.createElement('hr', { className: 'separator' }),
			items,
			React.createElement(
				'div',
				{ className: 'columns is-mobile is-gapless is-multiline summary-block' },
				React.createElement(
					'div',
					{ className: 'column is-7' },
					text.subtotal
				),
				React.createElement(
					'div',
					{ className: 'column is-5 has-text-right price' },
					helper.formatCurrency(cart.subtotal, settings)
				),
				React.createElement(
					'div',
					{ className: 'column is-7' },
					text.shipping
				),
				React.createElement(
					'div',
					{ className: 'column is-5 has-text-right price' },
					helper.formatCurrency(cart.shipping_total, settings)
				),
				cart.discount_total > 0 && React.createElement(
					'div',
					{ className: 'column is-7' },
					text.discount
				),
				cart.discount_total > 0 && React.createElement(
					'div',
					{ className: 'column is-5 has-text-right price' },
					helper.formatCurrency(cart.discount_total, settings)
				),
				React.createElement(
					'div',
					{ className: 'column is-12' },
					React.createElement('hr', { className: 'separator' })
				),
				React.createElement(
					'div',
					{ className: 'column is-6 total-text' },
					text.grandTotal
				),
				React.createElement(
					'div',
					{ className: 'column is-6 total-price' },
					helper.formatCurrency(cart.grand_total, settings)
				)
			)
		);
	}
	return null;
};

OrderSummary.propTypes = {
	updateCartItemQuantiry: PropTypes.func.isRequired,
	state: PropTypes.shape({
		cart: PropTypes.shape({}),
		settings: PropTypes.shape({}).isRequired
	}).isRequired
};

export default OrderSummary;