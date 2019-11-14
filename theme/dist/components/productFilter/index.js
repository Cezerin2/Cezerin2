import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

import Sort from '../sort';
import PriceSlider from './priceSlider';
import AttributeFilter from './attributeFilter';

export default class ProductFilter extends React.Component {
	constructor(props) {
		super(props);

		this.sidebarToggle = () => {
			this.setState({
				sidebarIsActive: !this.state.sidebarIsActive
			});
			document.body.classList.toggle('noscroll');
		};

		this.sidebarClose = () => {
			this.setState({ sidebarIsActive: false });
			document.body.classList.remove('noscroll');
		};

		this.state = {
			sidebarIsActive: false
		};
	}

	render() {
		const { sidebarIsActive } = this.state;
		const {
			categoryDetails,
			categories,
			settings,
			productFilter,
			productsMinPrice,
			productsMaxPrice,
			productsAttributes
		} = this.props.state;

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'is-hidden-tablet' },
				React.createElement(
					'button',
					{ className: 'button is-fullwidth', onClick: this.sidebarToggle },
					text.filterProducts
				)
			),
			React.createElement(
				'div',
				{
					className: sidebarIsActive ? 'modal is-active' : 'is-hidden-mobile',
					style: { zIndex: 101 }
				},
				React.createElement('div', {
					className: sidebarIsActive ? 'dark-overflow' : '',
					onClick: this.sidebarClose
				}),
				React.createElement(
					'div',
					{ className: sidebarIsActive ? 'modal-content' : '' },
					React.createElement(
						'div',
						{ className: sidebarIsActive ? 'box sidebar' : '' },
						React.createElement(
							'div',
							{ className: 'is-hidden-tablet', style: { marginBottom: 30 } },
							React.createElement(Sort, {
								defaultSort: settings.default_product_sorting,
								currentSort: productFilter.sort,
								setSort: this.props.setSort
							})
						),
						React.createElement(AttributeFilter, {
							attributes: productsAttributes,
							setFilterAttribute: this.props.setFilterAttribute,
							unsetFilterAttribute: this.props.unsetFilterAttribute
						}),
						React.createElement(PriceSlider, {
							minPrice: productsMinPrice,
							maxPrice: productsMaxPrice,
							minValue: productFilter.priceFrom,
							maxValue: productFilter.priceTo,
							setPriceFromAndTo: this.props.setPriceFromAndTo,
							settings: settings
						}),
						React.createElement(
							'button',
							{
								className: 'button is-fullwidth is-dark is-hidden-tablet',
								onClick: this.sidebarClose
							},
							text.close
						)
					)
				)
			)
		);
	}
}