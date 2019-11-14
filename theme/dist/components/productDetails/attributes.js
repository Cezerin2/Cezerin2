import React from 'react';
import { themeSettings, text } from '../../lib/settings';

const Attribute = ({ name, value }) => React.createElement(
	'div',
	{ className: 'columns is-gapless is-mobile product-attribute' },
	React.createElement(
		'div',
		{ className: 'column is-5 attribute-name' },
		name,
		':'
	),
	React.createElement(
		'div',
		{ className: 'column is-7 attribute-value' },
		value
	)
);

const Attributes = ({ attributes }) => {
	if (attributes && attributes.length > 0) {
		const items = attributes.map((attribute, index) => React.createElement(Attribute, { key: index, name: attribute.name, value: attribute.value }));

		return React.createElement(
			'div',
			{ className: 'product-attributes' },
			React.createElement(
				'div',
				{ className: 'title is-5' },
				text.attributes
			),
			items
		);
	} else {
		return null;
	}
};
export default Attributes;