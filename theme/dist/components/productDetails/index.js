import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import Disqus from '../comments/disqus';
import ViewedProducts from '../products/viewed';
import Breadcrumbs from './breadcrumbs';
import DiscountCountdown from './discountCountdown';
import AddToCartButton from './addToCartButton';
import Attributes from './attributes';
import Gallery from './gallery';
import Options from './options';
import Price from './price';
import Quantity from './quantity';
import RelatedProducts from './relatedProducts';
import Tags from './tags';

const Description = ({ description }) => React.createElement('div', {
	className: 'product-content',
	dangerouslySetInnerHTML: { __html: description }
});

export default class ProductDetails extends React.Component {
	constructor(props) {
		super(props);

		this.setQuantity = quantity => {
			this.setState({ quantity: quantity });
		};

		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1
		};

		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	onOptionChange(optionId, valueId) {
		let { selectedOptions } = this.state;

		if (valueId === '') {
			delete selectedOptions[optionId];
		} else {
			selectedOptions[optionId] = valueId;
		}

		this.setState({ selectedOptions: selectedOptions });
		this.findVariantBySelectedOptions();
		this.checkSelectedOptions();
	}

	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(variantOption => selectedOptions[variantOption.option_id] === variantOption.value_id);
			if (variantMutchSelectedOptions) {
				this.setState({ selectedVariant: variant });
				return;
			}
		}

		this.setState({ selectedVariant: null });
	}

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		let item = {
			product_id: product.id,
			quantity: quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}

		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;

		const allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	render() {
		const { product, settings, categories } = this.props;
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity = product.stock_status === 'discontinued' ? 0 : product.stock_backorder ? themeSettings.maxCartItemQty : selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;

		if (product) {
			return React.createElement(
				Fragment,
				null,
				React.createElement(
					'section',
					{ className: 'section section-product' },
					React.createElement(
						'div',
						{ className: 'container' },
						React.createElement(
							'div',
							{ className: 'columns' },
							React.createElement(
								'div',
								{ className: 'column is-7' },
								themeSettings.show_product_breadcrumbs && React.createElement(Breadcrumbs, { product: product, categories: categories }),
								React.createElement(Gallery, { images: product.images })
							),
							React.createElement(
								'div',
								{ className: 'column is-5' },
								React.createElement(
									'div',
									{ className: 'content' },
									React.createElement(Tags, { tags: product.tags }),
									React.createElement(
										'h1',
										{ className: 'title is-4 product-name' },
										product.name
									),
									React.createElement(Price, {
										product: product,
										variant: selectedVariant,
										isAllOptionsSelected: isAllOptionsSelected,
										settings: settings
									}),
									themeSettings.show_discount_countdown && product.on_sale === true && React.createElement(DiscountCountdown, { product: product }),
									React.createElement(Options, {
										options: product.options,
										onChange: this.onOptionChange
									}),
									React.createElement(Quantity, {
										maxQuantity: maxQuantity,
										onChange: this.setQuantity
									}),
									React.createElement(
										'div',
										{ className: 'button-addtocart' },
										React.createElement(AddToCartButton, {
											product: product,
											variant: selectedVariant,
											addCartItem: this.addToCart,
											isAllOptionsSelected: isAllOptionsSelected
										})
									)
								)
							)
						)
					)
				),
				React.createElement(
					'section',
					{ className: 'section section-product-description' },
					React.createElement(
						'div',
						{ className: 'container' },
						React.createElement(
							'div',
							{ className: 'content' },
							React.createElement(
								'div',
								{ className: 'columns' },
								React.createElement(
									'div',
									{ className: 'column is-7' },
									React.createElement(Description, { description: product.description })
								),
								React.createElement(
									'div',
									{ className: 'column is-5' },
									React.createElement(Attributes, { attributes: product.attributes })
								)
							)
						)
					)
				),
				React.createElement(RelatedProducts, {
					settings: settings,
					addCartItem: this.addToCart,
					ids: product.related_product_ids,
					limit: 10
				}),
				themeSettings.show_viewed_products && React.createElement(ViewedProducts, {
					settings: settings,
					addCartItem: this.addToCart,
					product: product,
					limit: themeSettings.limit_viewed_products || 4
				}),
				themeSettings.disqus_shortname && themeSettings.disqus_shortname !== '' && React.createElement(
					'section',
					{ className: 'section' },
					React.createElement(
						'div',
						{ className: 'container' },
						React.createElement(Disqus, {
							shortname: themeSettings.disqus_shortname,
							identifier: product.id,
							title: product.name,
							url: product.url
						})
					)
				)
			);
		} else {
			return null;
		}
	}
}