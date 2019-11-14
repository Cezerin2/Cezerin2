import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { text } from '../lib/settings';
import * as helper from '../lib/helper';

const CategoryBreadcrumbs = ({ currentCategory, categories }) => {
	const items = helper.getCategoryBreadcrumbs(currentCategory.id, categories);
	return React.createElement(
		'nav',
		{ className: 'breadcrumb is-small', 'aria-label': 'breadcrumbs' },
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
			items,
			React.createElement(
				'li',
				{ className: 'is-active' },
				React.createElement(
					'a',
					{ href: currentCategory.path, 'aria-current': 'page' },
					currentCategory.name
				)
			)
		)
	);
};

CategoryBreadcrumbs.propTypes = {
	currentCategory: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default CategoryBreadcrumbs;