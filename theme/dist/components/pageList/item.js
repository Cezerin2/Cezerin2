import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const pad = number => number < 10 ? '0' + number : number;
const formatDate = date => `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

const PageListItem = ({ page }) => React.createElement(
	'div',
	{ className: 'page-item' },
	React.createElement(
		'h2',
		null,
		React.createElement(
			NavLink,
			{ to: page.path },
			page.meta_title
		)
	),
	React.createElement(
		'div',
		{ className: 'date' },
		formatDate(new Date(page.date_created))
	),
	React.createElement(
		'div',
		{ className: 'description' },
		page.meta_description
	)
);

export default PageListItem;