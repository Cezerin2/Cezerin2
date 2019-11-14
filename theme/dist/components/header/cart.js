import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import * as helper from '../../lib/helper';

const CartItem = ({ item, deleteCartItem, settings }) => {
	const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);

	return React.createElement(
		'div',
		{ className: 'columns is-mobile' },
		React.createElement(
			'div',
			{ className: 'column is-2' },
			React.createElement(
				'div',
				{ className: 'image' },
				React.createElement(
					NavLink,
					{ to: item.path },
					React.createElement('img', { src: thumbnail })
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
				{ className: 'cart-quantity' },
				text.qty,
				': ',
				item.quantity
			)
		),
		React.createElement(
			'div',
			{ className: 'column is-4 has-text-right' },
			React.createElement(
				'div',
				{ className: 'mini-cart-item-price' },
				helper.formatCurrency(item.price_total, settings)
			),
			React.createElement(
				'a',
				{
					className: 'button is-light is-small',
					onClick: () => deleteCartItem(item.id)
				},
				text.remove
			)
		)
	);
};

export default class Cart extends React.PureComponent {
	render() {
		const { cart, deleteCartItem, settings, cartToggle } = this.props;

		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => React.createElement(CartItem, {
				key: item.id,
				item: item,
				deleteCartItem: deleteCartItem,
				settings: settings
			}));

			return React.createElement(
				'div',
				{ className: 'mini-cart' },
				items,
				React.createElement('hr', { className: 'separator' }),
				React.createElement(
					'div',
					{ className: 'columns is-mobile is-gapless' },
					React.createElement(
						'div',
						{ className: 'column is-7' },
						React.createElement(
							'b',
							null,
							text.subtotal
						)
					),
					React.createElement(
						'div',
						{ className: 'column is-5 has-text-right' },
						React.createElement(
							'b',
							null,
							helper.formatCurrency(cart.subtotal, settings)
						)
					)
				),
				React.createElement(
					NavLink,
					{
						className: 'button is-primary is-fullwidth has-text-centered',
						style: { textTransform: 'uppercase' },
						to: {
							pathname: Lscache.get('auth_data') !== null ? "/checkout" : "/login",
							state: { cartLayer: true }
						},
						onClick: cartToggle
					},
					text.proceedToCheckout
				)
			);
		}
		return React.createElement(
			'div',
			{ className: 'mini-cart' },
			React.createElement(
				'p',
				null,
				text.cartEmpty
			)
		);
	}
}