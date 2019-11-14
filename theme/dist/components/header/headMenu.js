import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

class HeadMenuItem extends React.Component {
	constructor(props) {
		super(props);

		this.onMouseEnterHandler = () => {
			if (!this.props.isMobile && this.props.level === 1) {
				this.setState({
					isActive: true
				});
			}
		};

		this.onMouseLeaveHandler = () => {
			if (!this.props.isMobile && this.props.level === 1) {
				this.setState({
					isActive: false
				});
			}
		};

		this.isActiveToggle = () => this.setState({
			isActive: !this.state.isActive
		});

		this.state = {
			isActive: false
		};
	}

	render() {
		const { categories, category, onClick, level, isMobile } = this.props;
		const items = categories.filter(item => item.parent_id === category.id).map((subcategory, index) => React.createElement(HeadMenuItem, {
			key: index,
			category: subcategory,
			onClick: onClick,
			categories: categories,
			level: level + 1,
			isMobile: isMobile
		}));
		const hasItems = items.length > 0;

		return React.createElement(
			'li',
			{
				onMouseEnter: this.onMouseEnterHandler,
				onMouseLeave: this.onMouseLeaveHandler,
				onMouseUp: this.onMouseLeaveHandler,
				className: (level === 2 ? 'column is-3' : '') + (this.state.isActive ? ' is-active' : '') + (hasItems ? ' has-items' : '')
			},
			React.createElement(
				'div',
				{ className: 'cat-parent' },
				React.createElement(
					NavLink,
					{
						activeClassName: 'is-active',
						className: hasItems ? 'has-items' : '',
						to: category.path,
						onClick: onClick
					},
					category.name
				),
				hasItems && isMobile && React.createElement('span', { onClick: this.isActiveToggle })
			),
			hasItems && React.createElement(
				'ul',
				{
					className: (level === 1 ? 'columns is-gapless is-multiline' : '') + ' nav-level-' + level
				},
				items
			)
		);
	}
}

export default class HeadMenu extends React.PureComponent {
	render() {
		const { categories, onClick, isMobile } = this.props;
		let addItemsToMenu = [];
		if (themeSettings.header_menu && themeSettings.header_menu.length > 0) {
			addItemsToMenu = themeSettings.header_menu.map(item => ({
				name: item.text,
				path: item.url,
				id: item.id || '',
				parent_id: item.parent_id || null
			}));
		}
		const menuItems = [...categories, ...addItemsToMenu];

		const items = menuItems.filter(category => category.parent_id === null).map((category, index) => React.createElement(HeadMenuItem, {
			key: index,
			category: category,
			onClick: onClick,
			categories: categories,
			level: 1,
			isMobile: isMobile
		}));

		return React.createElement(
			'ul',
			{ className: 'nav-level-0' },
			items
		);
	}
}