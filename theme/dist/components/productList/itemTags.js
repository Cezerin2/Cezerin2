import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const ItemTags = ({ tags }) => {
	if (tags && tags.length > 0) {
		return React.createElement(
			'div',
			{ className: 'tags' },
			tags.map((tag, index) => React.createElement(
				'span',
				{ key: index, className: 'tag' },
				tag
			))
		);
	}
	return null;
};

export default ItemTags;