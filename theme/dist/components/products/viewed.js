import React from 'react';
import PropTypes from 'prop-types';
import { text } from '../../lib/settings';
import CustomProductList from './custom';

export default class ViewedProducts extends React.Component {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.state = {
			viewedProducts: []
		}, this.getArrayFromLocalStorage = () => {
			let values = [];
			const viewedProducts = localStorage.getItem('viewedProducts');

			try {
				if (viewedProducts && viewedProducts.length > 0) {
					const viewedProductsParsed = JSON.parse(viewedProducts);
					if (Array.isArray(viewedProductsParsed)) {
						values = viewedProductsParsed;
					}
				}
			} catch (e) {
				//
			}

			return values;
		}, this.addProductIdToLocalStorage = productId => {
			if (productId && productId.length > 0) {
				const viewedProducts = this.getArrayFromLocalStorage();

				if (viewedProducts.includes(productId)) {
					const index = viewedProducts.indexOf(productId);
					viewedProducts.splice(index, 1);
					viewedProducts.push(productId);
				} else {
					viewedProducts.push(productId);
				}

				localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
				this.setState({ viewedProducts });
			}
		}, _temp;
	}

	componentDidMount() {
		const { product } = this.props;
		const viewedProducts = this.getArrayFromLocalStorage();
		this.setState({ viewedProducts });

		if (product && product.id) {
			this.addProductIdToLocalStorage(product.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.product !== nextProps.product && nextProps.product && nextProps.product.id) {
			this.addProductIdToLocalStorage(nextProps.product.id);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.viewedProducts !== nextState.viewedProducts;
	}

	render() {
		const { limit, settings, addCartItem, product } = this.props;
		let { viewedProducts } = this.state;

		if (viewedProducts && product && product.id) {
			viewedProducts = viewedProducts.filter(id => id !== product.id);
		}

		if (viewedProducts && viewedProducts.length > 0) {
			const ids = viewedProducts.reverse().slice(0, limit);
			return React.createElement(
				'section',
				{ className: 'section section-product-related' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'title is-4 has-text-centered' },
						text.recentlyViewed
					),
					React.createElement(CustomProductList, {
						ids: ids,
						settings: settings,
						addCartItem: addCartItem,
						limit: limit,
						isCentered: true
					})
				)
			);
		}
		return null;
	}
}
ViewedProducts.propTypes = {
	limit: PropTypes.number.isRequired,
	settings: PropTypes.shape({}).isRequired,
	addCartItem: PropTypes.func.isRequired,
	product: PropTypes.shape({}).isRequired
};